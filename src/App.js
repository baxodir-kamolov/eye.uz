import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ytypqmpmqouddmwfuekg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eXBxbXBtcW91ZGRtd2Z1ZWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3OTc0MDIsImV4cCI6MjA5NzM3MzQwMn0.vs3NYcF-HhgzLUz3jzgXATvkQvIik3hHlketxE9wEAs";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ══════════════════════════════════════════════════════════
//  RANGLAR
// ══════════════════════════════════════════════════════════
const C = {
  bg:"#EEF2F7",white:"#FFFFFF",
  primary:"#1558A6",primaryLight:"#E6EEF8",
  teal:"#0A8A7E",tealLight:"#E5F5F4",
  amber:"#D97706",amberLight:"#FEF3C7",
  red:"#DC2626",redLight:"#FEE2E2",
  green:"#059669",greenLight:"#D1FAE5",
  purple:"#7C3AED",purpleLight:"#EDE9FE",
  text:"#111827",textMid:"#374151",textLight:"#6B7280",textFaint:"#9CA3AF",
  border:"#D1D8E4",borderLight:"#E5EBF2",
  sidebar:"#0B1F3A",
};
const inp={width:"100%",padding:"9px 12px",borderRadius:8,border:`1.5px solid ${C.border}`,fontSize:14,outline:"none",boxSizing:"border-box",background:C.white,color:C.text,fontFamily:"inherit"};
const lbl={fontSize:11,fontWeight:700,color:C.textLight,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"};
const card={background:C.white,borderRadius:14,padding:"22px 26px",boxShadow:"0 1px 6px rgba(0,0,0,0.06)",marginBottom:18};
const btn=(bg=C.primary,fg="#fff")=>({background:bg,color:fg,border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:6});

// ══════════════════════════════════════════════════════════
//  TIBBIY MA'LUMOTLAR
// ══════════════════════════════════════════════════════════
const KASALLIKLAR = {
  "Miop (qisqa ko'rlik)":{mkb:"H52.1",daraja:["Engil (−0.25 dan −3.0 D)","O'rtacha (−3.25 dan −6.0 D)","Og'ir (−6.25 D dan yuqori)","Yuqori (−10 D dan yuqori)"],belgilar:"Uzoqdagi narsalar xiralashishi, ko'zni qisish, bosh og'riq, ko'z charchashi",sabab:"Ko'z olmasi uzun yoki shoxparda qiyaligi yuqori",davolash:["Ko'zoynak yoki kontakt linza","LASIK lazer korreksiyasi (18+ yosh)","PRK","ICL implantatsiya","Ortok-K linzalar (kechasi)"],dorilar:["Sun'iy ko'z yoshlari","0.01% Atropin (bolalarda progressiyani sekinlatish)","Vitamin A + Lutein"],nazorat:"Har 6–12 oyda tekshiruv",ehtiyot:"Retina deformatsiyasi xavfi — yillik fundus"},
  "Gipermetropiya (uzoq ko'rlik)":{mkb:"H52.0",daraja:["Engil (+0.25–+2.0 D)","O'rtacha (+2.25–+5.0 D)","Og'ir (+5.25 D+)"],belgilar:"Yaqin xiralashishi, ko'z charchashi, bosh og'riq, akkomodatsiya zo'riqishi",sabab:"Ko'z olmasi qisqa yoki shoxparda qiyaligi past",davolash:["Plyus ko'zoynak","Kontakt linzalar","LASIK/PRK","Lens almashtiruvi"],dorilar:["Sun'iy ko'z yoshlari","Vitamin A,C,E,Lutein"],nazorat:"Har yili, bolalarda har 6 oyda",ehtiyot:"Bolalarda amblyopiya va strabizm xavfi"},
  "Astigmatizm":{mkb:"H52.2",daraja:["Engil (0.25–1.0 D)","O'rtacha (1.25–2.5 D)","Og'ir (2.75 D+)"],belgilar:"Har masofada xiralashish, narsalar cho'zilgan, ko'z charchashi",sabab:"Shoxparda yoki linzaning noto'g'ri yumaloq shakli",davolash:["Silindrli ko'zoynaklar","Toric kontakt linzalar","LASIK/PRK","Toric ICL"],dorilar:["Sun'iy ko'z yoshlari"],nazorat:"Har 6–12 oyda",ehtiyot:"Keratokonus bilan aralashmasin — topografiya o'tkazish"},
  "Presbyopiya":{mkb:"H52.4",daraja:["Boshlang'ich (40–44 yosh)","O'rtacha (45–50 yosh)","Rivojlangan (50+ yosh)"],belgilar:"Yaqin o'qish qiyinlashishi, kitobni uzoq tutib o'qish, ko'z charchashi",sabab:"Ko'z linzasi elastikligining yosh bilan kamayishi",davolash:["O'qish ko'zoynagi (+1.0–+3.5 D)","Progressiv linzalar","Monovision kontakt","KAMRA inlay","Multifokal IOL"],dorilar:["Pilokarpin 1.25%","Vitamin kompleks"],nazorat:"Har yili",ehtiyot:"Boshqa patologiyalar bilan kombinatsiya"},
  "Katarakta":{mkb:"H26",daraja:["I — minimal loyqa","II — o'rtacha (visus >0.5)","III — belgilangan (visus 0.1–0.5)","IV — pishgan (visus <0.1)"],belgilar:"Ko'rish asta pasayishi, rang kamayishi, haydashda xira nur, diplopia",sabab:"Linza proteinlari denaturatsiyasi — yosh, diabet, UV, steroidlar, travma",davolash:["Konservativ: vitamin tomchilar (boshlang'ich)","FAKOEMULSIFIKATSIYA (standart jarrohlik)","Ekstrakapsular ekstraktsiya","IOL tanlash: monofocal/toric/multifocal"],dorilar:["Quinax tomchilar","Catalin tomchilar","Oftan Kataxrom","Taufon (taurin 4%)"],nazorat:"3–6 oyda, III–IV — darhol konsultatsiya",ehtiyot:"Yetuk kataraktani kechiktirmaslik — glaukoma asorati"},
  "Glaukoma":{mkb:"H40",daraja:["I — Boshlang'ich (periferik o'zgarish)","II — Rivojlangan (maydon torayishi)","III — Ilg'or (markaz atrofi)","IV — Terminal"],belgilar:"IOP oshishi (>21 mmHg), ko'rish maydoni torayishi, optik disk ekskavatsiyasi",sabab:"Suyuqlik aylanishi buzilishi, optik neyron shikastlanishi",davolash:["Latanoprost/Travoprost — 1-tanlov","Timolol 0.5% — 2-tanlov","SLT lazer","Trabekulektomiya","MIGS jarrohlik"],dorilar:["Latanoprost 0.005% (Xalatan) kechasi","Travoprost 0.004% (Travatan) kechasi","Timolol 0.5% 2x/kun","Cosopt (Dorzolamide+Timolol)","Brimonidine 0.15%","Acetazolamide (Diakarb) — og'ir holat"],nazorat:"Har 1–3 oyda IOP, 6 oyda perimetriya, yillik OCT",ehtiyot:"STEROID TOMCHILAR BERMANG — IOP oshiradi"},
  "Konjunktivit":{mkb:"H10",daraja:["Bakterial","Viral (adenovirus)","Allergik","Kimyoviy/toksik"],belgilar:"Ko'z qizarishi, yiring/shilimshiq, qichishish, yosh oshishi, shishish",sabab:"Bakteriyalar, viruslar, allergenlar, kimyoviy ta'sir",davolash:["Bakterial: antibiotik 7–10 kun","Viral: antiviral + antiseptik","Allergik: antihistamin + steroid","Ko'z yuvish — salin eritma"],dorilar:["Ciprofloxacin 0.3% (Tsiprolet) 6x","Tobramycin 0.3% (Tobrex) 4–6x","Ofloxacin 0.3% (Floxal) 4x","Oftalmoferon 6–8x (viral)","Ketotifen 0.025% (Zaditen) 2x (allergik)","Olopatadine 0.1% (Pataday) 2x (allergik)"],nazorat:"7–10 kunlik kurs",ehtiyot:"Yuqori yuqumli — sochiq va yostiqlarni alohida"},
  "Keratokonus":{mkb:"H18.6",daraja:["I — K<48D","II — K 48–54D","III — K 54–60D, loyqa","IV — K>60D, chandiq"],belgilar:"Ko'rish buzilishi, ko'zoynakni tez almashtirish, Munson belgisi, ko'z surtish",sabab:"Shoxparda kollagen fibrallarining zaiflashishi, genetik moyillik",davolash:["RGP linzalar (I–II)","CXL Cross-Linking (progressiyani to'xtatish)","ICRS halqalar (II–III)","Keratoplastika (III–IV)","Scleral linzalar"],dorilar:["Sun'iy ko'z yoshlari (gialuron)","Riboflavin 0.1% (CXL uchun)","Antioxidant vitamin"],nazorat:"Har 3–6 oyda korneal topografiya",ehtiyot:"Ko'z surtishni TAQIQLASH — progressiyani tezlashtiradi"},
  "Retina ajralishi":{mkb:"H33",daraja:["Regmatogen (yoriq)","Traksion (membrana)","Ekssudativ (suyuqlik)"],belgilar:"To'satdan uchuvchi nuqtalar, chaqmoq, ko'rish maydonida parda, keskin pasayish",sabab:"Retina yirtilishi, traksiya, diabet, travma, miop",davolash:["SHOSHILINCH JARROHLIK!","Pnevmatik retinopeksiya","Sklerotsentez + kriopeksiya","Vitrektomiya","Lazer fotokoagulyatsiya (profilaktika)"],dorilar:["C3F8/SF6 gaz tamponada","Anti-VEGF (neovaskulyarizatsiyada)"],nazorat:"Jarrohlikdan 1,3,7,30 kunda",ehtiyot:"TIBBIY SHOSHILINCH — 24 soat ichida operatsiya"},
  "Diabetik retinopatiya":{mkb:"H36.0",daraja:["Nonproliferativ — engil","Nonproliferativ — o'rtacha","Nonproliferativ — og'ir","Proliferativ","Diabetik makula shishi (DME)"],belgilar:"Erta simptom yo'q, keyinchalik xiralashish, o'zgaruvchan ko'rish, ko'r dog'lar",sabab:"Uzoq giperglikemiya → retina tomirlari shikastlanishi",davolash:["Birinchi: qon shakarni nazorat (HbA1c<7%)","Lazer fotokoagulyatsiya","Anti-VEGF intravitreal injeksiya","Vitrektomiya","Steroid implant (Ozurdex)"],dorilar:["Ranibizumab (Lucentis) injeksiya","Aflibercept (Eylea) injeksiya","Bevacizumab (Avastin)","Triamcinolon intravitreal"],nazorat:"Yiliga kamida 1 fundus (diabetikda)",ehtiyot:"Endokrinolog bilan birgalikda davolash"},
  "Strabizm":{mkb:"H50",daraja:["Esotropiya (ichkariga)","Ekzotropiya (tashqariga)","Gipotropiya/Giperotropiya","Konkomitant/Paralitik"],belgilar:"Ko'z muvozanatsizligi, diplopia, bosh og'rish, bir ko'zni yumib qarash",sabab:"Ko'z mushaklari muvozanatsizligi, nerv falaji, refraktsion xatolar",davolash:["Ko'zoynak korreksiyasi","Okluziya terapiyasi","Prizma ko'zoynaklar","Botoks injeksiyasi","Jarrohlik: mushak korreksiyasi"],dorilar:["Botulinum toksin A (Botox)","Atropin 1% (penalizatsiya)","Vitamin B kompleks"],nazorat:"Har 3 oyda (bolalarda)",ehtiyot:"7 yoshgacha davolash eng samarali"},
  "Amblyopiya":{mkb:"H53.0",daraja:["Engil (0.4–0.8)","O'rtacha (0.2–0.4)","Og'ir (<0.1)"],belgilar:"Bir ko'z yomon ko'rish, korreksiyaga to'liq javob bermaslik, stereopsis yo'q",sabab:"Strabizm, anizometropiya, katarakta, ptoz",davolash:["Okluziya — sog' ko'zni berkitish 2–6 soat","Atropin penalizatsiya","Pleoptic mashqlar","Asosiy sababni davolash"],dorilar:["Atropin 1% sog' ko'zga","Vitamin A + Lutein"],nazorat:"Har 4–6 haftada (intensiv davolashda)",ehtiyot:"7 yoshgacha eng samarali — visual korteks plastisitesi"},
  "Blepharit":{mkb:"H01.0",daraja:["Old blepharit (kirpik tubida)","Orqa blepharit (meibomian bez)"],belgilar:"Qovoq qichishishi, yonishi, qizarishi, qobiq hosil bo'lishi, ko'z charchashi",sabab:"Stafilokokk, meibomian bez disfunksiyasi, Demodex, rosacea",davolash:["Iliq kompres 2x kuniga","Qovoqlarni tozalash (baby shampun)","Choy daraxti moyi (Demodex)","Doksitsiklin og'iz orqali"],dorilar:["TobraDex (Tobramycin+Dexa)","Azithromycin 1% geli","Metronidazol 0.75% krem","Doksitsiklin 100 mg — meibomian","Omega-3 kapsulalar"],nazorat:"4–6 haftada, surunkali — doimiy gigiyena",ehtiyot:"To'liq davolanmaydi — surunkali kasallik"},
  "Quruq ko'z sindromi":{mkb:"H04.1",daraja:["Engil — vaqti-vaqti","O'rtacha — tez-tez, parda buzilishi","Og'ir — surunkali og'riq"],belgilar:"Yonish, qichishish, achishish, qumli his, ko'z qizarishi, xiralashuvchi ko'rish",sabab:"Ko'z yoshi kamayishi YOKI tez bug'lanishi — MGD, yosh, ekran vaqti",davolash:["20-20-20 qoidasi","Havoni namlash","Isitish + massaj (MGD)","Punctal plug","IPL terapiya"],dorilar:["Hyabak 0.15% (gialuron)","Systane Ultra","Refresh Optive","Ciclosporin A 0.05% (Restasis)","Lifitegrast 5% (Xiidra)","Omega-3 1g/kun"],nazorat:"Har 3 oyda — Schirmer, BUT",ehtiyot:"BAK konservantli tomchilardan qochish"},
  "Pterigium":{mkb:"H11.0",daraja:["I — Shoxparda chetiga yetmagan","II — Shoxpardaga kirgan","III — Qorachiqqa yaqin","IV — Qorachiqni yopgan"],belgilar:"Ko'zda qizil uchburchak o'sma, qichishish, astigmatizm, ko'rish buzilishi (III–IV)",sabab:"UV nurlanish, chang, quruq havo — fibrovaskular o'sma",davolash:["I–II: himoya (UV ko'zoynak, yoshlar)","II–III+: jarrohlik (rezeksiya + autogreffe)","Mitomycin C — qayta o'sishni oldini olish"],dorilar:["Sun'iy ko'z yoshlari (Hyabak, Systane)","Ketorolac 0.5% — yallig'lanishda","Loteprednol 0.5%"],nazorat:"Har 3–6 oyda o'lcham nazorati",ehtiyot:"UV himoyasi zarur — qayta o'sishi mumkin"},
  "Xalazion":{mkb:"H00.1",daraja:["Kichik (<5 mm)","O'rtacha (5–10 mm)","Katta (>10 mm)"],belgilar:"Qovoqda og'riqsiz g'o'dda, bosimda noqulaylik, katta — ko'rish xiralashi",sabab:"Meibomian bez tiqilishi → lipid granuloma",davolash:["Iliq kompres 3–4x kuniga, 10–15 daqiqa","Qovoq massaji","Triamcinolon injeksiya","Jarrohlik: xalazion ektomiya"],dorilar:["TobraDex malham — infeksiyada","Triamcinolon 40mg/ml — intralesional"],nazorat:"4 hafta konservativ, keyin baho",ehtiyot:"Qayta-qayta chiqsa — meibomian bez karsinomasi istisno"},
};

const DORILAR = {
  "Antibiotiklar":["Ciprofloxacin 0.3% (Tsiprolet)","Tobramycin 0.3% (Tobrex)","Ofloxacin 0.3% (Floxal)","Moxifloxacin 0.5% (Vigamox)","Azithromycin 1% (AzaSite)","Chloramphenicol 0.25%","Gentamicin 0.3%"],
  "Antiviruslar":["Ganciclovir 0.15% (Zirgan) geli","Trifluridin 1%","Acyclovir 3% malham","Oftalmoferon (interferon α-2b)"],
  "Steroidlar":["Dexamethasone 0.1%","Prednisolone acetat 1%","Fluorometholone 0.1% (FML)","Loteprednol 0.5% (Lotemax)","Triamcinolone injeksiya"],
  "NSAIDs":["Ketorolac 0.5% (Acular)","Diclofenac 0.1% (Voltaren)","Bromfenac 0.09%","Nepafenac 0.1%"],
  "Glaukoma":["Latanoprost 0.005% (Xalatan)","Travoprost 0.004% (Travatan)","Bimatoprost 0.01% (Lumigan)","Timolol 0.5% (Arutimol)","Brimonidine 0.2%","Dorzolamide 2%","Cosopt (D+T)","Acetazolamide tabletkalar"],
  "Anti-VEGF":["Ranibizumab (Lucentis)","Aflibercept (Eylea)","Bevacizumab (Avastin)","Brolucizumab (Beovu)"],
  "Sun'iy yoshlar":["Hyabak 0.15%","Systane Ultra","Refresh Optive","Vismed 0.18%","Artelac Splash 0.24%","Oftagel 2.5% (kechasi)"],
  "Katarakta":["Quinax tomchilar","Catalin tomchilar","Oftan Kataxrom","Taufon 4%"],
  "Vitaminlar":["Vitamin A tomchi","Lutein + Zeaxanthin","Vitamin C+E antioksidant","Omega-3","AREDS2 formula"],
};

const KOZ_HOLATI = {
  "Qovoqlar":["Normal","Ptoz","Entropion","Ektropion","Blepharospazm","Shishish (edema)","Xalazion/Hordeolum"],
  "Conjunctiva":["Normal","Giperemiya","Kemoza (shishish)","Folikullar","Papillyar reaksiya","Subkonjunktival qon","Xeroz"],
  "Shoxparda":["Shaffof","Loyqa uchastkalar","Neovaskularizatsiya","Epitelial defekt","Keratik presipitalar","Bullyoz keratopatiya","Yoriq/Travma"],
  "Oldingi kamera":["Normal","Sayoz","Flare (oqsillanish)","Gipopion (yiring)","Gifema (qon)","Iris bombe"],
  "Ko'z qorachig'i":["Yumaloq, reaktiv","Izokoriya","Anizokoriya","Yopishqoq (sinekhiya)","Rubeoz irisi","Tremulans"],
  "Linza":["Shaffof","Yadroviy loyqa","Subkapsular loyqa","Korteks loyqa","Yetuk katarakta","Afakiya","Psevdofakiya (IOL)"],
  "Ko'z tubi":["Normal","Disk shishi","Disk ekskavatsiyasi","Retina ajralishi","Druzen (AMD)","Diabetik o'zgarish","Chandiqlar"],
};

const VISUS_VAL = ["","0.01","0.02","0.04","0.05","0.06","0.08","0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8","0.9","1.0","1.2","1.5","2.0"];
const SHIFOKORLAR = ["—","Dr. Karimov A.","Dr. Yusupova M.","Dr. Rahimov J.","Dr. Tosheva N."];

const iop_tip = v => {
  const n = parseFloat(v);
  if (!n) return null;
  if (n < 10) return {t:"warning",m:`⚠️ Juda past IOP (${n}) — gipotonik holat, uveit istisno qilinsin`};
  if (n <= 21) return {t:"ok",m:`✅ Norma (${n} mmHg)`};
  if (n <= 27) return {t:"warning",m:`⚠️ Ko'tarilgan IOP (${n}) — glaukoma shubhasi, prostaglandin tayinlash`};
  return {t:"danger",m:`🚨 Yuqori IOP (${n}) — ZUDLIK BILAN davolash!`};
};
const visus_tip = v => {
  const n = parseFloat(v);
  if (!n) return null;
  if (n >= 0.9) return {t:"ok",m:`✅ Yaxshi ko'rish (${n})`};
  if (n >= 0.5) return {t:"info",m:`ℹ️ O'rtacha ko'rish (${n})`};
  if (n >= 0.1) return {t:"warning",m:`⚠️ Pasaygan ko'rish (${n})`};
  return {t:"danger",m:`🚨 Juda past ko'rish (${n}) — SHOSHILINCH`};
};

const emptyP = () => ({
  id:null, fish:"", tugildan:"", jinsi:"Erkak", tel:"", tel2:"", manzil:"",
  passport:"", qon:"", allergiya:"", kasb:"", shikoyat:"", anamnez:"",
  sana:new Date().toISOString().slice(0,10), holat:"Yangi", shifokor:"",
  koz_od:{}, koz_os:{}, koz_od_izoh:"", koz_os_izoh:"",
  v_od_uz:"", v_os_uz:"", v_od_yq:"", v_os_yq:"", v_od_k:"", v_os_k:"",
  iop_od:"", iop_os:"", iop_vaqt:"", iop_usul:"Non-kontakt (pnevmotonometr)",
  r_od_sf:"", r_od_si:"", r_od_ak:"", r_od_ad:"",
  r_os_sf:"", r_os_si:"", r_os_ak:"", r_os_ad:"",
  schirmer_od:"", schirmer_os:"", but_od:"", but_os:"",
  pachim_od:"", pachim_os:"", biomikro:"", oftalmo:"", perimetr:"",
  tx_od:"", tx_os:"", tx_dar_od:"", tx_dar_os:"", mkb_od:"", mkb_os:"",
  klinik_izoh:"", davolash:"", nazorat_sana:"", nazorat_izoh:"",
  retsept_tur:"Ko'zoynak",
  rt_od_sf:"", rt_od_si:"", rt_od_ak:"", rt_od_ad:"", rt_od_pd:"",
  rt_os_sf:"", rt_os_si:"", rt_os_ak:"", rt_os_ad:"", rt_os_pd:"",
  retsept_izoh:"",
  dorilar:[], operatsiyalar:[],
});

// ══════════════════════════════════════════════════════════
//  CHOP ETISH SAHIFASI
// ══════════════════════════════════════════════════════════
function PrintView({ p, onClose }) {
  const ps = { borderCollapse:"collapse", width:"100%" };
  const td = { border:"1px solid #ccc", padding:"6px 10px", fontSize:12 };
  const th = { border:"1px solid #ccc", padding:"6px 10px", fontSize:12, background:"#f0f0f0", fontWeight:700 };
  return (
    <div style={{ position:"fixed", inset:0, background:"#fff", zIndex:500, overflow:"auto", padding:0 }}>
      {/* Print toolbar */}
      <div style={{ background:"#1558A6", color:"#fff", padding:"12px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", printThis:"no" }} className="no-print">
        <div style={{ fontWeight:800, fontSize:16 }}>🖨️ Chop etishga tayyorlash</div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => window.print()} style={{ ...btn("#fff","#1558A6"), fontWeight:800 }}>🖨️ Chop etish (Print)</button>
          <button onClick={onClose} style={{ ...btn("rgba(255,255,255,0.15)"), border:"1px solid rgba(255,255,255,0.3)" }}>✕ Yopish</button>
        </div>
      </div>
      <style>{`@media print { .no-print { display:none!important; } @page { margin:15mm; } }`}</style>
      {/* Hujjat */}
      <div style={{ maxWidth:760, margin:"0 auto", padding:"24px 32px", fontFamily:"'Times New Roman', serif", fontSize:13, color:"#000" }}>
        {/* Sarlavha */}
        <div style={{ textAlign:"center", borderBottom:"2px solid #000", paddingBottom:14, marginBottom:16 }}>
          <div style={{ fontSize:20, fontWeight:700, textTransform:"uppercase", letterSpacing:"1px" }}>KO'Z KLINIKASI</div>
          <div style={{ fontSize:15, marginTop:4 }}>BEMOR TIBBIY KARTOCHKASI</div>
          <div style={{ fontSize:12, marginTop:4, color:"#444" }}>Sana: {p.sana} &nbsp;|&nbsp; Shifokor: {p.shifokor || "—"} &nbsp;|&nbsp; Holat: {p.holat}</div>
        </div>

        {/* Shaxsiy */}
        <div style={{ fontWeight:700, fontSize:14, borderBottom:"1px solid #000", paddingBottom:4, marginBottom:10 }}>1. SHAXSIY MA'LUMOTLAR</div>
        <table style={ps}><tbody>
          {[["F.I.SH",p.fish],["Tug'ilgan sana",p.tugildan],["Jinsi",p.jinsi],["Telefon",p.tel],["Manzil",p.manzil],["Passport",p.passport],["Qon guruhi",p.qon],["Kasb",p.kasb],["Allergiya",p.allergiya||"Yo'q"]].map(([k,v])=>(
            <tr key={k}><td style={{...td,width:"35%",fontWeight:600}}>{k}</td><td style={td}>{v||"—"}</td></tr>
          ))}
        </tbody></table>

        {p.shikoyat && <div style={{ marginTop:10 }}><strong>Shikoyat:</strong> {p.shikoyat}</div>}
        {p.anamnez && <div style={{ marginTop:6 }}><strong>Anamnez:</strong> {p.anamnez}</div>}

        {/* Ko'z holati */}
        <div style={{ fontWeight:700, fontSize:14, borderBottom:"1px solid #000", paddingBottom:4, marginBottom:10, marginTop:18 }}>2. KO'Z HOLATI (BIOMIKROSKOPIYA)</div>
        <table style={ps}><thead>
          <tr><th style={th}>Parametr</th><th style={th}>OD (O'ng ko'z)</th><th style={th}>OS (Chap ko'z)</th></tr>
        </thead><tbody>
          {Object.keys(KOZ_HOLATI).map(param => (
            <tr key={param}><td style={{...td,fontWeight:600}}>{param}</td><td style={td}>{p.koz_od[param]||"—"}</td><td style={td}>{p.koz_os[param]||"—"}</td></tr>
          ))}
          <tr><td style={{...td,fontWeight:600}}>Qo'shimcha izoh — OD</td><td style={td} colSpan={2}>{p.koz_od_izoh||"—"}</td></tr>
          <tr><td style={{...td,fontWeight:600}}>Qo'shimcha izoh — OS</td><td style={td} colSpan={2}>{p.koz_os_izoh||"—"}</td></tr>
        </tbody></table>

        {/* Tekshiruv */}
        <div style={{ fontWeight:700, fontSize:14, borderBottom:"1px solid #000", paddingBottom:4, marginBottom:10, marginTop:18 }}>3. KO'Z TEKSHIRUVI NATIJALARI</div>
        <table style={ps}><thead>
          <tr><th style={th}>Ko'rsatkich</th><th style={th}>OD</th><th style={th}>OS</th></tr>
        </thead><tbody>
          {[["Visus uzoqda (korreksiyasiz)",p.v_od_uz,p.v_os_uz],["Visus yaqinda (korreksiyasiz)",p.v_od_yq,p.v_os_yq],["Visus korreksiya bilan",p.v_od_k,p.v_os_k],["Ko'z ichi bosimi (mmHg)",p.iop_od,p.iop_os],["Refraktsiya: Sfera (D)",p.r_od_sf,p.r_os_sf],["Refraktsiya: Silindr (D)",p.r_od_si,p.r_os_si],["Refraktsiya: Aks (°)",p.r_od_ak,p.r_os_ak],["Refraktsiya: Add (D)",p.r_od_ad,p.r_os_ad],["Pachimetriya (µm)",p.pachim_od,p.pachim_os],["Schirmer testi (mm/5 daq)",p.schirmer_od,p.schirmer_os],["BUT (soniya)",p.but_od,p.but_os]].map(([k,od,os])=>(
            <tr key={k}><td style={{...td,fontWeight:500}}>{k}</td><td style={{...td,textAlign:"center",fontWeight:600}}>{od||"—"}</td><td style={{...td,textAlign:"center",fontWeight:600}}>{os||"—"}</td></tr>
          ))}
        </tbody></table>
        {p.iop_usul && <div style={{ fontSize:11, marginTop:4, color:"#555" }}>IOP o'lchash usuli: {p.iop_usul} {p.iop_vaqt && `| Vaqt: ${p.iop_vaqt}`}</div>}
        {p.biomikro && <div style={{ marginTop:8 }}><strong>Biomikroskopiya:</strong> {p.biomikro}</div>}
        {p.oftalmo && <div style={{ marginTop:4 }}><strong>Oftalmoskopiya:</strong> {p.oftalmo}</div>}
        {p.perimetr && <div style={{ marginTop:4 }}><strong>Perimetriya:</strong> {p.perimetr}</div>}

        {/* Tashxis */}
        <div style={{ fontWeight:700, fontSize:14, borderBottom:"1px solid #000", paddingBottom:4, marginBottom:10, marginTop:18 }}>4. TASHXIS</div>
        <table style={ps}><tbody>
          {[["Tashxis OD",`${p.tx_od||"—"} ${p.tx_dar_od?"("+p.tx_dar_od+")":""}`],["Tashxis OS",`${p.tx_os||"—"} ${p.tx_dar_os?"("+p.tx_dar_os+")":""}`],["MKB-10 (OD)",p.mkb_od],["MKB-10 (OS)",p.mkb_os],["Nazorat sanasi",p.nazorat_sana]].map(([k,v])=>(
            <tr key={k}><td style={{...td,width:"35%",fontWeight:600}}>{k}</td><td style={td}>{v||"—"}</td></tr>
          ))}
        </tbody></table>
        {p.klinik_izoh && <div style={{ marginTop:8 }}><strong>Klinik xulosa:</strong> {p.klinik_izoh}</div>}

        {/* Davolash */}
        <div style={{ fontWeight:700, fontSize:14, borderBottom:"1px solid #000", paddingBottom:4, marginBottom:10, marginTop:18 }}>5. DAVOLASH REJASI</div>
        {p.davolash && <div style={{ marginBottom:10 }}>{p.davolash}</div>}
        {p.dorilar && p.dorilar.length > 0 && (
          <table style={ps}><thead>
            <tr><th style={th}>Dori nomi</th><th style={th}>Doza</th><th style={th}>Chastota</th><th style={th}>Davomiylik</th></tr>
          </thead><tbody>
            {p.dorilar.map((d,i) => <tr key={i}><td style={td}>{d.nomi}</td><td style={td}>{d.doza||"—"}</td><td style={td}>{d.chastota||"—"}</td><td style={td}>{d.davomiylik||"—"}</td></tr>)}
          </tbody></table>
        )}
        {p.nazorat_izoh && <div style={{ marginTop:8 }}><strong>Nazorat:</strong> {p.nazorat_izoh}</div>}

        {/* Retsept */}
        {(p.rt_od_sf || p.rt_os_sf) && (<>
          <div style={{ fontWeight:700, fontSize:14, borderBottom:"1px solid #000", paddingBottom:4, marginBottom:10, marginTop:18 }}>6. KO'ZOYNAK / LINZA RETSEPTI</div>
          <div style={{ marginBottom:8 }}>Tur: <strong>{p.retsept_tur}</strong></div>
          <table style={ps}><thead>
            <tr><th style={th}>Ko'z</th><th style={th}>Sfera</th><th style={th}>Silindr</th><th style={th}>Aks</th><th style={th}>Add</th><th style={th}>PD</th></tr>
          </thead><tbody>
            <tr><td style={{...td,fontWeight:700}}>OD</td>{[p.rt_od_sf,p.rt_od_si,p.rt_od_ak,p.rt_od_ad,p.rt_od_pd].map((v,i)=><td key={i} style={{...td,textAlign:"center"}}>{v||"—"}</td>)}</tr>
            <tr><td style={{...td,fontWeight:700}}>OS</td>{[p.rt_os_sf,p.rt_os_si,p.rt_os_ak,p.rt_os_ad,p.rt_os_pd].map((v,i)=><td key={i} style={{...td,textAlign:"center"}}>{v||"—"}</td>)}</tr>
          </tbody></table>
          {p.retsept_izoh && <div style={{ marginTop:6, fontSize:12 }}>Izoh: {p.retsept_izoh}</div>}
        </>)}

        {/* Operatsiya */}
        {p.operatsiyalar && p.operatsiyalar.length > 0 && (<>
          <div style={{ fontWeight:700, fontSize:14, borderBottom:"1px solid #000", paddingBottom:4, marginBottom:10, marginTop:18 }}>7. OPERATSIYA TARIXI</div>
          <table style={ps}><thead>
            <tr><th style={th}>Tur</th><th style={th}>Sana</th><th style={th}>Jarroh</th><th style={th}>Natija</th></tr>
          </thead><tbody>
            {p.operatsiyalar.map((op,i) => <tr key={i}><td style={td}>{op.tur}</td><td style={td}>{op.sana||"—"}</td><td style={td}>{op.shifokor||"—"}</td><td style={td}>{op.natija||"—"}</td></tr>)}
          </tbody></table>
        </>)}

        {/* Imzo */}
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:40, paddingTop:16, borderTop:"1px solid #ccc" }}>
          <div style={{ textAlign:"center" }}><div style={{ borderTop:"1px solid #000", width:180, marginBottom:4 }}></div><div style={{ fontSize:11 }}>Shifokor imzosi: {p.shifokor||"________________"}</div></div>
          <div style={{ textAlign:"center" }}><div style={{ borderTop:"1px solid #000", width:180, marginBottom:4 }}></div><div style={{ fontSize:11 }}>Sana: {p.sana}</div></div>
          <div style={{ textAlign:"center" }}><div style={{ borderTop:"1px solid #000", width:180, marginBottom:4 }}></div><div style={{ fontSize:11 }}>Bemor imzosi</div></div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  RETSEPT CHOP
// ══════════════════════════════════════════════════════════
function RetseptPrint({ p, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#fff", zIndex:500, overflow:"auto" }}>
      <div style={{ background:"#1558A6", color:"#fff", padding:"12px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }} className="no-print">
        <div style={{ fontWeight:800 }}>💊 Dori Retsepti</div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => window.print()} style={{ ...btn("#fff","#1558A6"), fontWeight:800 }}>🖨️ Chop etish</button>
          <button onClick={onClose} style={{ ...btn("rgba(255,255,255,0.15)") }}>✕</button>
        </div>
      </div>
      <style>{`@media print { .no-print { display:none!important; } @page { margin:15mm; size: A5; } }`}</style>
      <div style={{ maxWidth:500, margin:"0 auto", padding:"24px 32px", fontFamily:"'Times New Roman', serif" }}>
        <div style={{ textAlign:"center", borderBottom:"2px solid #000", paddingBottom:12, marginBottom:16 }}>
          <div style={{ fontSize:18, fontWeight:700 }}>KO'Z KLINIKASI</div>
          <div style={{ fontSize:13 }}>DORI RETSEPTI (Rp.)</div>
        </div>
        <table style={{ width:"100%", marginBottom:14, fontSize:13 }}><tbody>
          <tr><td style={{ fontWeight:600, width:"40%", paddingBottom:6 }}>Bemor:</td><td>{p.fish||"—"}</td></tr>
          <tr><td style={{ fontWeight:600, paddingBottom:6 }}>Tug'ilgan sana:</td><td>{p.tugildan||"—"}</td></tr>
          <tr><td style={{ fontWeight:600, paddingBottom:6 }}>Sana:</td><td>{p.sana}</td></tr>
          <tr><td style={{ fontWeight:600 }}>Shifokor:</td><td>{p.shifokor||"—"}</td></tr>
        </tbody></table>
        <div style={{ borderTop:"1px solid #000", borderBottom:"1px solid #000", padding:"12px 0", marginBottom:14 }}>
          {(p.dorilar||[]).map((d,i) => (
            <div key={i} style={{ marginBottom:12, paddingBottom:12, borderBottom:i<p.dorilar.length-1?"1px dashed #ccc":"none" }}>
              <div style={{ fontWeight:700, fontSize:14 }}>Rp. {d.nomi}</div>
              <div style={{ fontSize:13, marginTop:4 }}>
                {d.doza && <div>Doza: {d.doza}</div>}
                {d.chastota && <div>Chastota: {d.chastota}</div>}
                {d.davomiylik && <div>Davomiylik: {d.davomiylik}</div>}
                {d.izoh && <div style={{ fontStyle:"italic", marginTop:3 }}>* {d.izoh}</div>}
              </div>
            </div>
          ))}
          {(!p.dorilar || p.dorilar.length===0) && <div style={{ color:"#666", fontStyle:"italic" }}>Dori tayinlanmagan</div>}
        </div>
        {p.nazorat_sana && <div style={{ fontSize:13, marginBottom:8 }}><strong>Keyingi ko'rik:</strong> {p.nazorat_sana}</div>}
        {p.nazorat_izoh && <div style={{ fontSize:13, marginBottom:8 }}><strong>Ko'rsatma:</strong> {p.nazorat_izoh}</div>}
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:32 }}>
          <div><div style={{ borderTop:"1px solid #000", width:160, marginBottom:4 }}></div><div style={{ fontSize:11 }}>Shifokor imzosi</div></div>
          <div style={{ textAlign:"right" }}><div style={{ borderTop:"1px solid #000", width:120, marginBottom:4 }}></div><div style={{ fontSize:11 }}>Muhri</div></div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  ASOSIY KOMPONENT
// ══════════════════════════════════════════════════════════
export default function VisionEMR() {
  const [tab, setTab] = useState("dashboard");
  const [patients, setPatients] = useState([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  const [form, setForm] = useState(null);
  const [edit, setEdit] = useState(false);
  const [sec, setSec] = useState("shaxsiy");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [showDori, setShowDori] = useState(false);
  const [showOp, setShowOp] = useState(false);
  const [newDori, setNewDori] = useState({ nomi:"", doza:"", chastota:"", davomiylik:"", izoh:"" });
  const [newOp, setNewOp] = useState({ sana:"", tur:"", shifokor:"", natija:"" });
  const [tashxisInfo, setTashxisInfo] = useState(null);
  const [printMode, setPrintMode] = useState(null); // "full" | "retsept"
  const [searchDori, setSearchDori] = useState("");

  const toast_ = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // ── SUPABASE: MA'LUMOTLARNI YUKLASH ──
  const loadPatients = useCallback(async () => {
    setDbLoading(true);
    const { data, error } = await supabase
      .from("bemorlar")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setDbError(true);
      setDbLoading(false);
      return;
    }
    // JSON maydonlarni parse qilish
    const parsed = (data || []).map(p => ({
      ...emptyP(),
      ...p,
      koz_od: typeof p.koz_od === "string" ? JSON.parse(p.koz_od || "{}") : (p.koz_od || {}),
      koz_os: typeof p.koz_os === "string" ? JSON.parse(p.koz_os || "{}") : (p.koz_os || {}),
      dorilar: typeof p.dorilar === "string" ? JSON.parse(p.dorilar || "[]") : (p.dorilar || []),
      operatsiyalar: typeof p.operatsiyalar === "string" ? JSON.parse(p.operatsiyalar || "[]") : (p.operatsiyalar || []),
    }));
    setPatients(parsed);
    setDbLoading(false);
  }, []);

  useEffect(() => { loadPatients(); }, [loadPatients]);

  const sf = (k,v) => setForm(prev => ({...prev,[k]:v}));
  const setKH = (eye,param,val) => {
    const k = eye==="od"?"koz_od":"koz_os";
    setForm(prev => ({...prev,[k]:{...prev[k],[param]: prev[k][param]===val?"":val}}));
  };

  const openP = (p, e=false) => { setForm({...p}); setEdit(e); setSec("shaxsiy"); setTab("emr"); };
  const newP = () => { setForm(emptyP()); setEdit(true); setSec("shaxsiy"); setTab("emr"); };

  const saveP = async () => {
    const payload = {
      fish: form.fish, tugildan: form.tugildan, jinsi: form.jinsi,
      tel: form.tel, tel2: form.tel2, manzil: form.manzil,
      passport: form.passport, qon: form.qon, allergiya: form.allergiya,
      kasb: form.kasb, shikoyat: form.shikoyat, anamnez: form.anamnez,
      sana: form.sana, holat: form.holat, shifokor: form.shifokor,
      koz_od: JSON.stringify(form.koz_od || {}),
      koz_os: JSON.stringify(form.koz_os || {}),
      koz_od_izoh: form.koz_od_izoh, koz_os_izoh: form.koz_os_izoh,
      v_od_uz: form.v_od_uz, v_os_uz: form.v_os_uz,
      v_od_yq: form.v_od_yq, v_os_yq: form.v_os_yq,
      v_od_k: form.v_od_k, v_os_k: form.v_os_k,
      iop_od: form.iop_od, iop_os: form.iop_os,
      iop_vaqt: form.iop_vaqt, iop_usul: form.iop_usul,
      r_od_sf: form.r_od_sf, r_od_si: form.r_od_si, r_od_ak: form.r_od_ak, r_od_ad: form.r_od_ad,
      r_os_sf: form.r_os_sf, r_os_si: form.r_os_si, r_os_ak: form.r_os_ak, r_os_ad: form.r_os_ad,
      schirmer_od: form.schirmer_od, schirmer_os: form.schirmer_os,
      but_od: form.but_od, but_os: form.but_os,
      pachim_od: form.pachim_od, pachim_os: form.pachim_os,
      biomikro: form.biomikro, oftalmo: form.oftalmo, perimetr: form.perimetr,
      tx_od: form.tx_od, tx_os: form.tx_os,
      tx_dar_od: form.tx_dar_od, tx_dar_os: form.tx_dar_os,
      mkb_od: form.mkb_od, mkb_os: form.mkb_os,
      klinik_izoh: form.klinik_izoh, davolash: form.davolash,
      nazorat_sana: form.nazorat_sana, nazorat_izoh: form.nazorat_izoh,
      retsept_tur: form.retsept_tur,
      rt_od_sf: form.rt_od_sf, rt_od_si: form.rt_od_si, rt_od_ak: form.rt_od_ak, rt_od_ad: form.rt_od_ad, rt_od_pd: form.rt_od_pd,
      rt_os_sf: form.rt_os_sf, rt_os_si: form.rt_os_si, rt_os_ak: form.rt_os_ak, rt_os_ad: form.rt_os_ad, rt_os_pd: form.rt_os_pd,
      retsept_izoh: form.retsept_izoh,
      dorilar: JSON.stringify(form.dorilar || []),
      operatsiyalar: JSON.stringify(form.operatsiyalar || []),
    };

    if (!form.id || typeof form.id === "number") {
      // Yangi bemor
      const { data, error } = await supabase.from("bemorlar").insert([payload]).select().single();
      if (error) { toast_("Xatolik: " + error.message, "danger"); return; }
      setForm({ ...form, id: data.id });
    } else {
      // Mavjud bemor yangilash
      const { error } = await supabase.from("bemorlar").update(payload).eq("id", form.id);
      if (error) { toast_("Xatolik: " + error.message, "danger"); return; }
    }
    setEdit(false);
    toast_("Saqlandi ✓");
    loadPatients();
  };

  const filtered = patients.filter(p =>
    (p.fish||"").toLowerCase().includes(search.toLowerCase()) ||
    (p.tel||"").includes(search) ||
    (p.tx_od||"").toLowerCase().includes(search.toLowerCase()) ||
    (p.tx_os||"").toLowerCase().includes(search.toLowerCase())
  );

  const deleteP = async (id) => {
    if (typeof id !== "number") {
      const { error } = await supabase.from("bemorlar").delete().eq("id", id);
      if (error) { toast_("O'chirishda xatolik", "danger"); return; }
    }
    setPatients(prev => prev.filter(p => p.id !== id));
    if (form?.id === id) { setForm(null); setTab("patients"); }
    toast_("Bemor o'chirildi", "danger");
  };

  const stats = {
    jami:patients.length,
    bugun:patients.filter(p=>p.sana===new Date().toISOString().slice(0,10)).length,
    yangi:patients.filter(p=>p.holat==="Yangi").length,
    qabul:patients.filter(p=>p.holat==="Qabul qilindi").length,
    yakunlandi:patients.filter(p=>p.holat==="Yakunlandi").length,
  };

  // Print
  if (printMode === "full" && form) return <PrintView p={form} onClose={() => setPrintMode(null)} />;
  if (printMode === "retsept" && form) return <RetseptPrint p={form} onClose={() => setPrintMode(null)} />;

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Inter',system-ui,sans-serif", background:C.bg, color:C.text }}>

      {/* Toast */}
      {toast && <div style={{ position:"fixed",top:20,right:20,zIndex:999,background:toast.type==="danger"?C.red:C.green,color:"#fff",padding:"12px 22px",borderRadius:10,fontSize:14,fontWeight:700,boxShadow:"0 4px 24px rgba(0,0,0,0.18)" }}>{toast.msg}</div>}

      {/* Tashxis info modal */}
      {tashxisInfo && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:C.white,borderRadius:16,padding:28,width:640,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18 }}>
              <div>
                <div style={{ fontSize:19,fontWeight:800 }}>{tashxisInfo.nom}</div>
                <div style={{ fontSize:13,color:C.textLight }}>MKB-10: {tashxisInfo.info.mkb}</div>
              </div>
              <button onClick={()=>setTashxisInfo(null)} style={{ ...btn(C.bg,C.textMid),padding:"6px 12px" }}>✕</button>
            </div>
            {[
              {icon:"🔢",t:"Darajalar",d:tashxisInfo.info.daraja},
              {icon:"🔍",t:"Klinik belgilar",d:[tashxisInfo.info.belgilar]},
              {icon:"💡",t:"Sabab",d:[tashxisInfo.info.sabab]},
              {icon:"⚕️",t:"Davolash usullari",d:tashxisInfo.info.davolash},
              {icon:"💊",t:"Tayinlanadigan dorilar",d:tashxisInfo.info.dorilar},
              {icon:"📅",t:"Nazorat",d:[tashxisInfo.info.nazorat]},
              {icon:"⚠️",t:"Ehtiyot choralari",d:[tashxisInfo.info.ehtiyot]},
            ].map(s=>(
              <div key={s.t} style={{ marginBottom:14 }}>
                <div style={{ fontWeight:700,fontSize:13,color:C.primary,marginBottom:6 }}>{s.icon} {s.t}</div>
                {s.d.map((item,i)=><div key={i} style={{ padding:"6px 12px",background:C.bg,borderRadius:6,fontSize:13,marginBottom:4 }}>• {item}</div>)}
              </div>
            ))}
            <div style={{ display:"flex",gap:10,marginTop:8 }}>
              <button onClick={()=>{
                if(form&&edit){sf("tx_od",tashxisInfo.nom);sf("mkb_od",tashxisInfo.info.mkb);sf("tx_dar_od",tashxisInfo.info.daraja[0]);}
                setTashxisInfo(null); toast_(`"${tashxisInfo.nom}" OD uchun qo'llandi`);
              }} style={{ ...btn(),flex:1,justifyContent:"center" }}>✓ OD tashxis</button>
              <button onClick={()=>{
                if(form&&edit){sf("tx_os",tashxisInfo.nom);sf("mkb_os",tashxisInfo.info.mkb);sf("tx_dar_os",tashxisInfo.info.daraja[0]);}
                setTashxisInfo(null); toast_(`"${tashxisInfo.nom}" OS uchun qo'llandi`);
              }} style={{ ...btn(C.teal),flex:1,justifyContent:"center" }}>✓ OS tashxis</button>
            </div>
          </div>
        </div>
      )}

      {/* Dori modal */}
      {showDori && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:C.white,borderRadius:16,padding:28,width:520,maxHeight:"90vh",overflowY:"auto" }}>
            <h3 style={{ fontWeight:800,fontSize:17,marginBottom:18 }}>💊 Dori tayinlash</h3>
            <div style={{ marginBottom:12 }}>
              <label style={lbl}>Dori nomi (yozing yoki quyidan tanlang)</label>
              <input value={newDori.nomi} onChange={e=>setNewDori({...newDori,nomi:e.target.value})} list="dl" placeholder="Dori nomini yozing..." style={inp} />
              <datalist id="dl">{Object.values(DORILAR).flat().map(d=><option key={d} value={d}/>)}</datalist>
            </div>
            <div style={{ marginBottom:14 }}>
              <input value={searchDori} onChange={e=>setSearchDori(e.target.value)} placeholder="🔍 Guruh bo'yicha qidirish..." style={{ ...inp,marginBottom:8 }} />
              <div style={{ maxHeight:160,overflowY:"auto",display:"flex",flexWrap:"wrap",gap:5 }}>
                {Object.entries(DORILAR).map(([g,ds])=>ds.filter(d=>d.toLowerCase().includes(searchDori.toLowerCase())||g.toLowerCase().includes(searchDori.toLowerCase())).map(d=>(
                  <button key={d} onClick={()=>setNewDori({...newDori,nomi:d})} style={{ padding:"3px 10px",borderRadius:6,fontSize:12,cursor:"pointer",border:`1px solid ${newDori.nomi===d?C.primary:C.border}`,background:newDori.nomi===d?C.primaryLight:C.white,color:newDori.nomi===d?C.primary:C.textMid,fontWeight:newDori.nomi===d?700:400 }}>{d}</button>
                )))}
              </div>
            </div>
            {[{l:"Doza",k:"doza",ph:"1 tomchi"},{l:"Chastota",k:"chastota",ph:"4 marta kuniga"},{l:"Davomiylik",k:"davomiylik",ph:"7 kun"},{l:"Ko'rsatma",k:"izoh",ph:"Ovqatdan keyin..."}].map(f=>(
              <div key={f.k} style={{ marginBottom:10 }}>
                <label style={lbl}>{f.l}</label>
                <input value={newDori[f.k]} onChange={e=>setNewDori({...newDori,[f.k]:e.target.value})} placeholder={f.ph} style={inp} />
              </div>
            ))}
            <div style={{ display:"flex",gap:10,marginTop:16 }}>
              <button onClick={()=>{
                if(!newDori.nomi)return;
                sf("dorilar",[...(form.dorilar||[]),{...newDori,id:Date.now()}]);
                setNewDori({nomi:"",doza:"",chastota:"",davomiylik:"",izoh:""});
                setShowDori(false); toast_("Dori tayinlandi ✓");
              }} style={{ ...btn(),flex:1,justifyContent:"center" }}>💊 Tayinlash</button>
              <button onClick={()=>setShowDori(false)} style={{ ...btn(C.bg,C.textMid),flex:1,justifyContent:"center",border:`1px solid ${C.border}` }}>Bekor</button>
            </div>
          </div>
        </div>
      )}

      {/* Operatsiya modal */}
      {showOp && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:C.white,borderRadius:16,padding:28,width:440 }}>
            <h3 style={{ fontWeight:800,fontSize:17,marginBottom:18 }}>⚕️ Operatsiya qo'shish</h3>
            <div style={{ marginBottom:12 }}>
              <label style={lbl}>Operatsiya turi</label>
              <select value={newOp.tur} onChange={e=>setNewOp({...newOp,tur:e.target.value})} style={inp}>
                <option value="">— Tanlang —</option>
                {["LASIK","PRK","Fakoemulsifikatsiya (katarakta)","Trabekulektomiya (glaukoma)","Retina operatsiyasi","Strabizm korreksiyasi","Ptoz korreksiyasi","Keratoplastika","Vitrektomiya","CXL (Cross-Linking)","ICRS halqalar","Pterigium rezeksiyasi","Xalazion ektomiya","Lazer fotokoagulyatsiya","Anti-VEGF injeksiya","SLT lazer"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            {[{l:"Sana",k:"sana",type:"date"},{l:"Jarroh",k:"shifokor",ph:"Dr. ..."},{l:"Natija",k:"natija",ph:"Natija va izoh..."}].map(f=>(
              <div key={f.k} style={{ marginBottom:10 }}>
                <label style={lbl}>{f.l}</label>
                <input type={f.type||"text"} value={newOp[f.k]} onChange={e=>setNewOp({...newOp,[f.k]:e.target.value})} placeholder={f.ph} style={inp} />
              </div>
            ))}
            <div style={{ display:"flex",gap:10,marginTop:16 }}>
              <button onClick={()=>{
                if(!newOp.tur)return;
                sf("operatsiyalar",[...(form.operatsiyalar||[]),{...newOp,id:Date.now()}]);
                setNewOp({sana:"",tur:"",shifokor:"",natija:""});
                setShowOp(false); toast_("Operatsiya qo'shildi ✓");
              }} style={{ ...btn(C.green),flex:1,justifyContent:"center" }}>Saqlash</button>
              <button onClick={()=>setShowOp(false)} style={{ ...btn(C.bg,C.textMid),flex:1,justifyContent:"center",border:`1px solid ${C.border}` }}>Bekor</button>
            </div>
          </div>
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{ width:226,background:C.sidebar,color:"#fff",display:"flex",flexDirection:"column",flexShrink:0 }}>
        <div style={{ padding:"22px 18px 18px",borderBottom:"1px solid #1A3355" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:42,height:42,background:C.primary,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>👁️</div>
            <div>
              <div style={{ fontWeight:800,fontSize:16 }}>VisionEMR</div>
              <div style={{ fontSize:11,color:"#4A8FD4" }}>Ko'z klinikasi · Pro</div>
            </div>
          </div>
        </div>
        <nav style={{ padding:"14px 10px",flex:1 }}>
          {[
            {key:"dashboard",icon:"📊",label:"Bosh sahifa"},
            {key:"patients",icon:"👥",label:"Bemorlar"},
            {key:"emr",icon:"📋",label:"EMR kartochka",disabled:!form},
            {key:"dorilar",icon:"💊",label:"Dorilar bazasi"},
            {key:"kasalliklar",icon:"🩺",label:"Kasalliklar"},
          ].map(item=>(
            <button key={item.key} onClick={()=>!item.disabled&&setTab(item.key)} disabled={item.disabled} style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 14px",background:tab===item.key?C.primary:"transparent",color:item.disabled?"#2A4568":tab===item.key?"#fff":"#8BACC8",border:"none",borderRadius:8,cursor:item.disabled?"not-allowed":"pointer",fontSize:14,fontWeight:tab===item.key?700:400,marginBottom:3,textAlign:"left" }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        {form?.fish && (
          <div style={{ padding:"12px 16px",margin:"0 10px 14px",background:"#1A3355",borderRadius:10 }}>
            <div style={{ fontSize:10,color:"#4A7FA8",marginBottom:3,textTransform:"uppercase" }}>Ochiq bemor</div>
            <div style={{ fontSize:13,fontWeight:700,color:"#CBD5E1" }}>{form.fish.split(" ").slice(0,2).join(" ")||"Yangi bemor"}</div>
            <div style={{ fontSize:11,color:"#4A7FA8",marginTop:2 }}>{form.holat}</div>
          </div>
        )}
        <div style={{ padding:"12px 18px",borderTop:"1px solid #1A2D3D",fontSize:11,color:"#2A4568" }}>© 2026 VisionEMR Pro</div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex:1,overflow:"auto",padding:"26px 30px" }}>

        {/* ══ DASHBOARD ══ */}
        {tab==="dashboard" && (
          <div>
            <h1 style={{ fontSize:26,fontWeight:800,letterSpacing:"-0.5px",marginBottom:4 }}>Bosh sahifa</h1>
            <p style={{ color:C.textLight,fontSize:14,marginBottom:24 }}>{new Date().toLocaleDateString("uz-UZ",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            {dbError && <div style={{ background:C.redLight,border:`1px solid ${C.red}`,borderRadius:10,padding:"12px 18px",marginBottom:16,fontSize:14,color:C.red }}>⚠️ Supabase ulanmadi. Internet aloqasini tekshiring.</div>}
            {dbLoading ? <div style={{ textAlign:"center",padding:60,color:C.textFaint }}><div style={{ fontSize:32,marginBottom:8 }}>⏳</div>Ma'lumotlar yuklanmoqda...</div> : (<>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:24 }}>
              {[
                {l:"Jami",v:stats.jami,icon:"👥",c:C.primary,bg:C.primaryLight},
                {l:"Bugun",v:stats.bugun,icon:"📅",c:C.purple,bg:C.purpleLight},
                {l:"Yangi",v:stats.yangi,icon:"🆕",c:C.amber,bg:C.amberLight},
                {l:"Jarayonda",v:stats.qabul,icon:"🔄",c:C.teal,bg:C.tealLight},
                {l:"Yakunlandi",v:stats.yakunlandi,icon:"✅",c:C.green,bg:C.greenLight},
              ].map(s=>(
                <div key={s.l} style={{ background:C.white,borderRadius:12,padding:"18px 20px",boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                    <div style={{ width:36,height:36,background:s.bg,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>{s.icon}</div>
                    <span style={{ fontSize:28,fontWeight:800,color:s.c }}>{s.v}</span>
                  </div>
                  <div style={{ fontSize:12,color:C.textLight,fontWeight:600 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:18 }}>
              <div style={card}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                  <h3 style={{ fontSize:15,fontWeight:700 }}>So'nggi bemorlar</h3>
                  <button onClick={newP} style={btn()}>+ Yangi bemor</button>
                </div>
                {patients.slice(0,6).map(p=>(
                  <div key={p.id} onClick={()=>openP(p)} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer" }}>
                    <div>
                      <div style={{ fontWeight:600,fontSize:14 }}>{p.fish||"—"}</div>
                      <div style={{ fontSize:12,color:C.textLight }}>{p.tx_od||"Tashxis yo'q"} · {p.sana}</div>
                    </div>
                    <SBadge status={p.holat}/>
                  </div>
                ))}
              </div>
              <div style={card}>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:14 }}>Tezkor harakatlar</h3>
                {[
                  {icon:"➕",l:"Yangi bemor",a:newP,c:C.primary},
                  {icon:"🩺",l:"Kasalliklar",a:()=>setTab("kasalliklar"),c:C.teal},
                  {icon:"💊",l:"Dorilar bazasi",a:()=>setTab("dorilar"),c:C.purple},
                ].map(a=>(
                  <button key={a.l} onClick={a.a} style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 14px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,cursor:"pointer",marginBottom:8 }}>
                    <span style={{ fontSize:20 }}>{a.icon}</span>
                    <span style={{ fontSize:14,fontWeight:600,color:a.c }}>{a.l}</span>
                  </button>
                ))}
              </div>
            </div>
            </>)}
          </div>
        )}

        {/* ══ BEMORLAR ══ */}
        {tab==="patients" && (
          <div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <div>
                <h1 style={{ fontSize:24,fontWeight:800,marginBottom:4 }}>Bemorlar</h1>
                <p style={{ color:C.textLight,fontSize:14 }}>Jami {patients.length} ta bemor</p>
              </div>
              <button onClick={newP} style={btn()}>+ Yangi bemor</button>
            </div>
            <input placeholder="🔍  F.I.SH, telefon yoki tashxis..." value={search} onChange={e=>setSearch(e.target.value)} style={{ ...inp,marginBottom:16,padding:"11px 16px" }}/>
            <div style={{ background:C.white,borderRadius:14,boxShadow:"0 1px 6px rgba(0,0,0,0.06)",overflow:"hidden" }}>
              <table style={{ width:"100%",borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:C.bg }}>
                    {["Bemor","Telefon","Tashxis OD/OS","Shifokor","Sana","Holat",""].map(h=>(
                      <th key={h} style={{ textAlign:"left",padding:"11px 16px",fontSize:11,color:C.textFaint,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length===0 && (
                    <tr><td colSpan={7} style={{ textAlign:"center",padding:48,color:C.textFaint }}>
                      <div style={{ fontSize:32,marginBottom:8 }}>👥</div>
                      {search?"Topilmadi":"Hali bemor qo'shilmagan"}
                    </td></tr>
                  )}
                  {filtered.map(p=>(
                    <tr key={p.id} onClick={()=>openP(p)} style={{ borderBottom:`1px solid ${C.borderLight}`,cursor:"pointer" }}>
                      <td style={{ padding:"13px 16px" }}>
                        <div style={{ fontWeight:700,fontSize:14 }}>{p.fish||<span style={{ color:C.textFaint }}>—</span>}</div>
                        <div style={{ fontSize:12,color:C.textFaint }}>{p.jinsi}</div>
                      </td>
                      <td style={{ padding:"13px 16px",fontSize:13,color:C.textMid }}>{p.tel||"—"}</td>
                      <td style={{ padding:"13px 16px",fontSize:13 }}>
                        {p.tx_od && <div style={{ color:C.primary,fontWeight:600 }}>{p.tx_od}</div>}
                        {p.tx_os && p.tx_os!==p.tx_od && <div style={{ color:C.teal,fontSize:12 }}>{p.tx_os}</div>}
                        {!p.tx_od && !p.tx_os && <span style={{ color:C.textFaint }}>—</span>}
                      </td>
                      <td style={{ padding:"13px 16px",fontSize:13,color:C.textMid }}>{p.shifokor||"—"}</td>
                      <td style={{ padding:"13px 16px",fontSize:12,color:C.textFaint }}>{p.sana}</td>
                      <td style={{ padding:"13px 16px" }}><SBadge status={p.holat}/></td>
                      <td style={{ padding:"13px 16px" }}>
                        <button onClick={e=>{e.stopPropagation();if(window.confirm("O'chirishni tasdiqlaysizmi?"))deleteP(p.id);}} style={{ background:C.redLight,color:C.red,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,cursor:"pointer",fontWeight:600 }}>O'chir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ EMR ══ */}
        {tab==="emr" && form && (
          <div>
            {/* Header */}
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20 }}>
              <div>
                <button onClick={()=>setTab("patients")} style={{ background:"none",border:"none",color:C.primary,cursor:"pointer",fontSize:14,fontWeight:700,padding:0,marginBottom:6 }}>← Bemorlar ro'yxati</button>
                <h1 style={{ fontSize:22,fontWeight:800,marginBottom:2 }}>{form.fish||"Yangi bemor"}</h1>
                <div style={{ fontSize:13,color:C.textLight }}>{form.sana} · {form.shifokor||"Shifokor tayinlanmagan"}</div>
              </div>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end" }}>
                <button onClick={()=>setPrintMode("full")} style={{ ...btn(C.purple)}}><span>🖨️</span> To'liq chop</button>
                <button onClick={()=>setPrintMode("retsept")} style={{ ...btn(C.teal)}}><span>💊</span> Retsept chop</button>
                {!edit
                  ? <button onClick={()=>setEdit(true)} style={btn()}>✏️ Tahrirlash</button>
                  : <>
                    <button onClick={()=>{setForm(patients.find(p=>p.id===form.id)||form);setEdit(false);}} style={{ ...btn(C.bg,C.textMid),border:`1px solid ${C.border}` }}>Bekor</button>
                    <button onClick={saveP} style={btn(C.green)}>💾 Saqlash</button>
                  </>
                }
              </div>
            </div>

            {/* Section tablar */}
            <div style={{ display:"flex",gap:3,marginBottom:20,background:C.white,padding:5,borderRadius:10,boxShadow:"0 1px 6px rgba(0,0,0,0.06)",flexWrap:"wrap",width:"fit-content" }}>
              {[
                {key:"shaxsiy",icon:"👤",label:"Shaxsiy"},
                {key:"koz",icon:"🔍",label:"Ko'z holati"},
                {key:"tekshiruv",icon:"📏",label:"Tekshiruv"},
                {key:"tashxis",icon:"🩺",label:"Tashxis"},
                {key:"davolash",icon:"⚕️",label:"Davolash"},
                {key:"retsept",icon:"📝",label:"Retsept"},
                {key:"operatsiya",icon:"🔬",label:"Operatsiya"},
              ].map(s=>(
                <button key={s.key} onClick={()=>setSec(s.key)} style={{ padding:"8px 14px",borderRadius:7,border:"none",background:sec===s.key?C.primary:"transparent",color:sec===s.key?"#fff":C.textMid,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            {/* ── SHAXSIY ── */}
            {sec==="shaxsiy" && (
              <div style={card}>
                <ST icon="👤" title="Shaxsiy ma'lumotlar"/>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14 }}>
                  <FF label="F.I.SH" k="fish" f={form} set={sf} e={edit} s={3} ph="Familiya Ism Sharif" hint="Pasport bo'yicha to'liq"/>
                  <FF label="Tug'ilgan sana" k="tugildan" f={form} set={sf} e={edit} type="date"/>
                  <FF label="Jinsi" k="jinsi" f={form} set={sf} e={edit} type="select" opts={["Erkak","Ayol"]}/>
                  <FF label="Holat" k="holat" f={form} set={sf} e={edit} type="select" opts={["Yangi","Qabul qilindi","Yakunlandi"]}/>
                  <FF label="Telefon" k="tel" f={form} set={sf} e={edit} ph="+998 XX XXX XX XX"/>
                  <FF label="Qo'shimcha tel" k="tel2" f={form} set={sf} e={edit} ph="+998 XX XXX XX XX"/>
                  <FF label="Kasb" k="kasb" f={form} set={sf} e={edit} ph="Kompyuterdagi ish, haydovchi..." hint="Ekran vaqti va fizik faoliyat ahamiyatli"/>
                  <FF label="Passport" k="passport" f={form} set={sf} e={edit} ph="AB 1234567"/>
                  <FF label="Qon guruhi" k="qon" f={form} set={sf} e={edit} type="select" opts={["—","I(O)+","I(O)−","II(A)+","II(A)−","III(B)+","III(B)−","IV(AB)+","IV(AB)−"]}/>
                  <FF label="Shifokor" k="shifokor" f={form} set={sf} e={edit} type="select" opts={SHIFOKORLAR}/>
                  <FF label="Murojaat sanasi" k="sana" f={form} set={sf} e={edit} type="date"/>
                  <FF label="Manzil" k="manzil" f={form} set={sf} e={edit} s={3} ph="Viloyat, tuman, ko'cha..."/>
                  <FF label="Allergiya" k="allergiya" f={form} set={sf} e={edit} s={2} ph="Penitsillin, BAK konservant..." hint="Ko'z tomchilarida konservantlar ham allergiya qiladi"/>
                  <FF label="Asosiy shikoyat" k="shikoyat" f={form} set={sf} e={edit} ph="Ko'z og'rig'i, xiralashish..."/>
                  <FF label="Kasallik tarixi (Anamnez)" k="anamnez" f={form} set={sf} e={edit} type="textarea" s={3} ph="Qachondan? Avval davolanganmi? Oilada shunaqa kasallik bormi? Diabet, gipertenziya..."/>
                </div>
              </div>
            )}

            {/* ── KO'Z HOLATI ── */}
            {sec==="koz" && (
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18 }}>
                {["od","os"].map(eye=>(
                  <div key={eye} style={card}>
                    <ST icon={eye==="od"?"🔵":"🟢"} title={eye==="od"?"O'ng ko'z — OD":"Chap ko'z — OS"} color={eye==="od"?C.primary:C.teal}/>
                    {Object.entries(KOZ_HOLATI).map(([param,opts])=>{
                      const cur = form[eye==="od"?"koz_od":"koz_os"][param];
                      return (
                        <div key={param} style={{ marginBottom:12 }}>
                          <label style={{ ...lbl,color:eye==="od"?C.primary:C.teal }}>{param}</label>
                          {edit
                            ? <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                              {opts.map(opt=>(
                                <button key={opt} onClick={()=>setKH(eye,param,opt)} style={{ padding:"4px 10px",borderRadius:6,fontSize:12,cursor:"pointer",border:`1.5px solid ${cur===opt?(eye==="od"?C.primary:C.teal):C.border}`,background:cur===opt?(eye==="od"?C.primaryLight:C.tealLight):C.white,color:cur===opt?(eye==="od"?C.primary:C.teal):C.textMid,fontWeight:cur===opt?700:400 }}>{opt}</button>
                              ))}
                            </div>
                            : <div style={{ padding:"8px 12px",background:C.bg,borderRadius:7,fontSize:13,fontWeight:cur&&cur!=="Normal"?700:400,color:cur==="Normal"?C.green:cur?(eye==="od"?C.primary:C.teal):C.textFaint }}>{cur||"—"}</div>
                          }
                        </div>
                      );
                    })}
                    <FF label="Biomikroskopiya izohi" k={eye==="od"?"koz_od_izoh":"koz_os_izoh"} f={form} set={sf} e={edit} type="textarea" ph="Qo'shimcha topilmalar..."/>
                  </div>
                ))}
              </div>
            )}

            {/* ── TEKSHIRUV ── */}
            {sec==="tekshiruv" && (
              <div>
                {/* Visus */}
                <div style={card}>
                  <ST icon="👁️" title="Ko'rish o'tkirligi (Visus)"/>
                  <table style={{ width:"100%",borderCollapse:"collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign:"left",padding:"8px 12px",fontSize:11,color:C.textFaint,fontWeight:700,textTransform:"uppercase" }}>Ko'rsatkich</th>
                        <th style={{ textAlign:"center",padding:"8px 12px",fontSize:11,color:C.primary,fontWeight:700,textTransform:"uppercase" }}>OD — O'ng ko'z</th>
                        <th style={{ textAlign:"center",padding:"8px 12px",fontSize:11,color:C.teal,fontWeight:700,textTransform:"uppercase" }}>OS — Chap ko'z</th>
                        <th style={{ padding:"8px 12px",fontSize:11,color:C.textFaint,fontWeight:700,textTransform:"uppercase" }}>Baho</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {l:"Uzoqda (korreksiyasiz)",od:"v_od_uz",os:"v_os_uz"},
                        {l:"Yaqinda (korreksiyasiz)",od:"v_od_yq",os:"v_os_yq"},
                        {l:"Korreksiya bilan",od:"v_od_k",os:"v_os_k"},
                      ].map(row=>{
                        const tOD=visus_tip(form[row.od]);
                        return (
                          <tr key={row.l} style={{ borderBottom:`1px solid ${C.borderLight}` }}>
                            <td style={{ padding:"12px",fontSize:14,fontWeight:500 }}>{row.l}</td>
                            <td style={{ padding:"12px",textAlign:"center" }}>
                              {edit
                                ? <select value={form[row.od]||""} onChange={e=>sf(row.od,e.target.value)} style={{ ...inp,width:110,textAlign:"center",fontWeight:700,color:C.primary }}>
                                  {VISUS_VAL.map(v=><option key={v}>{v||"—"}</option>)}
                                </select>
                                : <span style={{ fontSize:20,fontWeight:800,color:C.primary }}>{form[row.od]||"—"}</span>
                              }
                            </td>
                            <td style={{ padding:"12px",textAlign:"center" }}>
                              {edit
                                ? <select value={form[row.os]||""} onChange={e=>sf(row.os,e.target.value)} style={{ ...inp,width:110,textAlign:"center",fontWeight:700,color:C.teal }}>
                                  {VISUS_VAL.map(v=><option key={v}>{v||"—"}</option>)}
                                </select>
                                : <span style={{ fontSize:20,fontWeight:800,color:C.teal }}>{form[row.os]||"—"}</span>
                              }
                            </td>
                            <td style={{ padding:"12px" }}>{tOD&&<Tip tip={tOD}/>}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* IOP */}
                <div style={card}>
                  <ST icon="📏" title="Ko'z ichi bosimi — Tonometriya (mmHg)"/>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16 }}>
                    <FF label="O'lchash usuli" k="iop_usul" f={form} set={sf} e={edit} type="select" opts={["Non-kontakt (pnevmotonometr)","Goldmann applanatsiya","iCare rebound","Maklakov 5g","Maklakov 10g"]}/>
                    <FF label="O'lchash vaqti" k="iop_vaqt" f={form} set={sf} e={edit} ph="09:30" hint="IOP ertalab yuqori bo'ladi"/>
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
                    {[{l:"OD — O'ng ko'z",k:"iop_od",c:C.primary},{l:"OS — Chap ko'z",k:"iop_os",c:C.teal}].map(f=>{
                      const tip=iop_tip(form[f.k]);
                      return (
                        <div key={f.k}>
                          <label style={{ ...lbl,color:f.c }}>{f.l}</label>
                          {edit
                            ? <input type="number" min="0" max="60" value={form[f.k]} onChange={e=>sf(f.k,e.target.value)} style={{ ...inp,textAlign:"center",fontSize:24,fontWeight:800 }} placeholder="0"/>
                            : <div style={{ padding:14,background:C.bg,borderRadius:8,textAlign:"center" }}>
                              <span style={{ fontSize:28,fontWeight:900,color:f.c }}>{form[f.k]||"—"}</span>
                              <span style={{ fontSize:13,color:C.textFaint }}> mmHg</span>
                            </div>
                          }
                          {tip&&<div style={{ marginTop:8 }}><Tip tip={tip}/></div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Refraktsiya */}
                <div style={card}>
                  <ST icon="🔭" title="Refraktsiya"/>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                    {[{l:"OD — O'ng ko'z",prefix:"r_od_",c:C.primary},{l:"OS — Chap ko'z",prefix:"r_os_",c:C.teal}].map(eye=>(
                      <div key={eye.prefix} style={{ background:C.bg,borderRadius:12,padding:16 }}>
                        <div style={{ fontSize:13,fontWeight:800,color:eye.c,marginBottom:14 }}>{eye.l}</div>
                        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                          {[{l:"Sfera (D)",k:eye.prefix+"sf",ph:"-2.50",hint:"Miop: minus; Gipermetrop: plus"},{l:"Silindr (D)",k:eye.prefix+"si",ph:"-0.75",hint:"Astigmatizm miqdori"},{l:"Aks (°)",k:eye.prefix+"ak",ph:"90",hint:"0–180°"},{l:"Add (D)",k:eye.prefix+"ad",ph:"+2.00",hint:"Faqat presbyopiyada"}].map(f=>(
                            <div key={f.k}>
                              <label style={lbl}>{f.l}</label>
                              {edit
                                ? <><input value={form[f.k]||""} onChange={e=>sf(f.k,e.target.value)} placeholder={f.ph} style={{ ...inp,textAlign:"center",fontWeight:600 }}/>{f.hint&&<div style={{ fontSize:10,color:C.textFaint,marginTop:3 }}>💡 {f.hint}</div>}</>
                                : <div style={{ padding:8,background:C.white,borderRadius:7,textAlign:"center",fontWeight:700,fontSize:15,color:eye.c }}>{form[f.k]||"—"}</div>
                              }
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qo'shimcha */}
                <div style={card}>
                  <ST icon="🔬" title="Qo'shimcha tekshiruvlar"/>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                    {[{l:"Schirmer OD (mm/5daq)",k:"schirmer_od",hint:"Norma: >10. 5–10: chegaraviy. <5: quruq ko'z"},{l:"Schirmer OS",k:"schirmer_os"},{l:"BUT OD (sek)",k:"but_od",hint:"Norma: >10 sek. <10: quruq ko'z xavfi"},{l:"BUT OS",k:"but_os"},{l:"Pachimetriya OD (µm)",k:"pachim_od",hint:"Norma: 520–560µm. <480: LASIK xavfli"},{l:"Pachimetriya OS",k:"pachim_os"}].map(f=>(
                      <div key={f.k}>
                        <label style={lbl}>{f.l}</label>
                        {edit?<><input value={form[f.k]||""} onChange={e=>sf(f.k,e.target.value)} style={inp}/>{f.hint&&<div style={{ fontSize:10,color:C.textFaint,marginTop:3 }}>💡 {f.hint}</div>}</>:<div style={{ padding:"9px 12px",background:C.bg,borderRadius:7,fontSize:14,color:form[f.k]?C.text:C.textFaint }}>{form[f.k]||"—"}</div>}
                      </div>
                    ))}
                    <FF label="Biomikroskopiya" k="biomikro" f={form} set={sf} e={edit} type="textarea" ph="Oldingi kamera, linza, shoxparda holati..."/>
                    <FF label="Oftalmoskopiya" k="oftalmo" f={form} set={sf} e={edit} type="textarea" ph="Optik disk, makula, retina tomirlar..."/>
                    <FF label="Perimetriya" k="perimetr" f={form} set={sf} e={edit} type="textarea" s={2} ph="Goldmann/Humphrey. Scotoma..."/>
                  </div>
                </div>
              </div>
            )}

            {/* ── TASHXIS ── */}
            {sec==="tashxis" && (
              <div style={card}>
                <ST icon="🩺" title="Tashxis"/>
                <div style={{ background:C.primaryLight,borderRadius:10,padding:"12px 16px",marginBottom:18,fontSize:13,color:C.primary }}>
                  💡 Tashxis tanlang → <strong>ℹ️</strong> tugmasi bilan to'liq ma'lumot (belgilar, davolash, dorilar) ko'ring va bir tugma bilan qo'llang
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:18 }}>
                  {[{l:"OD — O'ng ko'z",tk:"tx_od",dk:"tx_dar_od",mk:"mkb_od",c:C.primary},{l:"OS — Chap ko'z",tk:"tx_os",dk:"tx_dar_os",mk:"mkb_os",c:C.teal}].map(eye=>{
                    const info=KASALLIKLAR[form[eye.tk]];
                    return (
                      <div key={eye.tk} style={{ background:C.bg,borderRadius:12,padding:18 }}>
                        <div style={{ fontSize:13,fontWeight:800,color:eye.c,marginBottom:12 }}>{eye.l}</div>
                        <div style={{ display:"flex",gap:8,marginBottom:info?12:0 }}>
                          {edit
                            ? <select value={form[eye.tk]||""} onChange={e=>{
                              sf(eye.tk,e.target.value);
                              const d=KASALLIKLAR[e.target.value];
                              if(d){sf(eye.mk,d.mkb);sf(eye.dk,d.daraja[0]);}
                            }} style={{ ...inp,flex:1 }}>
                              <option value="">— Tashxis tanlang —</option>
                              {Object.keys(KASALLIKLAR).map(t=><option key={t}>{t}</option>)}
                              <option value="Sog'lom">Sog'lom</option>
                            </select>
                            : <div style={{ flex:1,padding:"10px 14px",background:C.white,borderRadius:8,fontSize:14,fontWeight:700,color:eye.c }}>{form[eye.tk]||"—"}</div>
                          }
                          {form[eye.tk]&&KASALLIKLAR[form[eye.tk]]&&(
                            <button onClick={()=>setTashxisInfo({nom:form[eye.tk],info:KASALLIKLAR[form[eye.tk]]})} style={{ ...btn(C.white,C.primary),border:`1.5px solid ${C.primary}`,padding:"9px 12px" }}>ℹ️</button>
                          )}
                        </div>
                        {info&&(<>
                          <label style={lbl}>Daraja</label>
                          {edit
                            ? <select value={form[eye.dk]||""} onChange={e=>sf(eye.dk,e.target.value)} style={{ ...inp,marginBottom:10 }}>
                              <option value="">— Daraja —</option>
                              {info.daraja.map(d=><option key={d}>{d}</option>)}
                            </select>
                            : <div style={{ padding:"7px 12px",background:C.white,borderRadius:7,fontSize:13,fontWeight:600,color:eye.c,marginBottom:10 }}>{form[eye.dk]||"—"}</div>
                          }
                        </>)}
                        <FF label="MKB-10 kod" k={eye.mk} f={form} set={sf} e={edit} ph="H52.1"/>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                  <FF label="Klinik xulosa" k="klinik_izoh" f={form} set={sf} e={edit} type="textarea" ph="Differensial tashxis, qo'shimcha..."/>
                  <div>
                    <FF label="Nazorat sanasi" k="nazorat_sana" f={form} set={sf} e={edit} type="date"/>
                    {form.tx_od&&KASALLIKLAR[form.tx_od]&&<div style={{ fontSize:11,color:C.textFaint,marginTop:4 }}>💡 {KASALLIKLAR[form.tx_od].nazorat}</div>}
                  </div>
                </div>
              </div>
            )}

            {/* ── DAVOLASH ── */}
            {sec==="davolash" && (
              <div>
                <div style={card}>
                  <ST icon="⚕️" title="Davolash taktikasi"/>
                  {form.tx_od&&KASALLIKLAR[form.tx_od]&&(
                    <div style={{ background:C.primaryLight,borderRadius:10,padding:"14px 18px",marginBottom:16 }}>
                      <div style={{ fontWeight:700,fontSize:13,color:C.primary,marginBottom:8 }}>📋 "{form.tx_od}" — Tavsiya etilgan davolash usullari:</div>
                      {KASALLIKLAR[form.tx_od].davolash.map((d,i)=><div key={i} style={{ fontSize:13,marginBottom:4,color:C.textMid }}>• {d}</div>)}
                    </div>
                  )}
                  <FF label="Shifokor belgilagan davolash rejasi" k="davolash" f={form} set={sf} e={edit} type="textarea" ph="Davolash usuli, muddati va maqsadi..."/>
                  <div style={{ marginTop:14 }}>
                    <FF label="Nazorat va keyingi ko'rik bo'yicha ko'rsatma" k="nazorat_izoh" f={form} set={sf} e={edit} type="textarea" ph="Keyingi murojaat, tekshiruvlar rejasi..."/>
                  </div>
                </div>

                {/* Dorilar */}
                <div style={card}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                    <ST icon="💊" title="Tayinlangan dorilar" noMb/>
                    {edit&&<button onClick={()=>setShowDori(true)} style={btn()}>+ Dori tayinlash</button>}
                  </div>

                  {form.tx_od&&KASALLIKLAR[form.tx_od]&&(
                    <div style={{ background:C.amberLight,border:`1px solid ${C.amber}`,borderRadius:10,padding:"12px 16px",marginBottom:16 }}>
                      <div style={{ fontWeight:700,fontSize:12,color:C.amber,marginBottom:8 }}>💡 "{form.tx_od}" uchun tavsiya etilgan dorilar — bosing va tayinlang:</div>
                      <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                        {KASALLIKLAR[form.tx_od].dorilar.map((d,i)=>{
                          const allaqachon=(form.dorilar||[]).some(x=>x.nomi===d);
                          return (
                            <button key={i} onClick={()=>{
                              if(!edit||allaqachon)return;
                              sf("dorilar",[...(form.dorilar||[]),{id:Date.now()+i,nomi:d,doza:"1 tomchi",chastota:"3 marta kuniga",davomiylik:"7 kun",izoh:""}]);
                              toast_(`${d} tayinlandi ✓`);
                            }} style={{ padding:"4px 12px",borderRadius:8,fontSize:12,cursor:edit&&!allaqachon?"pointer":"default",border:`1px solid ${allaqachon?C.green:C.amber}`,background:allaqachon?C.greenLight:C.white,color:allaqachon?C.green:C.textMid,fontWeight:500 }}>
                              {allaqachon?"✓":"+"} {d}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(!form.dorilar||form.dorilar.length===0)
                    ? <div style={{ textAlign:"center",padding:"30px 0",color:C.textFaint }}>
                      <div style={{ fontSize:28,marginBottom:6 }}>💊</div>Hali dori tayinlanmagan
                    </div>
                    : (form.dorilar||[]).map((d,i)=>(
                      <div key={d.id||i} style={{ background:C.bg,borderRadius:10,padding:"14px 18px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontWeight:700,fontSize:15,color:C.primary,marginBottom:4 }}>💊 {d.nomi}</div>
                          <div style={{ fontSize:13,color:C.textMid,display:"flex",gap:16,flexWrap:"wrap" }}>
                            {d.doza&&<span>📋 {d.doza}</span>}
                            {d.chastota&&<span>🕐 {d.chastota}</span>}
                            {d.davomiylik&&<span>📅 {d.davomiylik}</span>}
                          </div>
                          {d.izoh&&<div style={{ fontSize:12,color:C.textLight,marginTop:4 }}>ℹ️ {d.izoh}</div>}
                        </div>
                        {edit&&<button onClick={()=>sf("dorilar",form.dorilar.filter((_,j)=>j!==i))} style={{ background:C.redLight,color:C.red,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,cursor:"pointer" }}>O'chir</button>}
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            {/* ── RETSEPT ── */}
            {sec==="retsept" && (
              <div style={card}>
                <ST icon="📝" title="Ko'zoynak / Linza Retsepti"/>
                <div style={{ marginBottom:16 }}>
                  <label style={lbl}>Retsept turi</label>
                  <div style={{ display:"flex",gap:10 }}>
                    {["Ko'zoynak","Kontakt linza","Ikkalasi"].map(v=>(
                      <button key={v} onClick={()=>edit&&sf("retsept_tur",v)} style={{ padding:"9px 20px",borderRadius:8,border:`2px solid ${form.retsept_tur===v?C.primary:C.border}`,background:form.retsept_tur===v?C.primaryLight:C.white,color:form.retsept_tur===v?C.primary:C.textMid,fontSize:14,fontWeight:700,cursor:edit?"pointer":"default" }}>{v}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:16 }}>
                  {[{l:"OD — O'ng ko'z",prefix:"rt_od_",c:C.primary},{l:"OS — Chap ko'z",prefix:"rt_os_",c:C.teal}].map(eye=>(
                    <div key={eye.prefix} style={{ background:C.bg,borderRadius:12,padding:18 }}>
                      <div style={{ fontSize:14,fontWeight:800,color:eye.c,marginBottom:14 }}>{eye.l}</div>
                      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                        {[{l:"Sfera (D)",k:eye.prefix+"sf",ph:"-2.50",hint:"Miop: minus, Gipermetrop: plus"},{l:"Silindr (D)",k:eye.prefix+"si",ph:"-0.75",hint:"0.00 — astigmatizm yo'q"},{l:"Aks (°)",k:eye.prefix+"ak",ph:"90",hint:"0–180°"},{l:"Add (D)",k:eye.prefix+"ad",ph:"+2.00",hint:"Presbyopiyada"},{l:"PD (mm)",k:eye.prefix+"pd",ph:"32",hint:"Qorachiq masofasi"}].map(f=>(
                          <div key={f.k}>
                            <label style={lbl}>{f.l}</label>
                            {edit
                              ? <><input value={form[f.k]||""} onChange={e=>sf(f.k,e.target.value)} placeholder={f.ph} style={{ ...inp,textAlign:"center",fontWeight:700 }}/>{f.hint&&<div style={{ fontSize:10,color:C.textFaint,marginTop:3 }}>💡 {f.hint}</div>}</>
                              : <div style={{ padding:9,background:C.white,borderRadius:7,textAlign:"center",fontWeight:800,fontSize:15,color:eye.c }}>{form[f.k]||"—"}</div>
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <FF label="Retsept izohi" k="retsept_izoh" f={form} set={sf} e={edit} type="textarea" ph="Ko'zoynakni doim/faqat masofada/faqat o'qishda kiyish..." hint="UV himoyali va anti-reflex qoplama tavsiya etiladi"/>
                {(form.rt_od_sf||form.rt_os_sf)&&(
                  <div style={{ marginTop:18,background:C.primaryLight,borderRadius:12,padding:18 }}>
                    <div style={{ fontWeight:800,fontSize:14,color:C.primary,marginBottom:12 }}>📋 Retsept</div>
                    <table style={{ width:"100%",borderCollapse:"collapse" }}>
                      <thead><tr>{["Ko'z","Sfera","Silindr","Aks","Add","PD"].map(h=><th key={h} style={{ padding:"6px 12px",fontSize:11,color:C.textLight,fontWeight:700,textTransform:"uppercase",textAlign:"center",borderBottom:`2px solid ${C.border}` }}>{h}</th>)}</tr></thead>
                      <tbody>
                        {[{eye:"OD",keys:["rt_od_sf","rt_od_si","rt_od_ak","rt_od_ad","rt_od_pd"],c:C.primary},{eye:"OS",keys:["rt_os_sf","rt_os_si","rt_os_ak","rt_os_ad","rt_os_pd"],c:C.teal}].map(row=>(
                          <tr key={row.eye}><td style={{ padding:"10px 12px",fontWeight:800,color:row.c,textAlign:"center" }}>{row.eye}</td>{row.keys.map(k=><td key={k} style={{ padding:"10px 12px",textAlign:"center",fontWeight:700,fontSize:15 }}>{form[k]||"—"}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop:10,fontSize:13,color:C.textMid }}>Tur: <strong>{form.retsept_tur}</strong> · Sana: <strong>{form.sana}</strong></div>
                  </div>
                )}
              </div>
            )}

            {/* ── OPERATSIYA ── */}
            {sec==="operatsiya" && (
              <div style={card}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                  <ST icon="🔬" title="Operatsiya tarixi" noMb/>
                  {edit&&<button onClick={()=>setShowOp(true)} style={btn()}>+ Operatsiya qo'shish</button>}
                </div>
                {(!form.operatsiyalar||form.operatsiyalar.length===0)
                  ? <div style={{ textAlign:"center",padding:"36px 0",color:C.textFaint }}><div style={{ fontSize:36,marginBottom:8 }}>⚕️</div>Operatsiya tarixi mavjud emas</div>
                  : form.operatsiyalar.map((op,i)=>(
                    <div key={op.id||i} style={{ background:C.bg,borderRadius:10,padding:"16px 18px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div>
                        <div style={{ fontWeight:700,fontSize:15,marginBottom:4 }}>⚕️ {op.tur}</div>
                        <div style={{ fontSize:13,color:C.textMid,display:"flex",gap:16 }}>
                          {op.sana&&<span>📅 {op.sana}</span>}
                          {op.shifokor&&<span>👨‍⚕️ {op.shifokor}</span>}
                        </div>
                        {op.natija&&<div style={{ fontSize:13,color:C.textLight,marginTop:4 }}>📝 {op.natija}</div>}
                      </div>
                      {edit&&<button onClick={()=>sf("operatsiyalar",form.operatsiyalar.filter((_,j)=>j!==i))} style={{ background:C.redLight,color:C.red,border:"none",borderRadius:6,padding:"4px 10px",fontSize:12,cursor:"pointer" }}>O'chir</button>}
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        )}

        {/* ══ DORILAR BAZASI ══ */}
        {tab==="dorilar" && (
          <div>
            <h1 style={{ fontSize:24,fontWeight:800,marginBottom:6 }}>💊 Dorilar bazasi</h1>
            <p style={{ color:C.textLight,fontSize:14,marginBottom:20 }}>Ko'z kasalliklari uchun ishlatiladigan dorilar ro'yxati</p>
            <input placeholder="🔍 Dori yoki guruh bo'yicha qidirish..." value={searchDori} onChange={e=>setSearchDori(e.target.value)} style={{ ...inp,marginBottom:20,padding:"11px 16px" }}/>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              {Object.entries(DORILAR).map(([guruh,dorilar])=>{
                const filtered2=dorilar.filter(d=>d.toLowerCase().includes(searchDori.toLowerCase())||guruh.toLowerCase().includes(searchDori.toLowerCase()));
                if(filtered2.length===0)return null;
                return (
                  <div key={guruh} style={card}>
                    <div style={{ fontWeight:800,fontSize:15,color:C.primary,marginBottom:12 }}>{guruh}</div>
                    {filtered2.map(d=>(
                      <div key={d} style={{ padding:"7px 12px",background:C.bg,borderRadius:7,fontSize:13,marginBottom:5,color:C.textMid }}>💊 {d}</div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ KASALLIKLAR ══ */}
        {tab==="kasalliklar" && (
          <div>
            <h1 style={{ fontSize:24,fontWeight:800,marginBottom:6 }}>🩺 Kasalliklar ma'lumotnomasi</h1>
            <p style={{ color:C.textLight,fontSize:14,marginBottom:24 }}>Ko'z kasalliklari — batafsil ma'lumot, davolash va dorilar</p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14 }}>
              {Object.entries(KASALLIKLAR).map(([nom,info])=>(
                <div key={nom} onClick={()=>setTashxisInfo({nom,info})} style={{ ...card,cursor:"pointer",marginBottom:0,border:`1.5px solid ${C.borderLight}` }}>
                  <div style={{ fontWeight:800,fontSize:14,marginBottom:4 }}>{nom}</div>
                  <div style={{ fontSize:11,color:C.textFaint,marginBottom:8 }}>MKB-10: {info.mkb}</div>
                  <div style={{ fontSize:12,color:C.textMid,lineHeight:1.5,marginBottom:10 }}>{info.belgilar.substring(0,80)}...</div>
                  <div style={{ fontSize:12,color:C.primary,fontWeight:600 }}>Batafsil →</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ── YORDAMCHI KOMPONENTLAR ──────────────────────────────
function SBadge({status}){
  const m={"Yangi":[C.amberLight,C.amber],"Qabul qilindi":[C.primaryLight,C.primary],"Yakunlandi":[C.greenLight,C.green]};
  const [bg,fg]=m[status]||m["Yangi"];
  return <span style={{ background:bg,color:fg,padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:700 }}>{status}</span>;
}
function ST({icon,title,color,noMb}){
  return <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:noMb?0:16 }}>
    <span style={{ fontSize:18 }}>{icon}</span>
    <span style={{ fontWeight:800,fontSize:16,color:color||C.text }}>{title}</span>
  </div>;
}
function Tip({tip}){
  const m={ok:[C.greenLight,C.green],warning:[C.amberLight,C.amber],danger:[C.redLight,C.red],info:[C.primaryLight,C.primary]};
  const [bg,fg]=m[tip.t]||m.info;
  return <div style={{ background:bg,color:fg,padding:"6px 10px",borderRadius:7,fontSize:12,fontWeight:500 }}>{tip.m}</div>;
}
function FF({label:lb,k,f,set,e,type="text",opts,ph,s,hint}){
  const v=f[k]||"";
  return (
    <div style={s?{gridColumn:`span ${s}`}:{}}>
      <label style={lbl}>{lb}</label>
      {e
        ? <>
          {type==="textarea"
            ? <textarea value={v} onChange={ev=>set(k,ev.target.value)} placeholder={ph} style={{ ...inp,minHeight:80,resize:"vertical" }}/>
            : type==="select"
              ? <select value={v} onChange={ev=>set(k,ev.target.value)} style={inp}>{opts.map(o=><option key={o}>{o}</option>)}</select>
              : <input type={type} value={v} onChange={ev=>set(k,ev.target.value)} placeholder={ph} style={inp}/>
          }
          {hint&&<div style={{ fontSize:10,color:C.textFaint,marginTop:3 }}>💡 {hint}</div>}
        </>
        : <div style={{ padding:"9px 12px",background:C.bg,borderRadius:7,fontSize:14,color:v?C.text:C.textFaint,minHeight:38 }}>{v||"—"}</div>
      }
    </div>
  );
}