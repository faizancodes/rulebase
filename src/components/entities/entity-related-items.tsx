import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { EntityTimelineItem } from "@/lib/types";

interface EntityRelatedItemsProps {
  items: EntityTimelineItem[];
}

export function EntityRelatedItems({ items }: EntityRelatedItemsProps) {
  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-light text-text-primary">Related items</h2>
          <p className="mt-1 text-sm text-text-secondary">Cross-source records connected to this entity.</p>
        </div>
        <Badge>{items.length} records</Badge>
      </div>
      <div className="mt-5 overflow-hidden rounded border border-border-subtle">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.sourceType}</TableCell>
                <TableCell>
                  <a className="text-accent-primary hover:underline" href={item.url}>
                    {item.title}
                  </a>
                  <div className="mt-1 text-xs text-text-muted">{item.summary}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
