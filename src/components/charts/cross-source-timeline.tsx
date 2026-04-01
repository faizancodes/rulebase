import { Card } from "@/components/ui/card";
import type { EntityTimelineItem } from "@/lib/types";

interface CrossSourceTimelineProps {
  items: EntityTimelineItem[];
}

export function CrossSourceTimeline({ items }: CrossSourceTimelineProps) {
  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-light text-text-primary">Cross-source timeline</h2>
          <p className="mt-1 text-sm text-text-secondary">Merged Federal Register, Congress, and SEC activity.</p>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
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
          ))}
        </div>
      </div>
    </Card>
  );
}
