import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return <div className={cn("overflow-hidden border border-border-default bg-surface-2", className)}>{children}</div>;
}
