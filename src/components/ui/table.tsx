import type { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export function Table({ children }: TableProps) {
  return <div className="overflow-hidden border border-border-default">{children}</div>;
}