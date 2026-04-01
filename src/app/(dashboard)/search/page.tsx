"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResults } from "@/components/search/search-results";
import { fetchCongressBills, fetchFederalRegisterNotices, fetchSecFilings } from "@/lib/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [source, setSource] = useState<"all" | "notices" | "bills" | "filings">("all");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const noticesQuery = useQuery({
    queryKey: ["search", "notices", debouncedQuery],
    queryFn: () => fetchFederalRegisterNotices(debouncedQuery),
    enabled: source === "all" || source === "notices",
  });
  const billsQuery = useQuery({
    queryKey: ["search", "bills", debouncedQuery],
    queryFn: () => fetchCongressBills(debouncedQuery),
    enabled: source === "all" || source === "bills",
  });
  const filingsQuery = useQuery({
    queryKey: ["search", "filings", debouncedQuery],
    queryFn: () => fetchSecFilings(debouncedQuery),
    enabled: source === "all" || source === "filings",
  });

  const results = useMemo(() => {
    const notices = Array.isArray(noticesQuery.data?.data) ? noticesQuery.data.data : [];
    const bills = Array.isArray(billsQuery.data?.data) ? billsQuery.data.data : [];
    const filings = Array.isArray(filingsQuery.data?.data) ? filingsQuery.data.data : [];
    return { notices, bills, filings };
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

        <SearchFilters query={query} onQueryChange={setQuery} source={source} onSourceChange={setSource} />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : results.notices.length === 0 && results.bills.length === 0 && results.filings.length === 0 ? (
          <EmptyState title="No results" description="Try a broader search term or switch sources." />
        ) : (
          <div className="grid gap-6">
            <Card>
              <SearchResults title="Federal Register notices" items={results.notices} />
            </Card>
            <Card>
              <SearchResults title="Congressional bills" items={results.bills} />
            </Card>
            <Card>
              <SearchResults title="SEC filings" items={results.filings} />
            </Card>
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
}
