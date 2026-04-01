import elasticlunr from "elasticlunr";

import type { SearchResultItem } from "@/lib/types";

export function createSearchIndex(items: SearchResultItem[]) {
  const index = elasticlunr<SearchResultItem>(function (this) {
    this.setRef("id");
    this.addField("title");
    this.addField("subtitle");
    this.addField("summary");
    this.addField("tags");
  });

  items.forEach((item) => index.addDoc(item));
  return index;
}

export function searchIndex(items: SearchResultItem[], query: string): SearchResultItem[] {
  const normalized = query.trim();
  if (!normalized) return items;

  const index = createSearchIndex(items);
  const results = index.search(normalized, { expand: true });
  const byId = new Map(items.map((item) => [item.id, item]));
  return results.map((result) => byId.get(result.ref)).filter((item): item is SearchResultItem => Boolean(item));
}
