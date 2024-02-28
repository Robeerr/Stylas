"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const ProdutsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "150px",
              height: "150px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <span className="text-sm">
              Talla: {product.size}
              <p>{product.title}</p>
              <p>Cantidad: {product.quantity}</p>
            </span>
            <p>{currencyFormat(product.price)}/u</p>
            <p className="font-bold mt-2">
              Subtotal: {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
