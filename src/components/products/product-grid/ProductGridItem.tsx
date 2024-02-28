"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/interfaces";
import { currencyFormat } from "@/utils";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col border border-gray-200 shadow-sm hover:shadow-md rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out h-full">
      <Link href={`/product/${product.slug}`}>
        <div className="flex-grow">
          <div className="relative group">
            <Image
              src={`/products/${displayImage}`}
              alt={product.title}
              className="w-full rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
              quality={100}
              width={300}
              height={300}
              layout="responsive"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 ease-in-out"
              onMouseEnter={() => setDisplayImage(product.images[1])}
              onMouseLeave={() => setDisplayImage(product.images[0])}
            />
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col h-full">
        <Link href={`/product/${product.slug}`}>
          <span className="text-lg font-semibold hover:text-blue-600 transition-colors duration-300 ease-in-out">
            {product.title}
          </span>
        </Link>
        <div className="mt-auto">
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-800 font-bold">
              {currencyFormat(product.price)}
            </span>
            <Link href={`/product/${product.slug}`}>
              <span className="text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-full px-3 py-1 transition-all duration-300 ease-in-out">
                Ir
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
