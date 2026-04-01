import { CrossSourceTimeline } from "@/components/charts/cross-source-timeline";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { fetchEntityTimeline, fetchDashboardVelocity } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function TimelinePage() {
  try {
    const [timelineResponse, velocityResponse] = await Promise.all([fetchEntityTimeline("agency", "all"), fetchDashboardVelocity()]);
    const timeline = Array.isArray(timelineResponse.data) ? timelineResponse.data : [];
    const velocity = Array.isArray(velocityResponse.data) ? velocityResponse.data : [];

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
  } catch (error) {
    return <ErrorState message={error instanceof Error ? error.message : "Failed to load timeline"} />;
  }
}
