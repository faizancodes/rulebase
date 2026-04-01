"use client";

import { useMemo } from "react";

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type OnChangeFn, type SortingState } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Table } from "@/components/ui/table";
import { formatDate } from "@/lib/formatters";
import type { SearchResultItem } from "@/lib/types";

interface SearchResultsProps {
  items: SearchResultItem[];
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  selectedIds: string[];
  onToggleSelect: (item: SearchResultItem) => void;
  onCompare: () => void;
}

const columns: ColumnDef<SearchResultItem>[] = [
  { accessorKey: "title", header: "Result", cell: ({ row }) => <div><p className="text-sm text-text-primary">{row.original.title}</p><p className="text-xs text-text-muted">{row.original.subtitle}</p></div> },
  { accessorKey: "source", header: "Source", cell: ({ row }) => <Badge>{row.original.source}</Badge> },
  { accessorKey: "date", header: "Date", cell: ({ row }) => formatDate(row.original.date) },
];

export function SearchResults({ items, sorting, onSortingChange, selectedIds, onToggleSelect, onCompare }: SearchResultsProps) {
  const table = useReactTable({
    data: items,
    columns,
    state: { sorting },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const selectedCount = useMemo(() => selectedIds.length, [selectedIds]);

  if (items.length === 0) {
    return <EmptyState title="No results" description="Try broadening your query or adjusting filters." />;
  }

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg text-text-primary">Results</h2>
          <button type="button" onClick={onCompare} disabled={selectedCount < 2} className="text-xs uppercase tracking-[0.05em] text-accent-primary disabled:text-text-muted">Compare selected</button>
        </div>
        <Table>
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border-subtle text-xs uppercase tracking-[0.05em] text-text-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="px-4 py-3">Select</th>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3">{flexRender(header.column.columnDef.header, header.getContext())}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-border-subtle last:border-0">
                  <td className="px-4 py-3"><input type="checkbox" checked={selectedIds.includes(row.original.id)} onChange={() => onToggleSelect(row.original)} /></td>
                  {row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-3 align-top">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </div>
    </Card>
  );
}
