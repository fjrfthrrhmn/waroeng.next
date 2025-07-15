import { Footer } from '@/components/layouts/footer';
import { Hero } from './_components/hero';
import { Summary } from './_components/summary';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container xl:max-w-5xl mx-auto">
        <Hero />
        <Summary />
        {children}
        <Footer />
      </main>
    </>
  );
}
