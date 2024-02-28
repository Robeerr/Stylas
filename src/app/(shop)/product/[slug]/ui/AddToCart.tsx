"use client";
import { QuantitySelector, SizeSelector, StockLabel } from "@/components";
import type { CartItem, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./AddToCart.css";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductTocart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const productStock = product.inStock;

  const addToCart = () => {
    setPosted(true);
    if (product.inStock === 0) {
      Swal.fire({
        title: "Lo sentimos",
        text: "El artículo está agotado",
        icon: "error",
        timer: 2000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Seguir comprando",
        timerProgressBar: true,
        customClass: {
          popup: "custom-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
      return;
    }

    if (!size) {
      Swal.fire({
        title: "Lo sentimos",
        text: "Debes seleccionar una talla",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
          popup: "custom-swal",
        },
      });
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartItem);
    setPosted(false);
    Swal.fire({
      title: `Has añadido ${quantity} al carrito`,
      icon: "success",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Seguir comprando",
      cancelButtonText: "Ver carrito",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      cancelButtonAriaLabel: "Ver carrito",
      customClass: {
        popup: "my-swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "/cart";
      }
    });
  };

  return (
    <>
      <StockLabel slug={product.slug} />
      {/* Muestra mensaje de agotado solo si posted es true y no hay stock */}
      {posted && productStock === 0 && (
        <span className="text-red-500">Artículo agotado</span>
      )}

      {/* Muestra mensaje de seleccionar talla solo si posted es true, hay stock y no se ha seleccionado una talla */}
      {posted && productStock > 0 && !size && (
        <span className="text-red-500">Debe de seleccionar una talla</span>
      )}
      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Add to cart */}
      <div className="mt-5">
        <p className="text-gray-500 text-lg">Precio: {product.price}€</p>
        <button
          className="my-5 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          onClick={addToCart}
        >
          Añadir al carrito
        </button>
      </div>
    </>
  );
};
