"use client";

import { useCallback, type ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatDateRange } from "@/lib/formatters";
import type { SearchParams } from "@/lib/types";

interface SearchFiltersProps {
  filters: SearchParams;
  onChange: (filters: Partial<SearchParams>) => void;
  onReset: () => void;
}

export function SearchFilters({ filters, onChange, onReset }: SearchFiltersProps) {
  const handleChange = useCallback((key: keyof SearchParams) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ [key]: event.target.value });
  }, [onChange]);

  return (
    <div className="grid gap-4 rounded border border-border-default bg-surface-2 p-4 md:grid-cols-2 xl:grid-cols-4">
      <Input placeholder="Search terms" value={filters.q ?? ""} onChange={handleChange("q")} />
      <Input placeholder="Agency" value={filters.agency ?? ""} onChange={handleChange("agency")} />
      <Input placeholder="Committee" value={filters.committee ?? ""} onChange={handleChange("committee")} />
      <Input placeholder="Issuer" value={filters.issuer ?? ""} onChange={handleChange("issuer")} />
      <Input placeholder="Topic" value={filters.topic ?? ""} onChange={handleChange("topic")} />
      <Select value={filters.filingType ?? ""} onChange={handleChange("filingType")}>
        <option value="">All filing types</option>
        <option value="10-K">10-K</option>
        <option value="10-Q">10-Q</option>
        <option value="8-K">8-K</option>
        <option value="S-1">S-1</option>
      </Select>
      <Input type="date" value={filters.dateFrom ?? ""} onChange={handleChange("dateFrom")} />
      <Input type="date" value={filters.dateTo ?? ""} onChange={handleChange("dateTo")} />
      <div className="flex items-center justify-between gap-3 md:col-span-2 xl:col-span-4">
        <p className="text-xs text-text-muted">{formatDateRange(filters.dateFrom, filters.dateTo)}</p>
        <button type="button" onClick={onReset} className="text-xs uppercase tracking-[0.05em] text-accent-primary hover:text-accent-hover">Reset filters</button>
      </div>
    </div>
  );
}
