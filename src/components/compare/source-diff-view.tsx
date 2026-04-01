import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import type { CompareResult } from "@/lib/types";

interface SourceDiffViewProps {
  comparison: CompareResult;
}

export function SourceDiffView({ comparison }: SourceDiffViewProps) {
  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <Tabs>
        <div className="flex flex-wrap gap-2 border-b border-border-default pb-4">
          <Badge>Overview</Badge>
          <Badge>Source comparison</Badge>
          <Badge>Risk implications</Badge>
        </div>
      </Tabs>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h3 className="text-sm uppercase tracking-[0.2em] text-text-muted">Overlap</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded border border-border-subtle bg-surface-1 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Topics</div>
              <p className="mt-2 text-sm text-text-secondary">{comparison.overlap.topics.join(", ") || "None"}</p>
            </div>
            <div className="rounded border border-border-subtle bg-surface-1 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Dates</div>
              <p className="mt-2 text-sm text-text-secondary">{comparison.overlap.dates.join(", ") || "None"}</p>
            </div>
            <div className="rounded border border-border-subtle bg-surface-1 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Affected sectors</div>
              <p className="mt-2 text-sm text-text-secondary">{comparison.overlap.sectors.join(", ") || "None"}</p>
            </div>
            <div className="rounded border border-border-subtle bg-surface-1 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Disclosure language</div>
              <p className="mt-2 text-sm text-text-secondary">{comparison.overlap.disclosureLanguage.join(", ") || "None"}</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm uppercase tracking-[0.2em] text-text-muted">Risk implications</h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            {comparison.riskImplications.map((item) => (
              <li key={item} className="rounded border border-border-subtle bg-surface-1 p-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
