"use client";

import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCartStore, useStore } from "@/store";

export const Topmenu = () => {
  const openSidebar = useStore((state) => state.openSidebar);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex flex-col sm:flex-row p-5 justify-between items-center bg-gray-800 text-white w-full">
      <div className="flex justify-center sm:justify-start w-full sm:w-auto">
        <Link href="/">
          <div className="flex items-center justify-center sm:justify-start space-x-1">
            <span
              className={`${titleFont.className} antialiased font-bold text-center`}
            >
              Stylas
            </span>
            <span className="hidden sm:inline"> | Shop</span>
          </div>
        </Link>
      </div>

      {/* Links visible on all screen sizes, adjusted for small screens */}
      <div className="flex justify-center mt-2 sm:mt-0 space-x-1 sm:space-x-2 text-xs sm:text-base">
        <Link
          className="p-1 sm:p-2 rounded-md transition-all hover:bg-gray-700"
          href="/gender/men"
        >
          Hombre
        </Link>
        <Link
          className="p-1 sm:p-2 rounded-md transition-all hover:bg-gray-700"
          href="/gender/women"
        >
          Mujer
        </Link>
        <Link
          className="p-1 sm:p-2 rounded-md transition-all hover:bg-gray-700"
          href="/gender/kid"
        >
          Niño
        </Link>
      </div>

      <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
        <Link
          href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-green-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5 text-2xl cursor-pointer" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-700"
          onClick={() => openSidebar()}
        >
          <RxHamburgerMenu className="w-6 h-6 text-2xl cursor-pointer" />
        </button>
      </div>
    </nav>
  );
};
