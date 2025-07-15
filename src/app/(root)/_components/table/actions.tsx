import { ButtonAction } from '@/components/custom/table/types';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { DownloadIcon, PlusIcon } from 'lucide-react';

export const bulkActions: ButtonAction[] = [
  {
    type: 'button',
    variant: 'outline',
    icon: <DownloadIcon />,
    onClick: () => console.log('click'),
  },
  {
    type: 'component',
    component: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <PlusIcon />
            <span className="sr-only">Add</span>
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto space-y-4 w-full max-w-md h-dvh">
            <DrawerHeader>
              <DrawerTitle>Menambah Data Baru</DrawerTitle>
              <DrawerDescription>Isi form dibawah ini untuk menambahkan data baru</DrawerDescription>
            </DrawerHeader>

            <Separator />

            <DrawerFooter>{/* <FormAddItem /> */}</DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    ),
  },
];
