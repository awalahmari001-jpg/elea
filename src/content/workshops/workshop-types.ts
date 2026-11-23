import type { CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";

export type WorkshopCefrLevel = Exclude<CefrLevel, "A1">;

export type WorkshopRoleId =
  | "business-manager"
  | "hr-manager"
  | "recruiter"
  | "job-interviewer"
  | "company-director"
  | "sales-rep"
  | "business-client"
  | "investor"
  | "project-manager"
  | "marketing-specialist"
  | "customer"
  | "international-partner";

export interface WorkshopRoleMeta {
  id: WorkshopRoleId;
  personaName: string;
  voice: "female" | "male";
  label: Bilingual;
  styleNote: Bilingual;
}

export interface WorkshopScenario {
  id: string;
  category: "core" | "industry";
  title: Bilingual;
  summary: Bilingual;
  learnerRole: Bilingual;
  defaultRole: WorkshopRoleId;
  recommendedRoles: WorkshopRoleId[];
  objectives: [Bilingual, Bilingual, Bilingual];
  openingPrompt: string;
  complications: [string, string, string];
  targetExpressions: string[];
  recommendedFollowUps: [string, string];
}

export interface WorkshopTurn {
  speaker: "ai" | "learner";
  text: string;
  usedVoice?: boolean;
  timestamp: string;
}

export interface WorkshopCorrection {
  original: string;
  improved: string;
  why: Bilingual;
}

export interface WorkshopEvaluationReport {
  overallScore: number;
  linguisticScore: number;
  businessDecisionScore: number;
  criteria: {
    // Axis 1: Linguistic Performance
    vocabularyRange: number;
    grammaticalAccuracy: number;
    fluencyCoherence: number;
    pronunciationDelivery: number;
    toneAppropriateness: number;
    // Axis 2: Professional Decision-Making & Communication Effectiveness
    spontaneousResponse: number;
    argumentDevelopment: number;
    communicationEffectiveness: number;
    objectiveAchievement: number;
    stakeholderComposure: number;
  };
  usedVoice: boolean;
  summary: Bilingual;
  sentenceCorrections: WorkshopCorrection[];
  upgradedExpressions: { basic: string; executive: string }[];
  recurringWeaknesses: Bilingual[];
  objectivesMet: { objective: Bilingual; status: "achieved" | "partial" }[];
  recommendedWorkshopIds: string[];
}

export interface WorkshopSessionRecord {
  id: string;
  scenarioId: string;
  roleId: WorkshopRoleId;
  level: WorkshopCefrLevel;
  turns: WorkshopTurn[];
  evaluation: WorkshopEvaluationReport;
  completedAt: string;
}

export const CEFR_WORKSHOP_PROFILES: Record<
  WorkshopCefrLevel,
  {
    label: Bilingual;
    difficultyNote: Bilingual;
    targetTurns: number;
  }
> = {
  A2: {
    label: { en: "A2 · Guided Basics", ar: "A2 · أساسيات موجّهة" },
    difficultyNote: {
      en: "Clear, slower workplace language with one straightforward follow-up challenge.",
      ar: "لغة عمل واضحة وبسيطة مع تحدٍ واحد مباشر.",
    },
    targetTurns: 4,
  },
  B1: {
    label: { en: "B1 · Practical Workplace", ar: "B1 · بيئة عمل عملية" },
    difficultyNote: {
      en: "Everyday professional pace with realistic clarifications and one schedule or cost trade-off.",
      ar: "إيقاع مهني عملي مع أسئلة استيضاح ومقايضة واقعية في الوقت أو التكلفة.",
    },
    targetTurns: 4,
  },
  B2: {
    label: { en: "B2 · Independent Professional", ar: "B2 · مهني مستقل" },
    difficultyNote: {
      en: "Firm stakeholder pushback, mid-meeting complications, and data-backed justification.",
      ar: "اعتراضات مهنية جادة وتطورات مفاجئة تتطلب تبريرًا مدعومًا بالأرقام.",
    },
    targetTurns: 5,
  },
  C1: {
    label: { en: "C1 · Executive Precision", ar: "C1 · دقة تنفيذية متقدمة" },
    difficultyNote: {
      en: "Multi-layered objections, diplomatic negotiation under pressure, and nuanced hedging.",
      ar: "اعتراضات متعددة الأبعاد وتفاوض دبلوماسي تحت الضغط بلغة دقيقة.",
    },
    targetTurns: 5,
  },
  C2: {
    label: { en: "C2 · Boardroom Mastery", ar: "C2 · إتقان مجالس الإدارة" },
    difficultyNote: {
      en: "Unscripted high-stakes scrutiny, competing stakeholder mandates, and sharp strategic reframing.",
      ar: "تمحيص تنفيذي عالي المخاطر وتضارب أولويات يتطلب إعادة تأطير استراتيجي حاسم.",
    },
    targetTurns: 6,
  },
};
