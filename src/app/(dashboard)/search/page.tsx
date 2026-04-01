"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { fetchCongressBills, fetchFederalRegisterNotices, fetchSecFilings } from "@/lib/api";
import type { SearchParams } from "@/lib/types";

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

  const results = useMemo(() => {
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

            <div className="grid gap-4 rounded border border-border-default bg-surface-2 p-4 md:grid-cols-2 xl:grid-cols-4">
          <input className="rounded border border-border-default bg-surface-1 px-3 py-2 text-sm" placeholder="Search terms" value={filters.q ?? ""} onChange={(e) => setFilters((current) => ({ ...current, q: e.target.value }))} />
          <input className="rounded border border-border-default bg-surface-1 px-3 py-2 text-sm" placeholder="Agency" value={filters.agency ?? ""} onChange={(e) => setFilters((current) => ({ ...current, agency: e.target.value }))} />
          <input className="rounded border border-border-default bg-surface-1 px-3 py-2 text-sm" placeholder="Committee" value={filters.committee ?? ""} onChange={(e) => setFilters((current) => ({ ...current, committee: e.target.value }))} />
          <input className="rounded border border-border-default bg-surface-1 px-3 py-2 text-sm" placeholder="Issuer" value={filters.issuer ?? ""} onChange={(e) => setFilters((current) => ({ ...current, issuer: e.target.value }))} />
        </div>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : results.length === 0 ? (
          <EmptyState title="No results" description="Try a broader search term or switch sources." />
        ) : (
          <div className="space-y-3">
            {results.map((item) => (
              <div key={item.id} className="rounded border border-border-default bg-surface-2 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-text-primary">{item.title}</p>
                    <p className="text-xs text-text-muted">{item.subtitle}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-text-muted">{item.source}</span>
                </div>
                <p className="mt-2 text-xs text-text-secondary">{item.date}</p>
              </div>
            ))}
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
}
