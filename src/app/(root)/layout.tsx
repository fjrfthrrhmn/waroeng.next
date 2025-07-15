export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="sm:container px-2 mx-auto">{children}</main>
    </>
  );
}
