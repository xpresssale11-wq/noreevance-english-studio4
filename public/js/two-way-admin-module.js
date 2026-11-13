/**
 * ============================================================================
 * NOREE VANCE STUDIO — TWO-WAY LEARNING, MULTI-LANGUAGE & ADMIN MODULE
 * ============================================================================
 * โครงสร้างโมดูลแยกส่วนสำหรับ:
 * 1. Two-Way Learning & Multi-Language Registry (TH -> EN, EN -> TH, และโครงสร้างภาษาในอนาคต)
 * 2. Thai Phonetics / Romanization & Thai Word Tokenizer (สำหรับชาวต่างชาติเรียนภาษาไทย)
 * 3. Interactive Bilingual Stories Library (นิทานสองภาษาสไตล์ Duolingo Stories)
 * 4. Admin Panel Data Store (จัดการเนื้อหา, เปลี่ยนโลโก้แบรนด์, เปลี่ยนรหัสผ่านแอดมิน)
 * ============================================================================
 */

(function (global) {
  "use strict";

  // ==========================================================================
  // SECTION 1: TWO-WAY LEARNING & MULTI-LANGUAGE COURSE REGISTRY
  // ==========================================================================
  const LANGUAGE_COURSES_REGISTRY = [
    {
      id: "th-en",
      sourceLang: "th",
      targetLang: "en",
      flagPair: "🇹🇭 ➔ 🇬🇧",
      titleTh: "คนไทยเรียนภาษาอังกฤษ",
      titleEn: "Learn English (for Thai Speakers)",
      subtitleTh: "โจทย์และคำอธิบายภาษาไทย • ฝึกพูดและแต่งประโยคภาษาอังกฤษ",
      subtitleEn: "Thai prompts & explanations • Practice English speaking & sentences",
      speechLang: "en-US",
      promptLang: "th-TH",
      isActiveCourse: true,
    },
    {
      id: "en-th",
      sourceLang: "en",
      targetLang: "th",
      flagPair: "🇬🇧 ➔ 🇹🇭",
      titleTh: "ชาวต่างชาติเรียนภาษาไทย (ผ่านอังกฤษ)",
      titleEn: "Learn Thai (for English Speakers)",
      subtitleTh: "โจทย์ภาษาอังกฤษพร้อมคำอ่านคาราโอเกะ • ฝึกพูดและเรียงประโยคภาษาไทย",
      subtitleEn: "English prompts + Romanized Thai phonetics • Speak & build Thai sentences",
      speechLang: "th-TH",
      promptLang: "en-US",
      isActiveCourse: true,
    },
    {
      id: "th-ja",
      sourceLang: "th",
      targetLang: "ja",
      flagPair: "🇹🇭 ➔ 🇯🇵",
      titleTh: "ภาษาญี่ปุ่นพื้นฐาน (เร็วๆ นี้ / โครงสร้าง Multi-Lang)",
      titleEn: "Japanese Basics (Multi-Lang Ready)",
      subtitleTh: "รองรับการขยายภาษาที่ 3 จากหลังบ้าน Admin Panel",
      subtitleEn: "Extensible multi-language architecture ready for future courses",
      speechLang: "ja-JP",
      promptLang: "th-TH",
      isActiveCourse: true,
    },
  ];

  // ==========================================================================
  // SECTION 2: THAI WORD SEGMENTATION & ROMANIZATION HELPER (FOR FOREIGNERS)
  // ==========================================================================
  const COMMON_THAI_CHUNKS_PHONETICS = {
    "สวัสดีตอนเช้า": "sà-wàt-dii dton-cháao",
    "สวัสดี": "sà-wàt-dii",
    "วันนี้": "wan-níi",
    "คุณ": "khun",
    "เป็นอย่างไรบ้าง": "bpen yàang-rai bâang",
    "ยินดีที่ได้รู้จัก": "yin-dii thîi dâai rúu-jàk",
    "ฉันชื่อ": "chǎn chêu",
    "โนรี": "No-ree",
    "และนี่คือ": "láe nîi kheu",
    "แมวของฉัน": "maaeo khǎawng chǎn",
    "เซียนน่า": "Sien-nâa",
    "ขอบคุณมาก": "khàawp-khun mâak",
    "ขอบคุณ": "khàawp-khun",
    "ไม่เป็นไร": "mâi bpen rai",
    "ช่วยพูดช้าลง": "chûai phûut cháa long",
    "ได้ไหมคะ": "dâai mǎi khá",
    "ได้ไหม": "dâai mǎi",
    "ร้านกาแฟ": "ráan gaa-faae",
    "สถานีรถไฟ": "sà-thǎa-nii rót-fai",
    "อยู่ที่ไหน": "yùu thîi-nǎi",
    "ขอสั่ง": "khǎaw sàng",
    "ลาเต้ร้อน": "laa-dtêe ráawn",
    "หวานน้อย": "wǎan náawy",
    "หนึ่งแก้ว": "nèung gâaeo",
    "ราคาเท่าไหร่": "raa-khaa thâo-rài",
    "อร่อยมาก": "à-ràawy mâak",
    "ฉันชอบ": "chǎn châawp",
    "ฟังเพลง": "fang phleeng",
    "เวลาฝนตก": "wee-laa fǒn dtòk",
    "เดินทางปลอดภัย": "dern-thaang bplàawt-phai",
  };

  /**
   * Splits a Thai sentence into meaningful learner-friendly word tiles for foreigners
   * learning Thai in Sentence Builder mode.
   */
  function splitThaiSentenceIntoTiles(thSentence) {
    const raw = String(thSentence || "").trim();
    if (!raw) return [];

    // If spaces already exist and >= 3 parts, use space-split plus sub-chunking
    const knownPhrases = [
      "สวัสดีตอนเช้า", "เป็นอย่างไรบ้าง", "ยินดีที่ได้รู้จัก", "แมวของฉัน",
      "ขอบคุณมาก", "ไม่เป็นไรเลย", "ช่วยพูดช้าลง", "อีกนิดได้ไหมคะ", "ได้ไหมคะ",
      "สถานีรถไฟ", "ที่ใกล้ที่สุด", "อยู่ที่ไหน", "ร้านกาแฟ", "สวนสาธารณะ",
      "ฉันขอสั่ง", "ลาเต้ร้อน", "หวานน้อย", "หนึ่งแก้วค่ะ", "ราคาเท่าไหร่คะ",
      "น้องเซียนน่า", "กีตาร์โปร่ง", "ภาษาอังกฤษ", "ทุกวัน", "วันหยุดสุดสัปดาห์",
      "สวัสดี", "วันนี้", "คุณ", "ฉันชื่อ", "โนรี", "และนี่คือ", "ชื่อเซียนน่า",
      "มาจากที่ไหน", "อาศัยอยู่ใน", "เมืองเล็กๆ", "ที่เงียบสงบ", "สบายดีไหม",
      "ดีใจมาก", "ที่ได้พบคุณ", "อีกครั้ง", "ขอให้วันนี้", "เป็นวันที่ดี",
      "สำหรับคุณนะ", "ชอบฟังเพลง", "แนวไหน", "เวลาฝนตก", "ทำงานอะไร",
      "กำลังฝึกพูด", "สำหรับความช่วยเหลือ", "ของคุณ", "ยินดีช่วยเสมอค่ะ",
      "ตื่นนอน", "เจ็ดโมงเช้า", "ชาอุ่นๆ", "ไปทำงาน", "แต่เช้า", "ประชุมออนไลน์",
      "ทำงานจากที่บ้าน", "เพราะฝนตกหนัก", "พักเบรก", "ดื่มกาแฟ", "เดินเล่น",
      "ในสวนสาธารณะ", "ซื้อผักสด", "ก่อนกลับบ้าน", "ทำซุปอุ่นๆ", "เปิดหน้าต่าง",
      "รับลมเย็นๆ", "อ่านหนังสือ", "รดน้ำต้นไม้", "ทำความสะอาด", "ห้องนั่งเล่น",
      "เข้านอน", "ตั้งนาฬิกาปลุก", "พรุ่งนี้เช้า", "เดินตรงไป", "ตามถนนเส้นนี้",
      "แล้วเลี้ยวซ้าย", "ตั๋วรถไฟ", "ไปกลับ", "หนึ่งใบค่ะ", "ขอดูเมนู",
      "อาหารและเครื่องดื่ม", "หน่อยได้ไหมคะ", "ขนมปังอบใหม่ๆ", "กลิ่นหอมมาก",
      "คิดเงินด้วยค่ะ", "บัตรเครดิต", "เสื้อไหมพรม", "ห่อของขวัญ", "ถุงผ้า",
      "เสียงฝน", "กระทบหน้าต่าง", "ทำให้หัวใจ", "ของฉันสงบลง", "ภูมิใจใน",
      "ความพยายาม", "ทีละก้าว", "อย่างช้าๆ", "ความทรงจำที่อบอุ่น",
    ];

    let working = raw;
    knownPhrases.forEach((phrase) => {
      if (working.includes(phrase)) {
        working = working.split(phrase).join(` ${phrase} `);
      }
    });

    let parts = working
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    // If a chunk is still very long (> 12 Thai chars), split into balanced 6-8 char segments
    // while keeping Thai combining vowels/tone marks attached to their base consonant
    const finalTiles = [];
    parts.forEach((part) => {
      if (part.length <= 12) {
        finalTiles.push(part);
      } else {
        const clusters = matchThaiClusters(part);
        const step = Math.max(3, Math.ceil(clusters.length / Math.ceil(part.length / 8)));
        for (let i = 0; i < clusters.length; i += step) {
          finalTiles.push(clusters.slice(i, i + step).join(""));
        }
      }
    });

    return finalTiles.length > 0 ? finalTiles : [raw];
  }

  function matchThaiClusters(str) {
    // Group base Thai char with following combining marks (\u0E31, \u0E34-\u0E3A, \u0E47-\u0E4E)
    const clusters = [];
    let current = "";
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      const code = str.charCodeAt(i);
      const isCombining =
        code === 0x0e31 ||
        (code >= 0x0e34 && code <= 0x0e3a) ||
        (code >= 0x0e47 && code <= 0x0e4e);
      if (isCombining && current) {
        current += ch;
      } else {
        if (current) clusters.push(current);
        current = ch;
      }
    }
    if (current) clusters.push(current);
    return clusters;
  }

  function getThaiPhoneticHint(thText) {
    if (!thText) return "";
    for (const [k, v] of Object.entries(COMMON_THAI_CHUNKS_PHONETICS)) {
      if (thText.includes(k)) {
        return v;
      }
    }
    return "Thai pronunciation • Click 🔊 to hear native Thai audio";
  }

  // ==========================================================================
  // SECTION 3: INTERACTIVE BILINGUAL STORIES (DUOLINGO STORIES STYLE)
  // ==========================================================================
  const DEFAULT_BILINGUAL_STORIES = [
    {
      id: "bstory-1",
      titleEn: "A Rainy Morning at Noree's Café",
      titleTh: "เช้าวันฝนพรำที่คาเฟ่ของโนรี",
      level: "Beginner (A1-A2)",
      category: "Cozy Café & Greetings",
      coverEmoji: "☕🌧️🐱",
      summaryTh: "เรื่องราวอบอุ่นในเช้าวันฝนตก เมื่อแขกผู้มาเยือนแวะเข้ามาหลบฝนในคาเฟ่เล็กๆ ของโนรีและน้องเหมียวเซียนน่า",
      summaryEn: "A warm story on a rainy morning when a traveler steps into Noree and Sienna's cozy café.",
      lines: [
        {
          id: "bs1-1",
          speaker: "Narrator",
          avatar: "🌧️",
          en: "It is raining softly outside the quiet wooden café.",
          th: "ข้างนอกคาเฟ่ไม้ที่เงียบสงบกำลังมีสายฝนโปรยปรายลงมาเบาๆ",
          phoneticTh: "khâang-nâawk khaa-fêe máai thîi ngîiap-sà-ngòp gam-lang mii sǎai-fǒn bprooi-bpraai",
          vocabNoteTh: "raining softly = ฝนตกเบาๆ / quiet = เงียบสงบ",
          vocabNoteEn: "เงียบสงบ (ngîiap-sà-ngòp) = quiet and peaceful",
        },
        {
          id: "bs1-2",
          speaker: "Noree",
          avatar: "🎸",
          en: "Good morning! Come on in and dry your umbrella by the door.",
          th: "สวัสดีตอนเช้าค่ะ! เข้ามาข้างในก่อน แล้ววางร่มพักไว้ข้างประตูได้เลยนะคะ",
          phoneticTh: "sà-wàt-dii dton-cháao khâ! khâo maa khâang-nai gàawn láeo waang rôm wái khâang bprà-dtuu",
          vocabNoteTh: "Come on in = เชิญเข้ามาข้างในเลยค่ะ (เป็นกันเองและอบอุ่นมาก)",
          vocabNoteEn: "เข้ามาข้างใน (khâo maa khâang-nai) = Come inside",
        },
        {
          id: "bs1-3",
          speaker: "Sienna",
          avatar: "🐱",
          en: "Sienna the orange cat stretches lazily on the warm rug and purrs.",
          th: "เจ้าเหมียวสีส้มเซียนน่าบิดขี้เกียจอย่างสบายอารมณ์บนพรมอุ่นๆ แล้วส่งเสียงเพอร์",
          phoneticTh: "jâo mǐiao sǐi-sôm Sien-nâa bìt-khîi-gìiat bon phrom ùn-ùn",
          vocabNoteTh: "stretches lazily = บิดขี้เกียจอย่างสบายๆ / rug = พรม",
          vocabNoteEn: "บิดขี้เกียจ (bìt-khîi-gìiat) = to stretch lazily",
          quizCheckpoint: {
            questionTh: "น้องเซียนน่ากำลังทำอะไรอยู่บนพรมคะ?",
            questionEn: "What is Sienna the cat doing on the warm rug?",
            options: [
              { textTh: "บิดขี้เกียจและส่งเสียงเพอร์อย่างมีความสุข", textEn: "Stretching lazily and purring happily", isCorrect: true },
              { textTh: "กำลังวิ่งไล่จับผีเสื้อกลางสายฝน", textEn: "Chasing butterflies in the rain", isCorrect: false },
              { textTh: "กำลังชงกาแฟลาเต้ร้อน", textEn: "Making a hot latte", isCorrect: false },
            ],
          },
        },
        {
          id: "bs1-4",
          speaker: "Traveler",
          avatar: "🧣",
          en: "Thank you so much. Could I have a cup of hot chamomile tea, please?",
          th: "ขอบคุณมากเลยครับ ขอชาคาโมมายล์ร้อนๆ สักหนึ่งถ้วยได้ไหมครับ",
          phoneticTh: "khàawp-khun mâak loei khráp. khǎaw chaa khaa-moo-maai ráawn-ráawn sák nèung thûai dâai mǎi khráp",
          vocabNoteTh: "Could I have ... please? = ใช้สั่งเครื่องดื่มหรืออาหารอย่างสุภาพ",
          vocabNoteEn: "ขอ...ได้ไหมครับ/คะ (khǎaw ... dâai mǎi) = Polite way to order or ask for something",
        },
        {
          id: "bs1-5",
          speaker: "Noree",
          avatar: "🍵",
          en: "Of course! Take a seat by the window while I brew a fresh pot for you.",
          th: "ได้เลยค่ะ! เชิญนั่งพักริมหน้าต่างก่อนนะคะ เดี๋ยวโนรีชงชากาใหม่ให้ค่ะ",
          phoneticTh: "dâai loei khâ! chern nâng phák rim nâa-dtàang gàawn ná khá",
          vocabNoteTh: "Take a seat = เชิญนั่ง / brew a fresh pot = ชงชากาใหม่สดๆ",
          vocabNoteEn: "ริมหน้าต่าง (rim nâa-dtàang) = by the window",
          quizCheckpoint: {
            questionTh: "ผู้มาเยือนสั่งเครื่องดื่มอะไรจากโนรีคะ?",
            questionEn: "What drink did the traveler order from Noree?",
            options: [
              { textTh: "ชาคาโมมายล์ร้อน (Hot chamomile tea)", textEn: "A cup of hot chamomile tea", isCorrect: true },
              { textTh: "น้ำส้มคั้นเย็นจัด (Iced orange juice)", textEn: "Iced orange juice", isCorrect: false },
              { textTh: "ซุปฟักทอง (Pumpkin soup)", textEn: "Pumpkin soup", isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: "bstory-2",
      titleEn: "Sienna's Lost Guitar Pick",
      titleTh: "ปิ๊กกีตาร์ที่หายไปของน้องเซียนน่า",
      level: "Beginner-Intermediate (A2)",
      category: "Music & Daily Life",
      coverEmoji: "🎸🐾🔍",
      summaryTh: "โนรีกำลังจะซ้อมเพลงใหม่ในห้องอัดเสียง แต่ปิ๊กกีตาร์ไม้ชิ้นโปรดกลับหายไป มาดูกันว่าใครเป็นคนซ่อนไว้!",
      summaryEn: "Noree is about to practice a new folk song, but her favorite wooden guitar pick is missing!",
      lines: [
        {
          id: "bs2-1",
          speaker: "Noree",
          avatar: "🎸",
          en: "Hmm, I left my wooden guitar pick on the notebook just ten minutes ago.",
          th: "อืม... เมื่อสิบนาทีก่อนโนรียังวางปิ๊กกีตาร์ไม้ไว้บนสมุดโน้ตอยู่เลยนะ",
          phoneticTh: "mêua sìp naa-thii gàawn No-ree yang waang bpík gii-dtâa wái bon sà-mùt-nóot",
          vocabNoteTh: "left (ช่อง 2 ของ leave) = วางทิ้งไว้ / just ten minutes ago = เมื่อสิบนาทีที่แล้วนี่เอง",
          vocabNoteEn: "เมื่อสิบนาทีก่อน (mêua sìp naa-thii gàawn) = ten minutes ago",
        },
        {
          id: "bs2-2",
          speaker: "Noree",
          avatar: "🔍",
          en: "Sienna, did you see where my guitar pick went?",
          th: "เซียนน่าจ๋า เห็นไหมคะว่าปิ๊กกีตาร์ของโนรีหายไปไหนเอ่ย?",
          phoneticTh: "Sien-nâa jǎa, hěn mǎi khá wâa bpík gii-dtâa hǎai bpai nǎi?",
          vocabNoteTh: "did you see where ... went? = เห็นไหมว่า...หายไปไหน",
          vocabNoteEn: "หายไปไหน (hǎai bpai nǎi) = where did it disappear to?",
        },
        {
          id: "bs2-3",
          speaker: "Sienna",
          avatar: "🐱",
          en: "Sienna looks innocent and gently taps her soft paw on the cushion.",
          th: "เซียนน่าทำหน้าตาใสซื่อ แล้วเอาอุ้งเท้านุ่มๆ แตะลงบนหมอนอิงเบาๆ",
          phoneticTh: "Sien-nâa tham nâa sǎi-sêu láeo ao ûng-tháaoแตะ bon mǎawn-ing",
          vocabNoteTh: "looks innocent = ทำหน้าไร้เดียงสา / soft paw = อุ้งเท้านุ่มๆ",
          vocabNoteEn: "หมอนอิง (mǎawn-ing) = cushion / pillow",
          quizCheckpoint: {
            questionTh: "ปิ๊กกีตาร์ของโนรีวางไว้ที่ไหนตอนแรกคะ?",
            questionEn: "Where did Noree originally leave her wooden guitar pick?",
            options: [
              { textTh: "วางไว้บนสมุดโน้ต (On the notebook)", textEn: "On the notebook", isCorrect: true },
              { textTh: "ในกระเป๋าเดินทาง (In the suitcase)", textEn: "In the suitcase", isCorrect: false },
              { textTh: "บนโต๊ะอาหารในครัว (On the kitchen table)", textEn: "On the kitchen table", isCorrect: false },
            ],
          },
        },
        {
          id: "bs2-4",
          speaker: "Noree",
          avatar: "😊",
          en: "Aha! It was hiding right underneath your favorite cushion the whole time!",
          th: "เจอแล้ว! มันซ่อนอยู่ใต้หมอนอิงใบโปรดของหนูมาตลอดเลยนี่นา!",
          phoneticTh: "jer láeo! man sâawn yùu dtâai mǎawn-ing bai bpròot khǎawng nǔu maa dtà-làawt loei!",
          vocabNoteTh: "underneath = อยู่ข้างใต้ / the whole time = ตลอดเวลาที่ผ่านมา",
          vocabNoteEn: "เจอแล้ว (jer láeo) = Found it! / ใต้ (dtâai) = underneath",
        },
      ],
    },
    {
      id: "bstory-3",
      titleEn: "The Midnight Train to Chiang Mai",
      titleTh: "รถไฟขบวนเที่ยงคืนสู่เชียงใหม่",
      level: "Intermediate (A2-B1)",
      category: "Travel & Adventure",
      coverEmoji: "🚂🌙⛰️",
      summaryTh: "การเดินทางด้วยรถไฟตู้นอนยามค่ำคืนที่แสนสงบ มิตรภาพระหว่างเพื่อนร่วมทาง และทิวทัศน์ภูเขายามเช้า",
      summaryEn: "A peaceful overnight sleeper train journey, friendly conversations, and misty mountain views at dawn.",
      lines: [
        {
          id: "bs3-1",
          speaker: "Passenger",
          avatar: "🎒",
          en: "Excuse me, is this seat by the window taken?",
          th: "ขอโทษนะคะ ที่นั่งริมหน้าต่างตรงนี้มีคนนั่งหรือยังคะ?",
          phoneticTh: "khǎaw-thôot ná khá, thîi-nâng rim nâa-dtàang dtrong-níi mii khon nâng rěu yang khá?",
          vocabNoteTh: "Is this seat taken? = ที่นั่งตรงนี้มีคนนั่งหรือยัง (สำนวนใช้บ่อยมากเวลาเดินทาง)",
          vocabNoteEn: "มีคนนั่งหรือยัง (mii khon nâng rěu yang) = Is anyone sitting here yet?",
        },
        {
          id: "bs3-2",
          speaker: "Noree",
          avatar: "🎸",
          en: "Not at all! Please go ahead. Are you traveling all the way to Chiang Mai too?",
          th: "ยังว่างอยู่เลยค่ะ! เชิญนั่งได้เลย คุณกำลังจะเดินทางไปถึงเชียงใหม่เหมือนกันหรือเปล่าคะ?",
          phoneticTh: "yang wâang yùu loei khâ! chern nâng dâai loei",
          vocabNoteTh: "Not at all = ไม่เลย (ยังว่างอยู่ค่ะ) / all the way to = ตลอดทางไปจนถึง...",
          vocabNoteEn: "ยังว่างอยู่ (yang wâang yùu) = It is still available / free",
          quizCheckpoint: {
            questionTh: "สำนวน 'Is this seat taken?' มีความหมายว่าอย่างไรคะ?",
            questionEn: "What does 'Is this seat taken?' mean in Thai?",
            options: [
              { textTh: "ที่นั่งตรงนี้มีคนนั่งหรือยัง?", textEn: "มีคนนั่งหรือยัง (Is this seat occupied?)", isCorrect: true },
              { textTh: "รถไฟจะออกกี่โมง?", textEn: "รถไฟออกกี่โมง (What time does the train leave?)", isCorrect: false },
              { textTh: "ตั๋วรถไฟราคาเท่าไหร่?", textEn: "ตั๋วราคาเท่าไหร่ (How much is the ticket?)", isCorrect: false },
            ],
          },
        },
        {
          id: "bs3-3",
          speaker: "Passenger",
          avatar: "🌄",
          en: "Yes! It is my first time taking the overnight train. I cannot wait to see the morning mist.",
          th: "ใช่ค่ะ! นี่เป็นครั้งแรกที่ฉันนั่งรถไฟข้ามคืนเลย ตื่นเต้นที่จะได้เห็นหมอกยามเช้ามากๆ ค่ะ",
          phoneticTh: "châi khâ! nîi bpen khráng râaek thîi nâng rót-fai khâam-kheun",
          vocabNoteTh: "overnight train = รถไฟข้ามคืน / cannot wait to = ตั้งตารอแทบไม่ไหวที่จะ...",
          vocabNoteEn: "ครั้งแรก (khráng râaek) = first time / หมอกยามเช้า (màawk yaam cháao) = morning mist",
        },
      ],
    },
  ];

  // ==========================================================================
  // SECTION 4: ADMIN PANEL & BRAND CONFIGURATION STORE (LOCALSTORAGE PERSISTED)
  // ==========================================================================
  const STORAGE_KEYS = {
    BRAND_CONFIG: "noree_studio_brand_config_v1",
    ADMIN_PASSWORD: "noree_studio_admin_password_v1",
    CUSTOM_SENTENCES: "noree_studio_custom_sentences_v1",
    CUSTOM_BILINGUAL_STORIES: "noree_studio_custom_bilingual_stories_v1",
    CUSTOM_VOCAB_ITEMS: "noree_studio_custom_vocab_v1",
    COURSE_DIRECTION: "noree_studio_course_direction_v1",
    LEARNER_XP: "noree_studio_learner_xp_v1",
  };

  const DEFAULT_BRAND_CONFIG = {
    brandName: "Noree Vance",
    brandBadgeTh: "Two-Way Language Studio",
    brandBadgeEn: "Two-Way Language Studio",
    brandSubtitleTh: "สตูดิโอเรียนภาษาสองทาง ดีไซน์สะอาดตา เข้าใจง่าย สไตล์อบอุ่นของ Noree Vance • ไทย ⇄ อังกฤษ",
    brandSubtitleEn: "Two-Way Language Learning Studio • Clean, Intuitive & Cozy Noree Vance Style",
    logoUrl: "/noree-logo.png",
    primaryColor: "#C86D51",
    secondaryColor: "#6B8E78",
  };

  let isAdminLoggedIn = false;

  function loadBrandConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BRAND_CONFIG);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.brandSubtitleTh && parsed.brandSubtitleTh.includes("Duolingo")) {
          parsed.brandSubtitleTh = DEFAULT_BRAND_CONFIG.brandSubtitleTh;
        }
        return { ...DEFAULT_BRAND_CONFIG, ...parsed };
      }
    } catch {}
    return { ...DEFAULT_BRAND_CONFIG };
  }

  function saveBrandConfig(nextConfig) {
    try {
      const merged = { ...DEFAULT_BRAND_CONFIG, ...nextConfig };
      localStorage.setItem(STORAGE_KEYS.BRAND_CONFIG, JSON.stringify(merged));
      return merged;
    } catch {
      return nextConfig;
    }
  }

  function getAdminPassword() {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || "admin1234";
    } catch {
      return "admin1234";
    }
  }

  function setAdminPassword(newPassword) {
    try {
      const clean = String(newPassword || "").trim();
      if (!clean) return false;
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, clean);
      return true;
    } catch {
      return false;
    }
  }

  function loadCustomSentences() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_SENTENCES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  }

  function saveCustomSentences(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SENTENCES, JSON.stringify(list || []));
    } catch {}
  }

  function loadBilingualStories() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_BILINGUAL_STORIES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_BILINGUAL_STORIES;
  }

  function saveBilingualStories(stories) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_BILINGUAL_STORIES, JSON.stringify(stories || DEFAULT_BILINGUAL_STORIES));
    } catch {}
  }

  function loadCustomVocabItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_VOCAB_ITEMS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  }

  function saveCustomVocabItems(items) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_VOCAB_ITEMS, JSON.stringify(items || []));
    } catch {}
  }

  // Speak any text in either English (en-US), Thai (th-TH), or Japanese (ja-JP)
  function speakMultiLangText(text, langCode = "en-US", rate = 1.0) {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = langCode;
      u.rate = rate;
      const voices = window.speechSynthesis.getVoices();
      const prefix = langCode.split("-")[0].toLowerCase();
      const matched = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix));
      if (matched) u.voice = matched;
      window.speechSynthesis.speak(u);
    } catch {}
  }

  // Export to global window.NoreeTwoWayModule
  global.NoreeTwoWayModule = {
    LANGUAGE_COURSES_REGISTRY,
    DEFAULT_BILINGUAL_STORIES,
    DEFAULT_BRAND_CONFIG,
    STORAGE_KEYS,
    isAdminLoggedIn,
    splitThaiSentenceIntoTiles,
    getThaiPhoneticHint,
    loadBrandConfig,
    saveBrandConfig,
    getAdminPassword,
    setAdminPassword,
    loadCustomSentences,
    saveCustomSentences,
    loadBilingualStories,
    saveBilingualStories,
    loadCustomVocabItems,
    saveCustomVocabItems,
    speakMultiLangText,
  };
})(window);
