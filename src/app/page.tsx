import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/formatters";

const STATS = [
  { label: "Federal notices tracked", value: 12840 },
  { label: "Congress bills linked", value: 2140 },
  { label: "SEC filings monitored", value: 9821 },
  { label: "Cross-source matches", value: 4632 },
];

const LINKS = [
  { href: "/dashboard", label: "Dashboard", description: "Monitor rulemaking velocity and impact." },
  { href: "/search", label: "Search", description: "Query agencies, issuers, committees, and keywords." },
  { href: "/compare", label: "Compare", description: "Review source diffs across regulatory signals." },
  { href: "/timeline", label: "Timeline", description: "See how policy, legislation, and filings align." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-3xl space-y-8">
            <Badge>Federal regulatory intelligence</Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-light tracking-tight text-text-primary md:text-7xl">
                Rulebase turns federal signals into compliance intelligence.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
                Track Federal Register notices, Congress.gov activity, and SEC filings in one analyst-grade workspace built for policy teams, in-house counsel, and compliance researchers.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard">Explore dashboard</Link>
              </Button>
              <Link href="/search" className="inline-flex items-center justify-center rounded-md border border-border-default bg-surface-2 px-4 py-2 text-sm font-bold text-text-primary transition-colors hover:border-border-hover hover:bg-surface-3">
                Search sources
              </Link>
            </div>
          </div>

          <Card className="border-border-default bg-surface-1 p-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Platform focus</p>
                <p className="mt-2 text-2xl font-light text-text-primary">Operational monitoring for regulatory change.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {STATS.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="border border-border-default bg-surface-2 p-4">
                    <p className="text-xs uppercase tracking-[0.05em] text-text-muted">{stat.label}</p>
                    <p className="mt-2 text-2xl font-light text-text-primary">{formatNumber(stat.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="border border-border-default bg-surface-2 p-6 transition-colors hover:border-border-hover hover:bg-surface-3">
              <p className="text-sm uppercase tracking-[0.05em] text-text-muted">{link.label}</p>
              <p className="mt-2 text-lg text-text-primary">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}