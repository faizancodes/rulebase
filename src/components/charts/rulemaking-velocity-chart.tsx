"use client";

import { useMemo } from "react";

import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { formatNumber } from "@/lib/formatters";
import type { DashboardVelocityPoint } from "@/lib/types";

interface RulemakingVelocityChartProps {
  data?: DashboardVelocityPoint[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function RulemakingVelocityChart({ data, isLoading, error, onRetry }: RulemakingVelocityChartProps) {
  const points = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const maxValue = useMemo(() => Math.max(...points.flatMap((point) => [point.federalRegister, point.congress, point.sec]), 1), [points]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (points.length === 0) return <EmptyState title="No velocity data" description="Try widening the date range or filters." />;

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Rulemaking velocity</p>
          <h2 className="mt-2 text-xl text-text-primary">Activity across federal sources</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {points.slice(-8).map((point) => (
            <div key={point.date} className="border border-border-default bg-surface-1 p-3">
              <div className="text-xs uppercase tracking-[0.05em] text-text-muted">{point.date}</div>
              <div className="mt-3 space-y-2 text-sm text-text-secondary">
                <div className="flex items-center justify-between"><span>Federal Register</span><span>{formatNumber(point.federalRegister)}</span></div>
                <div className="h-2 bg-surface-3"><div className="h-2 bg-accent-primary" style={{ width: `${Math.max((point.federalRegister / maxValue) * 100, 8)}%` }} /></div>
                <div className="flex items-center justify-between"><span>Congress</span><span>{formatNumber(point.congress)}</span></div>
                <div className="h-2 bg-surface-3"><div className="h-2 bg-accent-primary/80" style={{ width: `${Math.max((point.congress / maxValue) * 100, 8)}%` }} /></div>
                <div className="flex items-center justify-between"><span>SEC</span><span>{formatNumber(point.sec)}</span></div>
                <div className="h-2 bg-surface-3"><div className="h-2 bg-accent-primary/60" style={{ width: `${Math.max((point.sec / maxValue) * 100, 8)}%` }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
