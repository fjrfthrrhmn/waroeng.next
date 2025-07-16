import { ProductSchema } from "@/data/schema/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/service/api/products";

export interface useGetProductsProps {
  filter: {
    name?: string | undefined;
    category?: string | undefined;
  };
}

/**
 * * hooks to get all products from FireStore
 * @param filter
 * @returns {[]}
 */
export function useProductsQuery({ filter }: useGetProductsProps) {
  const queryKey = ["products", filter];

  return useQuery({
    queryKey,
    queryFn: async () =>
      getProducts({ filter: { ...filter } }),
  });
}

/**
 * * Add a new product to FireStore
 * @returns {useMutation}
 */
export function useProductMutation(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductSchema) => addProduct(data),
    onSuccess: () => {
      options?.onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Barang berhasil ditambahkan");
    },
    onError: () => toast.error("Barang gagal ditambahkan"),
    onSettled(_, error, variables, context) {
      console.log(error, variables, context);
    },
  });
}

/**
 * * Delete a product from FireStore
 * @returns {useMutation}
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Barang berhasil dihapus");
    },
    onError: () => toast.error("Barang gagal dihapus"),
    onSettled(_, error, variables, context) {
      console.log(error, variables, context);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductSchema }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Barang berhasil diubah");
    },
    onError: () => toast.error("Barang gagal diubah"),
    onSettled(_, error, variables, context) {
      console.log(error, variables, context);
    },
  });
}
