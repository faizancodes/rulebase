import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { EntityRecord } from "@/lib/types";

interface EntityHeaderProps {
  entity: EntityRecord;
}

export function EntityHeader({ entity }: EntityHeaderProps) {
  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{entity.type}</Badge>
            <span className="text-xs uppercase tracking-[0.2em] text-text-muted">Entity detail</span>
          </div>
          <div>
            <h1 className="text-3xl font-light text-text-primary">{entity.name}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{entity.description}</p>
          </div>
        </div>
        <div className="grid gap-3 text-sm text-text-secondary sm:grid-cols-2">
          <div className="rounded border border-border-subtle bg-surface-1 px-4 py-3">
            <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Related items</div>
            <div className="mt-1 text-lg text-text-primary">{entity.relatedCount}</div>
          </div>
          <div className="rounded border border-border-subtle bg-surface-1 px-4 py-3">
            <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Last updated</div>
            <div className="mt-1 text-lg text-text-primary">{entity.lastUpdated}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
