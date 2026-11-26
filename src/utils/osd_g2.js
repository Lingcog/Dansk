// Translations for Ordstilling – Sætningsdele (Zoom ind & Zoom ud) — Language Group 2:
// tr (Turkish), ar (Arabic), fa (Persian/Farsi), ku (Kurdish Sorani).
// Contains the exact same keys as OSD_DA.

export const OSD_G2 = {
    // ==========================================
    // Turkish (Türkçe)
    // ==========================================
    tr: {
        // Top bar & Header
        btn_try_write: 'Yazma yardımında kendin dene →',
        badge: 'Cümle dizilimi · Cümle ögeleri (Kamera: Yakınlaştır & Uzaklaştır)',
        title: 'Cümle ögeleri: Tek kelimeden zengin cümlelere',
        subtitle: 'Aynı cümle ögesinde daha fazla ayrıntı görmek için tek bir renkli parçaya <strong>yakınlaştırın</strong> — ve <strong>ön plan</strong> (ana bölüm) ile <strong>arka planı</strong> (neden, zaman, karşıtlık) içeren tüm resmi görmek için <strong>uzaklaştırın</strong>.',

        // Main Tabs
        tab_zoom_in: '1. Yakınlaştır (Parçayı genişlet)',
        tab_inside: '2. Parçanın içi',
        tab_zoom_out: '3. Uzaklaştır (Ön plan & arka plan)',
        tab_workshop: '4. Yakınlaştırma atölyesi (20 görev)',

        // Block labels
        lbl_p1_hvem: '1. Sıra (Kim?)',
        lbl_p1_hvem_som: '1. Sıra (Kim? + som-bölümü)',
        lbl_p2_handling: '2. Sıra (Eylem)',
        lbl_hvor: 'Nerede?',
        lbl_hvornaar: 'Ne zaman?',
        lbl_hvornaar_bg: 'Ne zaman? (Arka plan bölümü)',

        // Tab 1: Zoom ind
        t1_title: 'Tek bir soruya yakınlaştır — eylem 2. Sırada kalır',
        t1_track_hvem: 'Kim? (Yeşil · 1. Sıra)',
        t1_track_hvor: 'Nerede? (Mavi · Yer)',
        t1_track_hvornaar: 'Ne zaman? (Mor · Zaman)',
        t1_cam_zoom: 'Kamera yakınlaştırma:',
        t1_pick_step: 'Yakınlaştırma adımı seç:',
        t1_words: 'kelime',
        btn_listen_sent: 'Cümleyi dinle',
        btn_listen: 'Dinle',
        lbl_cam_insight: 'Kamera içgörüsü:',

        t1_hvem_1: 'Cümle diziliminden temel görüntü: 1. Sırada 1 basit yeşil parça — ve "cykler" eylemi 2. Sırada durur.',
        t1_hvem_2: 'Kamera yakınlaşıyor: Önüne betimleyici bir kelime koyuyoruz ("smilende"). Tüm yeşil parça hâlâ yalnızca 1. Sıradır!',
        t1_hvem_3: 'Arkasından daha da fazla ayrıntı ("med orange hue og blå jakke"). Artık 1. Sıra 9 kelimedir — ama "cykler" hâlâ sabit olarak 2. Sırada durur!',
        t1_hvem_4: 'Maksimum yakınlaştırma: Tüm bir "som" bölümü yeşil parçanın içinde yaşar! Hepsi hâlâ 1. Sıra sayılır ve "cykler" virgülden hemen sonra gelir.',

        t1_hvor_1: 'Yer temel biçiminde yalnızca 2 kelimedir: "på gaden".',
        t1_hvor_2: 'Yere yakınlaşıyoruz: Küçük "på" kelimesinin yanına daha kesin bir yer geliyor ("den sneklædte cykelsti").',
        t1_hvor_3: 'Tüm mavi parça şu anda bütün bir sokak manzarası çizse de hâlâ tek bir soruyu — "Nerede?" — yanıtlar.',

        t1_hvornaar_1: 'Basit bir zaman ifadesi: "om morgenen".',
        t1_hvornaar_2: 'Zaman parçası daha fazla ayrıntıyla büyür — ve tüm mor parçayı 1. Sıraya taşırsanız, "cykler" hemen arkasından gelir!',
        t1_hvornaar_3: 'Burada zaman parçası tam bir arka plan bölümüne dönüşür! Bu doğrudan 3. Sekmeye (Uzaklaştır: Ön plan ve arka plan) götürür.',

        // Tab 2: Inde i brikken
        t2_title: 'En önemli 3 parçanın içi',
        t2_intro: 'Her cümle ögesinin içinde kendi basit yapı kalıbı vardır — ancak dışarıdan bakıldığında cümlede hâlâ <strong>tek bir bütün parça</strong> olarak işlev görür.',
        t2_c1_title: '1. Kim/Ne parçası',
        t2_c1_desc: 'Bir çekirdek (<strong>kvinde</strong>) hem <em>önüne</em> hem <em>arkasına</em> ayrıntılar alabilir. Katmanları açıp kapatın:',
        t2_c1_before: '+ Ön ayrıntı',
        t2_c1_after: '+ Sonra ayrıntı',
        t2_c1_rel: '+ som-bölümü',
        t2_c2_title: '2. Eylem parçası (1 veya 2 fiil)',
        t2_c2_desc: 'İki fiille (örneğin <em>vil + cykle</em> veya <em>har + cyklet</em>) parça kişinin etrafında bir çerçeve gibi açılır:',
        t2_c2_1word: '1 kelime',
        t2_c2_2words: '2 kelime (çerçeve)',
        t2_c2_foot: 'İlk eylem kelimesi her zaman sabit olarak 2. Sırada durur — ikincisi cümlenin ilerisinde çerçeveyi kapatır.',
        t2_c3_title: '3. Çerçeve parçası (3 boyut)',
        t2_c3_desc: 'Aynı soru — örneğin <strong>Neden?</strong> veya <strong>Ne zaman?</strong> — üç boyutta yanıtlanabilir:',
        t2_c3_s1: '1 KELİME',
        t2_c3_s2: 'KÜÇÜK KELİME GRUBU',
        t2_c3_s3: 'TAM ARKA PLAN BÖLÜMÜ',

        // Tab 3: Zoom ud
        t3_title: 'Uzaklaştır: Keskin ön plan + etrafındaki arka plan',
        t3_cam_badge: 'Kamera uzaklaştırıldı · Kadın + çevresi',
        t3_bg_first_on: 'Arka plan en önde (1. Sıra · 2. Sıra!)',
        t3_bg_first_off: 'Arka planı 1. Sıraya taşı',
        t3_ikke_hide: '"ikke" kuralını gizle',
        t3_ikke_show: 'Arka planda "ikke" kuralını göster',
        t3_p1_prefix: '1. Sıra ·',
        t3_p2_prefix: '2. Sıra ·',
        t3_ikke_fg: 'ÖN PLAN (ANA BÖLÜM): EYLEM + IKKE',
        t3_ikke_bg: 'ARKA PLAN: IKKE + EYLEM',
        t3_btn_bridge: 'Bu kalıbı Yazma yardımında kullan →',

        t3_fg_label: 'Ön plan (Ana bölüm)',
        t3_fordi_q: 'Neden?',
        t3_fordi_bg: 'Arka plan · Neden (fordi)',
        t3_fordi_tip: 'Arka plan ("Fordi det sner og er koldt i dag,") 1. Sırada durduğunda, tüm arka plan bölümü tek bir büyük parça sayılır — bu nedenle "har" eylemi hemen 2. Sırada yer alır!',
        t3_selvom_q: 'Karşıtlık?',
        t3_selvom_bg: 'Arka plan · Karşıtlık (selvom)',
        t3_selvom_tip: '"ikke" sözcüğüne dikkat edin: Ön planda "ikke" eylemden sonra gelir ("er ikke"), ancak "selvom" sonrasındaki arka planın içinde "ikke" eylemin önüne geçer ("ikke er").',
        t3_mens_q: 'Ne zaman?',
        t3_mens_bg: 'Arka plan · Eşzamanlı (mens)',
        t3_mens_tip: '"mens" ile arka plan şehirde onun etrafında neler olduğunu gösterir. Arka plan en başa taşınırsa, "kører" eylemi doğrudan virgülden sonra gelir.',
        t3_hvis_q: 'Koşul?',
        t3_hvis_bg: 'Arka plan · Koşul (hvis)',
        t3_hvis_tip: 'Koşul ("Hvis sneen ikke stopper snart,") tüm cümle için çerçeveyi kurar — ve arka planın içinde "ikke", "stopper" kelimesinin önünde durur.',

        // Tab 4: Workshop UI
        t4_track_1: '1. Yakınlaştır · Tek parçayı genişlet ({n})',
        t4_track_2: '2. Uzaklaştır · Cümle ögelerini taşı ({n})',
        t4_track_3: '3. Hızlı test ({n})',
        t4_task_of: 'Görev {a} / {b}',
        t4_first_try_score: 'İlk deneme puanı:',
        t4_score: 'Puan:',
        t4_build_here: 'Burada kur · {label} (kaldırmak için yerleştirilen bir parçaya tıklayın)',
        t4_drop_placeholder: 'Aşağıdaki renkli parçalara doğru sırayla tıklayın...',
        t4_btn_check: 'Cevabı kontrol et',
        t4_btn_clear: 'Temizle',
        t4_btn_next: 'Sonraki görev →',
        t4_btn_listen_correct: 'Doğru cevabı dinle',
        t4_btn_retry: 'Tekrar dene',
        t4_btn_retry_track: 'Bu bölümü tekrar çalış',
        t4_btn_to_t2: '2. Uzaklaştırmaya geç →',
        t4_btn_to_t3: '3. Hızlı teste geç →',
        t4_done_zi_title: 'Yakınlaştırma atölyesi tamamlandı',
        t4_done_zo_title: 'Uzaklaştırma atölyesi tamamlandı',
        t4_done_build_desc: 'İlk denemede <strong style="color:#4ade80;">{b} görevden {a}</strong> tanesini doğru çözdünüz.',
        t4_done_quiz_title: 'Hızlı test tamamlandı',
        t4_done_quiz_desc: '<strong style="color:#4ade80;">{b} sorudan {a}</strong> doğru yaptınız.',
        t4_ok_lead: 'Harika kuruldu!',
        t4_wrong_lead: 'Henüz tam değil.',
        t4_missing_bricks: 'Yukarıdaki alanda hâlâ eksik parçalar var — kalanları eklemeyi deneyin.',
        t4_quiz_ok: 'Doğru!',
        t4_quiz_see: 'Yapıyı görün:',

        // Del 1: Zoom ind tasks (zi1..zi6)
        zi1_tag: 'Kim? parçası · Ön + Çekirdek + Sonra',
        zi1_instr: 'Parçaları eylemin önüne doğru sırayla koyarak yeşil 1. Sıra parçasını genişletin:',
        zi1_target: '1. Sıra (Kim?)',
        zi1_wrong: '"Den" + betimleme ("smilende") + çekirdek ("kvinde") ile başlayın ve en sona ek ayrıntıyı ("med den orange hue") koyun.',
        zi1_expl: 'Genişletilmiş bir Kim? parçası şöyle kurulur: küçük kelime ("Den") + betimleme ("smilende") + çekirdek ("kvinde") + ek ayrıntı ("med den orange hue"). Hepsi yalnızca 1. Sırayı doldurur!',

        zi2_tag: 'Kim? parçası + som-bölümü (Tuzak parçaya dikkat!)',
        zi2_instr: 'İçinde bir "som" bölümü olan tüm 1. Sıra parçasını kurun — ve eylemi 2. Sıraya koyun:',
        zi2_target: '1. Sıra + 2. Sıra',
        zi2_decoy: 'Dikkat: bir tuzak parça DAHİL EDİLMEMELİDİR.',
        zi2_wrong: 'Tüm "Kvinden, som ..." kısmı 1. Sıradır — eylemi ("cykler") doğrudan 2. Sıraya koyun ve tuzak parçayı dışarıda bırakın!',
        zi2_expl: 'Tüm "Kvinden, som har en papirpose i kurven," kısmı 1. Sıradır. "cykler" eyleminden önce fazladan bir "hun" sızmamalıdır!',

        zi3_tag: 'Nerede? parçası · Ayrıntılı yer',
        zi3_instr: 'Yere ("Nerede?") yakınlaşın ve "En kvinde cykler" ifadesinden sonra tüm mavi parçayı kurun:',
        zi3_target: 'Nerede? (Yer parçası)',
        zi3_wrong: 'Yer parçasına küçük yer sözcüğü ("på") ile başlayın, ardından yerin kendisini ve en sona ek ayrıntıyı ("foran...") koyun.',
        zi3_expl: 'Mavi yer parçası küçük yer sözcüğü ("på") ile başlar, ardından yerin kendisi ("den sneklædte cykelsti") ve en sonda ek netleştirme ("foran den varme café") gelir.',

        zi4_tag: 'Eylem parçası · Çerçeve olarak 2 fiil',
        zi4_instr: '"Om morgenen" (1. Sıra) ile başlayın ve iki kırmızı eylem kelimesini kişinin etrafına doğru yerleştirin:',
        zi4_target: '2. Sıra + Kişi + Eylemin geri kalanı',
        zi4_wrong: 'İlk kırmızı eylem kelimesini ("vil") 2. Sıraya koyun, ardından kişiyi ("hun") + küçük kelimeyi ("gerne") getirin — ve çerçeveyi "cykle" ile kapatın.',
        zi4_expl: 'Eylemde iki fiil olduğunda, ilki ("vil") 2. Sırada durur; ikincisi ("cykle") ise kişiden ve küçük kelimeden ("hun gerne") sonra çerçeveyi kapatır.',

        zi5_tag: 'Ne? parçası · Ön + Çekirdek + Sonra',
        zi5_instr: 'Yanında taşıdığı şeyi ("Ne?") tüm ayrıntıları doğru sıraya koyarak genişletin:',
        zi5_target: 'Ne? parçası',
        zi5_wrong: 'Ne? parçasını önde betimleme ("en varm") + çekirdek ("kop kaffe") + arkada yer ayrıntıları ("fra..." + "på...") ile kurun.',
        zi5_expl: 'Ne? parçası çekirdekten ("kop kaffe") büyür: önde betimleme ("en varm") ve arkada yer ayrıntıları ("fra den lille café på hjørnet").',

        zi6_tag: '1. Sırada neden parçası (V2)',
        zi6_instr: 'Tüm neden parçasını ("På grund af...") 1. Sırada kurun ve eylemi 2. Sıraya koyun:',
        zi6_target: '1. Sıra (Neden) + 2. Sıra (Eylem)',
        zi6_wrong: 'Tüm neden parçasını ("På grund af" + "den kolde sne") 1. Sırada kurun — böylece kırmızı eylem kelimesi ("tager") "hun" kelimesinden önce 2. Sıraya gelir.',
        zi6_expl: 'Tüm "På grund af den kolde sne" neden parçası 1. Sıra sayılır — bu nedenle "tager" eylemi hemen "hun" kelimesinden önce 2. Sırada gelir.',

        // Del 2: Zoom ud tasks (zo1..zo6)
        zo1_tag: 'Arka planı en öne taşı (fordi + 2. Sıra)',
        zo1_instr: '1. Sırada arka planla ("Fordi det sner i dag,") başlayın — ve ön planı doğru sırayla kurun:',
        zo1_target: 'Arka plan (1. Sıra) + Ön plan (2. Sıra)',
        zo1_wrong: 'Arka planı ("Fordi det sner i dag,") 1. Sıraya koyun — böylece kırmızı eylem kelimesi ("tager") "kvinden" kelimesinden önce 2. Sıraya gelir.',
        zo1_expl: 'Tüm "Fordi det sner i dag," arka planı 1. Sırayı doldurur. Bu nedenle "tager" eylemi virgülden hemen sonra 2. Sıraya fırlar!',

        zo2_tag: 'Arka planın içinde "ikke" (fordi + ikke)',
        zo2_instr: '"Hun cykler på cykelstien," sonrasında arka plan bölümünü kurun — arka planda "ikke" kelimesinin nerede durduğunu unutmayın:',
        zo2_target: '"ikke" içeren arka plan',
        zo2_wrong: '"fordi" + kişi ("hun") ile başlayın — ve arka planda "ikke" kelimesinin eylemin ("vil" + "tage bussen") ÖNÜNDE durduğunu unutmayın!',
        zo2_expl: 'Arka planın içinde "ikke" her zaman eylemin ÖNÜNE sızar: "fordi hun ikke vil tage bussen".',

        zo3_tag: 'Karşıtlık en önde (selvom + ikke + 2. Sıra)',
        zo3_instr: 'İki kuralı birleştirin: arka planda eylemin önünde "ikke" VE ön planda 2. Sırada eylem:',
        zo3_target: 'Arka plan (selvom + ikke) + Ön plan (2. Sıra)',
        zo3_wrong: 'Arka planı "Selvom det ikke er varmt," ("ikke", "er varmt," öncesinde) olarak kurun ve ardından "hun gennem byen" öncesinde "cykler" kelimesini 2. Sıraya koyun.',
        zo3_expl: 'Arka planda "ikke" eylemin önünde durur ("ikke er varmt"), virgülden sonraki ön planda ise önce eylem gelir ("cykler hun").',

        zo4_tag: '1. Sırada arka plan olarak zaman (mens + 2. Sıra)',
        zo4_instr: 'Sahneyi çerçevelemek için arka planı en öne koyun ve virgülden sonra ön planı doğru kurun:',
        zo4_target: 'Arka plan (1. Sıra) + Ön plan (2. Sıra)',
        zo4_wrong: 'Arka planı ("Mens kvinden cykler forbi,") 1. Sıraya koyun — böylece "kører" kelimesi "den grønne bus" ve "forbi caféen" öncesinde 2. Sıraya gelir.',
        zo4_expl: 'Arka plan ("Mens kvinden cykler forbi,") 1. Sırada tek parça sayılır, bu yüzden "kører" eylemi doğrudan 2. Sıraya gelir.',

        zo5_tag: '"ikke" içeren koşul (hvis + ikke + 2. Sıra)',
        zo5_instr: '"hvis" en önde olacak şekilde tüm koşul cümlesini kurun — hem eylemden önce "ikke" hem de virgülden sonra 2. Sıra kuralını hatırlayın:',
        zo5_target: 'Koşul (1. Sıra) + Ön plan (2. Sıra)',
        zo5_wrong: '"Hvis sneen ikke stopper snart," ("ikke", "stopper" öncesinde) ile başlayın ve ardından "hun ind på caféen" öncesinde "går" kelimesini 2. Sıraya koyun.',
        zo5_expl: 'Mükemmel uzun cümle: hvis bölümünün içinde "stopper" önünde "ikke" ve virgülden hemen sonra "går hun".',

        zo6_tag: 'Çift yakınlaştırma · Büyük Kim? parçası + arka plan',
        zo6_instr: 'Hem 1. Sıranın yakınlaştırıldığı HEM DE arka planın nedeni açıkladığı zengin bir cümle kurun:',
        zo6_target: 'Genişletilmiş Ön plan + Arka plan (fordi)',
        zo6_wrong: 'Ön planla ("Den smilende kvinde på cyklen" + "skynder sig,") başlayın ve ardından arka planı kurun: "fordi det allerede sner kraftigt" ("allerede", "sner" öncesinde).',
        zo6_expl: 'Burada iki kamera tekniğini de kullanıyorsunuz: ön planda genişletilmiş yeşil bir Kim? parçası + küçük "allerede" kelimesinin "sner" eyleminin önünde durduğu bir arka plan bölümü!',

        // Del 3: Hurtig-quiz (q1..q8)
        q1_type: 'Yakınlaştır · 1. Sıra & 2. Sıra',
        q1_prompt: '"En kvinde" → "Den smilende kvinde med orange hue" üzerine yakınlaştırıyorsunuz. Hangi cümlede eylem 2. Sırada?',
        q1_expl: 'Tüm genişletilmiş yeşil parça ("Den smilende kvinde med orange hue") 1. Sıradır — ve "cykler" eylemi hemen arkasından 2. Sırada bir bütün olarak durur.',

        q2_type: 'Yakınlaştır · 1. Sırada som-bölümü',
        q2_prompt: '1. Sıranın içine bir "som" bölümü yerleştiriyoruz. "cykler" eylemi nerede durmalıdır?',
        q2_expl: 'Tüm "Kvinden, som har en papirpose i kurven," kısmı hâlâ tek bir bütün 1. Sıra parçasıdır. Fazladan bir "hun" gerekmez — "cykler" eylemi doğrudan virgülden sonra gelir.',

        q3_type: 'Yakınlaştır · Çerçeve olarak 2 eylem kelimesi',
        q3_prompt: 'Eylem parçasında iki fiil ("vil" + "cykle") olduğunda ve cümle "Om morgenen" ile başladığında, parçalar nerede durur?',
        q3_expl: 'İlk fiil ("vil") sabit olarak 2. Sırada durur, ikincisi ("cykle") ise cümlenin ilerisinde çerçeveyi kapatır.',

        q4_type: 'Uzaklaştır · Arka plan başta (2. Sıra)',
        q4_prompt: 'Arka planı ("Fordi det sner kraftigt") cümlenin en başına taşıyorsunuz. Virgülden hemen sonra ne gelir?',
        q4_expl: 'Tüm "Fordi det sner kraftigt" arka planı tek bir bütün 1. Sıra parçası gibi işlev görür — böylece ön planın eylemi ("tager") 2. Sırada durur!',

        q5_type: 'Uzaklaştır · Arka planda "ikke"',
        q5_prompt: '"fordi" sonrasındaki arka plan parçasının içinde "ikke" nerede durur?',
        q5_expl: 'Bir arka plan bölümünün içinde "ikke" her zaman eylemin ÖNÜNE sızar: "fordi hun ikke vil...".',

        q6_type: 'Uzaklaştır · "selvom" ile karşıtlık',
        q6_prompt: 'Hem 2. Sıranın hem de "ikke" kuralının tamamen doğru olduğu cümleyi seçin:',
        q6_expl: 'Arka planda "ikke" eylemin önünde durur ("ikke er"), virgülden sonraki ön planda ise önce eylem gelir ("cykler hun").',

        q7_type: 'Uzaklaştır · "hvis" ile koşul',
        q7_prompt: '1. Sıraya bir koşul koyuyoruz. Hangi cümle doğru Dancadır?',
        q7_expl: 'Arka planda eylemden önce "ikke" vardır ("ikke stopper") ve ön plan 2. Sırada eylemle ("går hun") başlar.',

        q8_type: 'Yakınlaştır · Aynı soruda boyut',
        q8_prompt: 'Bu ikisinden hangisi "Neden?" sorusunu tam bir arka plan bölümüyle (kendi eylemiyle) yanıtlar?',
        q8_expl: '"På grund af sneen" fiilsiz daha kısa bir parçadır, "Fordi det sner og er glat på vejen" ise kendi eylemine ("sner / er") sahip tam bir arka plan bölümüdür.'
    },

    // ==========================================
    // Arabic (العربية)
    // ==========================================
    ar: {
        // Top bar & Header
        btn_try_write: 'جرّب بنفسك في مساعدة الكتابة ←',
        badge: 'ترتيب الكلمات · أجزاء الجملة (الكاميرا: تقريب وإبعاد)',
        title: 'أجزاء الجملة: من كلمة مفردة إلى جمل غنية',
        subtitle: '<strong>قرّب العدسة</strong> على قطعة ملونة واحدة للحصول على تفاصيل أكثر في نفس جزء الجملة — و<strong>أبعِد العدسة</strong> لرؤية الصورة الكاملة مع <strong>المقدمة</strong> (الجزء الرئيسي) و<strong>الخلفية</strong> (السبب، الزمن، التعارض).',

        // Main Tabs
        tab_zoom_in: '1. تقريب (توسيع القطعة)',
        tab_inside: '2. داخل القطعة',
        tab_zoom_out: '3. إبعاد (المقدمة والخلفية)',
        tab_workshop: '4. ورشة التقريب (20 مهمة)',

        // Block labels
        lbl_p1_hvem: 'الخانة 1 (مَن؟)',
        lbl_p1_hvem_som: 'الخانة 1 (مَن؟ + جزء som)',
        lbl_p2_handling: 'الخانة 2 (الفعل)',
        lbl_hvor: 'أين؟',
        lbl_hvornaar: 'متى؟',
        lbl_hvornaar_bg: 'متى؟ (جزء الخلفية)',

        // Tab 1: Zoom ind
        t1_title: 'قرّب على سؤال واحد — ويبقى الفعل في الخانة 2',
        t1_track_hvem: 'مَن؟ (أخضر · الخانة 1)',
        t1_track_hvor: 'أين؟ (أزرق · المكان)',
        t1_track_hvornaar: 'متى؟ (بنفسجي · الزمن)',
        t1_cam_zoom: 'تقريب الكاميرا:',
        t1_pick_step: 'اختر درجة التقريب:',
        t1_words: 'كلمات',
        btn_listen_sent: 'استمع إلى الجملة',
        btn_listen: 'استمع',
        lbl_cam_insight: 'ملاحظة الكاميرا:',

        t1_hvem_1: 'الصورة الأساسية من ترتيب الكلمات: قطعة خضراء بسيطة واحدة في الخانة 1 — والفعل "cykler" يقف في الخانة 2.',
        t1_hvem_2: 'الكاميرا تقرّب: نضع كلمة وصفية في الأمام ("smilende"). القطعة الخضراء كلها لا تزال الخانة 1 فقط!',
        t1_hvem_3: 'تفاصيل أكثر بعدها ("med orange hue og blå jakke"). الآن الخانة 1 فيها 9 كلمات — لكن "cykler" لا يزال ثابتًا في الخانة 2!',
        t1_hvem_4: 'أقصى تقريب: جزء كامل بـ "som" يسكن داخل القطعة الخضراء! كل ذلك لا يزال يُحسب كالخانة 1، ويأتي "cykler" مباشرة بعد الفاصلة.',

        t1_hvor_1: 'المكان في صورته الأساسية كلمتان فقط: "på gaden".',
        t1_hvor_2: 'نقرّب على المكان: الكلمة الصغيرة "på" يرافقها مكان أدق ("den sneklædte cykelsti").',
        t1_hvor_3: 'القطعة الزرقاء كلها لا تزال تجيب عن سؤال واحد فقط — "أين؟" — رغم أنها ترسم الآن مشهد شارع كامل.',

        t1_hvornaar_1: 'تعبير زمني بسيط: "om morgenen".',
        t1_hvornaar_2: 'قطعة الزمن تكبر بتفاصيل أكثر — وإذا نقلت القطعة البنفسجية كلها إلى الخانة 1، يأتي "cykler" مباشرة بعدها!',
        t1_hvornaar_3: 'هنا تتحول قطعة الزمن إلى جزء خلفية كامل! وهذا يقود مباشرة إلى التبويب 3 (إبعاد: المقدمة والخلفية).',

        // Tab 2: Inde i brikken
        t2_title: 'داخل أهم 3 قطع',
        t2_intro: 'لكل جزء جملة نمط بناء بسيط خاص به من الداخل — لكنه من الخارج يعمل دائمًا كـ <strong>قطعة واحدة موحّدة</strong> في الجملة.',
        t2_c1_title: '1. قطعة مَن/ماذا',
        t2_c1_desc: 'يمكن للنواة (<strong>kvinde</strong>) أن تحصل على تفاصيل <em>قبلها</em> و<em>بعدها</em>. شغّل الطبقات أو أطفئها:',
        t2_c1_before: '+ تفصيل قبل',
        t2_c1_after: '+ تفصيل بعد',
        t2_c1_rel: '+ جزء som',
        t2_c2_title: '2. قطعة الفعل (فعل واحد أو فعلان)',
        t2_c2_desc: 'مع فعلين (مثلًا <em>vil + cykle</em> أو <em>har + cyklet</em>) تنفتح القطعة كإطار حول الشخص:',
        t2_c2_1word: 'كلمة واحدة',
        t2_c2_2words: 'كلمتان (إطار)',
        t2_c2_foot: 'كلمة الفعل الأولى تقف دائمًا بثبات في الخانة 2 — والثانية تغلق الإطار لاحقًا في الجملة.',
        t2_c3_title: '3. قطعة الإطار (3 أحجام)',
        t2_c3_desc: 'السؤال نفسه — مثلًا <strong>لماذا؟</strong> أو <strong>متى؟</strong> — يمكن الإجابة عنه بثلاثة أحجام:',
        t2_c3_s1: 'كلمة واحدة',
        t2_c3_s2: 'مجموعة كلمات صغيرة',
        t2_c3_s3: 'جزء خلفية كامل',

        // Tab 3: Zoom ud
        t3_title: 'إبعاد: مقدمة واضحة + خلفية من حولها',
        t3_cam_badge: 'الكاميرا مُبعَدة · المرأة + محيطها',
        t3_bg_first_on: 'الخلفية في المقدمة (الخانة 1 · الخانة 2!)',
        t3_bg_first_off: 'انقل الخلفية إلى الخانة 1',
        t3_ikke_hide: 'إخفاء قاعدة "ikke"',
        t3_ikke_show: 'إظهار قاعدة "ikke" في الخلفية',
        t3_p1_prefix: 'الخانة 1 ·',
        t3_p2_prefix: 'الخانة 2 ·',
        t3_ikke_fg: 'المقدمة (الجزء الرئيسي): الفعل + IKKE',
        t3_ikke_bg: 'الخلفية: IKKE + الفعل',
        t3_btn_bridge: 'استخدم النمط في مساعدة الكتابة ←',

        t3_fg_label: 'المقدمة (الجزء الرئيسي)',
        t3_fordi_q: 'لماذا؟',
        t3_fordi_bg: 'الخلفية · السبب (fordi)',
        t3_fordi_tip: 'عندما تقف الخلفية ("Fordi det sner og er koldt i dag,") في الخانة 1، يُحسب جزء الخلفية كله كقطعة كبيرة واحدة — لذلك يقف الفعل "har" فورًا في الخانة 2!',
        t3_selvom_q: 'تعارض؟',
        t3_selvom_bg: 'الخلفية · التعارض (selvom)',
        t3_selvom_tip: 'انتبه لكلمة "ikke": في المقدمة تأتي "ikke" بعد الفعل ("er ikke")، لكن داخل الخلفية بعد "selvom" تنتقل "ikke" إلى ما قبل الفعل ("ikke er").',
        t3_mens_q: 'متى؟',
        t3_mens_bg: 'الخلفية · في الوقت نفسه (mens)',
        t3_mens_tip: 'مع "mens" تُظهر الخلفية ما يحدث حولها في المدينة. وإذا نُقلت الخلفية إلى البداية، يأتي الفعل "kører" مباشرة بعد الفاصلة.',
        t3_hvis_q: 'شرط؟',
        t3_hvis_bg: 'الخلفية · الشرط (hvis)',
        t3_hvis_tip: 'الشرط ("Hvis sneen ikke stopper snart,") يضع الإطار للجملة كلها — وداخل الخلفية تقف "ikke" قبل "stopper".',

        // Tab 4: Workshop UI
        t4_track_1: '1. تقريب · وسّع قطعة واحدة ({n})',
        t4_track_2: '2. إبعاد · انقل أجزاء الجملة ({n})',
        t4_track_3: '3. اختبار سريع ({n})',
        t4_task_of: 'المهمة {a} من {b}',
        t4_first_try_score: 'نقاط المحاولة الأولى:',
        t4_score: 'النتيجة:',
        t4_build_here: 'ابنِ هنا · {label} (انقر على قطعة موضوعة لإزالتها)',
        t4_drop_placeholder: 'انقر على القطع الملونة أدناه بالترتيب الصحيح...',
        t4_btn_check: 'تحقق من الإجابة',
        t4_btn_clear: 'مسح',
        t4_btn_next: 'المهمة التالية ←',
        t4_btn_listen_correct: 'استمع إلى الإجابة الصحيحة',
        t4_btn_retry: 'حاول مجددًا',
        t4_btn_retry_track: 'تدرّب على هذا المسار مجددًا',
        t4_btn_to_t2: 'المتابعة إلى 2. إبعاد ←',
        t4_btn_to_t3: 'المتابعة إلى 3. اختبار سريع ←',
        t4_done_zi_title: 'اكتملت ورشة التقريب',
        t4_done_zo_title: 'اكتملت ورشة الإبعاد',
        t4_done_build_desc: 'حللت <strong style="color:#4ade80;">{a} من {b}</strong> مهام بشكل صحيح من المحاولة الأولى.',
        t4_done_quiz_title: 'اكتمل الاختبار السريع',
        t4_done_quiz_desc: 'حصلت على <strong style="color:#4ade80;">{a} من {b}</strong> إجابات صحيحة.',
        t4_ok_lead: 'بناء رائع!',
        t4_wrong_lead: 'ليس تمامًا بعد.',
        t4_missing_bricks: 'لا تزال تنقصك قطع في الحقل أعلاه — جرّب إضافة البقية.',
        t4_quiz_ok: 'صحيح!',
        t4_quiz_see: 'انظر إلى البنية:',

        // Del 1: Zoom ind tasks (zi1..zi6)
        zi1_tag: 'قطعة مَن؟ · قبل + النواة + بعد',
        zi1_instr: 'وسّع القطعة الخضراء للخانة 1 بوضع الأجزاء بالترتيب الصحيح قبل الفعل:',
        zi1_target: 'الخانة 1 (مَن؟)',
        zi1_wrong: 'ابدأ بـ "Den" + الوصف ("smilende") + النواة ("kvinde") + التفصيل الإضافي ("med den orange hue") في النهاية.',
        zi1_expl: 'تُبنى قطعة مَن؟ الموسّعة هكذا: كلمة صغيرة ("Den") + وصف ("smilende") + نواة ("kvinde") + تفصيل إضافي ("med den orange hue"). كل ذلك يملأ الخانة 1 فقط!',

        zi2_tag: 'قطعة مَن؟ + جزء som (احذر القطعة الخادعة!)',
        zi2_instr: 'ابنِ قطعة الخانة 1 كاملة مع جزء "som" بداخلها — وضع الفعل في الخانة 2:',
        zi2_target: 'الخانة 1 + الخانة 2',
        zi2_decoy: 'انتبه: هناك قطعة خادعة واحدة يجب ألا تدخل.',
        zi2_wrong: 'كل "Kvinden, som ..." هي الخانة 1 — ضع الفعل ("cykler") مباشرة في الخانة 2 واترك القطعة الخادعة!',
        zi2_expl: 'كل "Kvinden, som har en papirpose i kurven," هي الخانة 1. لا يجوز أن تتسلل كلمة "hun" إضافية قبل الفعل "cykler"!',

        zi3_tag: 'قطعة أين؟ · مكان مع تفاصيل',
        zi3_instr: 'قرّب على المكان ("أين؟") وابنِ القطعة الزرقاء كاملة بعد "En kvinde cykler":',
        zi3_target: 'أين؟ (قطعة المكان)',
        zi3_wrong: 'ابدأ قطعة المكان بكلمة المكان الصغيرة ("på")، ثم المكان نفسه، وأخيرًا التفصيل الإضافي ("foran...").',
        zi3_expl: 'تبدأ قطعة المكان الزرقاء بكلمة المكان الصغيرة ("på")، ثم المكان نفسه ("den sneklædte cykelsti")، وأخيرًا التحديد الإضافي ("foran den varme café").',

        zi4_tag: 'قطعة الفعل · فعلان كإطار',
        zi4_instr: 'ابدأ بـ "Om morgenen" (الخانة 1) وضع كلمتي الفعل الحمراوين بشكل صحيح حول الشخص:',
        zi4_target: 'الخانة 2 + الشخص + بقية الفعل',
        zi4_wrong: 'ضع كلمة الفعل الحمراء الأولى ("vil") في الخانة 2، ثم الشخص ("hun") + الكلمة الصغيرة ("gerne") — وأغلق الإطار بـ "cykle".',
        zi4_expl: 'عندما يحتوي الفعل على فعلين، يقف الأول ("vil") في الخانة 2، بينما يغلق الثاني ("cykle") الإطار بعد الشخص والكلمة الصغيرة ("hun gerne").',

        zi5_tag: 'قطعة ماذا؟ · قبل + النواة + بعد',
        zi5_instr: 'وسّع ما تحمله معها ("ماذا؟") بكل التفاصيل بالترتيب الصحيح:',
        zi5_target: 'قطعة ماذا؟',
        zi5_wrong: 'ابنِ قطعة ماذا؟ بالوصف في الأمام ("en varm") + النواة ("kop kaffe") + تفاصيل المكان في الخلف ("fra..." + "på...").',
        zi5_expl: 'تنمو قطعة ماذا؟ من النواة ("kop kaffe") مع وصف في الأمام ("en varm") وتفاصيل مكان في الخلف ("fra den lille café på hjørnet").',

        zi6_tag: 'قطعة سبب في الخانة 1 (V2)',
        zi6_instr: 'ابنِ قطعة السبب كاملة ("På grund af...") في الخانة 1، وضع الفعل في الخانة 2:',
        zi6_target: 'الخانة 1 (السبب) + الخانة 2 (الفعل)',
        zi6_wrong: 'ابنِ قطعة السبب كاملة ("På grund af" + "den kolde sne") في الخانة 1 — عندها تأتي كلمة الفعل الحمراء ("tager") في الخانة 2 قبل "hun".',
        zi6_expl: 'تُحسب قطعة السبب كلها "På grund af den kolde sne" كالخانة 1 — لذلك يأتي الفعل "tager" فورًا في الخانة 2 قبل "hun".',

        // Del 2: Zoom ud tasks (zo1..zo6)
        zo1_tag: 'انقل الخلفية إلى البداية (fordi + الخانة 2)',
        zo1_instr: 'ابدأ بالخلفية ("Fordi det sner i dag,") في الخانة 1 — وابنِ المقدمة بالترتيب الصحيح:',
        zo1_target: 'الخلفية (الخانة 1) + المقدمة (الخانة 2)',
        zo1_wrong: 'ضع الخلفية ("Fordi det sner i dag,") في الخانة 1 — عندها تأتي كلمة الفعل الحمراء ("tager") في الخانة 2 قبل "kvinden".',
        zo1_expl: 'تملأ الخلفية كلها "Fordi det sner i dag," الخانة 1. لذلك يقفز الفعل "tager" إلى الخانة 2 مباشرة بعد الفاصلة!',

        zo2_tag: '"ikke" داخل الخلفية (fordi + ikke)',
        zo2_instr: 'ابنِ جزء الخلفية بعد "Hun cykler på cykelstien," — تذكّر أين تقف "ikke" في الخلفية:',
        zo2_target: 'خلفية مع "ikke"',
        zo2_wrong: 'ابدأ بـ "fordi" + الشخص ("hun") — وتذكّر أن "ikke" تقف قبل الفعل ("vil" + "tage bussen") في الخلفية!',
        zo2_expl: 'داخل الخلفية تتسلل "ikke" دائمًا قبل الفعل: "fordi hun ikke vil tage bussen".',

        zo3_tag: 'تعارض في البداية (selvom + ikke + الخانة 2)',
        zo3_instr: 'اجمع القاعدتين: "ikke" قبل الفعل في الخلفية، والفعل في الخانة 2 في المقدمة:',
        zo3_target: 'الخلفية (selvom + ikke) + المقدمة (الخانة 2)',
        zo3_wrong: 'ابنِ الخلفية هكذا "Selvom det ikke er varmt," ("ikke" قبل "er varmt,")، ثم ضع "cykler" في الخانة 2 قبل "hun gennem byen".',
        zo3_expl: 'في الخلفية تقف "ikke" قبل الفعل ("ikke er varmt")، وفي المقدمة بعد الفاصلة يأتي الفعل أولًا ("cykler hun").',

        zo4_tag: 'الزمن كخلفية في الخانة 1 (mens + الخانة 2)',
        zo4_instr: 'ضع الخلفية في البداية لتأطير المشهد، وابنِ المقدمة بشكل صحيح بعد الفاصلة:',
        zo4_target: 'الخلفية (الخانة 1) + المقدمة (الخانة 2)',
        zo4_wrong: 'ضع الخلفية ("Mens kvinden cykler forbi,") في الخانة 1 — عندها يأتي "kører" في الخانة 2 قبل "den grønne bus" و"forbi caféen".',
        zo4_expl: 'تُحسب الخلفية ("Mens kvinden cykler forbi,") كقطعة واحدة في الخانة 1، لذلك يأتي الفعل "kører" مباشرة في الخانة 2.',

        zo5_tag: 'شرط مع "ikke" (hvis + ikke + الخانة 2)',
        zo5_instr: 'ابنِ جملة الشرط كاملة مع "hvis" في البداية — تذكّر كلًا من "ikke" قبل الفعل والخانة 2 بعد الفاصلة:',
        zo5_target: 'الشرط (الخانة 1) + المقدمة (الخانة 2)',
        zo5_wrong: 'ابدأ بـ "Hvis sneen ikke stopper snart," ("ikke" قبل "stopper")، ثم ضع "går" في الخانة 2 قبل "hun ind på caféen".',
        zo5_expl: 'جملة طويلة ممتازة: "ikke" قبل "stopper" داخل جزء hvis، و"går hun" مباشرة بعد الفاصلة.',

        zo6_tag: 'تقريب مزدوج · قطعة مَن؟ كبيرة + خلفية',
        zo6_instr: 'اجمع جملة غنية حيث تكون الخانة 1 مقرّبة والخلفية تشرح السبب أيضًا:',
        zo6_target: 'مقدمة موسّعة + خلفية (fordi)',
        zo6_wrong: 'ابدأ بالمقدمة ("Den smilende kvinde på cyklen" + "skynder sig,")، ثم ابنِ الخلفية: "fordi det allerede sner kraftigt" ("allerede" قبل "sner").',
        zo6_expl: 'هنا تستخدم كلتا حركتي الكاميرا: قطعة مَن؟ خضراء موسّعة في المقدمة + جزء خلفية تقف فيه الكلمة الصغيرة "allerede" قبل الفعل "sner"!',

        // Del 3: Hurtig-quiz (q1..q8)
        q1_type: 'تقريب · الخانة 1 والخانة 2',
        q1_prompt: 'تقرّب على "En kvinde" ← "Den smilende kvinde med orange hue". أي جملة فيها الفعل في الخانة 2؟',
        q1_expl: 'القطعة الخضراء الموسّعة كلها ("Den smilende kvinde med orange hue") هي الخانة 1 — والفعل "cykler" يقف مباشرة بعدها في الخانة 2.',

        q2_type: 'تقريب · جزء som في الخانة 1',
        q2_prompt: 'نضع جزء "som" داخل الخانة 1. أين يجب أن يقف الفعل "cykler"؟',
        q2_expl: 'كل "Kvinden, som har en papirpose i kurven," لا تزال قطعة واحدة موحّدة في الخانة 1. لا نحتاج إلى "hun" إضافية — يأتي الفعل "cykler" مباشرة بعد الفاصلة.',

        q3_type: 'تقريب · كلمتا فعل كإطار',
        q3_prompt: 'عندما تحتوي قطعة الفعل على فعلين ("vil" + "cykle") وتبدأ الجملة بـ "Om morgenen"، أين تقف الأجزاء؟',
        q3_expl: 'الفعل الأول ("vil") يقف بثبات في الخانة 2، بينما يغلق الثاني ("cykle") الإطار لاحقًا في الجملة.',

        q4_type: 'إبعاد · الخلفية أولًا (الخانة 2)',
        q4_prompt: 'تنقل الخلفية ("Fordi det sner kraftigt") إلى بداية الجملة. ماذا يأتي مباشرة بعد الفاصلة؟',
        q4_expl: 'تعمل الخلفية كلها "Fordi det sner kraftigt" كقطعة واحدة موحّدة في الخانة 1 — لذلك يقف فعل المقدمة ("tager") في الخانة 2!',

        q5_type: 'إبعاد · "ikke" في الخلفية',
        q5_prompt: 'أين تقف "ikke" داخل قطعة الخلفية بعد "fordi"؟',
        q5_expl: 'داخل جزء الخلفية تتسلل "ikke" دائمًا قبل الفعل: "fordi hun ikke vil...".',

        q6_type: 'إبعاد · تعارض مع "selvom"',
        q6_prompt: 'اختر الجملة التي تكون فيها كل من الخانة 2 وقاعدة "ikke" صحيحتين تمامًا:',
        q6_expl: 'في الخلفية تقف "ikke" قبل الفعل ("ikke er")، وفي المقدمة بعد الفاصلة يأتي الفعل أولًا ("cykler hun").',

        q7_type: 'إبعاد · شرط مع "hvis"',
        q7_prompt: 'نضع شرطًا في الخانة 1. أي جملة هي دنماركية صحيحة؟',
        q7_expl: 'الخلفية فيها "ikke" قبل الفعل ("ikke stopper")، والمقدمة تبدأ بالفعل ("går hun") في الخانة 2.',

        q8_type: 'تقريب · الحجم لنفس السؤال',
        q8_prompt: 'أي من هاتين تجيب عن سؤال "لماذا؟" بجزء خلفية كامل (مع فعله الخاص)؟',
        q8_expl: '"På grund af sneen" قطعة أقصر بدون فعل، بينما "Fordi det sner og er glat på vejen" جزء خلفية كامل له فعله الخاص ("sner / er").'
    },

    // ==========================================
    // Persian / Farsi (فارسی)
    // ==========================================
    fa: {
        // Top bar & Header
        btn_try_write: 'خودتان در کمک در نوشتن امتحان کنید ←',
        badge: 'ترتیب واژه‌ها · بخش‌های جمله (دوربین: زوم به داخل و زوم به بیرون)',
        title: 'بخش‌های جمله: از تک‌واژه تا جمله‌های پربار',
        subtitle: 'روی یک قطعه رنگی <strong>زوم به داخل</strong> کنید تا جزئیات بیشتری در همان بخش جمله ببینید — و <strong>زوم به بیرون</strong> کنید تا کل تصویر را با <strong>پیش‌زمینه</strong> (بخش اصلی) و <strong>پس‌زمینه</strong> (دلیل، زمان، تقابل) ببینید.',

        // Main Tabs
        tab_zoom_in: '1. زوم به داخل (گسترش قطعه)',
        tab_inside: '2. درون قطعه',
        tab_zoom_out: '3. زوم به بیرون (پیش‌زمینه و پس‌زمینه)',
        tab_workshop: '4. کارگاه زوم (20 تمرین)',

        // Block labels
        lbl_p1_hvem: 'جایگاه 1 (چه کسی؟)',
        lbl_p1_hvem_som: 'جایگاه 1 (چه کسی؟ + بخش som)',
        lbl_p2_handling: 'جایگاه 2 (فعل)',
        lbl_hvor: 'کجا؟',
        lbl_hvornaar: 'کی؟',
        lbl_hvornaar_bg: 'کی؟ (بخش پس‌زمینه)',

        // Tab 1: Zoom ind
        t1_title: 'روی یک پرسش زوم کنید — فعل در جایگاه 2 می‌ماند',
        t1_track_hvem: 'چه کسی؟ (سبز · جایگاه 1)',
        t1_track_hvor: 'کجا؟ (آبی · مکان)',
        t1_track_hvornaar: 'کی؟ (بنفش · زمان)',
        t1_cam_zoom: 'زوم دوربین:',
        t1_pick_step: 'انتخاب مرحله زوم:',
        t1_words: 'واژه',
        btn_listen_sent: 'گوش دادن به جمله',
        btn_listen: 'گوش دادن',
        lbl_cam_insight: 'نکته دوربین:',

        t1_hvem_1: 'تصویر پایه از ترتیب واژه‌ها: 1 قطعه سبز ساده در جایگاه 1 — و فعل "cykler" در جایگاه 2 قرار دارد.',
        t1_hvem_2: 'دوربین زوم می‌کند: یک واژه توصیفی در جلو می‌گذاریم ("smilende"). کل قطعه سبز هنوز فقط جایگاه 1 است!',
        t1_hvem_3: 'جزئیات بیشتر در ادامه ("med orange hue og blå jakke"). اکنون جایگاه 1 دارای 9 واژه است — اما "cykler" همچنان ثابت در جایگاه 2 قرار دارد!',
        t1_hvem_4: 'حداکثر زوم: یک بخش کامل با "som" درون قطعه سبز جای می‌گیرد! همه این‌ها هنوز جایگاه 1 به شمار می‌آید و "cykler" بلافاصله پس از ویرگول می‌آید.',

        t1_hvor_1: 'مکان در شکل پایه فقط 2 واژه است: "på gaden".',
        t1_hvor_2: 'روی مکان زوم می‌کنیم: واژه کوچک "på" با یک مکان دقیق‌تر همراه می‌شود ("den sneklædte cykelsti").',
        t1_hvor_3: 'کل قطعه آبی هنوز فقط به یک پرسش — "کجا؟" — پاسخ می‌دهد، با اینکه اکنون یک منظره کامل خیابان را ترسیم می‌کند.',

        t1_hvornaar_1: 'یک عبارت زمانی ساده: "om morgenen".',
        t1_hvornaar_2: 'قطعه زمان با جزئیات بیشتر بزرگ می‌شود — و اگر کل قطعه بنفش را به جایگاه 1 ببرید، "cykler" بلافاصله پس از آن می‌آید!',
        t1_hvornaar_3: 'اینجا قطعه زمان به یک بخش کامل پس‌زمینه تبدیل می‌شود! این مستقیماً به زبانه 3 (زوم به بیرون: پیش‌زمینه و پس‌زمینه) هدایت می‌کند.',

        // Tab 2: Inde i brikken
        t2_title: 'درون 3 قطعه مهم‌تر',
        t2_intro: 'هر بخش جمله در درون خود الگوی ساخت ساده خودش را دارد — اما از بیرون همچنان به عنوان <strong>یک قطعه یکپارچه</strong> در جمله عمل می‌کند.',
        t2_c1_title: '1. قطعه چه کسی/چه چیزی',
        t2_c1_desc: 'یک هسته (<strong>kvinde</strong>) می‌تواند هم <em>پیش</em> و هم <em>پس</em> از خود جزئیات بگیرد. لایه‌ها را روشن و خاموش کنید:',
        t2_c1_before: '+ جزئیات پیشین',
        t2_c1_after: '+ جزئیات پسین',
        t2_c1_rel: '+ بخش som',
        t2_c2_title: '2. قطعه فعل (1 یا 2 فعل)',
        t2_c2_desc: 'با دو فعل (مثلاً <em>vil + cykle</em> یا <em>har + cyklet</em>) قطعه مانند یک قاب پیرامون شخص باز می‌شود:',
        t2_c2_1word: '1 واژه',
        t2_c2_2words: '2 واژه (قاب)',
        t2_c2_foot: 'نخستین واژه فعل همیشه ثابت در جایگاه 2 می‌ایستد — دومی در ادامه جمله قاب را می‌بندد.',
        t2_c3_title: '3. قطعه قاب (3 اندازه)',
        t2_c3_desc: 'همان پرسش — مثلاً <strong>چرا؟</strong> یا <strong>کی؟</strong> — می‌تواند در سه اندازه پاسخ داده شود:',
        t2_c3_s1: '1 واژه',
        t2_c3_s2: 'گروه کوچک واژه‌ها',
        t2_c3_s3: 'بخش کامل پس‌زمینه',

        // Tab 3: Zoom ud
        t3_title: 'زوم به بیرون: پیش‌زمینه شفاف + پس‌زمینه پیرامون او',
        t3_cam_badge: 'دوربین زوم به بیرون · زن + پیرامونش',
        t3_bg_first_on: 'پس‌زمینه در جلو قرار دارد (جایگاه 1 · جایگاه 2!)',
        t3_bg_first_off: 'انتقال پس‌زمینه به جایگاه 1',
        t3_ikke_hide: 'پنهان کردن قاعده "ikke"',
        t3_ikke_show: 'نمایش قاعده "ikke" در پس‌زمینه',
        t3_p1_prefix: 'جایگاه 1 ·',
        t3_p2_prefix: 'جایگاه 2 ·',
        t3_ikke_fg: 'پیش‌زمینه (بخش اصلی): فعل + IKKE',
        t3_ikke_bg: 'پس‌زمینه: IKKE + فعل',
        t3_btn_bridge: 'استفاده از الگو در کمک در نوشتن ←',

        t3_fg_label: 'پیش‌زمینه (بخش اصلی)',
        t3_fordi_q: 'چرا؟',
        t3_fordi_bg: 'پس‌زمینه · دلیل (fordi)',
        t3_fordi_tip: 'وقتی پس‌زمینه ("Fordi det sner og er koldt i dag,") در جایگاه 1 قرار می‌گیرد، کل بخش پس‌زمینه یک قطعه بزرگ به شمار می‌آید — به همین دلیل فعل "har" بلافاصله در جایگاه 2 قرار می‌گیرد!',
        t3_selvom_q: 'تقابل؟',
        t3_selvom_bg: 'پس‌زمینه · تقابل (selvom)',
        t3_selvom_tip: 'به "ikke" توجه کنید: در پیش‌زمینه "ikke" پس از فعل می‌آید ("er ikke")، اما درون پس‌زمینه پس از "selvom"، واژه "ikke" به پیش از فعل می‌رود ("ikke er").',
        t3_mens_q: 'کی؟',
        t3_mens_bg: 'پس‌زمینه · هم‌زمان (mens)',
        t3_mens_tip: 'با "mens" پس‌زمینه نشان می‌دهد پیرامون او در شهر چه می‌گذرد. اگر پس‌زمینه به ابتدا منتقل شود، فعل "kører" مستقیماً پس از ویرگول می‌آید.',
        t3_hvis_q: 'شرط؟',
        t3_hvis_bg: 'پس‌زمینه · شرط (hvis)',
        t3_hvis_tip: 'شرط ("Hvis sneen ikke stopper snart,") قاب کل جمله را می‌چیند — و درون پس‌زمینه، "ikke" پیش از "stopper" قرار می‌گیرد.',

        // Tab 4: Workshop UI
        t4_track_1: '1. زوم به داخل · گسترش یک قطعه ({n})',
        t4_track_2: '2. زوم به بیرون · جابه‌جایی بخش‌های جمله ({n})',
        t4_track_3: '3. آزمون سریع ({n})',
        t4_task_of: 'تمرین {a} از {b}',
        t4_first_try_score: 'امتیاز تلاش اول:',
        t4_score: 'امتیاز:',
        t4_build_here: 'اینجا بسازید · {label} (برای حذف روی قطعه قرارگرفته کلیک کنید)',
        t4_drop_placeholder: 'روی قطعه‌های رنگی زیر به ترتیب درست کلیک کنید...',
        t4_btn_check: 'بررسی پاسخ',
        t4_btn_clear: 'پاک کردن',
        t4_btn_next: 'تمرین بعدی ←',
        t4_btn_listen_correct: 'گوش دادن به پاسخ درست',
        t4_btn_retry: 'تلاش دوباره',
        t4_btn_retry_track: 'تمرین دوباره این بخش',
        t4_btn_to_t2: 'ادامه به 2. زوم به بیرون ←',
        t4_btn_to_t3: 'ادامه به 3. آزمون سریع ←',
        t4_done_zi_title: 'کارگاه زوم به داخل کامل شد',
        t4_done_zo_title: 'کارگاه زوم به بیرون کامل شد',
        t4_done_build_desc: 'شما <strong style="color:#4ade80;">{a} از {b}</strong> تمرین را در همان تلاش اول درست حل کردید.',
        t4_done_quiz_title: 'آزمون سریع کامل شد',
        t4_done_quiz_desc: 'شما <strong style="color:#4ade80;">{a} از {b}</strong> پاسخ درست گرفتید.',
        t4_ok_lead: 'عالی ساخته شد!',
        t4_wrong_lead: 'هنوز کامل نیست.',
        t4_missing_bricks: 'هنوز قطعه‌هایی در کادر بالا کم است — بقیه را اضافه کنید.',
        t4_quiz_ok: 'درست!',
        t4_quiz_see: 'ساختار را ببینید:',

        // Del 1: Zoom ind tasks (zi1..zi6)
        zi1_tag: 'قطعه چه کسی؟ · پیش + هسته + پس',
        zi1_instr: 'قطعه سبز جایگاه 1 را با قرار دادن بخش‌ها به ترتیب درست پیش از فعل گسترش دهید:',
        zi1_target: 'جایگاه 1 (چه کسی؟)',
        zi1_wrong: 'با "Den" + توصیف ("smilende") + هسته ("kvinde") شروع کنید و در پایان جزئیات اضافه ("med den orange hue") را بگذارید.',
        zi1_expl: 'یک قطعه چه کسی؟ گسترش‌یافته چنین ساخته می‌شود: واژه کوچک ("Den") + توصیف ("smilende") + هسته ("kvinde") + جزئیات اضافه ("med den orange hue"). همه این‌ها فقط جایگاه 1 را پر می‌کند!',

        zi2_tag: 'قطعه چه کسی؟ + بخش som (مراقب قطعه فریبنده باشید!)',
        zi2_instr: 'کل قطعه جایگاه 1 را با یک بخش "som" در درونش بسازید — و فعل را در جایگاه 2 بگذارید:',
        zi2_target: 'جایگاه 1 + جایگاه 2',
        zi2_decoy: 'توجه: یک قطعه فریبنده نباید وارد شود.',
        zi2_wrong: 'کل "Kvinden, som ..." جایگاه 1 است — فعل ("cykler") را مستقیماً در جایگاه 2 بگذارید و قطعه فریبنده را کنار بگذارید!',
        zi2_expl: 'کل "Kvinden, som har en papirpose i kurven," جایگاه 1 است. نباید یک "hun" اضافی پیش از فعل "cykler" وارد شود!',

        zi3_tag: 'قطعه کجا؟ · مکان با جزئیات',
        zi3_instr: 'روی مکان ("کجا؟") زوم کنید و کل قطعه آبی را پس از "En kvinde cykler" بسازید:',
        zi3_target: 'کجا؟ (قطعه مکان)',
        zi3_wrong: 'قطعه مکان را با واژه کوچک مکان ("på") شروع کنید، سپس خود مکان و در پایان جزئیات اضافه ("foran...") را بگذارید.',
        zi3_expl: 'قطعه آبی مکان با واژه کوچک مکان ("på") آغاز می‌شود، سپس خود مکان ("den sneklædte cykelsti") و در پایان توضیح دقیق‌تر ("foran den varme café").',

        zi4_tag: 'قطعه فعل · 2 فعل به عنوان قاب',
        zi4_instr: 'با "Om morgenen" (جایگاه 1) شروع کنید و دو واژه قرمز فعل را به درستی پیرامون شخص بگذارید:',
        zi4_target: 'جایگاه 2 + شخص + ادامه فعل',
        zi4_wrong: 'نخستین واژه قرمز فعل ("vil") را در جایگاه 2 بگذارید، سپس شخص ("hun") + واژه کوچک ("gerne") — و قاب را با "cykle" ببندید.',
        zi4_expl: 'وقتی فعل دو بخش دارد، اولی ("vil") در جایگاه 2 می‌ایستد، در حالی که دومی ("cykle") قاب را پس از شخص و واژه کوچک ("hun gerne") می‌بندد.',

        zi5_tag: 'قطعه چه چیزی؟ · پیش + هسته + پس',
        zi5_instr: 'آنچه همراه دارد ("چه چیزی؟") را با همه جزئیات به ترتیب درست گسترش دهید:',
        zi5_target: 'قطعه چه چیزی؟',
        zi5_wrong: 'قطعه چه چیزی؟ را با توصیف در جلو ("en varm") + هسته ("kop kaffe") + جزئیات مکان در ادامه ("fra..." + "på...") بسازید.',
        zi5_expl: 'قطعه چه چیزی؟ از هسته ("kop kaffe") با توصیف در جلو ("en varm") و جزئیات مکان در ادامه ("fra den lille café på hjørnet") رشد می‌کند.',

        zi6_tag: 'قطعه دلیل در جایگاه 1 (V2)',
        zi6_instr: 'کل قطعه دلیل ("På grund af...") را در جایگاه 1 بسازید و فعل را در جایگاه 2 بگذارید:',
        zi6_target: 'جایگاه 1 (دلیل) + جایگاه 2 (فعل)',
        zi6_wrong: 'کل قطعه دلیل ("På grund af" + "den kolde sne") را در جایگاه 1 بسازید — آنگاه واژه قرمز فعل ("tager") پیش از "hun" در جایگاه 2 می‌آید.',
        zi6_expl: 'کل قطعه دلیل "På grund af den kolde sne" جایگاه 1 به شمار می‌آید — بنابراین فعل "tager" بلافاصله پیش از "hun" در جایگاه 2 قرار می‌گیرد.',

        // Del 2: Zoom ud tasks (zo1..zo6)
        zo1_tag: 'انتقال پس‌زمینه به جلو (fordi + جایگاه 2)',
        zo1_instr: 'با پس‌زمینه ("Fordi det sner i dag,") در جایگاه 1 شروع کنید — و پیش‌زمینه را به ترتیب درست بسازید:',
        zo1_target: 'پس‌زمینه (جایگاه 1) + پیش‌زمینه (جایگاه 2)',
        zo1_wrong: 'پس‌زمینه ("Fordi det sner i dag,") را در جایگاه 1 بگذارید — آنگاه واژه قرمز فعل ("tager") پیش از "kvinden" در جایگاه 2 می‌آید.',
        zo1_expl: 'کل پس‌زمینه "Fordi det sner i dag," جایگاه 1 را پر می‌کند. به همین دلیل فعل "tager" بلافاصله پس از ویرگول به جایگاه 2 می‌آید!',

        zo2_tag: '"ikke" درون پس‌زمینه (fordi + ikke)',
        zo2_instr: 'بخش پس‌زمینه را پس از "Hun cykler på cykelstien," بسازید — به یاد داشته باشید "ikke" در پس‌زمینه کجا می‌ایستد:',
        zo2_target: 'پس‌زمینه با "ikke"',
        zo2_wrong: 'با "fordi" + شخص ("hun") شروع کنید — و به یاد داشته باشید که در پس‌زمینه، "ikke" پیش از فعل ("vil" + "tage bussen") می‌ایستد!',
        zo2_expl: 'درون پس‌زمینه، "ikke" همیشه پیش از فعل جای می‌گیرد: "fordi hun ikke vil tage bussen".',

        zo3_tag: 'تقابل در جلو (selvom + ikke + جایگاه 2)',
        zo3_instr: 'هر دو قاعده را ترکیب کنید: "ikke" پیش از فعل در پس‌زمینه و فعل در جایگاه 2 در پیش‌زمینه:',
        zo3_target: 'پس‌زمینه (selvom + ikke) + پیش‌زمینه (جایگاه 2)',
        zo3_wrong: 'پس‌زمینه را به صورت "Selvom det ikke er varmt," ("ikke" پیش از "er varmt,") بسازید و سپس "cykler" را پیش از "hun gennem byen" در جایگاه 2 بگذارید.',
        zo3_expl: 'در پس‌زمینه "ikke" پیش از فعل می‌آید ("ikke er varmt") و در پیش‌زمینه پس از ویرگول ابتدا فعل می‌آید ("cykler hun").',

        zo4_tag: 'زمان به عنوان پس‌زمینه در جایگاه 1 (mens + جایگاه 2)',
        zo4_instr: 'پس‌زمینه را در جلو بگذارید تا صحنه را قاب‌بندی کند، و پیش‌زمینه را پس از ویرگول درست بسازید:',
        zo4_target: 'پس‌زمینه (جایگاه 1) + پیش‌زمینه (جایگاه 2)',
        zo4_wrong: 'پس‌زمینه ("Mens kvinden cykler forbi,") را در جایگاه 1 بگذارید — آنگاه "kører" پیش از "den grønne bus" و "forbi caféen" در جایگاه 2 می‌آید.',
        zo4_expl: 'پس‌زمینه ("Mens kvinden cykler forbi,") یک قطعه در جایگاه 1 به شمار می‌آید، بنابراین فعل "kører" مستقیماً در جایگاه 2 می‌آید.',

        zo5_tag: 'شرط با "ikke" (hvis + ikke + جایگاه 2)',
        zo5_instr: 'کل جمله شرطی را با "hvis" در ابتدا بسازید — هم "ikke" پیش از فعل و هم جایگاه 2 پس از ویرگول را به یاد داشته باشید:',
        zo5_target: 'شرط (جایگاه 1) + پیش‌زمینه (جایگاه 2)',
        zo5_wrong: 'با "Hvis sneen ikke stopper snart," ("ikke" پیش از "stopper") شروع کنید و سپس "går" را پیش از "hun ind på caféen" در جایگاه 2 بگذارید.',
        zo5_expl: 'جمله بلند عالی: "ikke" پیش از "stopper" درون بخش hvis، و "går hun" بلافاصله پس از ویرگول.',

        zo6_tag: 'زوم دوگانه · قطعه بزرگ چه کسی؟ + پس‌زمینه',
        zo6_instr: 'یک جمله پربار بسازید که هم جایگاه 1 آن زوم شده باشد و هم پس‌زمینه دلیل را توضیح دهد:',
        zo6_target: 'پیش‌زمینه گسترش‌یافته + پس‌زمینه (fordi)',
        zo6_wrong: 'با پیش‌زمینه ("Den smilende kvinde på cyklen" + "skynder sig,") شروع کنید و سپس پس‌زمینه را بسازید: "fordi det allerede sner kraftigt" ("allerede" پیش از "sner").',
        zo6_expl: 'اینجا از هر دو تکنیک دوربین استفاده می‌کنید: یک قطعه سبز گسترش‌یافته چه کسی؟ در پیش‌زمینه + یک بخش پس‌زمینه که در آن واژه کوچک "allerede" پیش از فعل "sner" می‌ایستد!',

        // Del 3: Hurtig-quiz (q1..q8)
        q1_type: 'زوم به داخل · جایگاه 1 و جایگاه 2',
        q1_prompt: 'روی "En kvinde" ← "Den smilende kvinde med orange hue" زوم می‌کنید. در کدام جمله فعل در جایگاه 2 است؟',
        q1_expl: 'کل قطعه سبز گسترش‌یافته ("Den smilende kvinde med orange hue") جایگاه 1 است — و فعل "cykler" یکپارچه بلافاصله پس از آن در جایگاه 2 قرار دارد.',

        q2_type: 'زوم به داخل · بخش som در جایگاه 1',
        q2_prompt: 'یک بخش "som" را درون جایگاه 1 قرار می‌دهیم. فعل "cykler" کجا باید بایستد؟',
        q2_expl: 'کل "Kvinden, som har en papirpose i kurven," هنوز یک قطعه یکپارچه جایگاه 1 است. نیازی به یک "hun" اضافه نیست — فعل "cykler" مستقیماً پس از ویرگول می‌آید.',

        q3_type: 'زوم به داخل · 2 واژه فعل به عنوان قاب',
        q3_prompt: 'وقتی قطعه فعل دو فعل دارد ("vil" + "cykle") و جمله با "Om morgenen" شروع می‌شود، بخش‌ها کجا قرار می‌گیرند؟',
        q3_expl: 'فعل اول ("vil") ثابت در جایگاه 2 می‌ایستد، در حالی که دومی ("cykle") در ادامه جمله قاب را می‌بندد.',

        q4_type: 'زوم به بیرون · پس‌زمینه اول (جایگاه 2)',
        q4_prompt: 'پس‌زمینه ("Fordi det sner kraftigt") را به ابتدای جمله می‌برید. بلافاصله پس از ویرگول چه می‌آید؟',
        q4_expl: 'کل پس‌زمینه "Fordi det sner kraftigt" مانند یک قطعه یکپارچه جایگاه 1 عمل می‌کند — بنابراین فعل پیش‌زمینه ("tager") در جایگاه 2 قرار می‌گیرد!',

        q5_type: 'زوم به بیرون · "ikke" در پس‌زمینه',
        q5_prompt: 'درون قطعه پس‌زمینه پس از "fordi"، واژه "ikke" کجا می‌ایستد؟',
        q5_expl: 'درون یک بخش پس‌زمینه، "ikke" همیشه پیش از فعل قرار می‌گیرد: "fordi hun ikke vil...".',

        q6_type: 'زوم به بیرون · تقابل با "selvom"',
        q6_prompt: 'جمله‌ای را انتخاب کنید که در آن هم جایگاه 2 و هم قاعده "ikke" کاملاً درست باشد:',
        q6_expl: 'در پس‌زمینه "ikke" پیش از فعل می‌آید ("ikke er") و در پیش‌زمینه پس از ویرگول ابتدا فعل می‌آید ("cykler hun").',

        q7_type: 'زوم به بیرون · شرط با "hvis"',
        q7_prompt: 'یک شرط در جایگاه 1 می‌گذاریم. کدام جمله دانمارکی درست است؟',
        q7_expl: 'پس‌زمینه پیش از فعل "ikke" دارد ("ikke stopper") و پیش‌زمینه با فعل ("går hun") در جایگاه 2 شروع می‌شود.',

        q8_type: 'زوم به داخل · اندازه برای همان پرسش',
        q8_prompt: 'کدام یک از این دو به پرسش "چرا؟" با یک بخش کامل پس‌زمینه (با فعل خودش) پاسخ می‌دهد؟',
        q8_expl: '"På grund af sneen" یک قطعه کوتاه‌تر بدون فعل است، در حالی که "Fordi det sner og er glat på vejen" یک بخش کامل پس‌زمینه با فعل خودش ("sner / er") است.'
    },

    // ==========================================
    // Kurdish Sorani (کوردیی سۆرانی)
    // ==========================================
    ku: {
        // Top bar & Header
        btn_try_write: 'خۆت لە یارمەتی نووسیندا تاقی بکەرەوە ←',
        badge: 'ڕێزبەندی وشەکان · بەشەکانی ڕستە (کامێرا: نزیککردنەوە و دوورخستنەوە)',
        title: 'بەشەکانی ڕستە: لە تاکە وشەوە بۆ ڕستەی دەوڵەمەند',
        subtitle: 'بۆ بینینی وردەکاری زیاتر لە هەمان بەشی ڕستەدا <strong>نزیکی بکەرەوە</strong> لە یەک پارچەی ڕەنگاوڕەنگ — و بۆ بینینی تەواوی وێنەکە بە <strong>پێشەوە</strong> (بەشی سەرەکی) و <strong>پاشبنەما</strong> (هۆکار، کات، دژبەری) <strong>دووری بخەرەوە</strong>.',

        // Main Tabs
        tab_zoom_in: '1. نزیککردنەوە (فراوانکردنی پارچە)',
        tab_inside: '2. ناوەوەی پارچەکە',
        tab_zoom_out: '3. دوورخستنەوە (پێشەوە و پاشبنەما)',
        tab_workshop: '4. کارگەی زووم (20 ڕاهێنان)',

        // Block labels
        lbl_p1_hvem: 'شوێنی 1 (کێ؟)',
        lbl_p1_hvem_som: 'شوێنی 1 (کێ؟ + بەشی som)',
        lbl_p2_handling: 'شوێنی 2 (کردار)',
        lbl_hvor: 'لە کوێ؟',
        lbl_hvornaar: 'کەی؟',
        lbl_hvornaar_bg: 'کەی؟ (بەشی پاشبنەما)',

        // Tab 1: Zoom ind
        t1_title: 'نزیک بکەرەوە لە یەک پرسیار — کردارەکە لە شوێنی 2 دەمێنێتەوە',
        t1_track_hvem: 'کێ؟ (سەوز · شوێنی 1)',
        t1_track_hvor: 'لە کوێ؟ (شین · شوێن)',
        t1_track_hvornaar: 'کەی؟ (مۆر · کات)',
        t1_cam_zoom: 'زوومی کامێرا:',
        t1_pick_step: 'هەنگاوی زووم هەڵبژێرە:',
        t1_words: 'وشە',
        btn_listen_sent: 'گوێ لە ڕستەکە بگرە',
        btn_listen: 'گوێ بگرە',
        lbl_cam_insight: 'تێبینی کامێرا:',

        t1_hvem_1: 'وێنەی بنەڕەتی لە ڕێزبەندی وشەکانەوە: 1 پارچەی سەوزی سادە لە شوێنی 1 — و کرداری "cykler" لە شوێنی 2 دەوەستێت.',
        t1_hvem_2: 'کامێراکە نزیک دەبێتەوە: وشەیەکی وەسفکەر لە پێشەوە دادەنێین ("smilende"). تەواوی پارچە سەوزەکە هێشتا تەنها شوێنی 1ـە!',
        t1_hvem_3: 'وردەکاری زیاتر لە دواوە ("med orange hue og blå jakke"). ئێستا شوێنی 1 بووە بە 9 وشە — بەڵام "cykler" هێشتا جێگیر لە شوێنی 2 دەوەستێت!',
        t1_hvem_4: 'ئەوپەڕی نزیککردنەوە: بەشێکی تەواوی "som" لە ناو پارچە سەوزەکەدا دەژی! هەمووی هێشتا وەک شوێنی 1 ئەژمار دەکرێت و "cykler" ڕاستەوخۆ دوای فاریزەکە دێت.',

        t1_hvor_1: 'شوێن لە شێوە بنەڕەتییەکەیدا تەنها 2 وشەیە: "på gaden".',
        t1_hvor_2: 'لە شوێنەکە نزیک دەبینەوە: وشە بچووکەکەی "på" شوێنێکی وردتری لەگەڵدا دێت ("den sneklædte cykelsti").',
        t1_hvor_3: 'تەواوی پارچە شینەکە هێشتا تەنها وەڵامی یەک پرسیار دەداتەوە — "لە کوێ؟" — هەرچەندە ئێستا دیمەنێکی تەواوی شەقام دەکێشێت.',

        t1_hvornaar_1: 'دەربڕینێکی سادەی کات: "om morgenen".',
        t1_hvornaar_2: 'پارچەی کات بە وردەکاری زیاتر گەورە دەبێت — و ئەگەر تەواوی پارچە مۆرەکە ببەیتە شوێنی 1، "cykler" ڕاستەوخۆ دوای دێت!',
        t1_hvornaar_3: 'لێرەدا پارچەی کات دەبێت بە بەشێکی تەواوی پاشبنەما! ئەمە ڕاستەوخۆ دەتباتە تابی 3 (دوورخستنەوە: پێشەوە و پاشبنەما).',

        // Tab 2: Inde i brikken
        t2_title: 'ناوەوەی 3 گرنگترین پارچەکە',
        t2_intro: 'هەر بەشێکی ڕستە لە ناوەوە شێوازی دروستکردنی سادەی خۆی هەیە — بەڵام لە دەرەوە هێشتا وەک <strong>یەک پارچەی یەکگرتوو</strong> لە ڕستەکەدا کار دەکات.',
        t2_c1_title: '1. پارچەی کێ/چی',
        t2_c1_desc: 'کرۆکێک (<strong>kvinde</strong>) دەتوانێت هەم لە <em>پێش</em> و هەم لە <em>پاش</em> خۆی وردەکاری وەربگرێت. چینەکان هەڵبکە و بکوژێنەرەوە:',
        t2_c1_before: '+ وردەکاری پێش',
        t2_c1_after: '+ وردەکاری پاش',
        t2_c1_rel: '+ بەشی som',
        t2_c2_title: '2. پارچەی کردار (1 یان 2 کردار)',
        t2_c2_desc: 'بە دوو کردار (بۆ نموونە <em>vil + cykle</em> یان <em>har + cyklet</em>) پارچەکە وەک چوارچێوەیەک بە دەوری کەسەکەدا دەکرێتەوە:',
        t2_c2_1word: '1 وشە',
        t2_c2_2words: '2 وشە (چوارچێوە)',
        t2_c2_foot: 'وشەی یەکەمی کردار هەمیشە جێگیر لە شوێنی 2 دەوەستێت — دووەمیان لە دواتردا چوارچێوەکە لە ڕستەکەدا دادەخات.',
        t2_c3_title: '3. پارچەی چوارچێوە (3 قەبارە)',
        t2_c3_desc: 'هەمان پرسیار — بۆ نموونە <strong>بۆچی؟</strong> یان <strong>کەی؟</strong> — دەکرێت بە سێ قەبارە وەڵام بدرێتەوە:',
        t2_c3_s1: '1 وشە',
        t2_c3_s2: 'کۆمەڵە وشەیەکی بچووک',
        t2_c3_s3: 'بەشی تەواوی پاشبنەما',

        // Tab 3: Zoom ud
        t3_title: 'دوورخستنەوە: پێشەوەی ڕوون + پاشبنەما لە دەوروبەری',
        t3_cam_badge: 'کامێرا دوورخراوەتەوە · ژنەکە + دەوروبەرەکەی',
        t3_bg_first_on: 'پاشبنەما لە پێشەوەیە (شوێنی 1 · شوێنی 2!)',
        t3_bg_first_off: 'پاشبنەما ببە بۆ شوێنی 1',
        t3_ikke_hide: 'یاسای "ikke" بشارەوە',
        t3_ikke_show: 'یاسای "ikke" لە پاشبنەمادا پیشان بدە',
        t3_p1_prefix: 'شوێنی 1 ·',
        t3_p2_prefix: 'شوێنی 2 ·',
        t3_ikke_fg: 'پێشەوە (بەشی سەرەکی): کردار + IKKE',
        t3_ikke_bg: 'پاشبنەما: IKKE + کردار',
        t3_btn_bridge: 'ئەم شێوازە لە یارمەتی نووسیندا بەکاربهێنە ←',

        t3_fg_label: 'پێشەوە (بەشی سەرەکی)',
        t3_fordi_q: 'بۆچی؟',
        t3_fordi_bg: 'پاشبنەما · هۆکار (fordi)',
        t3_fordi_tip: 'کاتێک پاشبنەماکە ("Fordi det sner og er koldt i dag,") لە شوێنی 1 دەوەستێت، تەواوی بەشی پاشبنەماکە وەک یەک پارچەی گەورە ئەژمار دەکرێت — بۆیە کرداری "har" دەستبەجێ لە شوێنی 2 دەوەستێت!',
        t3_selvom_q: 'دژبەری؟',
        t3_selvom_bg: 'پاشبنەما · دژبەری (selvom)',
        t3_selvom_tip: 'سەرنج بدە "ikke": لە پێشەوەدا "ikke" دوای کردارەکە دێت ("er ikke")، بەڵام لە ناو پاشبنەمادا دوای "selvom"، وشەی "ikke" دەچێتە پێش کردارەکە ("ikke er").',
        t3_mens_q: 'کەی؟',
        t3_mens_bg: 'پاشبنەما · هاوکات (mens)',
        t3_mens_tip: 'لەگەڵ "mens" پاشبنەماکە پیشان دەدات لە شارەکەدا چی لە دەوروبەری ڕوودەدات. ئەگەر پاشبنەماکە ببرێتە پێشەوە، کرداری "kører" ڕاستەوخۆ دوای فاریزەکە دێت.',
        t3_hvis_q: 'مەرج؟',
        t3_hvis_bg: 'پاشبنەما · مەرج (hvis)',
        t3_hvis_tip: 'مەرجەکە ("Hvis sneen ikke stopper snart,") چوارچێوە بۆ تەواوی ڕستەکە دادەنێت — و لە ناو پاشبنەمادا "ikke" لە پێش "stopper" دەوەستێت.',

        // Tab 4: Workshop UI
        t4_track_1: '1. نزیککردنەوە · یەک پارچە فراوان بکە ({n})',
        t4_track_2: '2. دوورخستنەوە · بەشەکانی ڕستە بجووڵێنە ({n})',
        t4_track_3: '3. تاقیکردنەوەی خێرا ({n})',
        t4_task_of: 'ڕاهێنانی {a} لە {b}',
        t4_first_try_score: 'خاڵی یەکەم هەوڵ:',
        t4_score: 'خاڵ:',
        t4_build_here: 'لێرە دروستی بکە · {label} (کلیک لەسەر پارچەیەکی دانراو بکە بۆ لابردنی)',
        t4_drop_placeholder: 'کلیک لەسەر پارچە ڕەنگاوڕەنگەکانی خوارەوە بکە بە ڕیزبەندی دروست...',
        t4_btn_check: 'پشکنینی وەڵام',
        t4_btn_clear: 'سڕینەوە',
        t4_btn_next: 'ڕاهێنانی داهاتوو ←',
        t4_btn_listen_correct: 'گوێ لە وەڵامی دروست بگرە',
        t4_btn_retry: 'دووبارە هەوڵ بدە',
        t4_btn_retry_track: 'ئەم بەشە دووبارە ڕابهێنە',
        t4_btn_to_t2: 'بڕۆ بۆ 2. دوورخستنەوە ←',
        t4_btn_to_t3: 'بڕۆ بۆ 3. تاقیکردنەوەی خێرا ←',
        t4_done_zi_title: 'کارگەی نزیککردنەوە تەواو بوو',
        t4_done_zo_title: 'کارگەی دوورخستنەوە تەواو بوو',
        t4_done_build_desc: 'تۆ لە یەکەم هەوڵدا <strong style="color:#4ade80;">{a} لە {b}</strong> ڕاهێنانت بە دروستی شیکار کرد.',
        t4_done_quiz_title: 'تاقیکردنەوەی خێرا تەواو بوو',
        t4_done_quiz_desc: 'تۆ <strong style="color:#4ade80;">{a} لە {b}</strong> وەڵامی دروستت هێنا.',
        t4_ok_lead: 'زۆر جوان دروست کرا!',
        t4_wrong_lead: 'هێشتا تەواو نییە.',
        t4_missing_bricks: 'هێشتا پارچەت ماوە لە خانەکەی سەرەوە — هەوڵ بدە ئەوانی تریش زیاد بکەیت.',
        t4_quiz_ok: 'ڕاستە!',
        t4_quiz_see: 'پێکهاتەکە ببینە:',

        // Del 1: Zoom ind tasks (zi1..zi6)
        zi1_tag: 'پارچەی کێ؟ · پێش + کرۆک + پاش',
        zi1_instr: 'پارچە سەوزەکەی شوێنی 1 فراوان بکە بە دانانی بەشەکان بە ڕیزبەندی دروست لە پێش کردارەکە:',
        zi1_target: 'شوێنی 1 (کێ؟)',
        zi1_wrong: 'بە "Den" + وەسف ("smilende") + کرۆک ("kvinde") دەست پێ بکە و وردەکاری زیادەکە ("med den orange hue") لە کۆتاییدا دابنێ.',
        zi1_expl: 'پارچەیەکی فراوانکراوی کێ؟ بەم شێوەیە دروست دەکرێت: وشەی بچووک ("Den") + وەسف ("smilende") + کرۆک ("kvinde") + وردەکاری زیادە ("med den orange hue"). هەمووی تەنها شوێنی 1 پڕ دەکاتەوە!',

        zi2_tag: 'پارچەی کێ؟ + بەشی som (ئاگاداری پارچە فێڵبازەکە بە!)',
        zi2_instr: 'تەواوی پارچەی شوێنی 1 بە بەشێکی "som" لە ناوەوە دروست بکە — و کردارەکە لە شوێنی 2 دابنێ:',
        zi2_target: 'شوێنی 1 + شوێنی 2',
        zi2_decoy: 'ئاگاداربە: یەک پارچەی فێڵباز نابێت تێدا بێت.',
        zi2_wrong: 'تەواوی "Kvinden, som ..." شوێنی 1ـە — کردارەکە ("cykler") ڕاستەوخۆ لە شوێنی 2 دابنێ و پارچە فێڵبازەکە بەجێ بهێڵە!',
        zi2_expl: 'تەواوی "Kvinden, som har en papirpose i kurven," شوێنی 1ـە. نابێت وشەیەکی زیادەی "hun" بخزێتە پێش کرداری "cykler"!',

        zi3_tag: 'پارچەی لە کوێ؟ · شوێن بە وردەکارییەوە',
        zi3_instr: 'نزیک بکەرەوە لە شوێنەکە ("لە کوێ؟") و تەواوی پارچە شینەکە لە دوای "En kvinde cykler" دروست بکە:',
        zi3_target: 'لە کوێ؟ (پارچەی شوێن)',
        zi3_wrong: 'پارچەی شوێن بە وشە بچووکەکەی شوێن ("på") دەست پێ بکە، پاشان شوێنەکە خۆی و لە کۆتاییدا وردەکاری زیادە ("foran...").',
        zi3_expl: 'پارچە شینەکەی شوێن بە وشە بچووکەکەی شوێن ("på") دەست پێ دەکات، پاشان شوێنەکە خۆی ("den sneklædte cykelsti") و لە کۆتاییدا ڕوونکردنەوەی زیادە ("foran den varme café").',

        zi4_tag: 'پارچەی کردار · 2 کردار وەک چوارچێوە',
        zi4_instr: 'بە "Om morgenen" (شوێنی 1) دەست پێ بکە و دوو وشە سوورەکەی کردار بە دروستی بە دەوری کەسەکەدا دابنێ:',
        zi4_target: 'شوێنی 2 + کەس + پاشماوەی کردار',
        zi4_wrong: 'یەکەم وشە سوورەکەی کردار ("vil") لە شوێنی 2 دابنێ، پاشان کەسەکە ("hun") + وشە بچووکەکە ("gerne") — و چوارچێوەکە بە "cykle" دابخە.',
        zi4_expl: 'کاتێک کردارەکە دوو کرداری هەیە، یەکەمیان ("vil") لە شوێنی 2 دەوەستێت، لە کاتێکدا دووەمیان ("cykle") دوای کەسەکە و وشە بچووکەکە ("hun gerne") چوارچێوەکە دادەخات.',

        zi5_tag: 'پارچەی چی؟ · پێش + کرۆک + پاش',
        zi5_instr: 'ئەوەی پێیەتی ("چی؟") بە هەموو وردەکارییەکانەوە بە ڕیزبەندی دروست فراوان بکە:',
        zi5_target: 'پارچەی چی؟',
        zi5_wrong: 'پارچەی چی؟ بە وەسف لە پێشەوە ("en varm") + کرۆک ("kop kaffe") + وردەکاری شوێن لە دواوە ("fra..." + "på...") دروست بکە.',
        zi5_expl: 'پارچەی چی؟ لە کرۆکەکەوە ("kop kaffe") گەشە دەکات بە وەسف لە پێشەوە ("en varm") و وردەکاری شوێن لە دواوە ("fra den lille café på hjørnet").',

        zi6_tag: 'پارچەی هۆکار لە شوێنی 1 (V2)',
        zi6_instr: 'تەواوی پارچەی هۆکار ("På grund af...") لە شوێنی 1 دروست بکە و کردارەکە لە شوێنی 2 دابنێ:',
        zi6_target: 'شوێنی 1 (هۆکار) + شوێنی 2 (کردار)',
        zi6_wrong: 'تەواوی پارچەی هۆکار ("På grund af" + "den kolde sne") لە شوێنی 1 دروست بکە — ئەو کاتە وشە سوورەکەی کردار ("tager") لە پێش "hun" لە شوێنی 2 دێت.',
        zi6_expl: 'تەواوی پارچەی هۆکاری "På grund af den kolde sne" وەک شوێنی 1 ئەژمار دەکرێت — بۆیە کرداری "tager" دەستبەجێ لە پێش "hun" لە شوێنی 2 دێت.',

        // Del 2: Zoom ud tasks (zo1..zo6)
        zo1_tag: 'پاشبنەما ببە پێشەوە (fordi + شوێنی 2)',
        zo1_instr: 'بە پاشبنەماکە ("Fordi det sner i dag,") لە شوێنی 1 دەست پێ بکە — و پێشەوەکە بە ڕیزبەندی دروست دروست بکە:',
        zo1_target: 'پاشبنەما (شوێنی 1) + پێشەوە (شوێنی 2)',
        zo1_wrong: 'پاشبنەماکە ("Fordi det sner i dag,") لە شوێنی 1 دابنێ — ئەو کاتە وشە سوورەکەی کردار ("tager") لە پێش "kvinden" لە شوێنی 2 دێت.',
        zo1_expl: 'تەواوی پاشبنەمای "Fordi det sner i dag," شوێنی 1 پڕ دەکاتەوە. بۆیە کرداری "tager" ڕاستەوخۆ دوای فاریزەکە دێتە شوێنی 2!',

        zo2_tag: '"ikke" لە ناو پاشبنەمادا (fordi + ikke)',
        zo2_instr: 'بەشی پاشبنەما لە دوای "Hun cykler på cykelstien," دروست بکە — لە بیرت بێت "ikke" لە پاشبنەمادا لە کوێ دەوەستێت:',
        zo2_target: 'پاشبنەما لەگەڵ "ikke"',
        zo2_wrong: 'بە "fordi" + کەسەکە ("hun") دەست پێ بکە — و لە بیرت بێت لە پاشبنەمادا "ikke" لە پێش کردارەکە ("vil" + "tage bussen") دەوەستێت!',
        zo2_expl: 'لە ناو پاشبنەمادا "ikke" هەمیشە دەخزێتە پێش کردارەکە: "fordi hun ikke vil tage bussen".',

        zo3_tag: 'دژبەری لە پێشەوە (selvom + ikke + شوێنی 2)',
        zo3_instr: 'هەردوو یاساکە تێکەڵ بکە: "ikke" لە پێش کردار لە پاشبنەمادا، و کردار لە شوێنی 2 لە پێشەوەدا:',
        zo3_target: 'پاشبنەما (selvom + ikke) + پێشەوە (شوێنی 2)',
        zo3_wrong: 'پاشبنەماکە وەک "Selvom det ikke er varmt," ("ikke" پێش "er varmt,") دروست بکە و پاشان "cykler" لە شوێنی 2 لە پێش "hun gennem byen" دابنێ.',
        zo3_expl: 'لە پاشبنەمادا "ikke" لە پێش کردار دەوەستێت ("ikke er varmt") و لە پێشەوەدا دوای فاریزەکە سەرەتا کردار دێت ("cykler hun").',

        zo4_tag: 'کات وەک پاشبنەما لە شوێنی 1 (mens + شوێنی 2)',
        zo4_instr: 'پاشبنەماکە لە پێشەوە دابنێ بۆ چوارچێوەکردنی دیمەنەکە، و پێشەوەکە بە دروستی لە دوای فاریزەکە دروست بکە:',
        zo4_target: 'پاشبنەما (شوێنی 1) + پێشەوە (شوێنی 2)',
        zo4_wrong: 'پاشبنەماکە ("Mens kvinden cykler forbi,") لە شوێنی 1 دابنێ — ئەو کاتە "kører" لە پێش "den grønne bus" و "forbi caféen" لە شوێنی 2 دێت.',
        zo4_expl: 'پاشبنەماکە ("Mens kvinden cykler forbi,") وەک یەک پارچە لە شوێنی 1 ئەژمار دەکرێت، بۆیە کرداری "kører" ڕاستەوخۆ لە شوێنی 2 دێت.',

        zo5_tag: 'مەرج لەگەڵ "ikke" (hvis + ikke + شوێنی 2)',
        zo5_instr: 'تەواوی ڕستەی مەرجەکە بە "hvis" لە پێشەوە دروست بکە — هەم "ikke" لە پێش کردار و هەم شوێنی 2 لە دوای فاریزە لە بیر بێت:',
        zo5_target: 'مەرج (شوێنی 1) + پێشەوە (شوێنی 2)',
        zo5_wrong: 'بە "Hvis sneen ikke stopper snart," ("ikke" پێش "stopper") دەست پێ بکە و پاشان "går" لە شوێنی 2 لە پێش "hun ind på caféen" دابنێ.',
        zo5_expl: 'ڕستەیەکی درێژی نایاب: "ikke" لە پێش "stopper" لە ناو بەشی hvis، و "går hun" ڕاستەوخۆ دوای فاریزەکە.',

        zo6_tag: 'زوومی دووانە · پارچەی گەورەی کێ؟ + پاشبنەما',
        zo6_instr: 'ڕستەیەکی دەوڵەمەند کۆ بکەرەوە کە هەم شوێنی 1ـی نزیک کرابێتەوە و هەم پاشبنەماکە هۆکارەکە ڕوون بکاتەوە:',
        zo6_target: 'پێشەوەی فراوانکراو + پاشبنەما (fordi)',
        zo6_wrong: 'بە پێشەوەکە ("Den smilende kvinde på cyklen" + "skynder sig,") دەست پێ بکە و پاشان پاشبنەماکە دروست بکە: "fordi det allerede sner kraftigt" ("allerede" پێش "sner").',
        zo6_expl: 'لێرەدا هەردوو جووڵەی کامێرا بەکار دەهێنیت: پارچەیەکی سەوزی فراوانکراوی کێ؟ لە پێشەوە + بەشێکی پاشبنەما کە تێیدا وشە بچووکەکەی "allerede" لە پێش کرداری "sner" دەوەستێت!',

        // Del 3: Hurtig-quiz (q1..q8)
        q1_type: 'نزیککردنەوە · شوێنی 1 و شوێنی 2',
        q1_prompt: 'تۆ لە "En kvinde" ← "Den smilende kvinde med orange hue" نزیک دەبیتەوە. کام ڕستە کردارەکەی لە شوێنی 2 هەیە؟',
        q1_expl: 'تەواوی پارچە سەوزە فراوانکراوەکە ("Den smilende kvinde med orange hue") شوێنی 1ـە — و کرداری "cykler" بە یەکگرتوویی ڕاستەوخۆ دوای لە شوێنی 2 دەوەستێت.',

        q2_type: 'نزیککردنەوە · بەشی som لە شوێنی 1',
        q2_prompt: 'بەشێکی "som" دەخەینە ناو شوێنی 1. کرداری "cykler" دەبێت لە کوێ بوەستێت؟',
        q2_expl: 'تەواوی "Kvinden, som har en papirpose i kurven," هێشتا یەک پارچەی یەکگرتووی شوێنی 1ـە. پێویست بە "hun"ێکی زیادە ناکات — کرداری "cykler" ڕاستەوخۆ دوای فاریزەکە دێت.',

        q3_type: 'نزیککردنەوە · 2 وشەی کردار وەک چوارچێوە',
        q3_prompt: 'کاتێک پارچەی کردار دوو کرداری هەیە ("vil" + "cykle") و بە "Om morgenen" دەست پێ دەکات، بەشەکان لە کوێ دەوەستن؟',
        q3_expl: 'کرداری یەکەم ("vil") جێگیر لە شوێنی 2 دەوەستێت، لە کاتێکدا دووەمیان ("cykle") لە دواتردا چوارچێوەکە لە ڕستەکەدا دادەخات.',

        q4_type: 'دوورخستنەوە · پاشبنەما لە سەرەتا (شوێنی 2)',
        q4_prompt: 'پاشبنەماکە ("Fordi det sner kraftigt") دەبەیتە سەرەتای ڕستەکە. ڕاستەوخۆ دوای فاریزەکە چی دێت؟',
        q4_expl: 'تەواوی پاشبنەمای "Fordi det sner kraftigt" وەک یەک پارچەی یەکگرتووی شوێنی 1 کار دەکات — بۆیە کرداری پێشەوەکە ("tager") لە شوێنی 2 دەوەستێت!',

        q5_type: 'دوورخستنەوە · "ikke" لە پاشبنەمادا',
        q5_prompt: 'لە ناو پارچەی پاشبنەمادا دوای "fordi"، وشەی "ikke" لە کوێ دەوەستێت؟',
        q5_expl: 'لە ناو بەشێکی پاشبنەمادا "ikke" هەمیشە دەخزێتە پێش کردارەکە: "fordi hun ikke vil...".',

        q6_type: 'دوورخستنەوە · دژبەری لەگەڵ "selvom"',
        q6_prompt: 'ئەو ڕستەیە هەڵبژێرە کە هەم شوێنی 2 و هەم یاسای "ikke" تێیدا بە تەواوی دروستن:',
        q6_expl: 'لە پاشبنەمادا "ikke" لە پێش کردار دەوەستێت ("ikke er") و لە پێشەوەدا دوای فاریزەکە سەرەتا کردار دێت ("cykler hun").',

        q7_type: 'دوورخستنەوە · مەرج لەگەڵ "hvis"',
        q7_prompt: 'مەرجێک لە شوێنی 1 دادەنێین. کام ڕستە دانیمارکیی دروستە؟',
        q7_expl: 'پاشبنەماکە لە پێش کرداردا "ikke"ـی هەیە ("ikke stopper") و پێشەوەکە بە کردار ("går hun") لە شوێنی 2 دەست پێ دەکات.',

        q8_type: 'نزیککردنەوە · قەبارە بۆ هەمان پرسیار',
        q8_prompt: 'کامیان لەم دووانە وەڵامی پرسیاری "بۆچی؟" دەداتەوە بە بەشێکی تەواوی پاشبنەما (بە کرداری خۆیەوە)؟',
        q8_expl: '"På grund af sneen" پارچەیەکی کورتترە بەبێ کردار، لە کاتێکدا "Fordi det sner og er glat på vejen" بەشێکی تەواوی پاشبنەمایە بە کرداری خۆیەوە ("sner / er").'
    }
};
