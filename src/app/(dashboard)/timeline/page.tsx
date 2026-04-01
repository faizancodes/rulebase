"use client";

import { useQuery } from "@tanstack/react-query";

import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { fetchDashboardVelocity } from "@/lib/api";

export default function TimelinePage() {
  const timelineQuery = useQuery({ queryKey: ["timeline", "entity"], queryFn: async () => ({ data: [] }) });
  const velocityQuery = useQuery({ queryKey: ["timeline", "velocity"], queryFn: fetchDashboardVelocity });

  if (timelineQuery.isLoading || velocityQuery.isLoading) return <LoadingState />;
  if (timelineQuery.error) return <ErrorState message={timelineQuery.error.message} />;
  if (velocityQuery.error) return <ErrorState message={velocityQuery.error.message} />;

  const timeline = Array.isArray(timelineQuery.data?.data) ? timelineQuery.data.data : [];
  const velocity = Array.isArray(velocityQuery.data?.data) ? velocityQuery.data.data : [];

  if (timeline.length === 0 && velocity.length === 0) {
    return <EmptyState title="No timeline activity" description="Try broadening the monitored agencies, issuers, or keywords." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Operational monitoring</p>
        <h1 className="mt-2 text-3xl font-light text-text-primary">Timeline</h1>
        <p className="mt-2 max-w-3xl text-sm text-text-secondary">
          Track rulemaking velocity, event density, and cross-source overlap across federal signals.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded border border-border-default bg-surface-2 p-4">
          <h2 className="text-lg text-text-primary">Timeline events</h2>
          <div className="mt-4 space-y-3">
            {timeline.map((item: any, index: number) => (
              <div key={item.id ?? index} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0">
                <p className="text-sm text-text-primary">{item.title ?? item.name ?? "Event"}</p>
                <p className="text-xs text-text-muted">{item.source ?? "Source"}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded border border-border-default bg-surface-2 p-4">
          <h2 className="text-lg text-text-primary">Velocity</h2>
          <pre className="mt-4 overflow-auto text-xs text-text-secondary">{JSON.stringify(velocity, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
