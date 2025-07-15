import { Hero } from './_components/Hero';
import { Summary } from './_components/Summary';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full sm:container px-2">
      <Hero />
      <Summary />

      {children}

      <div className="text-muted-foreground border-t text-center text-xs font-medium my-12 py-8 ">
        <p className="order-2 lg:order-1">&copy; {new Date().getFullYear()} Waroeng. All rights reserved.</p>
      </div>
    </main>
  );
}
