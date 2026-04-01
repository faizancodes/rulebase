"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import type { DashboardDependencyGraph } from "@/lib/types";

interface DependencyGraphProps {
  data?: DashboardDependencyGraph;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function DependencyGraph({ data, isLoading, error, onRetry }: DependencyGraphProps) {
  const nodes = useMemo(() => (Array.isArray(data?.nodes) ? data.nodes : []), [data]);
  const edges = useMemo(() => (Array.isArray(data?.edges) ? data.edges : []), [data]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (nodes.length === 0) return <EmptyState title="No dependency graph" description="No connected entities were found for the current filters." />;

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Dependency graph</p>
          <h2 className="mt-2 text-xl text-text-primary">Agencies, committees, issuers, and industries</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            {nodes.map((node) => (
              <div key={node.id} className="border border-border-default bg-surface-1 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-text-primary">{node.name}</p>
                    <p className="text-xs uppercase tracking-[0.05em] text-text-muted">{node.type}</p>
                  </div>
                  <Badge>{node.count} links</Badge>
                </div>
                <div className="mt-3 h-2 bg-surface-3">
                  <div className="h-2 bg-accent-primary" style={{ width: `${Math.max(node.intensity, 10)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {edges.map((edge) => (
              <div key={`${edge.source}-${edge.target}`} className="border border-border-default bg-surface-1 p-4 text-sm text-text-secondary">
                <div className="flex items-center justify-between gap-3 text-text-primary">
                  <span>{edge.source}</span>
                  <span>{edge.target}</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.05em] text-text-muted">{edge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
