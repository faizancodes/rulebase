import { SourceDiffView } from "@/components/compare/source-diff-view";
import { fetchCompareItems } from "@/lib/api";

export default async function ComparePage() {
  const comparisonResponse = await fetchCompareItems();
  const comparison = comparisonResponse.data;

  return <SourceDiffView comparison={comparison} />;
}
