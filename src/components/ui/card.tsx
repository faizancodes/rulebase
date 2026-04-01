import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-none border border-border-default bg-surface-2 p-6", className)}>{children}</div>;
}