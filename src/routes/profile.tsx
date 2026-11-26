import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Settings,
  Shield,
  Upload,
  UserCheck,
  UserPlus,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pageMeta } from "@/lib/i18n/head";
import { exportLearnerBackupJson, importLearnerBackupJson } from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord } from "@/lib/learning-record";
import {
  canAccessAdminPanel,
  rbacStore,
  type RbacStoreState,
  type UserRole,
} from "@/lib/rbac-store";

export const Route = createFileRoute("/profile")({
  head: ({ match }) => pageMeta(match.context.locale, "profile"),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, dir } = useI18n();
  const pt = t.progress;
  const dt = t.dashboard;
  const at = t.admin;

  const [displayName, setDisplayName] = useState("");
  const [targetGoal, setTargetGoal] = useState("");
  const [savedNote, setSavedNote] = useState<string | null>(null);
  const [backupNotice, setBackupNotice] = useState<{ tone: "ok" | "err"; text: string } | null>(
    null,
  );
  const [confirmReset, setConfirmReset] = useState(false);
  const [rbac, setRbac] = useState<RbacStoreState>(() => rbacStore.getState());
  const [newAccName, setNewAccName] = useState("");
  const [newAccEmail, setNewAccEmail] = useState("");
  const [newAccRole, setNewAccRole] = useState<UserRole>("student");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const syncProfileFromStorage = () => {
    const meta = learnerStorage.getProfile();
    setDisplayName(meta.displayName);
    setTargetGoal(meta.targetGoal);
    setRbac(rbacStore.getState());
  };

  useEffect(() => {
    syncProfileFromStorage();
  }, []);

  const currentAccount = rbac.accounts.find((a) => a.id === rbac.activeAccountId) ?? null;

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

  const handleSwitchAccount = (accountId: string) => {
    rbacStore.signIn(accountId);
    syncProfileFromStorage();
  };

  const handleSignOut = () => {
    rbacStore.signOut();
    syncProfileFromStorage();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccName.trim()) return;
    rbacStore.registerAccount({
      name: newAccName,
      email: newAccEmail || `${newAccName.toLowerCase().replace(/\s+/g, ".")}@elea.local`,
      role: newAccRole,
    });
    setNewAccName("");
    setNewAccEmail("");
    syncProfileFromStorage();
  };

  const handleSave = () => {
    learnerStorage.saveProfile({ displayName, targetGoal });
    setSavedNote(pt.profileSavedNote);
  };

  const handleExport = () => {
    const json = exportLearnerBackupJson();
    try {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `easy-learning-english-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // ignore in headless test envs
    }
    setBackupNotice({ tone: "ok", text: pt.exportSuccess });
  };

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const res = importLearnerBackupJson(await file.text());
    if (!res.ok) {
      setBackupNotice({ tone: "err", text: pt.importError });
      return;
    }
    const meta = learnerStorage.getProfile();
    setDisplayName(meta.displayName);
    setTargetGoal(meta.targetGoal);
    setBackupNotice({ tone: "ok", text: pt.importSuccess });
  };

  const handleReset = () => {
    learnerStorage.clearAll();
    learningRecord.clearJourney();
    setDisplayName("");
    setTargetGoal("");
    setConfirmReset(false);
    setBackupNotice({ tone: "ok", text: pt.resetSuccess });
  };

  return (
    <div className="container-page max-w-4xl space-y-8 py-10 md:py-14" dir={dir}>
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Settings className="size-3.5" aria-hidden />
          {t.nav.profile}
        </div>
        <h1 className="display-heading text-3xl font-extrabold md:text-4xl">
          {dt.profilePageTitle}
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">{dt.profilePageSubtitle}</p>
      </header>

      {/* Multi-Account Local Session & Role Switcher */}
      <Card className="border-primary/25">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="size-5 text-primary" aria-hidden />
                {at.sessionCardTitle}
              </CardTitle>
              <CardDescription>{at.sessionCardDesc}</CardDescription>
            </div>
            {currentAccount ? (
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  {currentAccount.name} · {roleLabel(currentAccount.role)}
                </Badge>
                <Button type="button" size="sm" variant="outline" onClick={handleSignOut}>
                  <LogOut className="me-1.5 size-3.5" aria-hidden />
                  {at.signOutBtn}
                </Button>
              </div>
            ) : (
              <Badge variant="outline">{at.signedOutLabel}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="text-xs font-bold text-muted-foreground">{at.switchAccountLabel}</div>
            <div className="flex flex-wrap gap-2">
              {rbac.accounts.map((acc) => {
                const active = acc.id === rbac.activeAccountId;
                return (
                  <Button
                    key={acc.id}
                    type="button"
                    size="sm"
                    variant={active ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => handleSwitchAccount(acc.id)}
                  >
                    {acc.name} ({roleLabel(acc.role)})
                  </Button>
                );
              })}
            </div>
          </div>

          {currentAccount && canAccessAdminPanel(currentAccount.role) && (
            <div className="rounded-xl bg-primary/10 p-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-foreground">
                {roleLabel(currentAccount.role)} — {t.nav.adminStudio}
              </span>
              <Button asChild size="sm">
                <Link to="/admin">
                  <Shield className="me-1.5 size-4" aria-hidden />
                  {at.openAdminStudioBtn}
                </Link>
              </Button>
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="grid gap-2.5 border-t border-border/70 pt-4 sm:grid-cols-[1fr_1fr_auto_auto]"
          >
            <Input
              value={newAccName}
              onChange={(e) => setNewAccName(e.target.value)}
              placeholder={at.registerNamePlaceholder}
              aria-label={at.registerNamePlaceholder}
              required
            />
            <Input
              value={newAccEmail}
              onChange={(e) => setNewAccEmail(e.target.value)}
              placeholder={at.registerEmailPlaceholder}
              aria-label={at.registerEmailPlaceholder}
              type="email"
            />
            <select
              aria-label={at.registerHeading}
              value={newAccRole}
              onChange={(e) => setNewAccRole(e.target.value as UserRole)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-xs font-semibold"
            >
              <option value="student">{at.roleStudent}</option>
              <option value="teacher">{at.roleTeacher}</option>
              <option value="admin">{at.roleAdmin}</option>
            </select>
            <Button type="submit" size="sm">
              <UserPlus className="me-1.5 size-4" aria-hidden />
              {at.registerBtn}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCheck className="size-5 text-primary" aria-hidden />
              {pt.profileCardTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="profile-name" className="text-xs font-semibold">
                {pt.displayNameLabel}
              </label>
              <Input
                id="profile-name"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setSavedNote(null);
                }}
                placeholder={pt.displayNamePlaceholder}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="profile-goal" className="text-xs font-semibold">
                {pt.targetGoalLabel}
              </label>
              <Input
                id="profile-goal"
                value={targetGoal}
                onChange={(e) => {
                  setTargetGoal(e.target.value);
                  setSavedNote(null);
                }}
                placeholder={pt.targetGoalPlaceholder}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" onClick={handleSave}>
                {pt.saveProfileBtn}
              </Button>
              {savedNote && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <CheckCircle2 className="size-3.5" aria-hidden />
                  {savedNote}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{dt.preferencesCardTitle}</CardTitle>
            <CardDescription>{dt.preferencesCardNote}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher variant="full" />
              <ThemeToggle />
            </div>

            <div className="border-t border-border/70 pt-4">
              <div className="mb-2.5 text-xs font-semibold text-muted-foreground">
                {dt.quickLinksTitle}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link to="/dashboard">
                    <LayoutDashboard className="me-1.5 size-4" aria-hidden />
                    {t.nav.dashboard}
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/progress">
                    <BarChart3 className="me-1.5 size-4" aria-hidden />
                    {t.nav.progress}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Download className="size-5 text-primary" aria-hidden />
            {pt.backupSectionTitle}
          </CardTitle>
          <CardDescription>{pt.backupSectionNote}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2.5">
            <Button type="button" onClick={handleExport}>
              <Download className="me-1.5 size-4" aria-hidden />
              {pt.exportJsonBtn}
            </Button>
            <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
              <Upload className="me-1.5 size-4" aria-hidden />
              {pt.importJsonBtn}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              aria-label={pt.importJsonBtn}
              onChange={handleImport}
              className="hidden"
            />
            {!confirmReset ? (
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setConfirmReset(true)}
              >
                <RotateCcw className="me-1.5 size-4" aria-hidden />
                {pt.resetProgressBtn}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button type="button" variant="destructive" size="sm" onClick={handleReset}>
                  {pt.confirmResetBtn}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmReset(false)}
                >
                  {pt.cancelResetBtn}
                </Button>
              </div>
            )}
          </div>

          {backupNotice && (
            <div
              role="status"
              className={
                backupNotice.tone === "ok"
                  ? "rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-medium text-primary"
                  : "rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
              }
            >
              {backupNotice.text}
            </div>
          )}

          <div className="pt-2">
            <Button asChild size="sm" variant="secondary">
              <Link to="/dashboard">
                <span>{dt.eyebrow}</span>
                <ArrowRight className="ms-1.5 size-4 rtl:rotate-180" aria-hidden />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
