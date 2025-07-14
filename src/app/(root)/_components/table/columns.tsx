import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, Trash2Icon } from 'lucide-react';

interface Type {
  Name: string;
  Price: number;
  Kiloan: boolean;
  Category: string;
  Description: string;
}

export const columns: ColumnDef<Type>[] = [
  {
    id: 'ID',
    header: 'ID',
    cell: ({ row }) => row.index + 1,
  },
  {
    id: 'Name',
    accessorKey: 'Name',
    header: 'Nama Barang',
  },
  {
    id: 'Price',
    accessorKey: 'Price',
    header: 'Harga',
  },
  {
    id: 'Kiloan',
    accessorKey: 'Kiloan',
    header: 'Kiloan',
    cell: ({ row }) => row.original.Kiloan || '-',
  },
  {
    id: 'Category',
    accessorKey: 'Category',
    header: 'Kategori',
    cell: ({ row }) => row.original.Category || '-',
  },
  {
    id: 'Description',
    accessorKey: 'Description',
    header: 'Deskripsi',
    cell: ({ row }) => row.original.Description || '-',
  },
  {
    id: 'Actions',
    header: 'Aksi',
    accessorFn: row => console.log(row),
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <EditIcon />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2Icon />
          </Button>
        </div>
      );
    },
  },
];
