import { ProductsTable } from './_components/table/ProductsTable';

export const metadata = {
  title: 'Beranda',
};

export default async function Home() {
  return <ProductsTable />;
}
