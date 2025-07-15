import { ProductActions } from '@/app/(root)/_components/table/ProductActions';

import { CATEGORY_PRODUCT } from '@/data/constants/product';
import { Product } from '@/hooks/api/types';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

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
    cell: ({ row }) => <ProductActions data={row.original} />,
  },
];
