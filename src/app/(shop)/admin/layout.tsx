import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
