"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { SavedSearch } from "@/lib/types";

interface SavedSearchesProps {
  searches: SavedSearch[];
  onApply: (search: SavedSearch) => void;
  onRemove: (id: string) => void;
}

export function SavedSearches({ searches, onApply, onRemove }: SavedSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-lg text-text-primary">Saved searches</h2>
        <div className="space-y-3">
          {searches.map((search) => (
            <div key={search.id} className="flex flex-col gap-3 border border-border-subtle p-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-text-primary">{search.name}</p>
                  <Badge>{search.query || "All sources"}</Badge>
                </div>
                <p className="mt-1 text-xs text-text-muted">{search.createdAt}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => onApply(search)} className="text-xs uppercase tracking-[0.05em] text-accent-primary hover:text-accent-hover">Apply</button>
                <button type="button" onClick={() => onRemove(search.id)} className="text-xs uppercase tracking-[0.05em] text-text-muted hover:text-text-secondary">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
