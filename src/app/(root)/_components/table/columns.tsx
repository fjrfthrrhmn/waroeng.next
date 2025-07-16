import { DataTableCellAction } from '@/components/custom/table/data-table-cell-action';
import { CATEGORY_PRODUCT } from '@/data/constants/product';
import { useDeleteProduct } from '@/hooks/api/products';
import { Product } from '@/hooks/api/types';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { FormUpdateProduct } from '../Form';

export const useColumnsProduct = (): ColumnDef<Product>[] => {
  const { mutate: deleteProduct } = useDeleteProduct();

  return [
    {
      id: 'index',
      header: 'ID',
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Nama Produk',
      cell: ({ row }) => <span className="capitalize">{row.original.name || '-'}</span>,
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
      cell: ({ row }) => (
        <DataTableCellAction
          titleAlertUpdate="Perbarui Produk?"
          titleAlertDelete="Hapus Produk?"
          onDelete={() => deleteProduct(row.original.id)}
          formUpdate={<FormUpdateProduct initialData={row.original} id={row.original.id} />}
          data={row.original}
        />
      ),
    },
  ];
};
