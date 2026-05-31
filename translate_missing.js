import fs from 'fs';
import https from 'https';
import querystring from 'querystring';

const data = JSON.parse(fs.readFileSync('/tmp/missing_strings.json', 'utf8'));
const targetLangs = Object.keys(data);

function translatePost(text, lang) {
    return new Promise((resolve, reject) => {
        const postData = querystring.stringify({ q: text });
        const options = {
            hostname: 'translate.googleapis.com',
            path: `/translate_a/single?client=gtx&sl=da&tl=${lang}&dt=t`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    let parsed = JSON.parse(body);
                    let translatedParts = parsed[0].map(x => x[0]).join('');
                    resolve(translatedParts);
                } catch (e) {
                    console.error(`Failed for ${lang}, body snippet:`, body.substring(0, 100));
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

async function run() {
    let finalTranslations = {};

    for (let lang of targetLangs) {
        console.log(`Translating ${Object.keys(data[lang]).length} keys to ${lang}...`);
        const keys = Object.keys(data[lang]);
        const strings = Object.values(data[lang]);

        if (keys.length === 0) {
            finalTranslations[lang] = {};
            continue;
        }

        // Split into smaller batches to avoid URL/body length limits (approx 20 keys per batch)
        const batchSize = 15;
        finalTranslations[lang] = {};

        for (let i = 0; i < keys.length; i += batchSize) {
            const batchKeys = keys.slice(i, i + batchSize);
            const batchStrings = strings.slice(i, i + batchSize);
            const batchString = batchStrings.join(' ||| ');

            try {
                let translated = await translatePost(batchString, lang);
                // Handle different delimiter formats returned by different languages
                let parts = translated.split(/\s*\|\|\|\s*|\s*\|\s*\|\s*\|\s*/);

                for (let j = 0; j < batchKeys.length; j++) {
                    finalTranslations[lang][batchKeys[j]] = parts[j] ? parts[j].trim() : batchStrings[j];
                }
                console.log(`  Processed batch ${i / batchSize + 1} for ${lang}`);
            } catch (e) {
                console.error(`  Error in batch ${i / batchSize + 1} for ${lang}:`, e.message);
                // Fallback to source
                batchKeys.forEach((k, idx) => finalTranslations[lang][k] = batchStrings[idx]);
            }
            await new Promise(r => setTimeout(r, 1000)); // Avoid rate limiting
        }
    }

    fs.writeFileSync('/tmp/translated_missing.json', JSON.stringify(finalTranslations, null, 2));
    console.log('Done! Wrote to /tmp/translated_missing.json');
}

run();
