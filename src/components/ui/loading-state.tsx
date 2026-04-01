import { Card } from "@/components/ui/card";

export function LoadingState() {
  return (
    <Card>
      <div className="space-y-3 animate-pulse">
        <div className="h-8 w-48 bg-[#1a1a1a]" />
        <div className="h-4 w-full bg-[#1a1a1a]" />
        <div className="h-4 w-5/6 bg-[#1a1a1a]" />
        <div className="h-4 w-3/4 bg-[#1a1a1a]" />
      </div>
    </Card>
  );
}