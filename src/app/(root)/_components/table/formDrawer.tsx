import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { sheetsSchema, SheetsSchema } from '@/data/schema/sheets';
import { useAppendSheet } from '@/service/api/sheets';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export function FormDrawer() {
  return (
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

          <DrawerFooter>
            <FormAddItem />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const FormAddItem = () => {
  const { mutate } = useAppendSheet();
  const form = useForm<SheetsSchema>({
    resolver: zodResolver(sheetsSchema),
    mode: 'onChange',
    defaultValues: {
      Name: '',
      Price: '',
      Category: '',
      Description: '',
    },
  });

  const onSubmit = useCallback((data: SheetsSchema) => mutate(data), [mutate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Barang</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Nama Barang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Barang</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Masukkan Harga Barang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Category"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Kategori Barang</FormLabel>
                <p className="text-xs text-muted-foreground">(Opsional)</p>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori Barang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Makanan">Makanan</SelectItem>
                  <SelectItem value="Minuman">Minuman</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Deskripsi Barang</FormLabel>
                <p className="text-xs text-muted-foreground">(Opsional)</p>
              </div>
              <FormControl>
                <Textarea placeholder="Masukan Deskripsi Barang atau catatan barang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
