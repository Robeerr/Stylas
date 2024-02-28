import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { PerfilPage } from "./ui/PerfilPage";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect("/auth/login?returnTo=/perfil");
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" />
      <PerfilPage />
    </div>
  );
}
