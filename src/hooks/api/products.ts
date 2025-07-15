import { ProductSchema } from '@/data/schema/product';
import { db } from '@/service/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';
import { Product } from './types';

/**
 * * GET all products from Firestore
 * @returns {Promise<Product[]>}
 */
export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];

      console.log(data);

      return data.sort((a, b) => a.name.localeCompare(b.name));
    },
  });
}

/**
 * * Add a new product to Firestore
 * @returns {useMutation}
 */
export function useProductMutation(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductSchema) => await addDoc(collection(db, 'products'), data),
    onSuccess: data => {
      console.log(data);
      options?.onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ['products'] });

      toast.success('Barang berhasil ditambahkan');
    },
    onError: error => {
      console.log(error);
      toast.error('Barang gagal ditambahkan');
    },
  });
}

/**
 * * Delete a product from Firestore
 * @returns {useMutation}
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteDoc(doc(db, 'products', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Barang berhasil dihapus');
    },
    onError: error => {
      console.log(error);
      toast.error('Barang gagal dihapus');
    },
  });
}
