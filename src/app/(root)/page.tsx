import { Hero } from './_components/hero';

export const metadata = {
  title: 'Beranda',
};

export default async function Home() {
  return (
    <main className="container mx-auto">
      <Hero />
    </main>
  );
}
