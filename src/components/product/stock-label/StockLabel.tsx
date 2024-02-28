"use client";

import { getStockSlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockSlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </h1>
      ) : (
        <>
          <div className="flex flex-col my-5">
            <span
              className={clsx(
                "px-2 py-1 rounded-lg text-white w-max text-sm font-bold uppercase",
                stock > 0 ? "bg-green-700" : "bg-red-500"
              )}
            >
              {stock > 0 ? "En stock" : "Agotado"}
            </span>
          </div>
        </>
      )}
    </>
  );
};
