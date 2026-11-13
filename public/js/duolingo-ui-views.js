/**
 * ============================================================================
 * NOREE VANCE STUDIO — DUOLINGO-STYLE UI VIEWS & ADMIN PANEL RENDERERS
 * ============================================================================
 * โมดูลแยกส่วนสำหรับแสดงผลหน้าจอ (UI Views):
 * 1. Duolingo-Style Home / Learning Path Hub (หน้าแรกแบ่งหมวดหมู่ชัดเจน)
 * 2. Interactive Bilingual Stories Player (ระบบนิทานสองภาษาสไตล์ Duolingo Stories)
 * 3. Full Admin Panel (จัดการเนื้อหา, เปลี่ยนโลโก้แบรนด์, เปลี่ยนรหัสผ่านแอดมิน)
 * ============================================================================
 */

(function (global) {
  "use strict";

  // Default state fallback for Admin Panel authentication to prevent ReferenceError
  let isAdminLoggedIn = false;

  // ==========================================================================
  // 1. NOREE VANCE CLEAN & INTUITIVE HOME & CATEGORY HUB VIEW
  // ==========================================================================
  function renderDuolingoHomeHub(html, ctx = {}) {
    const {
      lang,
      courseDirection,
      onChangeCourseDirection,
      brandConfig = { brandName: "Noree Vance" },
      sbCompletedIds,
      totalSentencesCount,
      bilingualStories,
      savedPhrasesCount,
      quizScore,
      sbScore,
      onNavigateTab,
      onSelectBuilderCategory,
      onSelectBilingualStory,
      speakText,
      speakMultiLangText,
      SENTENCE_BUILDER_CATEGORIES,
    } = ctx;

    const totalXp = (sbScore || 0) * 10 + (quizScore || 0) + (sbCompletedIds?.length || 0) * 5 + 120;
    const courses = global.NoreeTwoWayModule?.LANGUAGE_COURSES_REGISTRY || [];

    return html`
      <div class="space-y-6 max-w-6xl mx-auto">
        <!-- Top Hero & Two-Way Course Switcher -->
        <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 sm:p-7 shadow-xs">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex flex-wrap items-center gap-2">
                <span class="px-3 py-1 rounded-full bg-[#58CC02]/15 text-[#2E7D00] border border-[#58CC02]/30 text-xs font-extrabold uppercase tracking-wider">
                  🌿🐱 Noree Vance Signature Two-Way Studio
                </span>
                <span class="px-3 py-1 rounded-full bg-[#C86D51]/15 text-[#A85035] border border-[#C86D51]/30 text-xs font-bold">
                  ${courseDirection === "en-th"
                    ? "🇬🇧 ➔ 🇹🇭 Mode: Foreigners Learning Thai"
                    : courseDirection === "th-ja"
                    ? "🇹🇭 ➔ 🇯🇵 Mode: Multi-Language (Japanese)"
                    : "🇹🇭 ➔ 🇬🇧 โหมดคนไทยเรียนภาษาอังกฤษ"}
                </span>
              </div>

              <h2 class="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#2C2523]">
                ${courseDirection === "en-th"
                  ? "Welcome! Learn Thai Gently in Noree Vance’s Cozy & Intuitive Studio 🇹🇭✨"
                  : lang === "th"
                  ? `ยินดีต้อนรับสู่ ${brandConfig.brandName} โฉมใหม่ ดีไซน์สะอาดตา เข้าใจง่าย ในสไตล์อบอุ่นที่เป็นเอกลักษณ์ของ Noree Vance! 🎸✨`
                  : `Welcome to ${brandConfig.brandName} — Clean, Intuitive & Cozy Two-Way Language Studio! 🎸✨`}
              </h2>

              <p class="text-xs sm:text-sm text-[#6E6059] leading-relaxed">
                ${courseDirection === "en-th"
                  ? "Choose any learning unit below to start right away! Build Thai sentences with phonetic guides, read bilingual stories, or practice speaking with Noree & Sienna."
                  : lang === "th"
                  ? "จัดระเบียบพื้นที่การเรียนรู้ใหม่ให้โปร่งโล่ง สะอาดตา เข้าใจง่าย และอบอุ่นเป็นกันเองในแบบฉบับของ Noree Vance เลือกหมวดหมู่ที่ต้องการฝึกได้ทันทีตั้งแต่หน้าแรก รองรับทั้งคนไทยเรียนอังกฤษ และชาวต่างชาติเรียนไทยค่ะ"
                  : "A thoughtfully organized, clutter-free learning sanctuary crafted in Noree Vance’s signature acoustic style. Pick any skill unit below to begin right away!"}
              </p>
            </div>

            <!-- Gamified Duolingo Stats Pills -->
            <div class="grid grid-cols-3 gap-2.5 shrink-0">
              <div class="bg-[#FFF9E6] border-2 border-[#FFD966] border-b-4 rounded-2xl px-4 py-3 text-center">
                <div class="text-xl">🔥 3</div>
                <div class="text-[11px] font-extrabold text-[#996B00] uppercase">
                  ${lang === "th" ? "วันต่อเนื่อง" : "Day Streak"}
                </div>
              </div>
              <div class="bg-[#EBF8FF] border-2 border-[#7CC4FA] border-b-4 rounded-2xl px-4 py-3 text-center">
                <div class="text-xl font-extrabold text-[#0B69A3]">💎 ${totalXp}</div>
                <div class="text-[11px] font-extrabold text-[#0B69A3] uppercase">
                  ${lang === "th" ? "คะแนน XP" : "Total XP"}
                </div>
              </div>
              <div class="bg-[#F0FDF4] border-2 border-[#86EFAC] border-b-4 rounded-2xl px-4 py-3 text-center">
                <div class="text-xl font-extrabold text-[#15803D]">🍵 5/5</div>
                <div class="text-[11px] font-extrabold text-[#15803D] uppercase">
                  ${lang === "th" ? "พลังใจเต็ม" : "Cozy Hearts"}
                </div>
              </div>
            </div>
          </div>

          <!-- Two-Way Learning & Multi-Language Selector Bar -->
          <div class="mt-5 pt-5 border-t border-[#E5DEC9]">
            <div class="text-xs font-extrabold uppercase tracking-wider text-[#5C504A] mb-2.5 flex items-center gap-1.5">
              🌐 ${lang === "th"
                ? "เลือกทิศทางการเรียนภาษา (Two-Way Learning & Multi-Language Switcher):"
                : "Select Your Learning Direction (Two-Way & Multi-Language):"}
            </div>
            <div class="grid sm:grid-cols-3 gap-3">
              ${courses.map((course) => {
                const isSelected = courseDirection === course.id;
                return html`
                  <button
                    key=${course.id}
                    type="button"
                    onClick=${() => onChangeCourseDirection(course.id)}
                    class=${`text-left p-3.5 rounded-2xl border-2 border-b-4 transition cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? "bg-[#2C2523] text-[#FAF6F0] border-[#14100F] shadow-sm"
                        : "bg-[#FAF6F0] hover:bg-[#F2ECE1] text-[#2C2523] border-[#D5CBB8]"
                    }`}
                  >
                    <span class="text-2xl shrink-0 mt-0.5">${course.flagPair}</span>
                    <div class="min-w-0">
                      <div class="text-xs sm:text-sm font-extrabold truncate">
                        ${lang === "th" ? course.titleTh : course.titleEn}
                      </div>
                      <p class=${`text-[11px] mt-0.5 line-clamp-2 ${isSelected ? "text-[#E5DEC9]" : "text-[#6E6059]"}`}>
                        ${lang === "th" ? course.subtitleTh : course.subtitleEn}
                      </p>
                    </div>
                  </button>
                `;
              })}
            </div>
          </div>
        </div>

        <!-- DUOLINGO-STYLE SKILL TREE / UNIT CARDS (แบ่งหมวดหมู่ชัดเจน เข้าถึงได้ทันที) -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- UNIT 1: SENTENCE BUILDER (ต่อประโยคสองทาง 150+ ประโยค) -->
          <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 flex flex-col justify-between gap-4 hover:border-[#58CC02] transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#58CC02]/15 text-[#2E7D00] text-xs font-extrabold">
                  UNIT 1 • ${courseDirection === "en-th" ? "BUILD THAI / EN" : "150+ ประโยค"}
                </span>
                <span class="text-xs font-bold text-[#6B8E78]">
                  ✓ ${sbCompletedIds?.length || 0}/${totalSentencesCount}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-[#58CC02]/15 border-2 border-[#58CC02]/40 flex items-center justify-center text-3xl shrink-0">
                  🧩
                </div>
                <div>
                  <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
                    ${courseDirection === "en-th"
                      ? "Thai & English Sentence Builder"
                      : lang === "th"
                      ? "ต่อประโยค (Sentence Builder)"
                      : "Sentence Builder Game"}
                  </h3>
                  <p class="text-xs text-[#6E6059]">
                    ${courseDirection === "en-th"
                      ? "Arrange Thai or English word tiles with phonetic pronunciation hints"
                      : lang === "th"
                      ? "เรียงคำศัพท์เป็นประโยคสมบูรณ์ แบ่งเป็น 5 หมวดหมู่ชัดเจน"
                      : "Build grammatically correct sentences across 5 daily categories"}
                  </p>
                </div>
              </div>

              <!-- Quick Category Pills right on Home Screen -->
              <div class="pt-2 space-y-1.5">
                <div class="text-[11px] font-bold text-[#7A6B63]">
                  📂 ${lang === "th" ? "กดเข้าหมวดหมู่ทันที:" : "Jump to Category:"}
                </div>
                <div class="flex flex-wrap gap-1.5">
                  ${(SENTENCE_BUILDER_CATEGORIES || []).slice(1).map((cat) => html`
                    <button
                      key=${cat.id}
                      type="button"
                      onClick=${() => {
                        onSelectBuilderCategory(cat.id);
                        onNavigateTab("builder");
                      }}
                      class="px-2.5 py-1 rounded-xl bg-[#FAF6F0] hover:bg-[#58CC02]/20 text-[#2C2523] border border-[#D5CBB8] text-[11px] font-semibold transition cursor-pointer"
                    >
                      ${lang === "th" ? cat.labelTh.split(" (")[0] : cat.labelEn.split(" (")[0]}
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick=${() => onNavigateTab("builder")}
              class="w-full py-3 rounded-2xl bg-[#58CC02] hover:bg-[#4CAD02] text-white font-extrabold text-xs sm:text-sm border-b-4 border-[#3E8E00] active:translate-y-0.5 transition cursor-pointer"
            >
              🧩 ${lang === "th" ? "เริ่มเล่นต่อประโยคเลย →" : "Start Sentence Builder →"}
            </button>
          </div>

          <!-- UNIT 2: BILINGUAL STORIES & IMPORTER (นิทานสองภาษา & วางบทความ) -->
          <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 flex flex-col justify-between gap-4 hover:border-[#CE82FF] transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#CE82FF]/15 text-[#7E22CE] text-xs font-extrabold">
                  UNIT 2 • BILINGUAL STORIES
                </span>
                <span class="text-xs font-bold text-[#7E22CE]">
                  📚 ${(bilingualStories || []).length} เรื่อง
                </span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-[#CE82FF]/15 border-2 border-[#CE82FF]/40 flex items-center justify-center text-3xl shrink-0">
                  📖
                </div>
                <div>
                  <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
                    ${lang === "th" ? "นิทานสองภาษา & บทความ (Stories)" : "Bilingual Stories & Importer"}
                  </h3>
                  <p class="text-xs text-[#6E6059]">
                    ${lang === "th"
                      ? "อ่านนิทานสองภาษาโต้ตอบทีละบรรทัดพร้อมเสียงพากย์ ไทย-อังกฤษ หรือวางบทความเอง"
                      : "Interactive Thai-English stories with audio, phonetics & quizzes + Story Importer"}
                  </p>
                </div>
              </div>

              <div class="pt-2 space-y-1.5">
                <div class="text-[11px] font-bold text-[#7A6B63]">
                  ✨ ${lang === "th" ? "เลือกเรื่องยอดนิยม:" : "Featured Bilingual Stories:"}
                </div>
                <div class="space-y-1">
                  ${(bilingualStories || []).slice(0, 2).map((st) => html`
                    <button
                      key=${st.id}
                      type="button"
                      onClick=${() => {
                        onSelectBilingualStory(st.id);
                        onNavigateTab("story");
                      }}
                      class="w-full text-left px-3 py-1.5 rounded-xl bg-[#FAF6F0] hover:bg-[#CE82FF]/15 border border-[#E5DEC9] text-xs font-semibold text-[#2C2523] flex items-center justify-between cursor-pointer"
                    >
                      <span class="truncate">${st.coverEmoji} ${lang === "th" ? st.titleTh : st.titleEn}</span>
                      <span class="text-[10px] text-[#7E22CE] shrink-0 ml-2">อ่าน →</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick=${() => onNavigateTab("story")}
              class="w-full py-3 rounded-2xl bg-[#A855F7] hover:bg-[#9333EA] text-white font-extrabold text-xs sm:text-sm border-b-4 border-[#7E22CE] active:translate-y-0.5 transition cursor-pointer"
            >
              📚 ${lang === "th" ? "เปิดนิทานสองภาษา & บทความ →" : "Open Bilingual Stories →"}
            </button>
          </div>

          <!-- UNIT 3: SHADOWING & VOICE CHAT (ฝึกออกเสียง & สนทนากับโนรี) -->
          <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 flex flex-col justify-between gap-4 hover:border-[#C86D51] transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#C86D51]/15 text-[#A85035] text-xs font-extrabold">
                  UNIT 3 • VOICE & SHADOWING
                </span>
                <span class="text-xs font-bold text-[#C86D51]">🎙️ AI Scoring</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-[#C86D51]/15 border-2 border-[#C86D51]/40 flex items-center justify-center text-3xl shrink-0">
                  🎙️
                </div>
                <div>
                  <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
                    ${lang === "th" ? "ฝึกออกเสียง & สนทนา (Shadowing)" : "Shadowing & Voice Chat Studio"}
                  </h3>
                  <p class="text-xs text-[#6E6059]">
                    ${lang === "th"
                      ? "อัดเสียงพูดตามประโยคพร้อมประเมินคะแนนรายคำ (Word Clarity %) และคุยกับโนรี"
                      : "Practice pronunciation with word-by-word accuracy scoring and cozy AI voice chat"}
                  </p>
                </div>
              </div>

              <div class="bg-[#FAF6F0] border border-[#E5DEC9] rounded-2xl p-3 text-xs text-[#5C504A] space-y-1">
                <div class="font-bold text-[#2C2523]">🎯 ฟีเจอร์ครบครันในโหมดนี้:</div>
                <div>• ประเมินความชัดรายคำ (Pronunciation Score %)</div>
                <div>• ไมค์อัดเสียงสนทนา + ปรับประโยคธรรมชาติ</div>
              </div>
            </div>

            <button
              type="button"
              onClick=${() => onNavigateTab("studio")}
              class="w-full py-3 rounded-2xl bg-[#C86D51] hover:bg-[#B55B3F] text-white font-extrabold text-xs sm:text-sm border-b-4 border-[#8F432B] active:translate-y-0.5 transition cursor-pointer"
            >
              🎙️ ${lang === "th" ? "เข้าสู่ห้องฝึกออกเสียง & แชท →" : "Open Shadowing & Chat →"}
            </button>
          </div>

          <!-- UNIT 4: PICTURE QUIZ & MINI DICTIONARY (เกมทายภาพคำศัพท์ & พจนานุกรม) -->
          <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 flex flex-col justify-between gap-4 hover:border-[#1CB0F6] transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#1CB0F6]/15 text-[#0B69A3] text-xs font-extrabold">
                  UNIT 4 • VOCAB PICTURE QUIZ
                </span>
                <span class="text-xs font-bold text-[#0B69A3]">⭐ ${quizScore || 0} pts</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-[#1CB0F6]/15 border-2 border-[#1CB0F6]/40 flex items-center justify-center text-3xl shrink-0">
                  🖼️
                </div>
                <div>
                  <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
                    ${lang === "th" ? "เกมทายภาพคำศัพท์ (Picture Quiz)" : "Vocabulary Picture Quiz"}
                  </h3>
                  <p class="text-xs text-[#6E6059]">
                    ${lang === "th"
                      ? "ทายคำศัพท์จากรูปภาพ มีทั้งแบบปรนัย 4 ตัวเลือก และพิมพ์คำตอบ พร้อมชี้แปลคำศัพท์"
                      : "Visual vocabulary game with 4-choice & typing modes, hover tooltips & dictionary"}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick=${() => onNavigateTab("quiz")}
              class="w-full py-3 rounded-2xl bg-[#1CB0F6] hover:bg-[#0D9DE0] text-white font-extrabold text-xs sm:text-sm border-b-4 border-[#097BB3] active:translate-y-0.5 transition cursor-pointer"
            >
              🖼️ ${lang === "th" ? "เล่นเกมทายภาพคำศัพท์ →" : "Play Picture Quiz →"}
            </button>
          </div>

          <!-- UNIT 5: MICRO-LESSONS & PHRASEBOOK (บทเรียนย่อย & คลังคำศัพท์เดิม) -->
          <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 flex flex-col justify-between gap-4 hover:border-[#6B8E78] transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#6B8E78]/15 text-[#3F634D] text-xs font-extrabold">
                  UNIT 5 • LESSONS & VOCAB BANK
                </span>
                <span class="text-xs font-bold text-[#3F634D]">📓 ${savedPhrasesCount} saved</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-[#6B8E78]/15 border-2 border-[#6B8E78]/40 flex items-center justify-center text-3xl shrink-0">
                  🎵
                </div>
                <div>
                  <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
                    ${lang === "th" ? "บทเรียนย่อย & คลังคำศัพท์ (Phrasebook)" : "Micro-Lessons & Phrasebook"}
                  </h3>
                  <p class="text-xs text-[#6E6059]">
                    ${lang === "th"
                      ? "เกร็ดสำนวนรายวันจากโนรี และสมุดจดประโยค/คลังคำศัพท์ที่คุณบันทึกไว้ทบทวน"
                      : "Daily bite-sized idioms, natural swaps, and your saved vocabulary phrasebook"}
                  </p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick=${() => onNavigateTab("lessons")}
                class="py-3 rounded-2xl bg-[#6B8E78] hover:bg-[#587864] text-white font-extrabold text-xs border-b-4 border-[#415C4B] cursor-pointer"
              >
                🎵 ${lang === "th" ? "บทเรียนย่อย" : "Lessons"}
              </button>
              <button
                type="button"
                onClick=${() => onNavigateTab("notebook")}
                class="py-3 rounded-2xl bg-[#2C2523] hover:bg-[#423835] text-white font-extrabold text-xs border-b-4 border-[#14100F] cursor-pointer"
              >
                📓 ${lang === "th" ? `สมุดคำศัพท์ (${savedPhrasesCount})` : `Phrasebook (${savedPhrasesCount})`}
              </button>
            </div>
          </div>

          <!-- UNIT 6: ADMIN PANEL (ระบบหลังบ้านจัดการเนื้อหา โลโก้ & รหัสผ่าน) -->
          <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 flex flex-col justify-between gap-4 hover:border-[#F59E0B] transition">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-[#F59E0B]/15 text-[#B45309] text-xs font-extrabold">
                  UNIT 6 • STUDIO ADMIN CMS
                </span>
                <span class="text-xs font-bold text-[#B45309]">🔐 Admin</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-[#F59E0B]/15 border-2 border-[#F59E0B]/40 flex items-center justify-center text-3xl shrink-0">
                  🛠️
                </div>
                <div>
                  <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
                    ${lang === "th" ? "ระบบหลังบ้าน (Admin Panel)" : "Studio Admin Panel (CMS)"}
                  </h3>
                  <p class="text-xs text-[#6E6059]">
                    ${lang === "th"
                      ? "จัดการเพิ่ม/ลบประโยคและนิทานสองภาษา ตั้งค่าเปลี่ยนโลโก้แบรนด์ และเปลี่ยนรหัสผ่านแอดมิน"
                      : "Manage sentences & stories, customize brand logo & title, and change admin password"}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick=${() => onNavigateTab("admin")}
              class="w-full py-3 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold text-xs sm:text-sm border-b-4 border-[#B45309] active:translate-y-0.5 transition cursor-pointer"
            >
              🛠️ ${lang === "th" ? "จัดการระบบหลังบ้าน (Admin) →" : "Open Admin Panel →"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // 2. INTERACTIVE BILINGUAL STORIES VIEW (นิทานสองภาษาโต้ตอบสไตล์ Noree Vance)
  // ==========================================================================
  function renderInteractiveBilingualStories(html, ctx = {}) {
    const {
      lang,
      courseDirection,
      bilingualStories = [],
      activeBilingualStoryId,
      activeStoryId,
      setActiveBilingualStoryId,
      onSelectStory,
      bilingualUnlockedStep,
      unlockedStep,
      setBilingualUnlockedStep,
      onUnlockNextStep,
      bilingualQuizAnswers,
      storyQuizAnswers,
      setBilingualQuizAnswers,
      speakText,
      speakMultiLangText,
      renderSentenceWithWordTooltips,
      savePhrase,
      playCozySuccessChime,
    } = ctx;

    const resolvedStoryId = activeBilingualStoryId || activeStoryId;
    const resolvedStep = bilingualUnlockedStep ?? unlockedStep ?? 1;
    const resolvedQuizAnswers = bilingualQuizAnswers || storyQuizAnswers || {};
    const handleSelectStoryId = setActiveBilingualStoryId || onSelectStory || (() => {});
    const handleSetStep = setBilingualUnlockedStep || onUnlockNextStep || (() => {});
    const handleSetQuizAns = setBilingualQuizAnswers || (() => {});
    const handleSavePhraseSafe = savePhrase || (() => {});

    const currentStory =
      (bilingualStories || []).find((s) => s.id === resolvedStoryId) ||
      (bilingualStories || [])[0];

    if (!currentStory) return null;

    const lines = currentStory.lines || [];
    const visibleLines = lines.slice(0, Math.max(1, resolvedStep));
    const isStoryFinished = resolvedStep >= lines.length;

    const handleAnswerCheckpoint = (lineId, opt, idx) => {
      handleSetQuizAns((prev) => ({
        ...(prev || {}),
        [lineId]: { selectedIdx: idx, isCorrect: opt.isCorrect },
      }));
      if (opt.isCorrect && playCozySuccessChime) {
        playCozySuccessChime(true);
      }
    };

    return html`
      <div class="space-y-6">
        <!-- Story Selection Shelf -->
        <div class="grid sm:grid-cols-3 gap-3.5">
          ${(bilingualStories || []).map((st) => {
            const isSelected = st.id === currentStory.id;
            return html`
              <button
                key=${st.id}
                type="button"
                onClick=${() => {
                  handleSelectStoryId(st.id);
                  handleSetStep(1);
                }}
                class=${`text-left p-4 rounded-3xl border-2 border-b-4 transition cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-[#2C2523] text-[#FAF6F0] border-[#14100F] shadow-sm"
                    : "bg-white hover:bg-[#FAF6F0] text-[#2C2523] border-[#E5DEC9]"
                }`}
              >
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-2xl">${st.coverEmoji || "📖"}</span>
                    <span class=${`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-[#CE82FF]/15 text-[#7E22CE]"}`}>
                      ${st.level}
                    </span>
                  </div>
                  <h4 class="font-serif-editorial text-base font-bold leading-snug">
                    ${st.titleTh}
                  </h4>
                  <p class=${`text-xs font-medium ${isSelected ? "text-[#C86D51]" : "text-[#6E6059]"}`}>
                    ${st.titleEn}
                  </p>
                </div>
                <p class=${`text-[11px] line-clamp-2 ${isSelected ? "text-[#E5DEC9]/80" : "text-[#8C7D75]"}`}>
                  ${lang === "th" ? st.summaryTh : st.summaryEn}
                </p>
              </button>
            `;
          })}
        </div>

        <!-- Active Bilingual Story Interactive Reader -->
        <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DEC9]">
            <div class="flex items-center gap-3.5">
              <div class="w-14 h-14 rounded-2xl bg-[#FAF6F0] border-2 border-[#E5DEC9] flex items-center justify-center text-3xl">
                ${currentStory.coverEmoji || "📚"}
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#CE82FF]/15 text-[#7E22CE]">
                    📚 Interactive Bilingual Story • ${currentStory.level}
                  </span>
                  <span class="text-xs text-[#7A6B63]">
                    ท่อนที่ ${Math.min(resolvedStep, lines.length)} / ${lines.length}
                  </span>
                </div>
                <h3 class="font-serif-editorial text-xl sm:text-2xl font-bold text-[#2C2523] mt-0.5">
                  ${currentStory.titleTh} — <span class="text-[#C86D51]">${currentStory.titleEn}</span>
                </h3>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                onClick=${() => handleSetStep(lines.length)}
                class="px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#EBE3D5] text-[#2C2523] border border-[#D5CBB8] text-xs font-bold cursor-pointer"
              >
                📖 ${lang === "th" ? "แสดงทุกบรรทัดทั้งหมด" : "Show All Lines"}
              </button>
              <button
                type="button"
                onClick=${() => {
                  handleSetStep(1);
                  handleSetQuizAns({});
                }}
                class="px-3.5 py-2 rounded-xl bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#2C2523] text-xs font-bold cursor-pointer"
              >
                🔄 ${lang === "th" ? "เริ่มอ่านใหม่" : "Restart"}
              </button>
            </div>
          </div>

          <!-- Story Dialogue Stream -->
          <div class="space-y-4">
            ${visibleLines.map((line, idx) => {
              const quizAns = resolvedQuizAnswers[line.id];
              return html`
                <div key=${line.id} class="space-y-3 animate-fadeIn">
                  <div class="bg-[#FAF6F0] border border-[#E5DEC9] rounded-2xl p-4 sm:p-5 space-y-3">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="w-8 h-8 rounded-xl bg-white border border-[#E5DEC9] flex items-center justify-center text-lg">
                          ${line.avatar || "💬"}
                        </span>
                        <span class="text-xs font-extrabold uppercase tracking-wider text-[#2C2523]">
                          ${line.speaker}
                        </span>
                        <span class="text-[11px] text-[#8C7D75]">#${idx + 1}</span>
                      </div>

                      <!-- Two-Way Audio Buttons: Listen English & Listen Thai -->
                      <div class="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick=${() => speakText(line.en, 1.0)}
                          class="px-3 py-1.5 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white text-xs font-bold cursor-pointer flex items-center gap-1"
                        >
                          🔊 🇬🇧 ฟังเสียง EN
                        </button>
                        <button
                          type="button"
                          onClick=${() => speakMultiLangText(line.th, "th-TH", 1.0)}
                          class="px-3 py-1.5 rounded-xl bg-[#6B8E78] hover:bg-[#587864] text-white text-xs font-bold cursor-pointer flex items-center gap-1"
                        >
                          🔊 🇹🇭 ฟังเสียงไทย
                        </button>
                        <button
                          type="button"
                          onClick=${() => handleSavePhraseSafe(line.en, `${line.th} (${line.vocabNoteTh || ""})`)}
                          class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F2ECE1] text-[#2C2523] border border-[#D5CBB8] text-xs font-semibold cursor-pointer"
                        >
                          + ${lang === "th" ? "จดบันทึก" : "Save"}
                        </button>
                      </div>
                    </div>

                    <!-- Primary & Secondary Language Display (Adapts to Two-Way Learning Mode) -->
                    <div class="space-y-2 pl-1">
                      <div class="font-serif-editorial text-lg sm:text-xl font-bold text-[#2C2523] leading-relaxed">
                        🇬🇧 ${renderSentenceWithWordTooltips ? renderSentenceWithWordTooltips(line.en, null, `bst-${line.id}`) : line.en}
                      </div>

                      <div class="text-base sm:text-lg font-bold text-[#3F634D] bg-white/90 border border-[#E5DEC9] rounded-xl px-3.5 py-2.5">
                        🇹🇭 “${line.th}”
                        ${line.phoneticTh && html`
                          <div class="text-xs font-mono-code font-normal text-[#7A6B63] mt-1">
                            🗣️ คำอ่านคาราโอเกะ (Thai Phonetics): <span class="text-[#C86D51] font-semibold">${line.phoneticTh}</span>
                          </div>
                        `}
                      </div>

                      ${(line.vocabNoteTh || line.vocabNoteEn) && html`
                        <div class="text-xs text-[#5C504A] bg-[#F5EFE6] rounded-xl px-3 py-2">
                          💡 <strong class="text-[#C86D51]">เกร็ดคำศัพท์สองทาง:</strong> ${courseDirection === "en-th" ? (line.vocabNoteEn || line.vocabNoteTh) : (line.vocabNoteTh || line.vocabNoteEn)}
                        </div>
                      `}
                    </div>
                  </div>

                  <!-- Interactive Mid-Story Comprehension Quiz Checkpoint -->
                  ${line.quizCheckpoint && html`
                    <div class="bg-[#FFF9E6] border-2 border-[#FFD966] rounded-2xl p-4 sm:p-5 space-y-3">
                      <div class="text-xs font-extrabold uppercase tracking-wider text-[#B45309] flex items-center gap-1.5">
                        🧩 คำถามเช็กความเข้าใจระหว่างนิทาน (Story Checkpoint)
                      </div>
                      <p class="font-serif-editorial text-base font-bold text-[#2C2523]">
                        ${courseDirection === "en-th" ? line.quizCheckpoint.questionEn : line.quizCheckpoint.questionTh}
                      </p>
                      <div class="grid sm:grid-cols-3 gap-2.5">
                        ${line.quizCheckpoint.options.map((opt, oIdx) => {
                          const isChosen = quizAns?.selectedIdx === oIdx;
                          const btnStyle = isChosen
                            ? opt.isCorrect
                              ? "bg-[#58CC02] text-white border-[#3E8E00]"
                              : "bg-[#D9534F] text-white border-[#A9322E]"
                            : "bg-white hover:bg-[#FAF6F0] text-[#2C2523] border-[#E5DEC9]";
                          return html`
                            <button
                              key=${oIdx}
                              type="button"
                              onClick=${() => handleAnswerCheckpoint(line.id, opt, oIdx)}
                              class=${`p-3 rounded-xl border-2 border-b-4 text-left text-xs font-bold transition cursor-pointer ${btnStyle}`}
                            >
                              ${courseDirection === "en-th" ? opt.textEn : opt.textTh}
                            </button>
                          `;
                        })}
                      </div>
                      ${quizAns && html`
                        <div class=${`text-xs font-bold ${quizAns.isCorrect ? "text-[#2E7D00]" : "text-[#D9534F]"}`}>
                          ${quizAns.isCorrect
                            ? "🐱🎉 ถูกต้องเลยค่ะ! น้องเซียนน่าปรบมือให้เลย กดอ่านท่อนถัดไปได้เลยค่ะ!"
                            : "🐾 ลองเลือกคำตอบใหม่อีกครั้งนะคะ!"}
                        </div>
                      `}
                    </div>
                  `}
                </div>
              `;
            })}
          </div>

          <!-- Continue / Next Line Button -->
          <div class="pt-3 flex items-center justify-between">
            <span class="text-xs text-[#7A6B63]">
              💡 สามารถชี้หรือแตะที่คำภาษาอังกฤษเพื่อดูคำแปลรายคำได้ทันที
            </span>
            ${!isStoryFinished ? html`
              <button
                type="button"
                onClick=${() => handleSetStep(Math.min(lines.length, resolvedStep + 1))}
                class="px-6 py-3.5 rounded-2xl bg-[#58CC02] hover:bg-[#4CAD02] text-white font-extrabold text-sm border-b-4 border-[#3E8E00] active:translate-y-0.5 transition cursor-pointer"
              >
                ${lang === "th" ? "อ่านบรรทัดถัดไป (Continue) →" : "Continue Next Line →"}
              </button>
            ` : html`
              <div class="px-5 py-3 rounded-2xl bg-[#6B8E78]/15 border border-[#6B8E78] text-[#2E4F3B] text-xs font-extrabold">
                🎉 อ่านจบเรื่องนี้เรียบร้อยแล้ว! เก่งมากเลยค่ะ (+25 XP)
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // 3. FULL ADMIN PANEL VIEW (จัดการเนื้อหา, เปลี่ยนโลโก้แบรนด์, เปลี่ยนรหัสผ่านแอดมิน)
  // ==========================================================================
  function renderAdminPanelView(html, ctx = {}) {
    const {
      lang,
      isAdminLoggedIn: propIsAdminLoggedIn = false,
      isAdminAuthenticated: propIsAdminAuthenticated = false,
      setIsAdminLoggedIn,
      setIsAdminAuthenticated,
      adminLoginInput = "",
      setAdminLoginInput = () => {},
      adminLoginError = "",
      setAdminLoginError = () => {},
      adminActiveSection = "brand",
      setAdminActiveSection = () => {},
      brandConfig = { brandName: "Noree Vance", logoUrl: "/noree-logo.png" },
      onUpdateBrandConfig = () => {},
      customSentences = [],
      onAddCustomSentence = () => {},
      onDeleteCustomSentence = () => {},
      bilingualStories = [],
      onAddBilingualStory = () => {},
      onDeleteBilingualStory = () => {},
      onResetBilingualStories = () => {},
      adminStatusToast = "",
      setAdminStatusToast = () => {},
      SENTENCE_BUILDER_CATEGORIES = [],
      NOREE_LOGO_FALLBACK,
    } = ctx;

    const isAdminAuthenticated = Boolean(propIsAdminLoggedIn || propIsAdminAuthenticated || isAdminLoggedIn);
    const handleSetAdminAuth = (val) => {
      isAdminLoggedIn = Boolean(val);
      if (setIsAdminLoggedIn) setIsAdminLoggedIn(Boolean(val));
      if (setIsAdminAuthenticated) setIsAdminAuthenticated(Boolean(val));
    };

    const TwoWayMod = global.NoreeTwoWayModule;

    const handleAdminLoginSubmit = (e) => {
      e?.preventDefault();
      const savedPass = TwoWayMod ? TwoWayMod.getAdminPassword() : "admin1234";
      if ((adminLoginInput || "").trim() === savedPass) {
        handleSetAdminAuth(true);
        setAdminLoginError("");
        setAdminLoginInput("");
      } else {
        setAdminLoginError(
          lang === "th"
            ? "รหัสผ่านแอดมินไม่ถูกต้องค่ะ (รหัสเริ่มต้นคือ admin1234)"
            : "Incorrect admin password (default is admin1234)"
        );
      }
    };

    if (!isAdminAuthenticated) {
      return html`
        <div class="max-w-md mx-auto my-8 bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div class="text-center space-y-2">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-[#F59E0B]/15 border-2 border-[#F59E0B]/40 flex items-center justify-center text-3xl">
              🛠️🔐
            </div>
            <h2 class="font-serif-editorial text-2xl font-bold text-[#2C2523]">
              ${lang === "th" ? "เข้าสู่ระบบหลังบ้าน (Admin Panel)" : "Studio Admin Login"}
            </h2>
            <p class="text-xs text-[#6E6059]">
              ${lang === "th"
                ? "สำหรับจัดการคลังประโยค นิทานสองภาษา ตั้งค่าโลโก้แบรนด์ และเปลี่ยนรหัสผ่านแอดมิน"
                : "Manage sentences, bilingual stories, brand logo, and admin security"}
            </p>
            <div class="inline-block px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E5DEC9] text-[11px] text-[#7A6B63]">
              🔑 รหัสผ่านเริ่มต้น: <strong class="text-[#C86D51]">admin1234</strong>
            </div>
          </div>

          <form onSubmit=${handleAdminLoginSubmit} class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-[#2C2523]">
                ${lang === "th" ? "รหัสผ่านแอดมิน (Admin Password):" : "Admin Password:"}
              </label>
              <input
                type="password"
                value=${adminLoginInput}
                onChange=${(e) => setAdminLoginInput(e.target.value)}
                placeholder="กรอกรหัสผ่านแอดมิน (เช่น admin1234)..."
                class="w-full bg-[#FAF6F0] border-2 border-[#D5CBB8] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C86D51]"
              />
            </div>

            ${adminLoginError && html`
              <div class="p-3 rounded-xl bg-[#D9534F]/10 border border-[#D9534F]/30 text-xs font-bold text-[#D9534F]">
                ⚠️ ${adminLoginError}
              </div>
            `}

            <button
              type="submit"
              class="w-full py-3.5 rounded-2xl bg-[#C86D51] hover:bg-[#B35B40] text-white font-extrabold text-sm border-b-4 border-[#8F432B] cursor-pointer"
            >
              🔓 ${lang === "th" ? "เข้าสู่ระบบจัดการหลังบ้าน" : "Unlock Admin Panel"}
            </button>
          </form>
        </div>
      `;
    }

    // Handle Logo File Upload -> Base64 DataURL
    const handleLogoFileChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onUpdateBrandConfig({ ...brandConfig, logoUrl: reader.result });
          setAdminStatusToast("✅ อัปโหลดและเปลี่ยนโลโก้แบรนด์เรียบร้อยแล้วค่ะ!");
          setTimeout(() => setAdminStatusToast(""), 3500);
        }
      };
      reader.readAsDataURL(file);
    };

    return html`
      <div class="max-w-5xl mx-auto space-y-6">
        <!-- Admin Top Bar -->
        <div class="bg-white border-2 border-[#E5DEC9] border-b-4 rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/40 flex items-center justify-center text-2xl">
              🛠️
            </div>
            <div>
              <h2 class="font-serif-editorial text-xl font-bold text-[#2C2523]">
                ${lang === "th" ? "ระบบจัดการหลังบ้าน (Admin Panel & Studio CMS)" : "Studio Admin Panel & CMS"}
              </h2>
              <p class="text-xs text-[#6E6059]">
                ${lang === "th"
                  ? "จัดการเนื้อหาบทเรียน ตั้งค่าโลโก้แบรนด์ และเปลี่ยนรหัสผ่านผู้ดูแลระบบ"
                  : "Manage learning content, brand logo & identity, and admin password"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick=${() => handleSetAdminAuth(false)}
            class="px-4 py-2 rounded-xl bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#2C2523] text-xs font-bold cursor-pointer"
          >
            🔒 ${lang === "th" ? "ล็อกหน้าจอแอดมิน (Logout)" : "Lock Admin"}
          </button>
        </div>

        ${adminStatusToast && html`
          <div class="p-4 rounded-2xl bg-[#58CC02]/15 border-2 border-[#58CC02] text-[#2E7D00] text-xs sm:text-sm font-extrabold">
            ${adminStatusToast}
          </div>
        `}

        <!-- Admin Navigation Sub-Tabs -->
        <div class="flex flex-wrap gap-2 bg-[#F2ECE1] p-2 rounded-2xl border border-[#E5DEC9]">
          ${[
            { id: "brand", label: "🎨 1. ตั้งค่าแบรนด์ & เปลี่ยนโลโก้" },
            { id: "sentences", label: `🧩 2. จัดการประโยค (เพิ่มแล้ว ${customSentences.length} ข้อ)` },
            { id: "stories", label: `📚 3. จัดการนิทานสองภาษา (${bilingualStories.length} เรื่อง)` },
            { id: "security", label: "🔐 4. เปลี่ยนรหัสผ่านแอดมิน" },
          ].map((tab) => html`
            <button
              key=${tab.id}
              type="button"
              onClick=${() => setAdminActiveSection(tab.id)}
              class=${`px-4 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                adminActiveSection === tab.id
                  ? "bg-[#2C2523] text-white shadow-xs"
                  : "bg-white/70 hover:bg-white text-[#5C504A]"
              }`}
            >
              ${tab.label}
            </button>
          `)}
        </div>

        <!-- SECTION 1: BRAND & LOGO SETTINGS -->
        ${adminActiveSection === "brand" && html`
          <div class="bg-white border-2 border-[#E5DEC9] rounded-3xl p-6 space-y-5">
            <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
              🎨 ตั้งค่าโลโก้แบรนด์และชื่อสตูดิโอ (Brand & Logo Customization)
            </h3>

            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-[#FAF6F0] border border-[#E5DEC9] rounded-2xl p-4">
              <img
                src=${brandConfig.logoUrl || "/noree-logo.png"}
                onError=${(e) => {
                  if (NOREE_LOGO_FALLBACK && e.target.src !== NOREE_LOGO_FALLBACK) {
                    e.target.src = NOREE_LOGO_FALLBACK;
                  }
                }}
                alt="Brand Logo Preview"
                class="w-20 h-20 rounded-2xl object-cover border-2 border-[#C86D51] bg-white shrink-0"
              />
              <div class="space-y-2 flex-1">
                <div class="text-xs font-bold text-[#2C2523]">
                  อัปโหลดไฟล์รูปโลโก้ใหม่จากเครื่อง (รองรับ PNG, JPG, WEBP, SVG):
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <label class="px-4 py-2 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white text-xs font-bold cursor-pointer">
                    📁 เลือกไฟล์รูปโลโก้...
                    <input
                      type="file"
                      accept="image/*"
                      onChange=${handleLogoFileChange}
                      class="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick=${() => {
                      onUpdateBrandConfig(TwoWayMod.DEFAULT_BRAND_CONFIG);
                      setAdminStatusToast("🔄 รีเซ็ตโลโก้และชื่อแบรนด์กลับเป็นค่าเริ่มต้นของ Noree Vance แล้วค่ะ");
                      setTimeout(() => setAdminStatusToast(""), 3000);
                    }}
                    class="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F2ECE1] text-[#2C2523] border border-[#D5CBB8] text-xs font-semibold cursor-pointer"
                  >
                    🔄 คืนค่าโลโก้เริ่มต้น
                  </button>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">ชื่อแบรนด์ (Brand Name):</label>
                <input
                  type="text"
                  value=${brandConfig.brandName}
                  onChange=${(e) => onUpdateBrandConfig({ ...brandConfig, brandName: e.target.value })}
                  class="w-full bg-[#FAF6F0] border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">ป้ายกำกับแบรนด์ (Badge Text):</label>
                <input
                  type="text"
                  value=${brandConfig.brandBadgeTh}
                  onChange=${(e) =>
                    onUpdateBrandConfig({
                      ...brandConfig,
                      brandBadgeTh: e.target.value,
                      brandBadgeEn: e.target.value,
                    })
                  }
                  class="w-full bg-[#FAF6F0] border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div class="space-y-1 sm:col-span-2">
                <label class="text-xs font-bold text-[#2C2523]">คำอธิบายใต้ชื่อแบรนด์ (Subtitle ภาษาไทย):</label>
                <input
                  type="text"
                  value=${brandConfig.brandSubtitleTh}
                  onChange=${(e) => onUpdateBrandConfig({ ...brandConfig, brandSubtitleTh: e.target.value })}
                  class="w-full bg-[#FAF6F0] border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div class="space-y-1 sm:col-span-2">
                <label class="text-xs font-bold text-[#2C2523]">หรือวางลิงก์รูปภาพโลโก้โดยตรง (Logo Image URL):</label>
                <input
                  type="text"
                  value=${brandConfig.logoUrl}
                  onChange=${(e) => onUpdateBrandConfig({ ...brandConfig, logoUrl: e.target.value })}
                  placeholder="/noree-logo.png หรือ https://..."
                  class="w-full bg-[#FAF6F0] border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-xs font-mono-code"
                />
              </div>
            </div>
          </div>
        `}

        <!-- SECTION 2: MANAGE SENTENCE BUILDER CONTENT -->
        ${adminActiveSection === "sentences" && html`
          <div class="bg-white border-2 border-[#E5DEC9] rounded-3xl p-6 space-y-5">
            <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
              🧩 เพิ่มประโยคใหม่เข้าสู่เกมต่อประโยค (Add Two-Way Sentence Builder Item)
            </h3>

            <form
              onSubmit=${(e) => {
                e.preventDefault();
                const form = e.target;
                const cat = form.sbCat.value || "greetings";
                const th = form.sbTh.value.trim();
                const en = form.sbEn.value.trim();
                const tip = form.sbTip.value.trim() || "ประโยคใช้บ่อยที่เพิ่มจากระบบแอดมิน";
                if (!th || !en) return;
                onAddCustomSentence({
                  id: `custom-sb-${Date.now()}`,
                  cat,
                  category: cat,
                  th,
                  en,
                  tip,
                  tipTh: tip,
                });
                form.reset();
                setAdminStatusToast("✅ เพิ่มประโยคใหม่เข้าสู่คลัง Sentence Builder เรียบร้อยแล้ว!");
                setTimeout(() => setAdminStatusToast(""), 3000);
              }}
              class="grid sm:grid-cols-2 gap-4 bg-[#FAF6F0] border border-[#E5DEC9] rounded-2xl p-4"
            >
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">หมวดหมู่ (Category):</label>
                <select name="sbCat" class="w-full bg-white border border-[#D5CBB8] rounded-xl px-3 py-2.5 text-xs font-bold">
                  ${(SENTENCE_BUILDER_CATEGORIES || []).slice(1).map((c) => html`
                    <option key=${c.id} value=${c.id}>${c.labelTh}</option>
                  `)}
                </select>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">คำใบ้ / เกร็ดไวยากรณ์ (Tip):</label>
                <input
                  name="sbTip"
                  type="text"
                  placeholder="เช่น ใช้ทักทายอย่างสุภาพในชีวิตประจำวัน..."
                  class="w-full bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-xs"
                />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">🇹🇭 ประโยคภาษาไทย:</label>
                <input
                  name="sbTh"
                  type="text"
                  required
                  placeholder="เช่น วันนี้อากาศดีมากเลยนะ"
                  class="w-full bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">🇬🇧 ประโยคภาษาอังกฤษ:</label>
                <input
                  name="sbEn"
                  type="text"
                  required
                  placeholder="e.g. The weather is very nice today"
                  class="w-full bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div class="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl bg-[#58CC02] hover:bg-[#4CAD02] text-white text-xs font-extrabold border-b-4 border-[#3E8E00] cursor-pointer"
                >
                  + บันทึกประโยคใหม่เข้าคลัง
                </button>
              </div>
            </form>

            <div class="space-y-2">
              <div class="text-xs font-bold text-[#5C504A]">
                รายการประโยคที่แอดมินเพิ่มเพิ่มเติม (${customSentences.length} รายการ • รวมกับคลังหลัก 150 ประโยคเป็น ${150 + customSentences.length} ประโยค):
              </div>
              ${customSentences.length === 0 ? html`
                <div class="text-xs text-[#8C7D75] bg-[#FAF6F0] rounded-2xl p-4 text-center">
                  ยังไม่มีประโยคที่เพิ่มใหม่ (กำลังใช้คลังมาตรฐาน 150 ประโยคครบทั้ง 5 หมวดหมู่)
                </div>
              ` : html`
                <div class="space-y-2">
                  ${customSentences.map((item) => html`
                    <div key=${item.id} class="flex items-center justify-between gap-3 bg-[#FAF6F0] border border-[#E5DEC9] rounded-xl p-3 text-xs">
                      <div>
                        <div class="font-bold text-[#2C2523]">🇹🇭 ${item.th}</div>
                        <div class="text-[#C86D51] font-semibold">🇬🇧 ${item.en}</div>
                      </div>
                      <button
                        type="button"
                        onClick=${() => onDeleteCustomSentence(item.id)}
                        class="px-3 py-1 rounded-lg bg-[#D9534F]/15 text-[#D9534F] font-bold cursor-pointer"
                      >
                        ลบ
                      </button>
                    </div>
                  `)}
                </div>
              `}
            </div>
          </div>
        `}

        <!-- SECTION 3: MANAGE BILINGUAL STORIES -->
        ${adminActiveSection === "stories" && html`
          <div class="bg-white border-2 border-[#E5DEC9] rounded-3xl p-6 space-y-5">
            <div class="flex items-center justify-between">
              <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
                📚 จัดการคลังนิทานสองภาษา (Manage Bilingual Stories)
              </h3>
              <button
                type="button"
                onClick=${() => {
                  onResetBilingualStories();
                  setAdminStatusToast("🔄 คืนค่านิทานสองภาษามาตรฐานเรียบร้อยแล้วค่ะ");
                  setTimeout(() => setAdminStatusToast(""), 3000);
                }}
                class="px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#D5CBB8] text-xs font-semibold cursor-pointer"
              >
                🔄 คืนค่านิทานเริ่มต้น
              </button>
            </div>

            <form
              onSubmit=${(e) => {
                e.preventDefault();
                const f = e.target;
                const titleTh = f.stTitleTh.value.trim();
                const titleEn = f.stTitleEn.value.trim();
                const line1En = f.stLine1En.value.trim();
                const line1Th = f.stLine1Th.value.trim();
                const line2En = f.stLine2En.value.trim();
                const line2Th = f.stLine2Th.value.trim();
                if (!titleTh || !titleEn || !line1En || !line1Th) return;
                const newStory = {
                  id: `bstory-${Date.now()}`,
                  titleTh,
                  titleEn,
                  level: f.stLevel.value || "Beginner (A1-A2)",
                  category: "Custom Story",
                  coverEmoji: f.stEmoji.value.trim() || "🌟📖",
                  summaryTh: f.stSumTh.value.trim() || titleTh,
                  summaryEn: f.stSumTh.value.trim() || titleEn,
                  lines: [
                    {
                      id: `l1-${Date.now()}`,
                      speaker: "Noree",
                      avatar: "🎸",
                      en: line1En,
                      th: line1Th,
                      phoneticTh: "",
                      vocabNoteTh: "",
                    },
                    ...(line2En && line2Th
                      ? [
                          {
                            id: `l2-${Date.now()}`,
                            speaker: "Sienna",
                            avatar: "🐱",
                            en: line2En,
                            th: line2Th,
                            phoneticTh: "",
                            vocabNoteTh: "",
                          },
                        ]
                      : []),
                  ],
                };
                onAddBilingualStory(newStory);
                f.reset();
                setAdminStatusToast("✅ เพิ่มนิทานสองภาษาเรื่องใหม่เรียบร้อยแล้วค่ะ!");
                setTimeout(() => setAdminStatusToast(""), 3000);
              }}
              class="grid sm:grid-cols-2 gap-3.5 bg-[#FAF6F0] border border-[#E5DEC9] rounded-2xl p-4"
            >
              <input name="stTitleTh" required placeholder="ชื่อเรื่องภาษาไทย..." class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stTitleEn" required placeholder="Story Title in English..." class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stLevel" placeholder="ระดับ เช่น Beginner (A1-A2)" class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stEmoji" placeholder="อีโมจิหน้าปก เช่น ☕🐱" class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stSumTh" placeholder="เรื่องย่อสั้นๆ..." class="sm:col-span-2 bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stLine1En" required placeholder="ท่อนที่ 1 (ภาษาอังกฤษ)..." class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stLine1Th" required placeholder="ท่อนที่ 1 (คำแปลภาษาไทย)..." class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stLine2En" placeholder="ท่อนที่ 2 (ภาษาอังกฤษ - ถ้ามี)..." class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <input name="stLine2Th" placeholder="ท่อนที่ 2 (คำแปลภาษาไทย - ถ้ามี)..." class="bg-white border border-[#D5CBB8] rounded-xl px-3.5 py-2 text-xs" />
              <div class="sm:col-span-2 flex justify-end">
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-[#A855F7] text-white text-xs font-extrabold cursor-pointer">
                  + เพิ่มนิทานสองภาษาเรื่องใหม่
                </button>
              </div>
            </form>

            <div class="space-y-2">
              ${(bilingualStories || []).map((st) => html`
                <div key=${st.id} class="flex items-center justify-between bg-[#FAF6F0] border border-[#E5DEC9] rounded-xl p-3 text-xs">
                  <div>
                    <span class="mr-2">${st.coverEmoji}</span>
                    <strong class="text-[#2C2523]">${st.titleTh}</strong> — <span class="text-[#6E6059]">${st.titleEn} (${(st.lines || []).length} ท่อน)</span>
                  </div>
                  ${bilingualStories.length > 1 && html`
                    <button
                      type="button"
                      onClick=${() => onDeleteBilingualStory(st.id)}
                      class="px-3 py-1 rounded-lg bg-[#D9534F]/15 text-[#D9534F] font-bold cursor-pointer"
                    >
                      ลบ
                    </button>
                  `}
                </div>
              `)}
            </div>
          </div>
        `}

        <!-- SECTION 4: CHANGE ADMIN PASSWORD -->
        ${adminActiveSection === "security" && html`
          <div class="bg-white border-2 border-[#E5DEC9] rounded-3xl p-6 space-y-4 max-w-lg">
            <h3 class="font-serif-editorial text-lg font-bold text-[#2C2523]">
              🔐 เปลี่ยนรหัสผ่านผู้ดูแลระบบ (Change Admin Password)
            </h3>
            <form
              onSubmit=${(e) => {
                e.preventDefault();
                const f = e.target;
                const oldP = f.oldPass.value.trim();
                const newP = f.newPass.value.trim();
                const confP = f.confPass.value.trim();
                const currentSaved = TwoWayMod ? TwoWayMod.getAdminPassword() : "admin1234";
                if (oldP !== currentSaved) {
                  setAdminStatusToast("⚠️ รหัสผ่านปัจจุบันไม่ถูกต้องค่ะ");
                  return;
                }
                if (newP.length < 4 || newP !== confP) {
                  setAdminStatusToast("⚠️ รหัสผ่านใหม่ต้องมีอย่างน้อย 4 ตัวอักษรและตรงกับการยืนยันรหัสค่ะ");
                  return;
                }
                if (TwoWayMod) TwoWayMod.setAdminPassword(newP);
                f.reset();
                setAdminStatusToast("✅ เปลี่ยนรหัสผ่านแอดมินใหม่เรียบร้อยแล้วค่ะ!");
                setTimeout(() => setAdminStatusToast(""), 3500);
              }}
              class="space-y-3.5"
            >
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">รหัสผ่านปัจจุบัน (Current Password):</label>
                <input name="oldPass" type="password" required class="w-full bg-[#FAF6F0] border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">รหัสผ่านใหม่ (New Password):</label>
                <input name="newPass" type="password" required class="w-full bg-[#FAF6F0] border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#2C2523]">ยืนยันรหัสผ่านใหม่ (Confirm New Password):</label>
                <input name="confPass" type="password" required class="w-full bg-[#FAF6F0] border border-[#D5CBB8] rounded-xl px-3.5 py-2.5 text-sm" />
              </div>
              <button
                type="submit"
                class="px-6 py-3 rounded-2xl bg-[#C86D51] hover:bg-[#B35B40] text-white text-xs font-extrabold border-b-4 border-[#8F432B] cursor-pointer"
              >
                🔐 บันทึกรหัสผ่านใหม่
              </button>
            </form>
          </div>
        `}
      </div>
    `;
  }

  global.NoreeDuolingoViews = {
    renderDuolingoHomeHub,
    renderInteractiveBilingualStories,
    renderAdminPanelView,
  };
})(window);
