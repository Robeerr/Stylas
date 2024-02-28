import { getOrderByID } from "@/actions";
import { Title } from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderByID(id);
  if (!ok) {
    redirect("/");
  }

  const direccion = order?.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Pedido #${id}`} subtitle="Revisa tu pedido" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} className="mr-2 ml-2" />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">
                {order?.isPaid ? "Pagada" : "Pendiente de pagar"}
              </span>
            </div>

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div key={item.product.slug} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "150px",
                    height: "150px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de envío</h2>
            <div className="grid grid-cols-2 gap-3 mb-5 mt-5">
              <span>Nombre:</span>
              <span className="text-right">{direccion!.nombre}</span>

              <span>Apellidos:</span>
              <span className="text-right">{direccion!.apellidos}</span>

              <span>Dirección:</span>
              <span className="text-right">{direccion!.direccion}</span>

              <span>Pais:</span>
              <span className="text-right">{direccion!.pais}</span>

              <span>Código postal:</span>
              <span className="text-right">{direccion!.codigoPostal}</span>

              <span>Ciudad:</span>
              <span className="text-right">{direccion!.ciudad}</span>

              <span>Telefono:</span>
              <span className="text-right">{direccion!.telefono}</span>
            </div>

            {/* divider */}
            <hr className="my-5" />

            <h2 className="text-2xl mb-2 font-bold">Resumen del pedido</h2>

            <div className="grid grid-cols-2 mt-5">
              <span>Nº Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subtotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order!.isPaid,
                    "bg-green-700": order!.isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} className="mr-2 ml-2" />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">
                  {order?.isPaid ? "Pagada" : "Pendiente de pagar"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
