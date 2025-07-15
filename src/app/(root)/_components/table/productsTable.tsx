'use client';
import { DataTable } from '@/components/custom/table/data-table';
import { Title } from '@/components/custom/title';
import { useProductsQuery } from '@/hooks/api/products';
import { columns } from './columns';

export function ProductsTable() {
  const { data, isLoading, isPending, isError } = useProductsQuery();

  return (
    <section id="products" className="py-20">
      <Title title="Daftar Barang" description="Daftar barang yang sudah terdaftar" />
      <DataTable columns={columns} data={data || []} loading={isLoading || isPending} error={isError} />
    </section>
  );
}
