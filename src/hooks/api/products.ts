import { db } from '@/service/config';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from './types';

/**
 * * GET all products from Firestore db
 * @returns {Promise<Product[]>}
 */
export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map(doc => doc.data()) as Product[];

      return data.sort((a, b) => a.name.localeCompare(b.name));
    },
  });
}
