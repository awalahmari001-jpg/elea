import type { Bilingual, Lesson, LessonQuestion, LessonSkill } from "./lesson-types";

/** Topic dossiers share context, not tasks: each skill has its own lesson and purpose. */
export interface TopicDossier {
  id: string;
  title: Bilingual;
  level: string;
  focus: Bilingual;
  vocabulary: Bilingual;
  passage: string;
  dialogue?: { prompt: string; model: string }[];
  questions: LessonQuestion[];
  writing?: NonNullable<Lesson["writing"]>;
}

type TopicCourse = "kids" | "adults" | "ielts";
type CoreSkill = Exclude<LessonSkill, "grammar">;

const SKILL_NAMES: Record<CoreSkill, Bilingual> = {
  listening: { en: "Listening", ar: "الاستماع" },
  reading: { en: "Reading", ar: "القراءة" },
  writing: { en: "Writing", ar: "الكتابة" },
  speaking: { en: "Speaking", ar: "المحادثة" },
};

const METHODS: Record<CoreSkill, Bilingual> = {
  listening: {
    en: "Before playing the narration, read the questions and predict whether each answer needs a person, number, reason or place. Listen once for the main message, then again for details. Answer before checking the written passage; note the exact words that support your choice.",
    ar: "قبل تشغيل القراءة الصوتية، اقرأ الأسئلة وتوقع هل تحتاج الإجابة شخصًا أم رقمًا أم سببًا أم مكانًا. استمع مرة للفكرة ومرة للتفاصيل. أجب قبل مراجعة النص المكتوب وحدد الكلمات التي تدعم اختيارك.",
  },
  reading: {
    en: "Read the opening and ending to identify the main point. Scan for the names and details in each question, then read the surrounding sentence carefully. Separate what the passage states from what you assume; support each answer with evidence from the text.",
    ar: "اقرأ البداية والنهاية لتحديد الفكرة الرئيسية. ابحث عن الأسماء والتفاصيل المطلوبة ثم اقرأ الجملة المحيطة بعناية. ميّز ما يذكره النص عما تفترضه وادعم كل إجابة بدليل منه.",
  },
  writing: {
    en: "Identify the reader, purpose and every required point before writing. Make a short plan, give each paragraph one clear job and include specific supporting details. Draft your own response first; compare it with the model only afterwards and use the task checklist to revise.",
    ar: "حدد القارئ والغرض وجميع النقاط المطلوبة قبل الكتابة. ضع خطة قصيرة واجعل لكل فقرة وظيفة واضحة وأضف تفاصيل داعمة محددة. اكتب إجابتك أولًا ثم قارن بالنموذج واستخدم قائمة المراجعة لتحسينها.",
  },
  speaking: {
    en: "Use the situation as context, then answer each partner question aloud in your own words before studying the sample response. Give a direct answer, a reason and a relevant detail. Repeat with different personal details rather than memorising the model; practise one response with the microphone below.",
    ar: "استخدم الموقف كسياق، ثم أجب عن كل سؤال بصوتك وكلماتك قبل دراسة النموذج. قدم إجابة مباشرة وسببًا وتفصيلًا مناسبًا. كرر بتفاصيل شخصية مختلفة بدل حفظ النموذج، وتدرّب على إجابة باستخدام الميكروفون أدناه.",
  },
};

