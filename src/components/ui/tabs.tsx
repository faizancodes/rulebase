import { cn } from "@/lib/utils";

interface TabsProps {
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ className, children }: TabsProps) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
