import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteProduct } from '@/hooks/api/products';
import { Product } from '@/hooks/api/types';
import { EditIcon, Trash2Icon } from 'lucide-react';

interface ProductActionsProps {
  data: Product;
}

export function ProductActions({ data }: ProductActionsProps) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={() => console.log('Edit:', data)}>
        <EditIcon className="w-4 h-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin menghapus <b>{data.name}</b>? Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={() => deleteProduct(data.id)}>
              {isPending ? 'Menghapus...' : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
