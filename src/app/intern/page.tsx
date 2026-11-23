import { headers } from "next/headers";
import { company } from "@/config/company";
import { activeAdvisors } from "@/config/advisors";
import { getMetrics, listLeads, storeEnabled } from "@/lib/store";
import { isPreview } from "@/lib/site";
import { Dashboard } from "./Dashboard";

export const dynamic = "force-dynamic";

export default async function InternPage() {
  const scope = (await headers()).get("x-intern-advisor"); // gesetzt von proxy.ts, nur für Berater-Logins
  const [all, metrics] = await Promise.all([listLeads(), getMetrics()]);
  // Berater sehen ausschließlich ihre eigenen Anfragen (Datenschutz)
  const leads = scope ? all.filter((l) => l.advisor === scope) : all;
  return (
    <Dashboard
      leads={leads}
      metrics={metrics}
      trial={{ start: process.env.TRIAL_START || company.trial.startDate, days: company.trial.durationDays, goal: company.trial.goalQualifiedLeads }}
      brand={company.name}
      advisors={activeAdvisors().map((a) => ({ slug: a.slug, name: `${a.firstName} ${a.lastName}` }))}
      preview={isPreview}
      store={storeEnabled()}
      scope={scope}
    />
  );
}
