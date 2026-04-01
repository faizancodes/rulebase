"use client";

import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Badge } from "@/components/ui/badge";
import type { DashboardCrossReferenceHighlight } from "@/lib/types";

interface CrossReferenceCardProps {
  data?: DashboardCrossReferenceHighlight[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function CrossReferenceCard({ data, isLoading, error, onRetry }: CrossReferenceCardProps) {
  const items = Array.isArray(data) ? data : [];

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (items.length === 0) return <EmptyState title="No cross-references" description="No linked signals were found for the current filters." />;

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Cross-source highlights</p>
          <h2 className="mt-2 text-xl text-text-primary">Signals connecting rules, bills, and filings</h2>
        </div>
        <div className="space-y-3">
          {items.slice(0, 4).map((item) => (
            <div key={item.id} className="border border-border-default bg-surface-1 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{item.sourceLabel}</Badge>
                <Badge>{item.targetLabel}</Badge>
                <span className="text-xs uppercase tracking-[0.05em] text-text-muted">{item.relevanceScore}% relevance</span>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{item.rationale}</p>
              {item.matchedTerms.length > 0 ? <p className="mt-2 text-xs text-text-muted">Matched: {item.matchedTerms.join(", ")}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
