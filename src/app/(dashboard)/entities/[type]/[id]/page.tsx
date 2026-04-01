import { notFound } from "next/navigation";

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
  const timeline = Array.isArray(timelineResponse.data) ? timelineResponse.data : [];

  if (!record || !summary) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Entity detail</p>
        <h1 className="mt-2 text-3xl font-light text-text-primary">{record.name ?? `${type} ${id}`}</h1>
        <p className="mt-2 max-w-3xl text-sm text-text-secondary">{record.description ?? "Detailed entity intelligence and related activity."}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded border border-border-default bg-surface-2 p-4">
          <h2 className="text-lg text-text-primary">Summary</h2>
          <pre className="mt-4 overflow-auto text-xs text-text-secondary">{JSON.stringify(summary, null, 2)}</pre>
        </div>
        <div className="rounded border border-border-default bg-surface-2 p-4">
          <h2 className="text-lg text-text-primary">Timeline</h2>
          <pre className="mt-4 overflow-auto text-xs text-text-secondary">{JSON.stringify(timeline, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
