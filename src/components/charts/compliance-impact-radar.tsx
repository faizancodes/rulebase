"use client";

import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { formatPercent } from "@/lib/formatters";
import type { DashboardComplianceSummary } from "@/lib/types";

interface ComplianceImpactRadarProps {
  data?: DashboardComplianceSummary;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ComplianceImpactRadar({ data, isLoading, error, onRetry }: ComplianceImpactRadarProps) {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (!data) return <EmptyState title="No compliance score" description="No compliance impact data is available for the current filters." />;

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Compliance impact</p>
          <h2 className="mt-2 text-xl text-text-primary">{data.label}</h2>
          <p className="mt-2 text-sm text-text-secondary">{data.explanation}</p>
        </div>
        <div className="flex items-end gap-4">
          <div className="flex h-28 w-28 items-center justify-center border border-border-default bg-surface-1 text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Score</p>
              <p className="text-3xl text-text-primary">{formatPercent(data.score)}</p>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            {data.drivers.map((driver) => (
              <div key={driver.label}>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.05em] text-text-muted">
                  <span>{driver.label}</span>
                  <span>{driver.value}/{driver.max}</span>
                </div>
                <div className="mt-1 h-2 bg-surface-3">
                  <div className="h-2 bg-semantic-warning" style={{ width: `${Math.max((driver.value / driver.max) * 100, 8)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
