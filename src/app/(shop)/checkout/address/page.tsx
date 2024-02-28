import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import "./address.css";
import { auth } from "@/auth.config";
import { getUserAddress } from "@/actions";

export default async function AdressPage() {
  const session = await auth();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userAddres = (await getUserAddress(session.user.id)) ?? undefined;
  console.log(userAddres);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm />
      </div>
    </div>
  );
}
