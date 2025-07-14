'use client';
import { DataTable } from '@/components/custom/dataTable';
import { Title } from '@/components/custom/title';
import { useGetSheets } from '@/service/api/sheets';
import { columns } from './columns';
import { ToolBar } from './toolBar';

export function SheetsTable() {
  const { data } = useGetSheets();

  return (
    <section className="py-20">
      <Title title="Daftar Barang" description="Daftar barang yang sudah terdaftar" />
      <DataTable data={data} columns={columns}>
        <ToolBar />
      </DataTable>
    </section>
  );
}
