"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResults } from "@/components/search/search-results";
import { fetchCongressBills, fetchFederalRegisterNotices, fetchSecFilings } from "@/lib/api";
import type { SearchParams, SearchResultItem } from "@/lib/types";

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchParams>({});
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(filters.q ?? ""), 300);
    return () => clearTimeout(timer);
  }, [filters.q]);

  const noticesQuery = useQuery({
    queryKey: ["search", "notices", debouncedQuery],
    queryFn: () => fetchFederalRegisterNotices(debouncedQuery),
  });
  const billsQuery = useQuery({
    queryKey: ["search", "bills", debouncedQuery],
    queryFn: () => fetchCongressBills(debouncedQuery),
  });
  const filingsQuery = useQuery({
    queryKey: ["search", "filings", debouncedQuery],
    queryFn: () => fetchSecFilings(debouncedQuery),
  });

  const results = useMemo<SearchResultItem[]>(() => {
    const notices = (noticesQuery.data?.data ?? []).map((item) => ({
      id: item.documentNumber,
      title: item.title,
      subtitle: item.agency,
      source: "Federal Register",
      date: item.publicationDate,
    }));
    const bills = (billsQuery.data?.data ?? []).map((item) => ({
      id: item.billId,
      title: item.title,
      subtitle: item.sponsor,
      source: "Congress",
      date: item.introducedDate,
    }));
    const filings = (filingsQuery.data?.data ?? []).map((item) => ({
      id: item.accessionNumber,
      title: item.companyName,
      subtitle: item.formType,
      source: "SEC",
      date: item.filingDate,
    }));
    return [...notices, ...bills, ...filings];
  }, [billsQuery.data?.data, filingsQuery.data?.data, noticesQuery.data?.data]);

  const isLoading = noticesQuery.isLoading || billsQuery.isLoading || filingsQuery.isLoading;
  const error = noticesQuery.error?.message ?? billsQuery.error?.message ?? filingsQuery.error?.message ?? null;

  return (
    <div className="min-h-screen bg-background text-text-primary lg:flex">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 xl:p-8">
          <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Search</p>
          <h1 className="mt-2 text-3xl font-light text-text-primary">Regulatory search</h1>
          <p className="mt-2 max-w-3xl text-sm text-text-secondary">Search Federal Register notices, congressional bills, and SEC filings from one place.</p>
        </div>

        <SearchFilters
          filters={filters}
          onChange={(next) => setFilters((current) => ({ ...current, ...next }))}
          onReset={() => setFilters({})}
        />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : results.length === 0 ? (
          <EmptyState title="No results" description="Try a broader search term or switch sources." />
        ) : (
          <SearchResults
            items={results}
            sorting={[]}
            onSortingChange={() => undefined}
            selectedIds={[]}
            onToggleSelect={() => undefined}
            onCompare={() => undefined}
          />
        )}
          </div>
        </main>
      </div>
    </div>
  );
}
