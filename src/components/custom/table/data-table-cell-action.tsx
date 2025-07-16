import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { EditIcon, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';

interface DataTableCellAction {
  data: any;
  titleAlertDelete: string;
  titleAlertUpdate: string;
  onDelete: () => void;
  formUpdate: React.ReactNode;
}

export function DataTableCellAction({ onDelete, titleAlertDelete, titleAlertUpdate, formUpdate }: DataTableCellAction) {
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [openAlertUpdate, setOpenAlertUpdate] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setOpenAlertUpdate(!openAlertUpdate)}>
          <EditIcon className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => setOpenAlertDelete(!openAlertDelete)}>
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </div>

      {/* Alert for confirm delete */}
      <AlertDialog onOpenChange={() => setOpenAlertDelete(!openAlertDelete)} open={openAlertDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{titleAlertDelete}</AlertDialogTitle>
            <AlertDialogDescription>Apakah kamu yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog onOpenChange={() => setOpenAlertUpdate(!openAlertUpdate)} open={openAlertUpdate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{titleAlertUpdate}</AlertDialogTitle>
            <AlertDialogDescription>Silahkan isi form perbaruan barang sesuai dengan benar.</AlertDialogDescription>
          </AlertDialogHeader>

          <div>{formUpdate}</div>

          <AlertDialogFooter>
            <AlertDialogCancel className='w-full'>Batal</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
