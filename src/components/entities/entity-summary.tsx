import { Card } from "@/components/ui/card";
import type { EntitySummary } from "@/lib/types";

interface EntitySummaryProps {
  summary: EntitySummary;
}

export function EntitySummary({ summary }: EntitySummaryProps) {
  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-light text-text-primary">Summary</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{summary.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded border border-border-subtle bg-surface-1 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Key facts</div>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              {summary.keyFacts.map((fact) => (
                <li key={fact}>• {fact}</li>
              ))}
            </ul>
          </div>
          <div className="rounded border border-border-subtle bg-surface-1 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Affected sectors</div>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              {summary.affectedSectors.map((sector) => (
                <li key={sector}>• {sector}</li>
              ))}
            </ul>
          </div>
          <div className="rounded border border-border-subtle bg-surface-1 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Activity</div>
            <div className="mt-3 space-y-2 text-sm text-text-secondary">
              <div>Related items: {summary.relatedCount}</div>
              <div>Last updated: {summary.lastUpdated}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
