import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Printer,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SITE } from "@/config/site";
import {
  computeSkillsAndAchievements,
  verifyCertificateById,
  type CertificateRecord,
} from "@/lib/skills-achievements";

export function CertificatesPortal() {
  const { t, locale, dir } = useI18n();
  const sc = t.skillsCerts;

  const [certs, setCerts] = useState<CertificateRecord[]>([]);
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<
    { valid: true; certificate: CertificateRecord } | { valid: false } | null
  >(null);

  useEffect(() => {
    const report = computeSkillsAndAchievements();
    setCerts(report.certificates);
  }, []);

  const handleVerify = () => {
    setVerifyResult(verifyCertificateById(verifyInput));
  };

  return (
    <div className="container-page space-y-10 py-10 md:py-14" dir={dir}>
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Award className="size-3.5" aria-hidden />
          {sc.certsEyebrow}
        </div>
        <h1 className="display-heading text-3xl font-extrabold md:text-4xl">{sc.certsTitle}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground md:text-base">{sc.certsSubtitle}</p>

        <div className="flex items-start gap-2.5 rounded-2xl border border-amber-500/35 bg-amber-500/10 p-4 text-xs leading-relaxed text-foreground">
          <AlertCircle
            className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
          <div>
            <span className="font-bold">{sc.certsDisclaimerTitle}: </span>
            {sc.certsDisclaimerBody}
          </div>
        </div>
      </header>

      {/* Earned Certificates */}
      {certs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Award className="size-12 text-muted-foreground" aria-hidden />
            <h2 className="text-lg font-bold">{sc.certsEmptyTitle}</h2>
            <p className="max-w-lg text-sm text-muted-foreground">{sc.certsEmptyBody}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <Button asChild size="sm">
                <Link to="/courses">{t.nav.courses}</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/workshops">{t.nav.workshops}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <section className="grid gap-6 lg:grid-cols-2">
          {certs.map((cert) => (
            <article
              key={cert.certificateId}
              className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-card via-background to-primary/5 p-6 shadow-card md:p-8"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow text-primary">{SITE.name}</p>
                  <h2 className="mt-1 text-xl font-extrabold text-foreground">
                    {cert.courseTitle[locale]}
                  </h2>
                </div>
                <Badge variant="default" className="gap-1 bg-emerald-600">
                  <ShieldCheck className="size-3.5" aria-hidden />
                  Verified
                </Badge>
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-border/80 bg-background/90 p-4 text-xs sm:grid-cols-2">
                <div>
                  <div className="text-muted-foreground">{sc.certHolderLabel}</div>
                  <div className="mt-0.5 text-sm font-bold text-foreground">{cert.learnerName}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">{sc.certDateLabel}</div>
                  <div className="mt-0.5 font-mono font-bold text-foreground" dir="ltr">
                    {cert.completedAt}
                  </div>
                </div>
                {cert.assessmentScorePct !== null && (
                  <div>
                    <div className="text-muted-foreground">{sc.certScoreLabel}</div>
                    <div
                      className="mt-0.5 font-mono font-bold text-emerald-600 dark:text-emerald-400"
                      dir="ltr"
                    >
                      {cert.assessmentScorePct}%
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-muted-foreground">{sc.certIdLabel}</div>
                  <div className="mt-0.5 font-mono font-bold text-primary" dir="ltr">
                    {cert.certificateId}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                {cert.disclaimer[locale]}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 print:hidden">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (typeof window !== "undefined") window.print();
                  }}
                >
                  <Printer className="me-1.5 size-4" aria-hidden />
                  {sc.certPrintBtn}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setVerifyInput(cert.certificateId);
                    setVerifyResult(verifyCertificateById(cert.certificateId));
                  }}
                >
                  <ShieldCheck className="me-1.5 size-4" aria-hidden />
                  {sc.verifyBtn}
                </Button>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Certificate Verification Lookup */}
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="size-5 text-primary" aria-hidden />
            {sc.verifySectionTitle}
          </CardTitle>
          <CardDescription>{sc.verifySectionSubtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Input
              value={verifyInput}
              onChange={(e) => {
                setVerifyInput(e.target.value);
                setVerifyResult(null);
              }}
              placeholder={sc.verifyInputPlaceholder}
              dir="ltr"
              aria-label={sc.verifySectionTitle}
            />
            <Button type="button" onClick={handleVerify} className="shrink-0">
              <ShieldCheck className="me-1.5 size-4" aria-hidden />
              {sc.verifyBtn}
            </Button>
          </div>

          {verifyResult && (
            <div
              role="status"
              className={
                verifyResult.valid
                  ? "rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs"
                  : "rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive"
              }
            >
              {verifyResult.valid ? (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="size-4" aria-hidden />
                    {sc.verifyValidMsg}
                  </div>
                  <p className="text-foreground">
                    <strong>{verifyResult.certificate.learnerName}</strong> ·{" "}
                    {verifyResult.certificate.courseTitle[locale]} ·{" "}
                    <span dir="ltr">{verifyResult.certificate.completedAt}</span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-semibold">
                  <XCircle className="size-4" aria-hidden />
                  {sc.verifyInvalidMsg}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
