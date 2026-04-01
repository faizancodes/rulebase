"use client";

import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { formatPercent } from "@/lib/formatters";
import type { DashboardComplianceSummary } from "@/lib/types";

interface ComplianceScoreCardProps {
  data?: DashboardComplianceSummary;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ComplianceScoreCard({ data, isLoading, error, onRetry }: ComplianceScoreCardProps) {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (!data) return <EmptyState title="No compliance score" description="No score is available for the current filters." />;

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Compliance score</p>
            <h2 className="mt-2 text-xl text-text-primary">{data.label}</h2>
          </div>
          <div className="text-right">
            <p className="text-3xl text-text-primary">{formatPercent(data.score)}</p>
            <p className="text-xs uppercase tracking-[0.05em] text-text-muted">impact likelihood</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary">{data.explanation}</p>
      </div>
    </Card>
  );
}
