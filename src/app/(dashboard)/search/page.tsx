"use client";

import { useCallback, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { SearchFilters } from "@/components/search/search-filters";
import { SavedSearches } from "@/components/search/saved-searches";
import { SearchResults } from "@/components/search/search-results";
import { fetchCongressBills, fetchFederalRegisterNotices, fetchSecFilings } from "@/lib/api";
import { formatDate } from "@/lib/formatters";
import { searchIndex } from "@/lib/search-index";
import type { SearchParams, SearchResultItem, SavedSearch } from "@/lib/types";
import { useCompareStore } from "@/store/compare-store";
import { useSearchStore } from "@/store/search-store";
import { useDebounce } from "@/hooks/use-debounce";

function toSearchItems() {
  return [] as SearchResultItem[];
}

function filtersToSearchParams(filters: Record<string, string>): SearchParams {
  return {
    agency: filters.agency || undefined,
    committee: filters.committee || undefined,
    issuer: filters.issuer || undefined,
    topic: filters.topic || undefined,
    filingType: filters.filingType || undefined,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
  };
}

export default function SearchPage() {
  const query = useSearchStore((state) => state.query);
  const filters = useSearchStore((state) => state.filters);
  const savedSearches = useSearchStore((state) => state.savedSearches);
  const recentItemIds = useSearchStore((state) => state.recentItemIds);
  const { setQuery, setFilters, resetFilters, saveSearch, removeSavedSearch, addRecentItem } = useSearchStore();
  const { selectedIds, addToCompare, removeFromCompare, clearCompare, setLeftId, setRightId } = useCompareStore();
  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }]);
  const [searchName, setSearchName] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const noticesQuery = useQuery({ queryKey: ["search", "notices", debouncedQuery, filters], queryFn: () => fetchFederalRegisterNotices(debouncedQuery), enabled: debouncedQuery.length > 0 || Object.values(filters).some(Boolean) });
  const billsQuery = useQuery({ queryKey: ["search", "bills", debouncedQuery, filters], queryFn: () => fetchCongressBills(debouncedQuery), enabled: debouncedQuery.length > 0 || Object.values(filters).some(Boolean) });
  const filingsQuery = useQuery({ queryKey: ["search", "filings", debouncedQuery, filters], queryFn: () => fetchSecFilings(debouncedQuery), enabled: debouncedQuery.length > 0 || Object.values(filters).some(Boolean) });

  const items = useMemo(() => {
    const noticeItems = Array.isArray(noticesQuery.data?.data) ? noticesQuery.data.data.map((item) => ({ id: item.documentNumber, source: "federal-register" as const, title: item.title, subtitle: item.agency, summary: item.abstract, date: item.publicationDate, url: item.url, tags: item.topics })) : [];
    const billItems = Array.isArray(billsQuery.data?.data) ? billsQuery.data.data.map((item) => ({ id: item.billId, source: "congress" as const, title: item.title, subtitle: item.chamber, summary: item.summary, date: item.introducedDate, url: item.url, tags: item.committees })) : [];
    const filingItems = Array.isArray(filingsQuery.data?.data) ? filingsQuery.data.data.map((item) => ({ id: item.accessionNumber, source: "sec" as const, title: item.companyName, subtitle: item.formType, summary: item.description, date: item.filingDate, url: item.url, tags: [...item.riskFlags, item.industry] })) : [];
    return [...noticeItems, ...billItems, ...filingItems];
  }, [noticesQuery.data?.data, billsQuery.data?.data, filingsQuery.data?.data]);

  const filteredItems = useMemo(() => searchIndex(items, debouncedQuery), [items, debouncedQuery]);

  const handleSaveSearch = useCallback(() => {
    if (!searchName.trim()) return;
    const saved: SavedSearch = { id: crypto.randomUUID(), name: searchName.trim(), query, filters: filtersToSearchParams(filters), createdAt: formatDate(new Date().toISOString()) };
    saveSearch(saved);
    setSearchName("");
  }, [filters, query, saveSearch, searchName]);

  const handleToggleSelect = useCallback((item: SearchResultItem) => {
    if (selectedIds.includes(item.id)) {
      removeFromCompare(item.id);
    } else {
      addToCompare(item.id);
      addRecentItem(item.id);
    }
  }, [addRecentItem, addToCompare, removeFromCompare, selectedIds]);

  const handleCompare = useCallback(() => {
    if (selectedIds.length < 2) return;
    setLeftId(selectedIds[0]);
    setRightId(selectedIds[1]);
  }, [selectedIds, setLeftId, setRightId]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Search</p>
          <h1 className="mt-2 text-3xl text-text-primary">Explore federal signals</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">Search Federal Register notices, congressional bills, and SEC filings from one interface.</p>
        </div>

        <Card>
          <div className="space-y-4">
            <input className="h-12 w-full border border-border-default bg-surface-2 px-4 text-sm text-text-primary outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search agencies, committees, issuers, topics, or filings" />
            <SearchFilters filters={filters} onChange={setFilters} onReset={resetFilters} />
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2">
                <input className="h-10 border border-border-default bg-surface-2 px-3 text-sm text-text-primary outline-none" value={searchName} onChange={(event) => setSearchName(event.target.value)} placeholder="Save search as..." />
                <button type="button" onClick={handleSaveSearch} className="h-10 rounded bg-accent-primary px-4 text-xs font-semibold uppercase tracking-[0.05em] text-black">Save</button>
              </div>
              <button type="button" onClick={clearCompare} className="text-xs uppercase tracking-[0.05em] text-text-muted hover:text-text-secondary">Clear compare</button>
            </div>
          </div>
        </Card>

        <SavedSearches searches={savedSearches} onApply={(search) => { setQuery(search.query); setFilters(search.filters); }} onRemove={removeSavedSearch} />

        {noticesQuery.isLoading || billsQuery.isLoading || filingsQuery.isLoading ? <LoadingState /> : noticesQuery.error || billsQuery.error || filingsQuery.error ? <ErrorState message={(noticesQuery.error ?? billsQuery.error ?? filingsQuery.error)?.message ?? "Search failed"} onRetry={() => { noticesQuery.refetch(); billsQuery.refetch(); filingsQuery.refetch(); }} /> : filteredItems.length === 0 ? <EmptyState title="No results" description="Try a broader query or different filters." /> : <SearchResults items={filteredItems} sorting={sorting} onSortingChange={setSorting} selectedIds={selectedIds} onToggleSelect={handleToggleSelect} onCompare={handleCompare} />}

        {recentItemIds.length > 0 && (
          <Card>
            <div className="space-y-3">
              <h2 className="text-lg text-text-primary">Recently viewed</h2>
              <p className="text-sm text-text-secondary">{recentItemIds.length} items tracked in your local session.</p>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
