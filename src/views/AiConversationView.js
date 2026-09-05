import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderAiConversationView(container, navigateFn, extraData = {}) {
    const mode = extraData.mode || 'feedback'; // 'forgiving' or 'feedback'
    
    const viewContainer = document.createElement('div');
    viewContainer.className = 'view-container ai-conversation-container';

    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.width = '100%';

    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = `← Tilbage`;
    backBtn.onclick = () => {
        window.speechSynthesis.cancel();
        navigateFn('samtale_traening');
    };
    topBar.appendChild(backBtn);

    if (mode === 'feedback') {
        const finishBtn = document.createElement('button');
        finishBtn.className = 'back-btn';
        finishBtn.style.color = '#4caf50';
        finishBtn.style.border = '2px solid #4caf50';
        finishBtn.style.borderRadius = '20px';
        finishBtn.style.padding = '4px 12px';
        finishBtn.innerHTML = `Vis feedback`;
        finishBtn.onclick = () => {
            window.speechSynthesis.cancel();
            showFeedback();
        };
        topBar.appendChild(finishBtn);
    }

    viewContainer.appendChild(topBar);

    // Title
    const title = document.createElement('h1');
    title.textContent = 'Samtale med Anna';
    viewContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Anna lytter til dig og svarer. Snak med hende om din bolig!';
    viewContainer.appendChild(subtitle);

    // Chat Area
    const chatContainer = document.createElement('div');
    chatContainer.className = 'ai-chat-container';
    viewContainer.appendChild(chatContainer);

    // Bottom Control Area
    const controlArea = document.createElement('div');
    controlArea.className = 'ai-control-area';
    
    const statusText = document.createElement('div');
    statusText.className = 'ai-status-text';
    statusText.textContent = 'Tryk på mikrofonen for at svare';
    
    const micBtn = document.createElement('button');
    micBtn.className = 'ai-mic-btn';
    micBtn.innerHTML = '🎤';
    
    controlArea.appendChild(statusText);
    controlArea.appendChild(micBtn);
    viewContainer.appendChild(controlArea);
    container.appendChild(viewContainer);

    // Speech APIs
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'da-DK';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.continuous = false; // Safari fejler ofte hvis continuous = true. Vi bruger auto-restart i stedet.
    }

    const synth = window.speechSynthesis;
    let voice = null;
    
    function loadVoices() {
        const voices = synth.getVoices();
        const daVoices = voices.filter(v => v.lang === 'da-DK' || v.lang === 'da_DK');
        
        // Tag den første danske stemme (ofte Sara på Mac)
        voice = daVoices[0] || voices[0];
    }
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }

    // State Machine
    let currentNode = 0;
    let errorsFound = [];
    let isSpeaking = false;

    // Helper to add chat bubble
    function addBubble(text, sender) {
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = `ai-chat-wrapper ${sender}`;
        
        if (sender === 'anna') {
            const avatar = document.createElement('img');
            avatar.src = baseUrl + 'assets/anna_shopping_vector.png';
            avatar.className = 'ai-avatar';
            bubbleWrapper.appendChild(avatar);
        }

        const bubble = document.createElement('div');
        bubble.className = `ai-chat-bubble ${sender}`;
        bubble.innerHTML = text;
        bubbleWrapper.appendChild(bubble);

        chatContainer.appendChild(bubbleWrapper);
        setTimeout(() => {
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
        }, 100);
    }

    function addTypingIndicator() {
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = `ai-chat-wrapper anna typing-indicator-wrapper`;
        bubbleWrapper.id = 'typing-indicator';
        
        const avatar = document.createElement('img');
        avatar.src = baseUrl + 'assets/anna_shopping_vector.png';
        avatar.className = 'ai-avatar';
        bubbleWrapper.appendChild(avatar);

        const bubble = document.createElement('div');
        bubble.className = `ai-chat-bubble anna typing-indicator`;
        bubble.innerHTML = `<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>`;
        bubbleWrapper.appendChild(bubble);

        chatContainer.appendChild(bubbleWrapper);
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
    }

    function removeTypingIndicator() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    let isCooldown = false;

    function speakAnna(text) {
        if (!voice) loadVoices();
        
        isSpeaking = true;
        micBtn.classList.add('disabled');
        statusText.textContent = 'Anna taler...';
        
        const utterance = new SpeechSynthesisUtterance(text);
        // Vigtigt fix: Gem utterance globalt så Safari's garbage collector ikke sletter den mens den taler, hvilket skaber loops!
        window.activeUtterance = utterance;
        
        if (voice) utterance.voice = voice;
        utterance.lang = 'da-DK';
        utterance.rate = 0.9; // A bit slower for A1
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
            if (!isSpeaking) return;
            isSpeaking = false; // Sæt denne med det samme, ellers genudløser vores fallback onend flere gange!
            
            // Apple/Safari fix: Indsæt bevidst "køle af"-pause så mikrofonen og højtaler-processen ikke crasher hinanden
            isCooldown = true;
            statusText.textContent = 'Gør mikrofonen klar...';
            
            setTimeout(() => {
                isCooldown = false;
                micBtn.classList.remove('disabled');
                statusText.textContent = 'Tryk på mikrofonen for at svare';
                
                // Check if it's the end of conversation
                if (currentNode === 8) {
                    if (mode === 'feedback') {
                        showFeedback();
                    } else {
                        statusText.textContent = 'Samtalen er slut.';
                        micBtn.style.display = 'none';
                        setTimeout(() => navigateFn('samtale_traening'), 3000);
                    }
                }
            }, 1500);
        };
        
        synth.speak(utterance);

        // Fallback for Safari bug hvor 'onend' aldrig affyres
        setTimeout(() => {
            const checkInterval = setInterval(() => {
                if (!isSpeaking) {
                    clearInterval(checkInterval);
                    return;
                }
                if (!synth.speaking) {
                    clearInterval(checkInterval);
                    utterance.onend();
                }
            }, 500);
        }, 1000);
    }

    function annaReplies(text) {
        addTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addBubble(`<strong>Anna:</strong> ${text}`, 'anna');
            speakAnna(text);
        }, 1500 + Math.random() * 1000); // 1.5 - 2.5 seconds fake typing
    }

    function checkGrammar(text) {
        const lower = text.toLowerCase();
        
        // Mangler nutids-r
        const rMatch = lower.match(/\bjeg (bo|have|køre|løbe|spise|drikke|sove|arbejde|tale|læse|skrive|høre|se|købe|cykle)\b/);
        if (rMatch) {
            errorsFound.push({ priority: 2, text: `Du sagde 'jeg ${rMatch[1]}', men udsagnsord i nutid ender på r. Husk at sige 'jeg ${rMatch[1]}<b>r</b>'.` });
        }

        // Forkert køn (hus, værelse, køkken, badeværelse er intetkøn)
        if (lower.match(/\b(en hus|en værelse|en køkken|en badeværelse|en vindue)\b/)) {
            errorsFound.push({ priority: 3, text: "Husk at nogle bolig-ord er intetkøn (t-ord). Det hedder '<b>et</b> hus/værelse/køkken/badeværelse/vindue'." });
        }
        
        // Forkert køn (lejlighed, altan, have er fælleskøn)
        if (lower.match(/\b(et lejlighed|et altan|et have|et seng|et dør)\b/)) {
            errorsFound.push({ priority: 3, text: "Husk at 'lejlighed', 'altan', 'have', 'seng' og 'dør' er fælleskøn (n-ord). Det hedder f.eks. '<b>en</b> lejlighed'." });
        }

        // Direkte oversættelse fra engelsk "I am ..." -> "jeg er ..."
        const amMatch = lower.match(/\bjeg er\s+([a-zæøå\s]*?)(bor|har|spiser|kører|arbejder|taler|sover|læser)\b/);
        if (amMatch) {
            // Hvis der er mange ord imellem (som f.eks. "jeg er glad når jeg spiser"), skal vi passe på. 
            // Men for simpel A1-tale fanger vi typisk "jeg er også bor" eller "jeg er sammen med familie bor".
            const wordsBetween = amMatch[1].trim();
            if (wordsBetween.split(' ').length <= 4 && !wordsBetween.includes('når') && !wordsBetween.includes('fordi')) {
                errorsFound.push({ priority: 2, text: `På dansk siger man normalt bare 'jeg ${amMatch[2]}'. Man bruger ikke 'er' foran et andet udsagnsord som på engelsk.` });
            }
        }
        
        // Manglende artikel foran bolig-ord (f.eks. "lejlighed er 50 m2")
        const boligMatch = lower.match(/(?:^|\s)(lejlighed|hus|værelse|køkken|badeværelse|altan)\s+(er|ligger|har)\b/);
        if (boligMatch) {
            // Tjek ordet lige før
            const matchIndex = lower.indexOf(boligMatch[0]);
            const beforeMatch = lower.substring(0, matchIndex).trim().split(' ').pop();
            const validArticles = ['en', 'et', 'min', 'mit', 'din', 'dit', 'vores', 'hans', 'hendes', 'den', 'det'];
            
            if (!validArticles.includes(beforeMatch)) {
                errorsFound.push({ priority: 3, text: `Husk at sætte et lille ord foran '${boligMatch[1]}'. For eksempel '<b>min</b> ${boligMatch[1]}', '<b>en/et</b> ${boligMatch[1]}' eller '<b>den/det</b> ${boligMatch[1]}'.` });
            }
        }
        
        // "sammen med familie" uden bestemt form
        if (lower.match(/\bsammen med familie\b/)) {
            errorsFound.push({ priority: 3, text: "Husk endelsen: Det hedder 'sammen med <b>min</b> familie' eller 'sammen med famili<b>en</b>'." });
        }
        
        // Dobbelt subjekt eller forkert bøjning "Ja naboer er gode" -> "naboerne"
        if (lower.match(/\bja naboer\b/) || lower.match(/\bja bolig\b/)) {
            errorsFound.push({ priority: 3, text: "Husk at bruge bestemt form, når vi ved hvad vi taler om: 'naboer<b>ne</b> er gode' og 'bolig<b>en</b> er god'." });
        }

        // --- SYNTaks (Ordstilling) ---

        // V2-reglen: Hvis sætningen starter med et adverbium/tid/sted, skal der være omvendt ordstilling
        const v2Match = lower.match(/^(nu|her|i dag|i går|ofte|tit|nogle gange|altid)\s+(jeg|han|hun|vi|de|den|det)\s+(bor|har|er|taler|arbejder|spiser|drikker|sover|læser)\b/);
        if (v2Match) {
            errorsFound.push({ priority: 1, text: `<strong>Ordstilling:</strong> Du sagde '${v2Match[1]} ${v2Match[2]} ${v2Match[3]}'. Husk V2-reglen! Når en sætning starter med tid eller sted, skal udsagnsord og grundled bytte plads: '<b>${v2Match[1]} ${v2Match[3]} ${v2Match[2]}</b>'.` });
        }

        // Placering af 'ikke': I hovedsætninger står 'ikke' efter det første udsagnsord
        const ikkeMatch = lower.match(/\b(jeg|han|hun|vi|de|den|det)\s+ikke\s+(bor|har|er|taler|arbejder|spiser|drikker|sover|læser|kan|vil|skal|må)\b/);
        if (ikkeMatch) {
            errorsFound.push({ priority: 1, text: `<strong>Ordstilling:</strong> Du sagde '${ikkeMatch[1]} ikke ${ikkeMatch[2]}'. På dansk skal 'ikke' stå <em>efter</em> udsagnsordet i hovedsætninger: '<b>${ikkeMatch[1]} ${ikkeMatch[2]} ikke</b>'.` });
        }
    }

    function handleUserInput(text) {
        addBubble(text, 'user');
        if (mode === 'feedback') {
            checkGrammar(text);
        }
        const lower = text.toLowerCase();

        switch (currentNode) {
            case 0: // Intro, asked hus/lejlighed
                if (mode === 'forgiving' || lower.includes('hus')) {
                    currentNode = 1; // asking size
                    annaReplies("Det lyder dejligt. Hvor stort er det, du bor i?");
                } else if (lower.includes('lejlighed')) {
                    currentNode = 1;
                    annaReplies("En lejlighed kan være rigtig hyggelig. Hvor stor er din lejlighed?");
                } else {
                    annaReplies("Undskyld, der var lidt støj på linjen. Bor du i et hus eller en lejlighed?");
                }
                break;
            case 1: // Asking size
                currentNode = 2; // asking alone/together
                annaReplies("Ah, okay. Bor du alene eller sammen med nogen?");
                break;
            case 2: // Asking alone/together
                if (mode === 'forgiving' || lower.includes('alene') || lower.includes('sammen') || lower.includes('kone') || lower.includes('mand') || lower.includes('kæreste') || lower.includes('børn') || lower.includes('familie') || lower.includes('ven')) {
                    currentNode = 3; // asking neighbors
                    annaReplies("Det er dejligt. Har du naboer?");
                } else {
                    annaReplies("Okay. Jeg forstod vist ikke helt. Bor du alene, eller bor du sammen med nogen?");
                }
                break;
            case 3: // Neighbors
                if (mode === 'forgiving' || lower.includes('ja')) {
                    currentNode = 4;
                    annaReplies("Er du glad for dine naboer?");
                } else if (lower.includes('nej')) {
                    currentNode = 6; // skip why neighbors
                    annaReplies("Okay. Men er du generelt glad for at bo der?");
                } else {
                    annaReplies("Jeg hørte det ikke. Har du naboer, ja eller nej?");
                }
                break;
            case 4: // Happy with neighbors
                currentNode = 5;
                annaReplies("Hvorfor er du glad eller ikke glad for dine naboer?");
                break;
            case 5: // Why neighbors
                currentNode = 6;
                annaReplies("Det forstår jeg godt. Er du generelt glad for din bolig?");
                break;
            case 6: // Happy with housing
                if (mode === 'forgiving' || lower.includes('ja') || lower.includes('nej') || lower.includes('meget') || lower.includes('god')) {
                    currentNode = 7;
                    annaReplies("Hvorfor er du glad eller ikke glad for din bolig?");
                } else {
                    annaReplies("Er du glad for din bolig?");
                }
                break;
            case 7: // Why housing
                currentNode = 8;
                annaReplies("Det giver god mening. Tusind tak for snakken. Det var rigtig hyggeligt!");
                break;
        }
    }

    function showFeedback() {
        controlArea.style.display = 'none';
        
        // Remove the 'Vis feedback' button from topBar if it exists
        const topBarBtns = topBar.querySelectorAll('button');
        topBarBtns.forEach(btn => {
            if (btn.textContent === 'Vis feedback') btn.remove();
        });
        
        const feedbackCard = document.createElement('div');
        feedbackCard.className = 'card udtale-card';
        feedbackCard.style.marginTop = '2rem';
        feedbackCard.style.textAlign = 'left';

        const h2 = document.createElement('h2');
        h2.textContent = 'Feedback på samtalen 💡';
        h2.style.marginBottom = '1rem';
        feedbackCard.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = 'Super flot klaret! At føre en spontan samtale er svært, men du gjorde det godt.';
        feedbackCard.appendChild(p);

        if (errorsFound.length > 0) {
            const ul = document.createElement('ul');
            ul.style.marginTop = '1rem';
            ul.style.paddingLeft = '1.5rem';
            ul.style.lineHeight = '1.5';
            
            // Prioritize and remove duplicates
            const uniqueErrorsMap = new Map();
            errorsFound.forEach(err => {
                if (!uniqueErrorsMap.has(err.text)) {
                    uniqueErrorsMap.set(err.text, err);
                } else {
                    if (err.priority < uniqueErrorsMap.get(err.text).priority) {
                        uniqueErrorsMap.set(err.text, err);
                    }
                }
            });
            const topErrors = Array.from(uniqueErrorsMap.values())
                .sort((a, b) => a.priority - b.priority)
                .slice(0, 3);
            
            topErrors.forEach(err => {
                const li = document.createElement('li');
                li.innerHTML = err.text;
                li.style.marginBottom = '0.5rem';
                ul.appendChild(li);
            });
            feedbackCard.appendChild(ul);
        } else {
            const noErr = document.createElement('p');
            noErr.style.color = '#4caf50';
            noErr.style.marginTop = '1rem';
            noErr.style.fontWeight = 'bold';
            noErr.textContent = 'Vi lagde ikke mærke til nogen typiske grammatikfejl i din tale!';
            feedbackCard.appendChild(noErr);
        }
        
        chatContainer.appendChild(feedbackCard);
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
    }

    // Start Conversation
    setTimeout(() => {
        annaReplies("Hej! Jeg hedder Anna. Bor du i hus eller lejlighed?");
    }, 500);

    // Microphone logic
    let isListening = false;
    let finalTranscript = '';
    let liveBubble = null;

    micBtn.onclick = () => {
        if (isCooldown) return;
        
        // Hvis systemet sidder fast (eller brugeren vil afbryde Anna), tvinger vi den til at lytte
        if (isSpeaking) {
            synth.cancel();
            isSpeaking = false;
            micBtn.classList.remove('disabled');
            
            // Hvis brugeren afbryder Anna på det sidste spørgsmål, skal samtalen afsluttes
            if (currentNode === 8) {
                if (mode === 'feedback') {
                    showFeedback();
                } else {
                    statusText.textContent = 'Samtalen er slut.';
                    micBtn.style.display = 'none';
                    setTimeout(() => navigateFn('samtale_traening'), 3000);
                }
                return;
            }
        }
        
        if (isListening) {
            isListening = false; // VIGTIGT: Brugeren trykkede 'send'
            recognition.stop();
            return;
        }
        
        try {
            recognition.start();
            isListening = true;
            micBtn.classList.add('listening');
            statusText.textContent = 'Lytter... Tal nu (tryk igen for at sende)';
            statusText.style.color = '#ffeb3b';
            finalTranscript = '';
            
            // Create a temporary live recording bubble
            liveBubble = document.createElement('div');
            liveBubble.className = 'ai-chat-bubble user live-recording';
            liveBubble.innerHTML = '<span class="recording-dot"></span> <em>Lytter...</em>';
            
            const wrapper = document.createElement('div');
            wrapper.className = 'ai-chat-wrapper user';
            wrapper.id = 'live-recording-wrapper';
            wrapper.appendChild(liveBubble);
            
            chatContainer.appendChild(wrapper);
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
            
        } catch (e) {
            statusText.textContent = 'Kunne ikke starte mikrofonen.';
            isListening = false;
        }
    };

    if (recognition) {
        recognition.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interim += event.results[i][0].transcript;
                }
            }
            const currentText = (finalTranscript + ' ' + interim).trim();
            statusText.textContent = 'Hører: ' + currentText;
            
            if (liveBubble) {
                liveBubble.innerHTML = '<span class="recording-dot"></span> ' + (currentText || '<em>Lytter...</em>');
                chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
            }
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') {
                return; // Ignorer stilhed
            }
            
            micBtn.classList.remove('listening');
            isListening = false;
            statusText.textContent = 'Fejl: ' + event.error;
            statusText.style.color = '#ff5e5b';
            
            // Smid en synlig fejlbesked i chatten så vi ved præcis hvad der går galt!
            const errorBubble = document.createElement('div');
            errorBubble.className = 'ai-chat-bubble anna';
            errorBubble.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
            errorBubble.style.border = '1px solid red';
            errorBubble.innerHTML = `<em>System-info: Mikrofonen blev afbrudt af browseren (fejlkode: <strong>${event.error}</strong>).<br><br>Hvis du lige har trykket "Tillad", så er dette helt normalt for Apple-enheder. Tryk på mikrofonen én gang til for at starte optagelsen.</em>`;
            chatContainer.appendChild(errorBubble);
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
            
            const wrapper = document.getElementById('live-recording-wrapper');
            if (wrapper) wrapper.remove();
            liveBubble = null;
        };

        recognition.onend = () => {
            if (!isListening) {
                // Allerede håndteret
                return;
            }

            micBtn.classList.remove('listening');
            isListening = false;
            statusText.textContent = 'Behandler...';
            statusText.style.color = 'var(--text-muted)';
            
            const wrapper = document.getElementById('live-recording-wrapper');
            if (wrapper) wrapper.remove();
            liveBubble = null;
            
            if (finalTranscript.trim() !== '') {
                handleUserInput(finalTranscript.trim());
            } else {
                statusText.textContent = 'Tryk på mikrofonen for at svare';
            }
        };
    } else {
        micBtn.style.display = 'none';
        statusText.textContent = 'Din browser understøtter desværre ikke tale-genkendelse.';
    }

    // Inject styles if needed
    if (!document.getElementById('ai-chat-styles')) {
        const style = document.createElement('style');
        style.id = 'ai-chat-styles';
        style.textContent = `
            .ai-conversation-container {
                display: flex;
                flex-direction: column;
                height: 100vh;
                padding-bottom: 20px;
            }
            .ai-chat-container {
                flex: 1;
                overflow-y: auto;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 120px;
            }
            .ai-chat-bubble {
                max-width: 80%;
                padding: 1rem;
                border-radius: 16px;
                font-size: 1.1rem;
                line-height: 1.4;
                animation: fadeIn 0.3s ease-out forwards;
            }
            .ai-chat-wrapper {
                display: flex;
                align-items: flex-end;
                gap: 0.5rem;
                width: 100%;
            }
            .ai-chat-wrapper.anna {
                justify-content: flex-start;
            }
            .ai-chat-wrapper.user {
                justify-content: flex-end;
            }
            .ai-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid rgba(255,255,255,0.2);
                background-color: white;
            }
            .ai-chat-bubble.anna {
                background: rgba(255,255,255,0.15);
                color: #fff;
                border-bottom-left-radius: 4px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .ai-chat-bubble.user {
                background: rgba(76, 175, 80, 0.2);
                color: #fff;
                border-bottom-right-radius: 4px;
                border: 1px solid rgba(76, 175, 80, 0.4);
            }
            .ai-chat-bubble.live-recording {
                background: rgba(255, 255, 255, 0.1);
                border: 1px dashed rgba(255, 255, 255, 0.5);
                color: var(--text-muted);
            }
            .recording-dot {
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: #ff5e5b;
                border-radius: 50%;
                margin-right: 8px;
                animation: blink 1.5s infinite;
            }
            .typing-indicator {
                font-size: 1.5rem;
                letter-spacing: 2px;
                padding: 0.5rem 1rem;
            }
            .typing-indicator .dot {
                animation: blink 1.4s infinite both;
            }
            .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes blink {
                0% { opacity: 0.2; }
                20% { opacity: 1; }
                100% { opacity: 0.2; }
            }
            .ai-control-area {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 600px;
                background: rgba(0,0,0,0.8);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 24px;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                z-index: 100;
            }
            .ai-status-text {
                font-size: 0.9rem;
                color: var(--text-muted);
            }
            .ai-mic-btn {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, #ff5e5b, #ffcc00);
                color: white;
                font-size: 2rem;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(255, 94, 91, 0.4);
                transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
            }
            .ai-mic-btn.disabled {
                filter: grayscale(100%);
                cursor: not-allowed;
            }
            .ai-mic-btn:active:not(.disabled) {
                transform: scale(0.95);
            }
            .ai-mic-btn.listening {
                animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 94, 91, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(255, 94, 91, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 94, 91, 0); }
            }
        `;
        document.head.appendChild(style);
    }
}
