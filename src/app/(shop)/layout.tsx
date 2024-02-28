import { Footer, Sidebar, Topmenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <Topmenu />
      <Sidebar />
      <div className="flex-grow px-0 sm:px.10">{children}</div>
      <Footer />
    </main>
  );
}
