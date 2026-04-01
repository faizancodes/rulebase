import { ResponsiveContainer, Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
import type { DashboardVelocityPoint, EntityTimelineItem } from "@/lib/types";

interface CrossSourceTimelineProps {
  items: EntityTimelineItem[];
  velocity: DashboardVelocityPoint[];
}

export function CrossSourceTimeline({ items, velocity }: CrossSourceTimelineProps) {
  const totalEvents = Array.isArray(items) ? items.length : 0;
  const overlapPoints = Array.isArray(velocity)
    ? velocity.map((point) => ({
        ...point,
        overlap: point.federalRegister + point.congress + point.sec,
      }))
    : [];

  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-light text-text-primary">Cross-source timeline</h2>
            <p className="mt-1 text-sm text-text-secondary">Event density and source overlap across federal signals.</p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.2em] text-text-muted">
            <div>{totalEvents} events</div>
            <div>{overlapPoints.length} time buckets</div>
          </div>
        </div>

        <div className="h-72 rounded-none border border-border-default bg-surface-1 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={overlapPoints}>
              <CartesianGrid stroke="#222222" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#a1a1a1", fontSize: 12 }} axisLine={{ stroke: "#222222" }} tickLine={false} />
              <YAxis tick={{ fill: "#a1a1a1", fontSize: 12 }} axisLine={{ stroke: "#222222" }} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#111111", border: "1px solid #222222", color: "#ffffff" }}
                labelStyle={{ color: "#a1a1a1" }}
              />
              <Area type="monotone" dataKey="federalRegister" stackId="1" stroke="#4F8CFF" fill="#4F8CFF" fillOpacity={0.25} />
              <Area type="monotone" dataKey="congress" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
              <Area type="monotone" dataKey="sec" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="relative border-l border-border-default pl-4">
                <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 bg-accent-primary" />
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-text-muted">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.sourceType}</span>
                </div>
                <h3 className="mt-1 text-sm text-text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{item.summary}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-secondary">No timeline events available.</p>
          )}
        </div>
      </div>
    </Card>
  );
}
