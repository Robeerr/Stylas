import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="flex flex-col justify-center items-center">
        <Link href="/">
          <button className="mt-5 p-2 rounded-md bg-gray-800 text-white transition-all hover:bg-gray-700">
            Volver al inicio
          </button>
        </Link>
        <div className="px-5 mx-5">
          <Image
            src="/imgs/404error.png"
            alt="404 Not Found Image"
            className="p-5 sm:p-0 mt-7"
            width={550}
            height={550}
          />
        </div>
      </div>
    </div>
  );
};
