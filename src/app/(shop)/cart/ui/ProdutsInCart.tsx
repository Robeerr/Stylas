"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import Link from "next/link";

export const ProdutsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeProduct = useCartStore((state) => state.removeProduct);

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
          <ProductImage
            src={product.image}
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
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              Talla: {product.size}
              <p>{product.title}</p>
            </Link>
            <p>{product.price}€</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />

            <button
              className="underline mt-3 text-red-500"
              onClick={() => removeProduct(product)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
