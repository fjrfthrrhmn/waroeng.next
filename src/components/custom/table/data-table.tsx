'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FormAddProduct } from '@/pages/home/_components/Form';
import { FilterIcon, PlusIcon } from 'lucide-react';
import { DataTableControls } from './data-table-control';
import { DataTableFilter } from './data-table-filter';
import { DataTableSearchbar } from './data-table-searchbar';
import { DataTableSkeleton } from './data-table-skeleton';
import { DataTableSort } from './data-table-sort';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  error: boolean;
  withSearch?: boolean;
}

export function DataTable<TData, TValue>({ columns, data, loading, error, withSearch = true }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <DataTableSkeleton />;

  return (
    <main className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        {withSearch && <DataTableSearchbar />}

        <div className="flex items-center gap-2">
          <DataTableControls icon={<PlusIcon />} title="Tambah Data Baruc" description="Form untuk menambahkan data baru ke dalam tabel.">
            <FormAddProduct />
          </DataTableControls>

          <DataTableControls
            variant="default"
            icon={<FilterIcon />}
            title="Pengaturan Tampilan Tabel"
            description="Sesuaikan urutan, filter, dan kriteria data yang ditampilkan."
          >
            <DataTableSort />
            <DataTableFilter />
          </DataTableControls>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {error ? 'Ups, terjadi kesalahan' : 'Tidak ada data ditemukan'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
