import { createFileRoute } from "@tanstack/react-router";

import { CertificatesPortal } from "@/components/certificates/certificates-portal";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/certificates")({
  head: ({ match }) => pageMeta(match.context.locale, "certificates"),
  component: CertificatesPage,
});

function CertificatesPage() {
  return <CertificatesPortal />;
}
