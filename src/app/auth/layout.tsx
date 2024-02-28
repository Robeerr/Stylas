import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
}