const IELTS_METHODS: Record<CoreSkill, Bilingual> = {
  listening: {
    en: "This is an original mini practice, with device-generated narration rather than a full IELTS recording. For exam-style practice, play it once and follow changes of opinion, corrections and paraphrases. Afterwards replay difficult sections and compare your evidence with the explanation. This exercise does not predict an IELTS band.",
    ar: "هذا تدريب قصير أصلي بقراءة صوتية يولدها جهازك وليس تسجيل آيلتس كاملًا. للتدريب المشابه للاختبار شغّله مرة واحدة وتتبع تغير الآراء والتصحيح وإعادة الصياغة. ثم أعد المقاطع الصعبة وقارن الأدلة بالشرح. لا يتوقع هذا التدريب درجة آيلتس.",
  },
  reading: {
    en: "For a Band 7 target, practise distinguishing claims, evidence and limitations. Match meaning rather than repeated words, and do not generalise beyond the source. These original short passages and multiple-choice drills develop techniques; they are not full 40-question IELTS Reading tests or band estimates.",
    ar: "لهدف الدرجة 7، تدرّب على التمييز بين الادعاءات والأدلة والقيود. طابق المعنى لا الكلمات المتكررة ولا تعمم خارج النص. تطور هذه النصوص الأصلية القصيرة والأسئلة تقنيات القراءة؛ وليست اختبارات آيلتس كاملة من 40 سؤالًا أو تقديرًا للدرجة.",
  },
  writing: {
    en: "Practise Task 1 in about 20 minutes with at least 150 words, or Task 2 in about 40 minutes with at least 250 words. Task 2 has twice Task 1's weight. Work on task achievement/response, cohesion, accurate vocabulary and varied controlled grammar. Models illustrate a response; they do not guarantee Band 7.",
    ar: "تدرّب على المهمة 1 في نحو 20 دقيقة وبـ150 كلمة على الأقل، أو المهمة 2 في نحو 40 دقيقة وبـ250 كلمة على الأقل. وزن المهمة 2 ضعف المهمة 1. ركز على الاستجابة والترابط ودقة المفردات وتنوع القواعد المضبوطة. النماذج أمثلة ولا تضمن الدرجة 7.",
  },
  speaking: {
    en: "Practise the personal question briefly, prepare the long-turn topic for one minute and speak for one to two minutes, then develop the broader discussion with reasons and qualifications. The samples are starting points, not scripts to memorise. Word recognition cannot measure IELTS fluency, vocabulary, grammar or pronunciation bands.",
    ar: "تدرّب على السؤال الشخصي بإجابة قصيرة، وحضّر موضوع الحديث المطول لدقيقة ثم تحدث لدقيقة إلى دقيقتين، ثم طور النقاش الأوسع بأسباب وتقييد للتعميم. النماذج نقطة بداية لا نصوص للحفظ. التعرف على الكلمات لا يقيس درجات الطلاقة أو المفردات أو القواعد أو النطق في الآيلتس.",
  },
};

export function createTopicLessons(
  course: TopicCourse,
  topics: TopicDossier[],
  skills: CoreSkill[],
): Lesson[] {
  return topics.flatMap((topic) =>
    skills.map((skill): Lesson => {
      const turns = topic.dialogue ?? [];
      const speakingExample = turns
        .map((turn, index) => `${index + 1}. ${turn.prompt}\n${turn.model}`)
        .join("\n\n");
      const name = SKILL_NAMES[skill];
      const target = turns[0]?.model ?? topic.passage.split(/(?<=[.!?])\s+/)[0] ?? topic.passage;
      return {
        id: `${course}-${skill}-${topic.id}`,
        course,
        skill,
        title: {
          en: `${name.en} · ${topic.level} · ${topic.title.en}`,
          ar: `${name.ar} · ${topic.level} · ${topic.title.ar}`,
        },
        goal: {
          en: `${topic.level} · ${topic.title.en}: ${topic.focus.en}`,
          ar: `${topic.level} · ${topic.title.ar}: ${topic.focus.ar}`,
        },
        minutes:
          course === "kids" ? 20 : skill === "writing" && topic.writing?.minimum === 250 ? 40 : 25,
        teaching: [
          METHODS[skill],
          topic.focus,
          topic.vocabulary,
          ...(course === "ielts" ? [IELTS_METHODS[skill]] : []),
        ],
        example: skill === "speaking" ? `${topic.passage}\n\n${speakingExample}` : topic.passage,
        pronunciation: target,
        pronunciationTip: {
          en: "Listen to the model, pause at phrase boundaries and stress the key information. Record your own version, then compare the recognised words. A word match is not a pronunciation grade.",
          ar: "استمع للنموذج وتوقف عند حدود العبارات وانبر المعلومات المهمة. سجل نسختك ثم قارن الكلمات المتعرف عليها. تطابق الكلمات ليس درجة لجودة النطق.",
        },
        questions: topic.questions,
        ...(skill === "writing" && topic.writing ? { writing: topic.writing } : {}),
      };
    }),
  );
}
