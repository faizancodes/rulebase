import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] bg-[#1a1a1a] text-text-secondary", className)}>
      {children}
    </span>
  );
}