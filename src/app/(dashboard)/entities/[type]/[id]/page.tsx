import { notFound } from "next/navigation";

import { CrossSourceTimeline } from "@/components/charts/cross-source-timeline";
import { EntityHeader } from "@/components/entities/entity-header";
import { EntityRelatedItems } from "@/components/entities/entity-related-items";
import { EntitySummary } from "@/components/entities/entity-summary";
import { fetchEntityRecord, fetchEntitySummary, fetchEntityTimeline } from "@/lib/api";

export const dynamic = "force-dynamic";

interface EntityPageProps {
  params: Promise<{ type: string; id: string }>;
}

export default async function EntityPage({ params }: EntityPageProps) {
  const { type, id } = await params;
  const [recordResponse, summaryResponse, timelineResponse] = await Promise.all([
    fetchEntityRecord(type, id),
    fetchEntitySummary(type, id),
    fetchEntityTimeline(type, id),
  ]);

  const record = recordResponse.data;
  const summary = summaryResponse.data;
  const timeline = timelineResponse.data;

  if (!record || !summary || !Array.isArray(timeline)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <EntityHeader entity={record} />
      <EntitySummary summary={summary} />
      <CrossSourceTimeline items={timeline} velocity={[]} />
      <EntityRelatedItems items={timeline} />
    </div>
  );
}
