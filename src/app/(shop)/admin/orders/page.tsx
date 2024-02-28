export const revalidate = 0;

import { getPaginatedOrders } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function AdminOrdersPage() {
  const { ok, orders = [] } = await getPaginatedOrders();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Todos los pedidos" />

      <div className="mb-10 flex flex-col space-y-4 p-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div className="text-sm font-medium text-gray-900">
              #ID: {order.id.split("-").at(-1)}
            </div>
            <div className="text-sm text-gray-900 font-light">
              {order.User?.name}
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
              <Link href={`/orders/${order.id}`} className="hover:underline">
                Ver pedido
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
