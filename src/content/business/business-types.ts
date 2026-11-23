import type { CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";

export type BusinessAudience = "professionals" | "job-seekers";

export type BusinessSectorId =
  | "management-leadership"
  | "human-resources"
  | "recruitment-talent"
  | "marketing-advertising"
  | "sales-customer"
  | "finance-accounting"
  | "banking-investment"
  | "entrepreneurship-startups"
  | "project-management"
  | "operations-logistics"
  | "procurement-supply-chain"
  | "information-technology"
  | "business-strategy"
  | "international-trade"
  | "real-estate"
  | "hospitality-tourism"
  | "healthcare-admin"
  | "corporate-communication";

export interface BusinessSectorMeta {
  id: BusinessSectorId;
  label: Bilingual;
}

export const BUSINESS_SECTORS: BusinessSectorMeta[] = [
  { id: "management-leadership", label: { en: "Management & Leadership", ar: "الإدارة والقيادة" } },
  { id: "human-resources", label: { en: "Human Resources", ar: "الموارد البشرية" } },
  {
    id: "recruitment-talent",
    label: { en: "Recruitment & Talent", ar: "التوظيف واستقطاب الكفاءات" },
  },
  {
    id: "marketing-advertising",
    label: { en: "Marketing & Advertising", ar: "التسويق والإعلان" },
  },
  {
    id: "sales-customer",
    label: { en: "Sales & Customer Relations", ar: "المبيعات وعلاقات العملاء" },
  },
  { id: "finance-accounting", label: { en: "Finance & Accounting", ar: "المالية والمحاسبة" } },
  { id: "banking-investment", label: { en: "Banking & Investment", ar: "المصارف والاستثمار" } },
  {
    id: "entrepreneurship-startups",
    label: { en: "Entrepreneurship & Startups", ar: "ريادة الأعمال والشركات الناشئة" },
  },
  { id: "project-management", label: { en: "Project Management", ar: "إدارة المشاريع" } },
  {
    id: "operations-logistics",
    label: { en: "Operations & Logistics", ar: "العمليات واللوجستيات" },
  },
  {
    id: "procurement-supply-chain",
    label: { en: "Procurement & Supply Chain", ar: "المشتريات وسلاسل الإمداد" },
  },
  {
    id: "information-technology",
    label: { en: "Information Technology", ar: "تقنية المعلومات" },
  },
  { id: "business-strategy", label: { en: "Business Strategy", ar: "استراتيجية الأعمال" } },
  { id: "international-trade", label: { en: "International Trade", ar: "التجارة الدولية" } },
  { id: "real-estate", label: { en: "Real Estate", ar: "العقارات" } },
  { id: "hospitality-tourism", label: { en: "Hospitality & Tourism", ar: "الضيافة والسياحة" } },
  {
    id: "healthcare-admin",
    label: { en: "Healthcare Administration", ar: "إدارة الرعاية الصحية" },
  },
  {
    id: "corporate-communication",
    label: { en: "Corporate Communication", ar: "الاتصال المؤسسي" },
  },
];

export interface BusinessVocabEntry {
  id: string;
  sector: BusinessSectorId;
  term: string;
  ipa: string;
  pos: string;
  definition: string;
  arabic: string;
  collocations: string[];
  example: string;
  workplaceApplication: Bilingual;
}

export type BusinessExpressionCategory =
  | "idioms"
  | "workplace"
  | "phrasal-verbs"
  | "negotiation"
  | "meetings"
  | "management"
  | "corporate";

export interface BusinessExpressionEntry {
  id: string;
  category: BusinessExpressionCategory;
  expression: string;
  meaning: string;
  arabic: string;
  formality: "casual-office" | "neutral-business" | "formal-executive";
  context: Bilingual;
  example: string;
}

export interface CommunicationSkillModule {
  id: string;
  number: number;
  title: Bilingual;
  audiences: BusinessAudience[];
  summary: Bilingual;
  keyPhrases: { phrase: string; arabic: string; register: string }[];
  realisticModel: { title: Bilingual; text: string };
  quickDrill: {
    prompt: string;
    options: [string, string, string, string];
    correct: number;
    explanation: Bilingual;
  };
}

export interface MeetingDialogueTurn {
  speaker: "female" | "male";
  name: string;
  role: string;
  text: string;
}

export interface MeetingStageModule {
  id: string;
  stage: number;
  title: Bilingual;
  goal: Bilingual;
  keyExpressions: { phrase: string; arabic: string }[];
  dialogue: MeetingDialogueTurn[];
  listeningTask: {
    question: string;
    options: [string, string, string, string];
    correct: number;
    explanation: Bilingual;
  };
  rolePlayPrompt: Bilingual;
}

export interface InterviewQuestionItem {
  id: string;
  type: "behavioural-star" | "competency" | "career-goals" | "salary";
  question: string;
  arabicHint: string;
  whatInterviewersTest: Bilingual;
  modelsByLevel: Record<Exclude<CefrLevel, "A1">, string>;
}
