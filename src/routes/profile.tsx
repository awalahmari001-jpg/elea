import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  LayoutDashboard,
  RotateCcw,
  Settings,
  Upload,
  UserCheck,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pageMeta } from "@/lib/i18n/head";
import { exportLearnerBackupJson, importLearnerBackupJson } from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord } from "@/lib/learning-record";

export const Route = createFileRoute("/profile")({
  head: ({ match }) => pageMeta(match.context.locale, "profile"),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, dir } = useI18n();
  const pt = t.progress;
  const dt = t.dashboard;

  const [displayName, setDisplayName] = useState("");
  const [targetGoal, setTargetGoal] = useState("");
  const [savedNote, setSavedNote] = useState<string | null>(null);
  const [backupNotice, setBackupNotice] = useState<{ tone: "ok" | "err"; text: string } | null>(
    null,
  );
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const meta = learnerStorage.getProfile();
    setDisplayName(meta.displayName);
    setTargetGoal(meta.targetGoal);
  }, []);

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
