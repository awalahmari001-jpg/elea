import type { Bilingual, LessonSkill } from "@/content/lesson-types";
import type { CefrLevel } from "@/content/courses";
import { exportLearnerBackupJson, importLearnerBackupJson } from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord, type JourneySnapshot } from "@/lib/learning-record";

export type UserRole = "super_admin" | "admin" | "teacher" | "student";

export interface LocalAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cefrLevel: CefrLevel;
  assignedTeacherId?: string;
  sampleCompletionPct: number;
  sampleMasteryPct: number;
  sampleAssessmentAvg: number;
  weakSkills: string[];
  createdAt: string;
  /** Portable JSON snapshot of this account's learnerStorage + journey state */
  savedBackupJson?: string;
  savedJourney?: JourneySnapshot;
}

export interface CustomLessonDraft {
  id: string;
  title: Bilingual;
  skill: LessonSkill;
  goal: Bilingual;
  teachingNote: Bilingual;
  quizQuestion: string;
  quizAnswer: string;
}

export interface CustomCourse {
  id: string;
  slug: string;
  title: Bilingual;
  description: Bilingual;
  level: CefrLevel;
  published: boolean;
  authorId: string;
  authorName: string;
  lessons: CustomLessonDraft[];
  updatedAt: string;
}

export interface TeacherCoachingNote {
  id: string;
  studentId: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface RbacStoreState {
  activeAccountId: string | null;
  accounts: LocalAccount[];
  customCourses: CustomCourse[];
  notes: TeacherCoachingNote[];
}

export interface AcademyAnalyticsSummary {
  totalStudents: number;
  activePublishedCourses: number;
  avgCompletionPct: number;
  avgMasteryPct: number;
  avgAssessmentPct: number;
  popularCourses: {
    name: string;
    enrolled: number;
    completionPct: number;
    masteryPct: number;
  }[];
  dropOffPoints: {
    stage: Bilingual;
    retentionPct: number;
  }[];
  commonDifficulties: {
    skill: Bilingual;
    learnersAffectedPct: number;
  }[];
}

const RBAC_STORAGE_KEY = "ele.rbac.store.v1";

const DEFAULT_ACCOUNTS: LocalAccount[] = [
  {
    id: "acc-student-1",
    name: "Amina Al-Mansoor",
    email: "amina@elea.demo",
    role: "student",
    cefrLevel: "B1",
    assignedTeacherId: "acc-teacher-1",
    sampleCompletionPct: 48,
    sampleMasteryPct: 42,
    sampleAssessmentAvg: 81,
    weakSkills: ["Speaking", "Writing"],
    createdAt: "2026-09-01T09:00:00.000Z",
  },
  {
    id: "acc-student-2",
    name: "Yousef Al-Harbi",
    email: "yousef@elea.demo",
    role: "student",
    cefrLevel: "B2",
    assignedTeacherId: "acc-teacher-1",
    sampleCompletionPct: 72,
    sampleMasteryPct: 68,
    sampleAssessmentAvg: 86,
    weakSkills: ["Pronunciation", "Listening"],
    createdAt: "2026-09-10T10:30:00.000Z",
  },
  {
    id: "acc-student-3",
    name: "Sara Al-Qahtani",
    email: "sara@elea.demo",
    role: "student",
    cefrLevel: "A2",
    assignedTeacherId: "acc-teacher-2",
    sampleCompletionPct: 35,
    sampleMasteryPct: 29,
    sampleAssessmentAvg: 74,
    weakSkills: ["Grammar", "Vocabulary"],
    createdAt: "2026-10-02T14:15:00.000Z",
  },
  {
    id: "acc-teacher-1",
    name: "Ms. Layla Hassan",
    email: "layla.teacher@elea.demo",
    role: "teacher",
    cefrLevel: "C2",
    sampleCompletionPct: 100,
    sampleMasteryPct: 100,
    sampleAssessmentAvg: 98,
    weakSkills: [],
    createdAt: "2026-08-15T08:00:00.000Z",
  },
  {
    id: "acc-admin-1",
    name: "Dr. Khalid Al-Otaibi",
    email: "khalid.admin@elea.demo",
    role: "admin",
    cefrLevel: "C2",
    sampleCompletionPct: 100,
    sampleMasteryPct: 100,
    sampleAssessmentAvg: 99,
    weakSkills: [],
    createdAt: "2026-08-01T08:00:00.000Z",
  },
  {
    id: "acc-super-admin",
    name: "Academy Director",
    email: "director@elea.demo",
    role: "super_admin",
    cefrLevel: "C2",
    sampleCompletionPct: 100,
    sampleMasteryPct: 100,
    sampleAssessmentAvg: 100,
    weakSkills: [],
    createdAt: "2026-08-01T08:00:00.000Z",
  },
];

const DEFAULT_CUSTOM_COURSES: CustomCourse[] = [
  {
    id: "custom-course-aviation",
    slug: "custom-travel-fluency",
    title: {
      en: "Practical Airport & Global Travel English",
      ar: "الإنجليزية العملية للمطارات والسفر الدولي",
    },
    description: {
      en: "Targeted listening, check-in dialogues, and polite problem-solving for Arab travellers.",
      ar: "محادثات المطار والاستماع العملي وحل المواقف الطارئة بأدب للمسافرين العرب.",
    },
    level: "B1",
    published: true,
    authorId: "acc-teacher-1",
    authorName: "Ms. Layla Hassan",
    lessons: [
      {
        id: "cl-travel-1",
        title: {
          en: "Airport Check-in & Boarding Changes",
          ar: "تسجيل الوصول وتغييرات بوابة الصعود",
        },
        skill: "speaking",
        goal: {
          en: "Handle seat requests and gate announcements calmly.",
          ar: "التعامل مع طلبات المقاعد وإعلانات البوابات بثقة.",
        },
        teachingNote: {
          en: "Use polite modals: 'Could I have a window seat, please?' and 'Excuse me, has gate 14 changed?'",
          ar: "استخدم صيغ الأدب: Could I have... وExcuse me للتواصل المهذب في المطار.",
        },
        quizQuestion: "Which phrase is most polite when requesting a window seat?",
        quizAnswer: "Could I have a window seat, please?",
      },
    ],
    updatedAt: "2026-10-15T12:00:00.000Z",
  },
];

function defaultState(): RbacStoreState {
  return {
    activeAccountId: DEFAULT_ACCOUNTS[0]!.id,
    accounts: DEFAULT_ACCOUNTS.map((a) => ({ ...a, weakSkills: [...a.weakSkills] })),
    customCourses: DEFAULT_CUSTOM_COURSES.map((c) => ({ ...c, lessons: [...c.lessons] })),
    notes: [
      {
        id: "note-initial-1",
        studentId: "acc-student-1",
        authorId: "acc-teacher-1",
        authorName: "Ms. Layla Hassan",
        text: "Strong vocabulary growth this week! Practise 2 Speaking Studio scenarios before Friday.",
        createdAt: "2026-11-18T11:00:00.000Z",
      },
    ],
  };
}

function readStore(): RbacStoreState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(RBAC_STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<RbacStoreState>;
    const base = defaultState();
    return {
      activeAccountId:
        parsed.activeAccountId === null
          ? null
          : typeof parsed.activeAccountId === "string"
            ? parsed.activeAccountId
            : base.activeAccountId,
      accounts:
        Array.isArray(parsed.accounts) && parsed.accounts.length > 0
          ? parsed.accounts
          : base.accounts,
      customCourses: Array.isArray(parsed.customCourses)
        ? parsed.customCourses
        : base.customCourses,
      notes: Array.isArray(parsed.notes) ? parsed.notes : base.notes,
    };
  } catch {
    return defaultState();
  }
}

