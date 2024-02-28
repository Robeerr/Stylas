"use client";
import React from "react";
import Image from "next/image";
import LoginImage from "../../../../public/imgs/LoginImage.jpg";
import { RegisterForm } from "./ui/RegisterForm";

export default function LoginPage() {
  React.useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full">
      <Image
        src={LoginImage}
        alt="Fondo"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
        <div className="text-center backdrop-filter backdrop-blur-lg bg-white/30 p-6 rounded-lg max-w-md w-full">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 drop-shadow-lg">
            Bienvenido a Stylas | Shop
          </h1>

          <p className="text-sm sm:text-xl text-black-200 mt-2 drop-shadow-md">
            Tu tienda online de ropa marca TESLA y accesorios para hombre y
            mujer.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
