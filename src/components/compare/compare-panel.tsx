"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Input } from "@/components/ui/input";
import { fetchCompareItems, fetchSimilarity } from "@/lib/api";
import type { CompareItem, CompareResult, SimilarityResult } from "@/lib/types";

import { SourceDiffView } from "./source-diff-view";

const DEFAULT_IDS = ["fr-2024-0001", "hr-1234", "320193-10k"];

interface ComparePanelProps {
  initialIds?: string[];
}

export function ComparePanel({ initialIds = DEFAULT_IDS }: ComparePanelProps) {
  const [ids, setIds] = useState(initialIds.join(", "));
  const parsedIds = useMemo(() => ids.split(",").map((item) => item.trim()).filter(Boolean), [ids]);

  const comparisonQuery = useQuery({
    queryKey: ["compare", parsedIds],
    queryFn: () => fetchCompareItems(parsedIds),
    enabled: parsedIds.length >= 2,
  });

  const similarityQuery = useQuery({
    queryKey: ["compare-similarity", parsedIds],
    queryFn: () => fetchSimilarity(parsedIds.join(" ")),
    enabled: parsedIds.length > 0,
  });

  const comparison = comparisonQuery.data?.data;
  const similarity = similarityQuery.data?.data;

  if (comparisonQuery.isLoading || similarityQuery.isLoading) return <LoadingState />;
  if (comparisonQuery.error) return <ErrorState message={comparisonQuery.error.message} onRetry={() => comparisonQuery.refetch()} />;
  if (!comparison) return <EmptyState title="Add at least two items" description="Enter comma-separated IDs to compare sources." />;

  return (
    <div className="space-y-6">
      <Card className="border-border-default bg-surface-2 p-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-light text-text-primary">Compare sources</h1>
            <p className="mt-2 text-sm text-text-secondary">Side-by-side analysis across Federal Register, Congress, and SEC records.</p>
          </div>
          <form
            className="flex flex-col gap-3 md:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setIds(ids);
            }}
          >
            <Input value={ids} onChange={(event) => setIds(event.target.value)} placeholder="fr-2024-0001, hr-1234, 320193-10k" />
            <Button type="submit">Update comparison</Button>
          </form>
          <div className="flex flex-wrap gap-2">
            {parsedIds.map((id) => (
              <Badge key={id}>{id}</Badge>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-border-default bg-surface-2 p-6">
          <h2 className="text-lg font-light text-text-primary">Items</h2>
          <div className="mt-4 space-y-4">
            {comparison.items.map((item: CompareItem) => (
              <div key={item.id} className="rounded border border-border-subtle bg-surface-1 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-text-muted">{item.type}</div>
                    <h3 className="mt-1 text-sm text-text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{item.subtitle}</p>
                  </div>
                  <Badge>{item.date}</Badge>
                </div>
                <p className="mt-3 text-sm text-text-secondary">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-muted">
                  {item.topics.map((topic) => (
                    <span key={topic} className="rounded border border-border-subtle px-2 py-1">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border-default bg-surface-2 p-6">
          <h2 className="text-lg font-light text-text-primary">Semantic matches</h2>
          <div className="mt-4 space-y-3">
            {(Array.isArray(similarity) ? similarity : []).map((item: SimilarityResult) => (
              <div key={item.id} className="rounded border border-border-subtle bg-surface-1 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm text-text-primary">{item.label}</h3>
                  <Badge>{Math.round(item.score * 100)}%</Badge>
                </div>
                <p className="mt-2 text-sm text-text-secondary">{item.summary}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <SourceDiffView comparison={comparison as CompareResult} />
    </div>
  );
}
