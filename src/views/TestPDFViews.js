import { getTranslation } from '../utils/i18n.js';
import { baseUrl } from '../utils/config.js';

export function renderIdiomMadErMedicin(container, navigateFn) {
    container.innerHTML = `
        <div style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: 'Poppins', sans-serif;">
            <button id="back-btn" class="back-btn" style="margin-bottom: 30px; position: sticky; top: 20px; z-index: 100;">
                <i class="fas fa-arrow-left"></i> Tilbage
            </button>
            
            
            <!-- SIDE 1: Mad er medicin -->
            <div style="background: #fffaf0; border-radius: 20px; padding: 60px 40px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 60px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -50px; left: -50px; width: 150px; height: 150px; background: #fef08a; border-radius: 50%; opacity: 0.5;"></div>
                <div style="position: absolute; bottom: -50px; right: -50px; width: 200px; height: 200px; background: #bbf7d0; border-radius: 50%; opacity: 0.5;"></div>
                
                <h1 style="font-size: 3.5rem; color: #431407; margin-bottom: 20px; letter-spacing: 2px;">${getTranslation('mader_medicin_h1')}</h1>
                <h2 style="font-size: 1.8rem; color: #78350f; margin-bottom: 30px;">${getTranslation('mader_medicin_h2')}</h2>
                <p style="font-size: 1.2rem; color: #451a03; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                    ${getTranslation('mader_medicin_p1')}
                </p>
            </div>

            <!-- SIDE 4: 3 sjove billeder -->
            <div style="background: #fefce8; border-radius: 20px; padding: 50px 30px; margin-bottom: 60px; text-align: center; border: 4px dashed #fde047;">
                <h2 style="font-size: 2.5rem; color: #854d0e; margin-bottom: 40px;">${getTranslation('mader_medicin_s4_h2')}</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                    <div style="background: white; padding: 30px 20px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
                        <img src="${baseUrl}images/mader_medicin/apple.png" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 20px;" />
                        <h3 style="color: #991b1b; margin-bottom: 10px;">${getTranslation('mader_medicin_s4_box1_title')}</h3>
                        <p style="color: #7f1d1d; font-size: 0.9rem; font-weight: bold;">${getTranslation('mader_medicin_s4_box1_sub')}</p>
                        <p style="color: #451a03;">${getTranslation('mader_medicin_s4_box1_txt')}</p>
                    </div>
                    
                    <div style="background: white; padding: 30px 20px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
                        <img src="${baseUrl}images/mader_medicin/mouth.png" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 20px;" />
                        <h3 style="color: #b91c1c; margin-bottom: 10px;">${getTranslation('mader_medicin_s4_box2_title')}</h3>
                        <p style="color: #7f1d1d; font-size: 0.9rem; font-weight: bold;">${getTranslation('mader_medicin_s4_box2_sub')}</p>
                        <p style="color: #451a03;">${getTranslation('mader_medicin_s4_box2_txt')}</p>
                    </div>

                    <div style="background: white; padding: 30px 20px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
                        <img src="${baseUrl}images/mader_medicin/radish.png" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 20px;" />
                        <h3 style="color: #166534; margin-bottom: 10px;">${getTranslation('mader_medicin_s4_box3_title')}</h3>
                        <p style="color: #14532d; font-size: 0.9rem; font-weight: bold;">${getTranslation('mader_medicin_s4_box3_sub')}</p>
                        <p style="color: #451a03;">${getTranslation('mader_medicin_s4_box3_txt')}</p>
                    </div>
                </div>
            </div>

            
            <!-- SIDE 2: Bogstavelig oversættelse og Gloser -->
            <div style="background: #fdf2f8; border-radius: 20px; padding: 50px 30px; margin-bottom: 60px; text-align: center; border: 1px solid #fbcfe8;">
                <h2 style="font-size: 2.5rem; color: #831843; margin-bottom: 20px;">Et æble om dagen holder lægen væk</h2>
                <p style="font-size: 1.2rem; color: #9d174d; max-width: 700px; margin: 0 auto 40px auto; line-height: 1.6;">
                    Her er den direkte oversættelse af det danske udtryk til andre sprog. Læg mærke til, hvordan du siger "æble" og "læge" på dit sprog!
                </p>
                
                <img src="${baseUrl}images/mader_medicin/apple.png" style="width: 120px; height: 120px; object-fit: contain; margin-bottom: 40px; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));" />
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; text-align: left;">
                    <!-- EN -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇬🇧 Engelsk (EN)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic;">"One apple per day keeps the physician away from the door."</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">apple</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">doctor/physician</span></p>
                    </div>
                    <!-- AR -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇸🇦 Arabisk (AR)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic; direction: rtl;">"تفاحة واحدة كل يوم تبعد الطبيب عن الباب"</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">tuffaha</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">tabib</span></p>
                    </div>
                    <!-- UR -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇵🇰 Urdu (UR)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic; direction: rtl;">"دن میں ایک سیب ڈاکٹر کو دروازے سے دور رکھتا ہے"</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">seb</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">doctor</span></p>
                    </div>
                    <!-- ZH -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇨🇳 Kinesisk (ZH)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic;">"一天一个苹果，医生远离大门。"</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">píngguǒ</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">yīshēng</span></p>
                    </div>
                    <!-- RO -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇷🇴 Rumænsk (RO)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic;">"Un măr pe zi ține medicul la distanță de ușă."</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">măr</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">medic</span></p>
                    </div>
                    <!-- VI -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇻🇳 Vietnamesisk (VI)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic;">"Một quả táo mỗi ngày giữ bác sĩ khỏi cửa nhà."</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">táo</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">bác sĩ</span></p>
                    </div>
                    <!-- PT -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇵🇹 Portugisisk (PT)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic;">"Uma maçã por dia mantém o médico longe da porta."</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">maçã</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">médico</span></p>
                    </div>
                    <!-- FA -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇮🇷 Persisk (FA)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic; direction: rtl;">"یک سیب در روز دکتر را از در دور نگه می‌دارد."</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">sib</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">doctor</span></p>
                    </div>
                    <!-- TH -->
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid #f472b6;">
                        <h4 style="margin: 0 0 10px 0; color: #be185d;">🇹🇭 Thai (TH)</h4>
                        <p style="margin: 0 0 10px 0; color: #334155; font-style: italic;">"แอปเปิ้ลหนึ่งผลต่อวันช่วยให้หมออยู่ห่างจากประตู"</p>
                        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 0.95rem;">${getTranslation('mader_medicin_s2_word_apple')} <span style="font-weight: normal; color: #64748b;">apple</span> &nbsp;|&nbsp; ${getTranslation('mader_medicin_s2_word_doctor')} <span style="font-weight: normal; color: #64748b;">mor</span></p>
                    </div>
                </div>
            </div>

            <!-- Interaktiv Sektion (Erstatter side 2 og 3) -->
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin-bottom: 60px;">
                <h3 style="margin-top: 0; color: #0f172a; text-align: center; font-size: 2rem;">${getTranslation('mader_medicin_s3_h3')}</h3>
                <p style="text-align: center; color: #64748b; margin-bottom: 30px; font-size: 1.1rem;">${getTranslation('mader_medicin_s3_p1')}</p>
                
                <div id="html-lang-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; margin-bottom: 30px;">
                    <!-- Buttons will be injected here -->
                </div>
                
                <div id="html-lang-details" style="display: none; background: #f8fafc; padding: 30px; border-radius: 12px; border-left: 6px solid var(--primary-color); box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <div style="font-size: 2.5rem; margin-bottom: 15px;" id="html-detail-icon"></div>
                    <h4 id="html-detail-title" style="margin: 0 0 15px 0; font-size: 1.5rem; color: #334155;"></h4>
                    <p style="margin: 0 0 5px 0; color: #0f172a; font-weight: bold; font-size: 1.1rem;">${getTranslation('mader_medicin_s3_literal')}</p>
                    <p id="html-detail-idiom" style="margin: 0 0 20px 0; color: #334155; font-style: italic; font-size: 1.1rem;"></p>
                    <p style="margin: 0 0 5px 0; color: #0f172a; font-weight: bold; font-size: 1.1rem;">${getTranslation('mader_medicin_s3_meaning_dk')}</p>
                    <p id="html-detail-dansk" style="margin: 0 0 20px 0; color: #334155; font-size: 1.1rem;"></p>
                    <p style="margin: 0 0 5px 0; color: #0f172a; font-weight: bold; font-size: 1.1rem;">${getTranslation('mader_medicin_s3_usage')}</p>
                    <div id="html-detail-brug" style="background: #e0f2fe; color: #0369a1; padding: 15px; border-radius: 8px; font-weight: 500; font-size: 1.1rem;"></div>
                </div>
            </div>

            <!-- SIDE 5: Forskellige ord -->
            <div style="background: #f0fdf4; border-radius: 20px; padding: 60px 40px; text-align: center; border: 1px solid #bbf7d0;">
                <h2 style="font-size: 2.5rem; color: #14532d; margin-bottom: 30px;">${getTranslation('mader_medicin_s5_h2')}</h2>
                <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 40px; flex-wrap: wrap;">
                    <img src="${baseUrl}images/mader_medicin/apple.png" style="width: 80px;" />
                    <img src="${baseUrl}images/mader_medicin/mouth.png" style="width: 80px;" />
                    <img src="${baseUrl}images/mader_medicin/radish.png" style="width: 80px;" />
                </div>
                <p style="font-size: 1.2rem; color: #166534; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                    ${getTranslation('mader_medicin_s5_p1')}
                </p>
            </div>
            
            <div style="height: 100px;"></div>
        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        navigateFn('home');
    });

    // Interactive logic
    const idioms = [
        { id: 'en', name: 'Engelsk', icon: '🍏', idiom: "An apple a day keeps the doctor away", dansk: "Et æble hver dag holder lægen væk.", brug: "Når frugt gør dig sund." },
        { id: 'ar', name: 'Arabisk', icon: '🩺', idiom: "Al-mi'dah bayt ad-da'...", dansk: "Maven er et hus for sygdom, og diæt er bedste medicin.", brug: "Når dårlig mad gør dig syg." },
        { id: 'ur', name: 'Urdu', icon: '🛡️', idiom: "Parhez ilaj se behtar hai", dansk: "At passe på maden er bedre end medicin.", brug: "Spis ikke usund mad." },
        { id: 'th', name: 'Thai', icon: '🧼', idiom: "Kin ron, chon klang, lang mue", dansk: "Spis varm mad, brug fælles ske, vask hænder.", brug: "En god regel, før I spiser." },
        { id: 'zh', name: 'Kinesisk', icon: '🥕', idiom: "Dōng chī luóbo xià chī jiāng...", dansk: "Spis radiser om vinteren og ingefær om sommeren.", brug: "Årstidens grøntsager er din medicin." },
        { id: 'ro', name: 'Rumænsk', icon: '👄', idiom: "Sănătatea intră pe gură", dansk: "Sundhed kommer ind gennem munden.", brug: "God mad giver en stærk krop." },
        { id: 'vi', name: 'Vietnamesisk', icon: '👄', idiom: "Bệnh từ miệng vào", dansk: "Sygdom kommer ind gennem munden.", brug: "Advarsel mod dårlig mad." },
        { id: 'pt', name: 'Portugisisk', icon: '👄', idiom: "A saúde entra pela boca", dansk: "Sundhed går ind gennem munden.", brug: "Sund mad giver godt helbred." },
        { id: 'fa', name: 'Persisk', icon: '🍽️', idiom: "Kam bokhor, hamishe bokhor", dansk: "Spis lidt, spis altid.", brug: "Det er sundt ikke at spise for meget." }
    ];
    
    const gridEl = document.getElementById('html-lang-grid');
    const detailsEl = document.getElementById('html-lang-details');
    
    idioms.forEach(item => {
        const btn = document.createElement('button');
        btn.innerHTML = `<span style="font-size: 1.5rem;">${item.icon}</span><br/><span style="font-weight: 600;">${item.name}</span>`;
        btn.style.cssText = "background: #f1f5f9; border: 2px solid #cbd5e1; padding: 15px 10px; border-radius: 12px; cursor: pointer; transition: all 0.2s;";
        
        btn.onmouseover = () => {
            btn.style.background = "#e2e8f0";
            btn.style.borderColor = "var(--primary-color)";
        };
        btn.onmouseout = () => {
            btn.style.background = "#f1f5f9";
            btn.style.borderColor = "#cbd5e1";
        };
        
        btn.onclick = () => {
            document.getElementById('html-detail-icon').textContent = item.icon;
            document.getElementById('html-detail-title').textContent = item.name + " (" + item.id.toUpperCase() + ")";
            document.getElementById('html-detail-idiom').textContent = '"' + item.idiom + '"';
            document.getElementById('html-detail-dansk').textContent = item.dansk;
            document.getElementById('html-detail-brug').textContent = "💡 " + item.brug;
            
            detailsEl.style.display = 'block';
            detailsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        gridEl.appendChild(btn);
    });
}


export function renderIdiomHjerterumHusrum(container, navigateFn) {
    container.innerHTML = `
        <div style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: 'Poppins', sans-serif;">
            <button id="back-btn" class="back-btn" style="margin-bottom: 30px; position: sticky; top: 20px; z-index: 100;">
                <i class="fas fa-arrow-left"></i> Tilbage
            </button>
            
            <!-- SIDE 1: Gæstfrihed er fleksibel -->
            <div style="background: #fff8eb; border-radius: 20px; padding: 60px 40px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 60px; position: relative; overflow: hidden; border-top: 10px solid #fbd38d;">
                <h1 style="font-size: 3rem; color: #7b341e; margin-bottom: 10px; letter-spacing: 1px;">${getTranslation('hjerterum_title') || 'Gæstfrihed er fleksibel'}</h1>
                <h2 style="font-size: 1.8rem; color: #9c4221; margin-bottom: 40px; font-style: italic;">${getTranslation('hjerterum_idiom') || 'Hvor der er hjerterum, er der husrum.'}</h2>
                
                <div style="font-size: 1.2rem; color: #4a5568; max-width: 600px; margin: 0 auto; line-height: 1.8; text-align: left; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                    <ul style="list-style-type: '❤️  '; padding-left: 20px;">
                        <li style="margin-bottom: 15px;">${getTranslation('hjerterum_li1') || 'Ægte gæstfrihed handler ikke om et stort hus.'}</li>
                        <li style="margin-bottom: 15px;">${getTranslation('hjerterum_li2') || 'Det handler om et åbent hjerte.'}</li>
                        <li>${getTranslation('hjerterum_li3') || 'Vi deler alle denne følelse – uanset hvor vi kommer fra.'}</li>
                    </ul>
                </div>
            </div>

            <!-- SIDE 2 & 3: Sprog interaktiv vælger -->
            <div style="background: white; border-radius: 20px; padding: 50px 30px; margin-bottom: 60px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 2px solid #e2e8f0;">
                <h2 style="font-size: 2.2rem; color: #2d3748; text-align: center; margin-bottom: 20px;">${getTranslation('hjerterum_world_title') || 'Hvordan siger man det ude i verden?'}</h2>
                <p style="text-align: center; color: #718096; margin-bottom: 40px;">${getTranslation('hjerterum_world_desc') || 'Tryk på et land for at se deres måde at sige det på.'}</p>
                
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 40px;" id="lang-buttons">
                    <!-- Buttons vil blive fyldt af JS -->
                </div>

                <div id="idiom-display" style="background: #f7fafc; padding: 40px; border-radius: 16px; text-align: center; display: none; min-height: 200px; display: flex; flex-direction: column; justify-content: center;">
                    <div id="idiom-flag" style="font-size: 3rem; margin-bottom: 15px;"></div>
                    <h3 id="idiom-original" style="font-size: 2rem; color: #2b6cb0; margin-bottom: 15px;"></h3>
                    <p id="idiom-danish" style="font-size: 1.3rem; color: #4a5568; font-style: italic;"></p>
                </div>
                <div id="idiom-placeholder" style="background: #f7fafc; padding: 40px; border-radius: 16px; text-align: center; min-height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <i class="fas fa-globe-americas" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 15px;"></i>
                    <p style="color: #a0aec0; font-size: 1.1rem;">${getTranslation('hjerterum_world_empty') || 'Vælg et sprog foroven'}</p>
                </div>
            </div>

            <!-- SIDE 4: Billeder på gæstfrihed -->
            <div style="background: #f0fdf4; border-radius: 20px; padding: 50px 30px; margin-bottom: 60px; text-align: center; border: 4px dashed #86efac;">
                <h2 style="font-size: 2.5rem; color: #166534; margin-bottom: 40px;">${getTranslation('hjerterum_images_title') || 'Billeder på Gæstfrihed'}</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                    <div style="background: white; padding: 30px 20px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
                        <img src="${baseUrl}images/hjerterum_husrum/house_heart.png" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 20px;" />
                        <h3 style="color: #b91c1c; margin-bottom: 10px;">Hjerte & Hus</h3>
                        <p style="color: #451a03; font-size: 1rem; margin-bottom: 15px;">Et lille, hyggeligt hus. Indeni er der et meget stort, varmt og rødt hjerte.</p>
                        <p style="color: #9ca3af; font-size: 0.85rem; font-style: italic;">(Brugt i bl.a. Kina, Rumænien, Urdu)</p>
                    </div>
                    
                    <div style="background: white; padding: 30px 20px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
                        <img src="${baseUrl}images/hjerterum_husrum/bowl.png" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 20px;" />
                        <h3 style="color: #1e3a8a; margin-bottom: 10px;">Maddeling</h3>
                        <p style="color: #451a03; font-size: 1rem; margin-bottom: 15px;">To spisepinde og en ekstra skål, der står klar til den uventede gæst.</p>
                        <p style="color: #9ca3af; font-size: 0.85rem; font-style: italic;">(Brugt i bl.a. Vietnam, Portugal)</p>
                    </div>

                    <div style="background: white; padding: 30px 20px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
                        <img src="${baseUrl}images/hjerterum_husrum/table.png" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 20px;" />
                        <h3 style="color: #78350f; margin-bottom: 10px;">Plads til alle</h3>
                        <p style="color: #451a03; font-size: 1rem; margin-bottom: 15px;">Et fuldt middagsbord. En person trækker en ekstra stol hen til bordet.</p>
                        <p style="color: #9ca3af; font-size: 0.85rem; font-style: italic;">(Brugt i bl.a. Engelsk, Dansk)</p>
                    </div>
                </div>
            </div>

            <!-- SIDE 5: Konklusion -->
            <div style="background: #faf5ff; border-radius: 20px; padding: 50px 40px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 60px;">
                <h2 style="font-size: 2.2rem; color: #6b46c1; margin-bottom: 30px;">Vi deler den samme erfaring</h2>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                    <p style="font-size: 1.2rem; color: #553c9a;">Uanset om vi...</p>
                    
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                        <span style="background: white; padding: 10px 20px; border-radius: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); color: #4a5568;"><i class="fas fa-utensils text-blue-500 mr-2"></i> dækker op med ekstra spisepinde</span>
                        <span style="background: white; padding: 10px 20px; border-radius: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); color: #4a5568;"><i class="fas fa-heart text-red-500 mr-2"></i> taler om det store hjerte</span>
                        <span style="background: white; padding: 10px 20px; border-radius: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); color: #4a5568;"><i class="fas fa-door-open text-yellow-600 mr-2"></i> inviterer gæster indenfor</span>
                    </div>

                    <h3 style="font-size: 1.6rem; color: #44337a; margin-top: 30px; line-height: 1.5; font-weight: bold;">
                        ... så deler vi alle den samme smukke sandhed:<br>
                        <span style="color: #805ad5;">Vores døre og hjerter er åbne for hinanden.</span>
                    </h3>
                </div>
            </div>

        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        navigateFn('talemaader_dashboard');
    });

    const idioms = [
        { lang: 'Engelsk', flag: '🇬🇧', original: 'Always room for one more', danish: 'Altid plads til en mere.' },
        { lang: 'Rumænsk', flag: '🇷🇴', original: 'Locul mic, inima mare', danish: 'Lille sted, stort hjerte.' },
        { lang: 'Urdu', flag: '🇵🇰', original: 'Dil bara hona chahiye, ghar nahi', danish: 'Hjertet skal være stort, ikke huset.' },
        { lang: 'Kinesisk', flag: '🇨🇳', original: 'Xīn kuān wū gèng kuān', danish: 'Et bredt hjerte skaber et bredt hus.' },
        { lang: 'Thai', flag: '🇹🇭', original: 'Khab thi yu dai, khab jai yu yak', danish: 'Et lille sted fungerer, et lille hjerte er svært.' },
        { lang: 'Vietnamesisk', flag: '🇻🇳', original: 'Thêm đũa thêm bát', danish: 'Ekstra pinde, ekstra skål.' },
        { lang: 'Portugisisk', flag: '🇵🇹', original: 'Onde comem dois, comem três', danish: 'Hvor to spiser, spiser tre.' },
        { lang: 'Farsi', flag: '🇮🇷', original: 'Mehman habib-e khoda-st', danish: 'Gæsten er Guds ven.' },
        { lang: 'Arabisk', flag: '🇸🇦', original: 'Al-bayt baytak', danish: 'Huset er dit hus.' }
    ];

    const btnContainer = document.getElementById('lang-buttons');
    const display = document.getElementById('idiom-display');
    const placeholder = document.getElementById('idiom-placeholder');
    const flagEl = document.getElementById('idiom-flag');
    const origEl = document.getElementById('idiom-original');
    const danishEl = document.getElementById('idiom-danish');

    idioms.forEach(item => {
        const btn = document.createElement('button');
        btn.innerHTML = `${item.flag} ${item.lang}`;
        btn.style.cssText = `
            padding: 10px 20px; border: none; border-radius: 30px; 
            background: white; color: #4a5568; font-weight: 600; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer;
            transition: all 0.2s;
        `;
        btn.addEventListener('mouseover', () => btn.style.transform = 'translateY(-2px)');
        btn.addEventListener('mouseout', () => btn.style.transform = 'translateY(0)');
        btn.addEventListener('click', () => {
            placeholder.style.display = 'none';
            display.style.display = 'flex';
            
            // simple animation
            display.style.opacity = '0';
            setTimeout(() => {
                flagEl.textContent = item.flag;
                origEl.textContent = `"${item.original}"`;
                danishEl.textContent = `Betyder: "${item.danish}"`;
                display.style.opacity = '1';
                display.style.transition = 'opacity 0.3s ease';
            }, 50);
        });
        btnContainer.appendChild(btn);
    });
}
