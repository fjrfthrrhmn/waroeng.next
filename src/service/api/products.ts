import { useGetProductsProps } from '@/hooks/api/products';
import { Product } from '@/hooks/api/types';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, QueryConstraint, updateDoc, where } from 'firebase/firestore';
import { db } from '../config';
import { toast } from 'sonner';
import { ProductSchema } from '@/data/schema/product';

const PATH = 'products';

/**
 * * Get all products from FireStore
 * @param filter
 * @returns
 */
export async function getProducts({ filter }: useGetProductsProps): Promise<Product[]> {
  const collectionRef = collection(db, PATH);
  const constraints: QueryConstraint[] = [];

  // Add filters if provided
  if (filter.name) {
    constraints.push(where('name', '>=', filter.name));
    constraints.push(where('name', '<=', filter.name + '\uf8ff'));
  }

  if (filter.category) {
    constraints.push(where('category', '==', filter.category));
  }

  let data;
  try {
    if (constraints.length > 0) {
      data = await getDocs(query(collectionRef, ...constraints, orderBy('name')));
    } else {
      data = await getDocs(query(collectionRef, orderBy('name')));
    }
  } catch (error) {
    toast.error('Gagal mendapatkan data');
    console.log(error);
    throw new Error('Failed to fetch products');
  }

  // Map Firestore docs to Product[]
  return data.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/**
 * * Add new data product to FireStore
 * @param data
 * @returns
 */
export async function addProduct(data: ProductSchema) {
  return await addDoc(collection(db, PATH), data);
}

/**
 * * Delete product by id from FireStore
 * @param id
 * @returns
 */
export async function deleteProduct(id: string) {
  return await deleteDoc(doc(db, PATH, id));
}

/**
 * * Update product by id from FireStore
 * @param id
 * @param data
 * @returns
 */
export async function updateProduct(id: string, data: ProductSchema) {
  return await updateDoc(doc(db, PATH, id), data);
}
