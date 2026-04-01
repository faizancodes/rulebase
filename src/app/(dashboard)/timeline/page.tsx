"use client";

import { useQuery } from "@tanstack/react-query";

import { CrossSourceTimeline } from "@/components/charts/cross-source-timeline";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { fetchEntityTimeline, fetchDashboardVelocity } from "@/lib/api";

export default function TimelinePage() {
  const timelineQuery = useQuery({ queryKey: ["timeline", "entity"], queryFn: () => fetchEntityTimeline("agency", "all") });
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

      <CrossSourceTimeline items={timeline} velocity={velocity} />
    </div>
  );
}
