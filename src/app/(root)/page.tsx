import { ProductsTable } from './_components/table/productsTable';

export const metadata = {
  title: 'Beranda',
};

export default async function Home() {
  return <ProductsTable />;
}
