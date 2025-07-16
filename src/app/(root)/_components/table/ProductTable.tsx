"use client";
import { DataTable } from "@/components/custom/table/data-table";
import { Title } from "@/components/custom/title";
import { useProductsQuery } from "@/hooks/api/products";
import { productActions } from "./actions";
import { useColumnsProduct } from "./columns";
import { parseAsString, useQueryState } from "nuqs";

export function ProductsTable() {
  const [q] = useQueryState("q", parseAsString.withDefault(""));
  const { data, isLoading, isPending, isError } = useProductsQuery({
    filter: { name: q },
  });

  return (
    <section id="products" className="py-20">
      <Title title="Daftar Barang" description="Daftar barang yang sudah terdaftar" />
      <DataTable
        columns={useColumnsProduct()}
        data={data || []}
        status={{ loading: isLoading || isPending, error: isError }}
        renderActions={productActions.map(action => action.component())}
      />
    </section>
  );
}
