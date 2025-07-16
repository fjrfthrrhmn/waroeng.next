import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CATEGORY_PRODUCT } from '@/data/constants/product';
import { ProductSchema, productSchema } from '@/data/schema/product';
import { useProductMutation, useUpdateProduct } from '@/hooks/api/products';
import { formatPrice, parsePrice } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export function FormAddProduct() {
  const form = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      price: 1000,
      category: 'Lainnya',
      description: '',
    },
  });

  // Handle
  const { mutate: addProduct, isPending } = useProductMutation({ onSuccess: () => form.reset() });
  const onSubmit = useCallback(
    (data: ProductSchema) => {
      if (isPending) return;
      addProduct(data);
    },
    [addProduct, isPending]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Indomie Ayam Bawang"
                    {...field}
                    onChange={e => field.onChange(e.target.value.toLowerCase())}
                  />
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
                  <Input
                    type="number"
                    placeholder="Contoh: 3500"
                    {...field}
                    value={formatPrice(field.value as number)}
                    onChange={e => field.onChange(parsePrice(e.target.value))}
                  />
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

        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending ? 'Menyimpan...' : 'Simpan Produk'}
        </Button>
      </form>
    </Form>
  );
}

export function FormUpdateProduct({ initialData, id }: { initialData: ProductSchema; id: string }) {
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const form = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialData.name,
      price: initialData.price,
      category: initialData.category,
      description: initialData.description,
    },
  });

  // Handle
  const onSubmit = useCallback(
    (data: ProductSchema) => {
      if (isPending) return;
      updateProduct({ data, id });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateProduct, isPending]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Indomie Ayam Bawang"
                    {...field}
                    onChange={e => field.onChange(e.target.value.toLowerCase())}
                  />
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
                  <Input
                    type="number"
                    placeholder="Contoh: 3500"
                    {...field}
                    value={formatPrice(field.value as number)}
                    onChange={e => field.onChange(parsePrice(e.target.value))}
                  />
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

        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending ? 'Menyimpan...' : 'Simpan Produk'}
        </Button>
      </form>
    </Form>
  );
}
