import { Suspense } from 'react';
import { ProductsTable } from './_components/table/ProductTable';

export const metadata = {
  title: 'Beranda',
};

export default async function Home() {
  return (
    <Suspense fallback={null}>
      <ProductsTable />
    </Suspense>
  );
}
