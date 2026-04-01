"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useUiStore } from "@/store/ui-store";

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-border-default bg-surface-1 px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Rulebase</p>
        <h1 className="text-lg text-text-primary">Regulatory intelligence workspace</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/search" className="text-sm text-text-secondary hover:text-text-primary">
          Search
        </Link>
        <Button>New alert</Button>
      </div>
    </header>
  );
}