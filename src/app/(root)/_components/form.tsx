import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CATEGORY_PRODUCT } from '@/data/constants/product';
import { productSchema } from '@/data/schema/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function FormAddProduct() {
  const form = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: { name: '', price: 0, category: '', description: '' },
  });

  return (
    <Form {...form}>
      <form>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Indomie Ayam Bawang" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Contoh: 3500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Kategori</FormLabel>
                  <span className="text-xs text-muted-foreground">(boleh diisi / tidak)</span>
                </div>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori produk" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_PRODUCT.map((category, index) => (
                        <SelectItem value={category.value} key={index}>
                          {category.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Deskripsi</FormLabel>
                  <span className="text-xs text-muted-foreground">(boleh diisi / tidak)</span>
                </div>
                <FormControl>
                  <Textarea placeholder="Contoh: ..." {...field} />
                </FormControl>
                <FormDescription>Catatan untuk produk ini</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6">
          {form.formState.isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
        </Button>
      </form>
    </Form>
  );
}
