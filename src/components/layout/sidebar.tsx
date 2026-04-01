import Link from "next/link";

import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/search", label: "Search" },
  { href: "/compare", label: "Compare" },
  { href: "/timeline", label: "Timeline" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-border-default bg-surface-1 p-6 lg:block">
      <div className="space-y-6">
        <div>
          <Badge>Rulebase</Badge>
          <p className="mt-3 text-sm text-text-secondary">Federal regulatory intelligence for compliance teams.</p>
        </div>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="block border border-transparent px-3 py-2 text-sm text-text-secondary hover:border-border-hover hover:bg-surface-2 hover:text-text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}