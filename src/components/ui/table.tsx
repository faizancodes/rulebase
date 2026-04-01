import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return <div className={cn("w-full overflow-hidden rounded border border-border-default", className)}>{children}</div>;
}

export function TableHeader({ children }: TableProps) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className }: TableProps) {
  return <tr className={className}>{children}</tr>;
}

export function TableHead({ children, className }: TableProps) {
  return <th className={className}>{children}</th>;
}

export function TableCell({ children, className }: TableProps) {
  return <td className={className}>{children}</td>;
}
