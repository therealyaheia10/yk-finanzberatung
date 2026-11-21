import { company } from "@/config/company";
import { activeAdvisors } from "@/config/advisors";
import { getMetrics, listLeads, storeEnabled } from "@/lib/store";
import { isPreview } from "@/lib/site";
import { Dashboard } from "./Dashboard";

export const dynamic = "force-dynamic";

export default async function InternPage() {
  const [leads, metrics] = await Promise.all([listLeads(), getMetrics()]);
  return (
    <Dashboard
      leads={leads}
      metrics={metrics}
      trial={{ start: process.env.TRIAL_START || company.trial.startDate, days: company.trial.durationDays, goal: company.trial.goalQualifiedLeads }}
      brand={company.name}
      advisors={activeAdvisors().map((a) => ({ slug: a.slug, name: `${a.firstName} ${a.lastName}` }))}
      preview={isPreview}
      store={storeEnabled()}
    />
  );
}
