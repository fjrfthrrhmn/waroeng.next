import { Footer } from '@/components/layouts/Footer';
import { Hero } from './_components/Hero';
import { Summary } from './_components/Summary';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full sm:container px-2">
      <Hero />
      <Summary />
      {children}
      <Footer />
    </main>
  );
}
