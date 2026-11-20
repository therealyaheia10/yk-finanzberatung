import { advisor, fullName } from "@/config/advisor";
import { getMetrics, listLeads, storeEnabled } from "@/lib/store";
import { isPreview } from "@/lib/site";
import { Dashboard } from "./Dashboard";

export const dynamic = "force-dynamic";

export default async function InternPage() {
  const [leads, metrics] = await Promise.all([listLeads(), getMetrics()]);
  const start = process.env.TRIAL_START || advisor.trial.startDate;
  return (
    <Dashboard
      leads={leads}
      metrics={metrics}
      trial={{ start, days: advisor.trial.durationDays, goal: advisor.trial.goalQualifiedLeads, price: advisor.trial.priceEur }}
      advisorName={fullName}
      preview={isPreview}
      store={storeEnabled()}
    />
  );
}
