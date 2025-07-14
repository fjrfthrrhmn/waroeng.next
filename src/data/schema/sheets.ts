import { z } from 'zod';

export const sheetsSchema = z.object({
  Name: z.string().min(1, { message: 'Nama barang wajib diisi' }).max(100, { message: 'Nama barang maksimal 100 karakter' }),
  Price: z.string().min(1, { message: 'Harga barang wajib diisi' }).max(9999999, { message: 'Harga barang maksimal 9999999' }),
  Category: z.string().optional(),
  Description: z.string().max(2000, { message: 'Deskripsi barang maksimal 2000 karakter' }).optional(),
  // Kiloan: z.boolean().default(false),
});

export type SheetsSchema = z.infer<typeof sheetsSchema>;
