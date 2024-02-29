export const revalidate = 0;

import { getOrderByUser } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrderByUser();
  console.log(ok, orders);

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Pedidos" />

      <div className="mb-10">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className=" overflow-hidden sm:rounded-lg p-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="px-6 py-5 bg-white border-b flex flex-col md:flex-row justify-between items-center hover:bg-gray-100"
              >
                <div className="text-sm font-medium text-gray-900">
                  #ID: {order.id.split("-").at(-1)}
                </div>

                <div className="flex items-center text-sm text-gray-900 font-light">
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-900 font-light">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver pedido
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
