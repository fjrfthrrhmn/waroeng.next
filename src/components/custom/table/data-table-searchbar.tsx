"use client";
import { cn } from "@/lib/utils";
import { parseAsString, useQueryState } from "nuqs";
import { useDebounceCallback } from "usehooks-ts";

export function DataTableSearchbar() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const debouncedSetSearch = useDebounceCallback(setSearch, 700);

  return (
    <input
      type="text"
      defaultValue={search}
      onChange={(event) => debouncedSetSearch(event.target.value)}
      placeholder="Cari barang dengan spesifik"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      )}
    />
  );
}
