import type { BusinessSectorId, BusinessVocabEntry } from "./business-types";

/**
 * Compact tuple for authentic Business English workplace vocabulary entries:
 * [term, ipa, pos, definition, arabic, coll1, coll2, example]
 */
export type CompactBusinessRow = readonly [
  term: string,
  ipa: string,
  pos: string,
  definition: string,
  arabic: string,
  coll1: string,
  coll2: string,
  example: string,
];

interface SectorApplicationContext {
  enDomain: string;
  arDomain: string;
  enSetting: string;
  arSetting: string;
}

const SECTOR_CONTEXT: Record<BusinessSectorId, SectorApplicationContext> = {
  "management-leadership": {
    enDomain: "management and executive leadership",
    arDomain: "الإدارة والقيادة التنفيذية",
    enSetting: "leadership reviews, team briefings, and governance meetings",
    arSetting: "اجتماعات القيادة ومراجعات الفرق والحوكمة",
  },
  "human-resources": {
    enDomain: "human resources and people operations",
    arDomain: "الموارد البشرية وشؤون الموظفين",
    enSetting: "HR policy updates, employee relations, and performance cycles",
    arSetting: "تحديثات سياسات الموارد البشرية وعلاقات الموظفين ودورات الأداء",
  },
  "recruitment-talent": {
    enDomain: "recruitment and talent acquisition",
    arDomain: "التوظيف واستقطاب الكفاءات",
    enSetting: "hiring panels, candidate outreach, and job-offer discussions",
    arSetting: "لجان التوظيف والتواصل مع المرشحين ومناقشة عروض العمل",
  },
  "marketing-advertising": {
    enDomain: "marketing and brand advertising",
    arDomain: "التسويق والإعلان وبناء العلامة",
    enSetting: "campaign briefs, creative reviews, and growth reports",
    arSetting: "موجزات الحملات ومراجعات المحتوى وتقارير النمو",
  },
  "sales-customer": {
    enDomain: "sales and customer relations",
    arDomain: "المبيعات وعلاقات العملاء",
    enSetting: "client pitches, CRM pipeline reviews, and renewal calls",
    arSetting: "العروض البيعية ومراجعة صفقات العملاء ومكالمات التجديد",
  },
  "finance-accounting": {
    enDomain: "finance and corporate accounting",
    arDomain: "المالية والمحاسبة المؤسسية",
    enSetting: "budget reviews, month-end close, and financial reporting",
    arSetting: "مراجعة الميزانيات وإقفال الحسابات والتقارير المالية",
  },
  "banking-investment": {
    enDomain: "banking and capital investment",
    arDomain: "المصارف والاستثمار وإدارة الأصول",
    enSetting: "investment committee memos, treasury updates, and client advisory",
    arSetting: "مذكرات لجان الاستثمار وتقارير الخزينة والاستشارات المصرفية",
  },
  "entrepreneurship-startups": {
    enDomain: "entrepreneurship and venture building",
    arDomain: "ريادة الأعمال وبناء الشركات الناشئة",
    enSetting: "investor pitch decks, founder stand-ups, and product launches",
    arSetting: "عروض المستثمرين واجتماعات المؤسسين وإطلاق المنتجات",
  },
  "project-management": {
    enDomain: "project delivery and programme management",
    arDomain: "إدارة المشاريع والبرامج",
    enSetting: "sprint planning, steering committees, and milestone status updates",
    arSetting: "تخطيط المراحل واللجان التوجيهية وتقارير حالة المشاريع",
  },
  "operations-logistics": {
    enDomain: "operations and logistics management",
    arDomain: "العمليات التشغيلية واللوجستيات",
    enSetting: "dispatch planning, capacity reviews, and service-level audits",
    arSetting: "تخطيط الشحن ومراجعات الطاقة التشغيلية وتدقيق مستويات الخدمة",
  },
  "procurement-supply-chain": {
    enDomain: "procurement and supply chain management",
    arDomain: "المشتريات وسلاسل الإمداد",
    enSetting: "supplier negotiations, contract reviews, and inventory planning",
    arSetting: "مفاوضات الموردين ومراجعة العقود وتخطيط المخزون",
  },
  "information-technology": {
    enDomain: "enterprise IT and digital systems",
    arDomain: "تقنية المعلومات والأنظمة الرقمية",
    enSetting: "architecture reviews, incident bridges, and release planning",
    arSetting: "مراجعات البنية التقنية وإدارة الأعطال وتخطيط الإطلاقات",
  },
  "business-strategy": {
    enDomain: "corporate strategy and competitive planning",
    arDomain: "استراتيجية الأعمال والتخطيط التنافسي",
    enSetting: "board strategy retreats, market assessments, and quarterly planning",
    arSetting: "اجتماعات مجلس الإدارة وتحليل السوق والتخطيط الربعي",
  },
  "international-trade": {
    enDomain: "international trade and cross-border commerce",
    arDomain: "التجارة الدولية والتبادل العابر للحدود",
    enSetting: "export documentation, customs coordination, and trade-finance calls",
    arSetting: "وثائق التصدير والتنسيق الجمركي ومكالمات تمويل التجارة",
  },
  "real-estate": {
    enDomain: "commercial and residential real estate",
    arDomain: "العقارات وإدارة الأصول العقارية",
    enSetting: "leasing negotiations, property valuations, and asset briefings",
    arSetting: "مفاوضات التأجير والتقييم العقاري وتقارير الأصول",
  },
  "hospitality-tourism": {
    enDomain: "hospitality, aviation, and tourism operations",
    arDomain: "الضيافة والسياحة والخدمات الفندقية",
    enSetting: "guest-experience briefings, event coordination, and hotel reviews",
    arSetting: "إحاطات تجربة الضيوف وتنسيق الفعاليات ومراجعات التشغيل الفندقي",
  },
  "healthcare-admin": {
    enDomain: "healthcare administration and hospital operations",
    arDomain: "إدارة الرعاية الصحية وتشغيل المستشفيات",
    enSetting: "clinical governance boards, accreditation checks, and clinic operations",
    arSetting: "لجان الحوكمة السريرية وفحوصات الاعتماد وإدارة العيادات",
  },
  "corporate-communication": {
    enDomain: "corporate communication and public relations",
    arDomain: "الاتصال المؤسسي والعلاقات العامة",
    enSetting: "press releases, executive town halls, and stakeholder briefings",
    arSetting: "البيانات الصحفية واللقاءات المفتوحة وإحاطات أصحاب المصلحة",
  },
};

