import { About } from './_components/about';
import { Hero } from './_components/hero';
import { SheetsTable } from './_components/table/sheetsTable';

export const metadata = {
  title: 'Beranda',
};

export default async function Home() {
  return (
    <main className="container xl:max-w-5xl mx-auto">
      <Hero />
      <About />
      <SheetsTable />
    </main>
  );
}
