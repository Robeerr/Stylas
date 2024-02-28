import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-screen w-full text-center px-4">
      <div className="flex flex-col items-center">
        <IoCartOutline size={60} className="mb-5" />
        <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
        <p className=" text-xl font-light mt-3">
          Añade productos a tu carrito para verlos aquí
        </p>
        <Link href="/">
          <span className="mt-3 text-blue-500 hover:underline text-base">
            Ir a la tienda
          </span>
        </Link>
      </div>
    </div>
  );
}