function buildWorkplaceApplication(
  ctx: SectorApplicationContext,
  term: string,
  coll1: string,
  coll2: string,
  idx: number,
): { en: string; ar: string } {
  const variant = idx % 4;
  if (variant === 0) {
    return {
      en: `Use "${term}" in ${ctx.enSetting}—pair it naturally in phrases like "${coll1}" to communicate precision in ${ctx.enDomain}.`,
      ar: `استخدم «${term}» في ${ctx.arSetting}، وادمجها طبيعيًا ضمن تعبيرات مثل «${coll1}» لتعزيز الدقة المهنية في ${ctx.arDomain}.`,
    };
  }
  if (variant === 1) {
    return {
      en: `Common in ${ctx.enDomain} reports and emails; expressions such as "${coll1}" and "${coll2}" signal practical domain fluency.`,
      ar: `مصطلح شائع في تقارير ورسائل ${ctx.arDomain}، واستخدام تلازمات مثل «${coll1}» و«${coll2}» يعكس طلاقة مهنية عالية.`,
    };
  }
  if (variant === 2) {
    return {
      en: `Valuable during ${ctx.enSetting} when aligning stakeholders around "${coll1}" or discussing "${coll2}".`,
      ar: `مفيد جدًا أثناء ${ctx.arSetting} عند توحيد الرؤية حول «${coll1}» أو مناقشة «${coll2}».`,
    };
  }
  return {
    en: `Essential ${ctx.enDomain} vocabulary for presentations and interviews—practice saying "${coll1}" and "${coll2}" fluently.`,
    ar: `مفردة أساسية في ${ctx.arDomain} للعروض التقديمية والمقابلات؛ تدرّب على نطق «${coll1}» و«${coll2}» بسلاسة.`,
  };
}

export function expandBusinessSectorWords(
  sector: BusinessSectorId,
  rows: readonly CompactBusinessRow[],
  existingTerms: Set<string>,
): BusinessVocabEntry[] {
  const ctx = SECTOR_CONTEXT[sector];
  const entries: BusinessVocabEntry[] = [];
  const usedSlugs = new Set<string>();

  rows.forEach((row, idx) => {
    const [rawTerm, rawIpa, pos, definition, arabic, coll1, coll2, example] = row;
    const term = rawTerm.trim();
    const norm = term.toLowerCase();
    if (!norm || existingTerms.has(norm) || existingTerms.has(term)) return;
    existingTerms.add(norm);

    const baseSlug = norm.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `term-${idx + 1}`;
    let slug = baseSlug;
    let suffix = 2;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
    usedSlugs.add(slug);

    const trimmedIpa = rawIpa.trim();
    const ipa = trimmedIpa.startsWith("/") ? trimmedIpa : `/${trimmedIpa}/`;

    entries.push({
      id: `biz-${sector}-${slug}`,
      sector,
      term,
      ipa,
      pos,
      definition,
      arabic,
      collocations: [coll1, coll2],
      example,
      workplaceApplication: buildWorkplaceApplication(ctx, term, coll1, coll2, idx),
    });
  });

  return entries;
}
