import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Nama produk wajib diisi.' }).max(100, { message: 'Nama produk maksimal 100 karakter.' }),

  price: z.coerce
    .number()
    .min(500, { message: 'Harga minimal adalah 500.' })
    .max(9_999_999, { message: 'Harga maksimal adalah 9.999.999.' }),

  category: z.string().optional(),

  description: z.string().max(2000, { message: 'Deskripsi maksimal 2000 karakter.' }).optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