function writeStore(next: RbacStoreState): RbacStoreState {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(RBAC_STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

/** Permission helpers enforcing strict RBAC boundaries. */
export function canAccessAdminPanel(role: UserRole | null | undefined): boolean {
  return role === "super_admin" || role === "admin" || role === "teacher";
}

export function canManageCourses(role: UserRole | null | undefined): boolean {
  return role === "super_admin" || role === "admin" || role === "teacher";
}

export function canViewAllStudents(role: UserRole | null | undefined): boolean {
  return role === "super_admin" || role === "admin";
}

export function canManageRoles(role: UserRole | null | undefined): boolean {
  return role === "super_admin" || role === "admin";
}

export function getVisibleStudents(
  actor: LocalAccount | null,
  accounts: readonly LocalAccount[],
): LocalAccount[] {
  if (!actor || !canAccessAdminPanel(actor.role)) return [];
  const students = accounts.filter((a) => a.role === "student");
  if (canViewAllStudents(actor.role)) return students;
  // Teachers strictly see ONLY students assigned to them
  return students.filter((s) => s.assignedTeacherId === actor.id);
}

function persistCurrentProgressIntoAccount(state: RbacStoreState): RbacStoreState {
  if (!state.activeAccountId) return state;
  const backup = exportLearnerBackupJson();
  const journey = learningRecord.exportJourney();
  return {
    ...state,
    accounts: state.accounts.map((acc) =>
      acc.id === state.activeAccountId
        ? { ...acc, savedBackupJson: backup, savedJourney: journey }
        : acc,
    ),
  };
}

export const rbacStore = {
  getState: (): RbacStoreState => readStore(),

  getCurrentAccount: (): LocalAccount | null => {
    const st = readStore();
    if (!st.activeAccountId) return null;
    return st.accounts.find((a) => a.id === st.activeAccountId) ?? null;
  },

  /** Sign out cleanly while preserving the current learner's progress snapshot on their account. */
  signOut: (): RbacStoreState => {
    const saved = persistCurrentProgressIntoAccount(readStore());
    learnerStorage.clearAll();
    learningRecord.clearJourney();
    return writeStore({ ...saved, activeAccountId: null });
  },

  /** Sign into any existing account and restore its saved learning record & resume cursor. */
  signIn: (accountId: string): LocalAccount | null => {
    const saved = persistCurrentProgressIntoAccount(readStore());
    const target = saved.accounts.find((a) => a.id === accountId);
    if (!target) return null;

    learnerStorage.clearAll();
    learningRecord.clearJourney();
    if (target.savedBackupJson) {
      importLearnerBackupJson(target.savedBackupJson);
    } else {
      learnerStorage.saveProfile({
        displayName: target.name,
        targetGoal: `Reach ${target.cefrLevel}`,
      });
    }
    if (target.savedJourney) {
      learningRecord.applyJourney(target.savedJourney);
    }
    writeStore({ ...saved, activeAccountId: target.id });
    return target;
  },

  /** Register a new local learner/teacher account and sign into it immediately. */
  registerAccount: (input: {
    name: string;
    email: string;
    role?: UserRole;
    cefrLevel?: CefrLevel;
    assignedTeacherId?: string;
  }): LocalAccount => {
    const saved = persistCurrentProgressIntoAccount(readStore());
    const id = `acc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const account: LocalAccount = {
      id,
      name: input.name.trim() || "New Learner",
      email: input.email.trim() || `${id}@elea.local`,
      role: input.role ?? "student",
      cefrLevel: input.cefrLevel ?? "A2",
      assignedTeacherId: input.assignedTeacherId ?? "acc-teacher-1",
      sampleCompletionPct: 0,
      sampleMasteryPct: 0,
      sampleAssessmentAvg: 0,
      weakSkills: [],
      createdAt: new Date().toISOString(),
    };

    learnerStorage.clearAll();
    learningRecord.clearJourney();
    learnerStorage.saveProfile({
      displayName: account.name,
      targetGoal: `Master ${account.cefrLevel}`,
    });

    writeStore({
      ...saved,
      activeAccountId: account.id,
      accounts: [...saved.accounts, account],
    });
    return account;
  },

  /** Update a user's role (Admin / Super Admin only). */
  updateAccountRole: (actor: LocalAccount | null, targetId: string, newRole: UserRole): boolean => {
    if (!actor || !canManageRoles(actor.role)) return false;
    // Prevent non-super-admins from elevating to super_admin
    if (newRole === "super_admin" && actor.role !== "super_admin") return false;
    const st = readStore();
    writeStore({
      ...st,
      accounts: st.accounts.map((a) => (a.id === targetId ? { ...a, role: newRole } : a)),
    });
    return true;
  },

  /** Assign a teacher to a student (Admin / Super Admin only). */
  assignTeacher: (actor: LocalAccount | null, studentId: string, teacherId: string): boolean => {
    if (!actor || !canManageRoles(actor.role)) return false;
    const st = readStore();
    writeStore({
      ...st,
      accounts: st.accounts.map((a) =>
        a.id === studentId ? { ...a, assignedTeacherId: teacherId } : a,
      ),
    });
    return true;
  },

  /** Create a custom course & initial lesson (Teacher / Admin / Super Admin). */
  createCustomCourse: (
    actor: LocalAccount | null,
    input: {
      titleEn: string;
      titleAr: string;
      descriptionEn: string;
      descriptionAr: string;
      level: CefrLevel;
      lessonTitleEn: string;
      lessonTitleAr: string;
      skill: LessonSkill;
      published?: boolean;
    },
  ): CustomCourse | null => {
    if (!actor || !canManageCourses(actor.role)) return null;
    const st = readStore();
    const id = `custom-course-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
    const slug =
      input.titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40) || id;

    const course: CustomCourse = {
      id,
      slug,
      title: { en: input.titleEn.trim(), ar: input.titleAr.trim() || input.titleEn.trim() },
      description: {
        en: input.descriptionEn.trim(),
        ar: input.descriptionAr.trim() || input.descriptionEn.trim(),
      },
      level: input.level,
      published: Boolean(input.published),
      authorId: actor.id,
      authorName: actor.name,
      lessons: [
        {
          id: `cl-${Date.now()}`,
          title: {
            en: input.lessonTitleEn.trim() || `${input.titleEn.trim()} — Lesson 1`,
            ar:
              input.lessonTitleAr.trim() ||
              `${input.titleAr.trim() || input.titleEn.trim()} — الدرس ١`,
          },
          skill: input.skill,
          goal: {
            en: `Apply key ${input.level} ${input.skill} strategies in context.`,
            ar: `تطبيق مهارات ${input.skill} لمستوى ${input.level} في سياق عملي.`,
          },
          teachingNote: {
            en: "Study the model examples carefully, listen aloud, and complete the mastery check.",
            ar: "ادرس الأمثلة النموذجية واستمع للنطق ثم أكمل التحقق التفاعلي.",
          },
          quizQuestion: `Which ${input.level} skill is the main focus of this lesson?`,
          quizAnswer: input.skill,
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    writeStore({ ...st, customCourses: [course, ...st.customCourses] });
    return course;
  },

  toggleCoursePublished: (actor: LocalAccount | null, courseId: string): CustomCourse | null => {
    if (!actor || !canManageCourses(actor.role)) return null;
    const st = readStore();
    let updated: CustomCourse | null = null;
    const nextCourses = st.customCourses.map((c) => {
      if (c.id !== courseId) return c;
      updated = { ...c, published: !c.published, updatedAt: new Date().toISOString() };
      return updated;
    });
    writeStore({ ...st, customCourses: nextCourses });
    return updated;
  },

  deleteCustomCourse: (actor: LocalAccount | null, courseId: string): boolean => {
    if (!actor || !canManageCourses(actor.role)) return false;
    const st = readStore();
    writeStore({
      ...st,
      customCourses: st.customCourses.filter((c) => c.id !== courseId),
    });
    return true;
  },

  getPublishedCustomCourses: (): CustomCourse[] => {
    return readStore().customCourses.filter((c) => c.published);
  },

  addTeacherNote: (
    actor: LocalAccount | null,
    studentId: string,
    text: string,
  ): TeacherCoachingNote | null => {
    if (!actor || !canAccessAdminPanel(actor.role) || !text.trim()) return null;
    const st = readStore();
    // Teachers may only comment on their assigned students
    const visible = getVisibleStudents(actor, st.accounts);
    if (!visible.some((s) => s.id === studentId)) return null;
    const note: TeacherCoachingNote = {
      id: `note-${Date.now()}`,
      studentId,
      authorId: actor.id,
      authorName: actor.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    writeStore({ ...st, notes: [note, ...st.notes] });
    return note;
  },

  computeAcademyAnalytics: (inputState?: RbacStoreState): AcademyAnalyticsSummary => {
    const st = inputState ?? readStore();
    const students = st.accounts.filter((a) => a.role === "student");
    const publishedCount = st.customCourses.filter((c) => c.published).length;
    const avgCompletionPct =
      students.length > 0
        ? Math.round(students.reduce((s, a) => s + a.sampleCompletionPct, 0) / students.length)
        : 0;
    const avgMasteryPct =
      students.length > 0
        ? Math.round(students.reduce((s, a) => s + a.sampleMasteryPct, 0) / students.length)
        : 0;
    const avgAssessmentPct =
      students.length > 0
        ? Math.round(students.reduce((s, a) => s + a.sampleAssessmentAvg, 0) / students.length)
        : 0;

    return {
      totalStudents: students.length,
      activePublishedCourses: 9 + publishedCount,
      avgCompletionPct,
      avgMasteryPct,
      avgAssessmentPct,
      popularCourses: [
        { name: "CEFR B1", enrolled: 142, completionPct: 68, masteryPct: 61 },
        { name: "IELTS 7+", enrolled: 128, completionPct: 62, masteryPct: 55 },
        { name: "Business", enrolled: 109, completionPct: 71, masteryPct: 64 },
        { name: "Kids ESL", enrolled: 96, completionPct: 82, masteryPct: 77 },
        { name: "Self-Learn", enrolled: 118, completionPct: 66, masteryPct: 59 },
      ],
      dropOffPoints: [
        {
          stage: { en: "Placement → First Lesson", ar: "اختبار المستوى ← أول درس" },
          retentionPct: 92,
        },
        { stage: { en: "Module 1–3 Core Skills", ar: "الوحدات ١–٣ الأساسية" }, retentionPct: 78 },
        {
          stage: { en: "Writing & Speaking Practice", ar: "تطبيق الكتابة والمحادثة" },
          retentionPct: 64,
        },
        {
          stage: { en: "Level Mastery Post-Test", ar: "اختبار الإتقان النهائي" },
          retentionPct: 58,
        },
      ],
      commonDifficulties: [
        {
          skill: { en: "Tense Consistency & Prepositions", ar: "اتساق الأزمنة وحروف الجر" },
          learnersAffectedPct: 41,
        },
        {
          skill: {
            en: "IELTS Writing Cohesion & Register",
            ar: "الترابط والأسلوب الأكاديمي في الآيلتس",
          },
          learnersAffectedPct: 36,
        },
        {
          skill: { en: "Spontaneous Spoken Fluency", ar: "الطلاقة الشفوية التلقائية" },
          learnersAffectedPct: 33,
        },
        {
          skill: { en: "Academic Paraphrasing", ar: "إعادة الصياغة الأكاديمية" },
          learnersAffectedPct: 28,
        },
      ],
    };
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(RBAC_STORAGE_KEY);
    }
  },
};
