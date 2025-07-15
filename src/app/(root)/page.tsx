import { ProductsTable } from './_components/table/ProductTable';

export const metadata = {
  title: 'Beranda',
};

export default async function Home() {
  return <ProductsTable />;
}
