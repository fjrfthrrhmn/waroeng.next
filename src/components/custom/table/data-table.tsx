'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemo } from 'react';
import { DataTableSearchbar } from './data-table-searchbar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  status: { loading: boolean; error: boolean };
  withSearch?: boolean;
  renderActions?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  status: { loading, error },
  renderActions,
  withSearch = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const actionsComponents = useMemo(() => renderActions, [renderActions]);

  return (
    <main className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        {withSearch && <DataTableSearchbar />}

        {actionsComponents && <div className="flex items-center gap-2">{actionsComponents}</div>}
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
                <TableCell colSpan={columns.length} className="h-24 py-14 text-center">
                  {loading ? 'Tunggu sebentar' : error ? 'Ups, terjadi kesalahan' : 'Tidak ada data ditemukan'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
