declare module "elasticlunr" {
  interface SearchResult {
    ref: string;
    score?: number;
  }

  interface SearchOptions {
    expand?: boolean;
  }

  interface Index<T> {
    setRef(field: keyof T & string): void;
    addField(field: keyof T & string): void;
    addDoc(doc: T): void;
    search(query: string, options?: SearchOptions): SearchResult[];
  }

  interface Builder<T> extends Index<T> {}

  interface Elasticlunr {
    <T>(builder: (this: Builder<T>) => void): Index<T>;
  }

  const elasticlunr: Elasticlunr;
  export default elasticlunr;
}
