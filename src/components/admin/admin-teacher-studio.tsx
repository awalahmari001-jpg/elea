import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  BookPlus,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  MessageSquarePlus,
  Shield,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import type { LessonSkill } from "@/content/lesson-types";
import {
  canAccessAdminPanel,
  canManageRoles,
  canViewAllStudents,
  getVisibleStudents,
  rbacStore,
  type RbacStoreState,
  type UserRole,
} from "@/lib/rbac-store";

type AdminTab = "analytics" | "students" | "courses" | "roles";
const SKILLS: readonly LessonSkill[] = ["grammar", "reading", "listening", "writing", "speaking"];
const ROLES: readonly UserRole[] = ["student", "teacher", "admin", "super_admin"];

export function AdminTeacherStudio() {
  const { t, locale, dir } = useI18n();
  const at = t.admin;

  const [store, setStore] = useState<RbacStoreState>(() => rbacStore.getState());
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");

  // Course authoring state
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [level, setLevel] = useState<CefrLevel>("B1");
  const [skill, setSkill] = useState<LessonSkill>("speaking");
  const [lessonTitleEn, setLessonTitleEn] = useState("");
  const [publishNow, setPublishNow] = useState(true);

  // Student coaching note state
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    setStore(rbacStore.getState());
  }, []);

  const currentAccount = useMemo(
    () => store.accounts.find((a) => a.id === store.activeAccountId) ?? null,
    [store],
  );
  const visibleStudents = useMemo(
    () => getVisibleStudents(currentAccount, store.accounts),
    [currentAccount, store.accounts],
  );
  const teachers = useMemo(
    () => store.accounts.filter((a) => a.role === "teacher"),
    [store.accounts],
  );
  const analytics = useMemo(() => rbacStore.computeAcademyAnalytics(store), [store]);

  const roleLabel = (role: UserRole): string => {
    switch (role) {
      case "super_admin":
        return at.roleSuperAdmin;
      case "admin":
        return at.roleAdmin;
      case "teacher":
        return at.roleTeacher;
      case "student":
        return at.roleStudent;
    }
  };

  // Strict RBAC isolation: Students & signed-out visitors cannot access Admin/Teacher data
  if (!currentAccount || !canAccessAdminPanel(currentAccount.role)) {
    return (
      <div className="container-page max-w-2xl py-16" dir={dir}>
        <Card className="border-2 border-primary/25 text-center">
          <CardHeader className="space-y-3">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lock className="size-7" aria-hidden />
            </div>
            <CardTitle className="display-heading text-2xl font-black">
              {at.restrictedTitle}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {at.restrictedSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-center gap-3 pb-8">
            <Button asChild>
              <Link to="/profile">{at.switchRoleCta}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard">{t.nav.dashboard}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canRoles = canManageRoles(currentAccount.role);
  const isGlobalScope = canViewAllStudents(currentAccount.role);
  const activeStudent =
    visibleStudents.find((s) => s.id === selectedStudentId) ?? visibleStudents[0] ?? null;

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !descEn.trim()) return;
    const created = rbacStore.createCustomCourse(currentAccount, {
      titleEn,
      titleAr,
      descriptionEn: descEn,
      descriptionAr: descAr,
      level,
      lessonTitleEn,
      lessonTitleAr: titleAr,
      skill,
      published: publishNow,
    });
    if (created) {
      setStore(rbacStore.getState());
      setTitleEn("");
      setTitleAr("");
      setDescEn("");
      setDescAr("");
      setLessonTitleEn("");
      toast.success(at.courseCreatedToast);
    }
  };

  const handleTogglePublish = (courseId: string) => {
    rbacStore.toggleCoursePublished(currentAccount, courseId);
    setStore(rbacStore.getState());
  };

  const handleDeleteCourse = (courseId: string) => {
    rbacStore.deleteCustomCourse(currentAccount, courseId);
    setStore(rbacStore.getState());
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStudent || !noteText.trim()) return;
    const added = rbacStore.addTeacherNote(currentAccount, activeStudent.id, noteText);
    if (added) {
      setStore(rbacStore.getState());
      setNoteText("");
      toast.success(at.noteSavedToast);
    }
  };

  const handleRoleChange = (targetId: string, nextRole: UserRole) => {
    if (rbacStore.updateAccountRole(currentAccount, targetId, nextRole)) {
      setStore(rbacStore.getState());
      toast.success(at.roleUpdatedToast);
    }
  };

  const handleTeacherAssign = (studentId: string, teacherId: string) => {
    if (rbacStore.assignTeacher(currentAccount, studentId, teacherId)) {
      setStore(rbacStore.getState());
    }
  };

  return (
    <div className="container-page space-y-8 py-10 pb-24 md:py-14" dir={dir}>
      {/* Studio Header */}
      <header className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1 bg-primary text-primary-foreground">
              <Shield className="size-3.5" aria-hidden />
              {roleLabel(currentAccount.role)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {isGlobalScope ? at.scopeGlobal : at.scopeTeacherAssigned}
            </Badge>
          </div>
          <h1 className="display-heading text-3xl font-extrabold md:text-4xl">{at.title}</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">{at.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <Link to="/courses">{at.viewLiveCatalogBtn}</Link>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <Link to="/profile">{at.manageSessionBtn}</Link>
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={at.title}>
        <Button
          type="button"
          role="tab"
          aria-selected={activeTab === "analytics"}
          variant={activeTab === "analytics" ? "default" : "outline"}
          className="rounded-full text-xs font-bold sm:text-sm"
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 className="me-1.5 size-4" aria-hidden />
          {at.tabAnalytics}
        </Button>
        <Button
          type="button"
          role="tab"
          aria-selected={activeTab === "students"}
          variant={activeTab === "students" ? "default" : "outline"}
          className="rounded-full text-xs font-bold sm:text-sm"
          onClick={() => setActiveTab("students")}
        >
          <Users className="me-1.5 size-4" aria-hidden />
          {at.tabStudents} ({visibleStudents.length})
        </Button>
        <Button
          type="button"
          role="tab"
          aria-selected={activeTab === "courses"}
          variant={activeTab === "courses" ? "default" : "outline"}
          className="rounded-full text-xs font-bold sm:text-sm"
          onClick={() => setActiveTab("courses")}
        >
          <BookPlus className="me-1.5 size-4" aria-hidden />
          {at.tabCourses} ({store.customCourses.length})
        </Button>
        {canRoles && (
          <Button
            type="button"
            role="tab"
            aria-selected={activeTab === "roles"}
            variant={activeTab === "roles" ? "default" : "outline"}
            className="rounded-full text-xs font-bold sm:text-sm"
            onClick={() => setActiveTab("roles")}
          >
            <UserCog className="me-1.5 size-4" aria-hidden />
            {at.tabRoles} ({store.accounts.length})
          </Button>
        )}
      </div>

      {/* TAB 1: LEARNING ANALYTICS */}
      {activeTab === "analytics" && (
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{at.kpiStudents}</CardDescription>
                <CardTitle className="text-3xl font-black" dir="ltr">
                  {analytics.totalStudents}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{at.kpiPublishedCourses}</CardDescription>
                <CardTitle className="text-3xl font-black text-primary" dir="ltr">
                  {analytics.activePublishedCourses}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{at.kpiAvgCompletion}</CardDescription>
                <CardTitle className="text-3xl font-black" dir="ltr">
                  {analytics.avgCompletionPct}%
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{at.kpiAvgMastery}</CardDescription>
                <CardTitle className="text-3xl font-black text-emerald-600" dir="ltr">
                  {analytics.avgMasteryPct}%
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{at.kpiAvgAssessment}</CardDescription>
                <CardTitle className="text-3xl font-black" dir="ltr">
                  {analytics.avgAssessmentPct}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{at.popularCoursesTitle}</CardTitle>
                <CardDescription>{at.popularCoursesDesc}</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.popularCourses}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="completionPct"
                      name={at.completionBarLabel}
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="masteryPct"
                      name={at.masteryBarLabel}
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{at.dropOffTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analytics.dropOffPoints.map((pt) => (
                    <div key={pt.stage.en} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{pt.stage[locale]}</span>
                        <span className="text-primary" dir="ltr">
                          {pt.retentionPct}%
                        </span>
                      </div>
                      <Progress value={pt.retentionPct} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{at.commonDifficultiesTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {analytics.commonDifficulties.map((d) => (
                    <div
                      key={d.skill.en}
                      className="flex items-center justify-between gap-2 rounded-xl bg-secondary/50 px-3 py-2 text-xs font-semibold"
                    >
                      <span>{d.skill[locale]}</span>
                      <Badge variant="outline" dir="ltr">
                        {d.learnersAffectedPct}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: STUDENT MANAGEMENT & SCOPED ROSTER */}
      {activeTab === "students" && (
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{at.studentRosterTitle}</CardTitle>
              <CardDescription>
                {isGlobalScope ? at.rosterGlobalNote : at.rosterTeacherNote}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {visibleStudents.map((stu) => {
                const active = activeStudent?.id === stu.id;
                return (
                  <button
                    key={stu.id}
                    type="button"
                    onClick={() => setSelectedStudentId(stu.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-start transition-all ${
                      active
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-foreground">{stu.name}</div>
                      <div className="text-xs text-muted-foreground" dir="ltr">
                        {stu.email}
                      </div>
                    </div>
                    <div className="text-end">
                      <Badge variant="secondary" dir="ltr">
                        {stu.cefrLevel}
                      </Badge>
                      <div className="mt-1 text-[11px] font-bold text-primary" dir="ltr">
                        {stu.sampleMasteryPct}% mastery
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {activeStudent && (
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">{activeStudent.name}</CardTitle>
                    <CardDescription dir="ltr">{activeStudent.email}</CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground" dir="ltr">
                    CEFR {activeStudent.cefrLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground">{at.kpiAvgCompletion}</div>
                    <div className="mt-1 text-xl font-black" dir="ltr">
                      {activeStudent.sampleCompletionPct}%
                    </div>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground">{at.kpiAvgMastery}</div>
                    <div className="mt-1 text-xl font-black text-emerald-600" dir="ltr">
                      {activeStudent.sampleMasteryPct}%
                    </div>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground">{at.kpiAvgAssessment}</div>
                    <div className="mt-1 text-xl font-black text-primary" dir="ltr">
                      {activeStudent.sampleAssessmentAvg}%
                    </div>
                  </div>
                </div>

                {activeStudent.weakSkills.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-muted-foreground">
                      {at.weakSkillsLabel}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeStudent.weakSkills.map((sk) => (
                        <Badge key={sk} variant="outline">
                          {sk}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {canRoles && teachers.length > 0 && (
                  <div className="space-y-1.5">
                    <label
                      htmlFor="assign-teacher-select"
                      className="text-xs font-bold text-muted-foreground"
                    >
                      {at.assignedTeacherLabel}
                    </label>
                    <select
                      id="assign-teacher-select"
                      value={activeStudent.assignedTeacherId ?? ""}
                      onChange={(e) => handleTeacherAssign(activeStudent.id, e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                    >
                      {teachers.map((tc) => (
                        <option key={tc.id} value={tc.id}>
                          {tc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Coaching Notes */}
                <div className="space-y-3 border-t border-border pt-4">
                  <h3 className="flex items-center gap-1.5 text-sm font-bold">
                    <MessageSquarePlus className="size-4 text-primary" aria-hidden />
                    {at.coachingNotesHeading}
                  </h3>
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <Textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder={at.coachingNotePlaceholder}
                      rows={2}
                      aria-label={at.coachingNotePlaceholder}
                    />
                    <Button type="submit" size="sm" disabled={!noteText.trim()}>
                      {at.postNoteBtn}
                    </Button>
                  </form>
                  <div className="space-y-2">
                    {store.notes
                      .filter((n) => n.studentId === activeStudent.id)
                      .map((n) => (
                        <div key={n.id} className="rounded-xl bg-secondary/40 p-3 text-xs">
                          <div className="font-bold text-foreground">{n.authorName}</div>
                          <p className="mt-1 text-muted-foreground">{n.text}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      )}

      {/* TAB 3: COURSE & LESSON AUTHORING + LIVE PUBLISHING */}
      {activeTab === "courses" && (
        <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{at.createCourseTitle}</CardTitle>
              <CardDescription>{at.createCourseDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCourse} className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="course-title-en" className="text-xs font-semibold">
                    {at.courseTitleEnLabel}
                  </label>
                  <Input
                    id="course-title-en"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g., Medical Clinic English"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="course-title-ar" className="text-xs font-semibold">
                    {at.courseTitleArLabel}
                  </label>
                  <Input
                    id="course-title-ar"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    placeholder="مثال: الإنجليزية للعيادات الطبية"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="course-cefr" className="text-xs font-semibold">
                      CEFR
                    </label>
                    <select
                      id="course-cefr"
                      value={level}
                      onChange={(e) => setLevel(e.target.value as CefrLevel)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      {CEFR_LEVELS.map((lv) => (
                        <option key={lv} value={lv}>
                          {lv}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="course-skill" className="text-xs font-semibold">
                      {at.primarySkillLabel}
                    </label>
                    <select
                      id="course-skill"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value as LessonSkill)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      {SKILLS.map((sk) => (
                        <option key={sk} value={sk}>
                          {t.learning[sk]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="course-desc-en" className="text-xs font-semibold">
                    {at.courseDescEnLabel}
                  </label>
                  <Textarea
                    id="course-desc-en"
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    rows={2}
                    placeholder="Clear course objective and audience..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="course-desc-ar" className="text-xs font-semibold">
                    {at.courseDescArLabel}
                  </label>
                  <Input
                    id="course-desc-ar"
                    value={descAr}
                    onChange={(e) => setDescAr(e.target.value)}
                    placeholder="وصف موجز بالعربية..."
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="course-first-lesson" className="text-xs font-semibold">
                    {at.firstLessonTitleLabel}
                  </label>
                  <Input
                    id="course-first-lesson"
                    value={lessonTitleEn}
                    onChange={(e) => setLessonTitleEn(e.target.value)}
                    placeholder="e.g., Patient Intake Dialogues"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={publishNow}
                    onChange={(e) => setPublishNow(e.target.checked)}
                    className="size-4 rounded border-input"
                  />
                  {at.publishImmediatelyLabel}
                </label>
                <Button type="submit" className="w-full">
                  <BookPlus className="me-1.5 size-4" aria-hidden />
                  {at.createCourseBtn}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{at.catalogManagerTitle}</CardTitle>
              <CardDescription>{at.catalogManagerDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {store.customCourses.map((course) => (
                <article
                  key={course.id}
                  className="rounded-2xl border border-border bg-background p-4 space-y-2.5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline" dir="ltr">
                          {course.level}
                        </Badge>
                        <Badge
                          className={
                            course.published
                              ? "bg-emerald-600 text-white"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {course.published ? at.statusPublished : at.statusDraft}
                        </Badge>
                      </div>
                      <h3 className="mt-1.5 text-base font-bold text-foreground">
                        {course.title[locale]}
                      </h3>
                      <p className="text-xs text-muted-foreground">{course.description[locale]}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleTogglePublish(course.id)}
                      >
                        {course.published ? (
                          <EyeOff className="me-1 size-3.5" aria-hidden />
                        ) : (
                          <Eye className="me-1 size-3.5" aria-hidden />
                        )}
                        {course.published ? at.unpublishBtn : at.publishBtn}
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Delete ${course.title.en}`}
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="size-4 text-destructive" aria-hidden />
                      </Button>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {course.authorName} · {course.lessons.length}{" "}
                    {locale === "ar" ? "درس" : "lesson(s)"}
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </section>
      )}

      {/* TAB 4: RBAC ROLE MANAGEMENT (ADMIN / SUPER ADMIN ONLY) */}
      {activeTab === "roles" && canRoles && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{at.rbacTableTitle}</CardTitle>
            <CardDescription>{at.rbacTableDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {store.accounts.map((acc) => {
              const isSelf = acc.id === currentAccount.id;
              return (
                <div
                  key={acc.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <span>{acc.name}</span>
                      {isSelf && (
                        <Badge variant="secondary" className="text-[10px]">
                          <CheckCircle2 className="me-1 size-3" aria-hidden />
                          {at.activeSessionBadge}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground" dir="ltr">
                      {acc.email} · CEFR {acc.cefrLevel}
                    </div>
                  </div>
                  <select
                    aria-label={`Role for ${acc.name}`}
                    value={acc.role}
                    disabled={
                      isSelf ||
                      (acc.role === "super_admin" && currentAccount.role !== "super_admin")
                    }
                    onChange={(e) => handleRoleChange(acc.id, e.target.value as UserRole)}
                    className="rounded-xl border border-input bg-card px-3 py-1.5 text-xs font-bold"
                  >
                    {ROLES.filter(
                      (r) => r !== "super_admin" || currentAccount.role === "super_admin",
                    ).map((r) => (
                      <option key={r} value={r}>
                        {roleLabel(r)}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
