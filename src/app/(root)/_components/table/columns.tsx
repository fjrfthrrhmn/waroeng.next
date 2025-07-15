import { Button } from '@/components/ui/button';
import { CATEGORY_PRODUCT } from '@/data/constants/product';
import { Product } from '@/hooks/api/types';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, Trash2Icon } from 'lucide-react';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'index',
    header: 'ID',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Nama Produk',
  },
  {
    accessorKey: 'price',
    header: 'Harga',
    cell: ({ row }) => `Rp ${row.original.price.toLocaleString('id-ID')}`,
  },
  {
    accessorKey: 'category',
    header: 'Kategori',
    cell: ({ row }) => {
      const category = row.original.category;
      const colorCategory = CATEGORY_PRODUCT.find(item => item.value === category)?.color;

      return <div className={cn('px-2 py-1 rounded-md w-max text-sm', colorCategory)}>{category}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
    cell: ({ row }) => row.original.description || '-',
  },
  {
    id: 'actions',
    header: 'Aksi',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => console.log('Edit:', product)}>
            <EditIcon className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => console.log('Delete:', product.id)}>
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
