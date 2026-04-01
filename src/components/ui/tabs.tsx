import type { ReactNode } from "react";

interface TabsProps {
  children: ReactNode;
}

export function Tabs({ children }: TabsProps) {
  return <div className="border-b border-border-default">{children}</div>;
}