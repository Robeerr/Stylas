"use client";
import React, { useEffect, useState } from "react";
import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const direccion = useAddressStore((state) => state.direccion);

  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    // await sleep(2);

    const productsToOrder = cart.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, direccion);
    if (!resp.ok) {
      Swal.fire({
        title: "Lo sentimos",
        text: resp.message,
        icon: "error",
        timer: 2500,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Seguir comprando",
        timerProgressBar: true,
      });
      setIsPlacingOrder(false);
      return;
    } else {
      Swal.fire({
        icon: "info",
        title: "Redirigiendo...",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      clearCart();
      router.replace("/orders/" + resp.order);
    }
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-bold">Dirección de envío</h2>
      <div className="grid grid-cols-2 gap-3 mb-5 mt-5">
        <span>Nombre:</span>
        <span className="text-right">{direccion.nombre}</span>

        <span>Apellidos:</span>
        <span className="text-right">{direccion.apellidos}</span>

        <span>Dirección:</span>
        <span className="text-right">{direccion.direccion}</span>

        <span>Pais:</span>
        <span className="text-right">{direccion.pais}</span>

        <span>Código postal:</span>
        <span className="text-right">{direccion.codigoPostal}</span>

        <span>Ciudad:</span>
        <span className="text-right">{direccion.ciudad}</span>

        <span>Telefono:</span>
        <span className="text-right">{direccion.telefono}</span>
      </div>

      {/* divider */}
      <hr className="my-5" />

      <h2 className="text-2xl mb-2 font-bold">Resumen del pedido</h2>

      <div className="grid grid-cols-2">
        <span>Nº Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="text-xs mb-5">
          Al hacer clic en "Pagar", aceptas nuestras{" "}
          <a href="#" className="underline hover:text-blue-500">
            condiciones de uso
          </a>{" "}
          y nuestra{" "}
          <a href="#" className="underline hover:text-blue-500">
            política de privacidad
          </a>
          .
        </p>

        <button
          onClick={handlePlaceOrder}
          className={clsx("w-full bg-blue-500 text-white py-3 rounded-md", {
            "btn-primary": !isPlacingOrder && cart.length > 0,
            "btn-disabled": isPlacingOrder || cart.length === 0,
          })}
          disabled={isPlacingOrder || cart.length === 0}
        >
          {isPlacingOrder ? "Procesando..." : "Pagar"}
        </button>
      </div>
    </div>
  );
};
