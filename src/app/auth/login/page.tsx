import React from "react";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="bg-blue-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-700 bottom-0 leading-5 h-full w-full overflow-hidden" />

      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">
              Bienvenido a Stylas | Shop
            </h1>
            <p className="pr-3 text-sm opacity-75">
              Tu tienda online de ropa y accesorios para hombre y mujer.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </>
  );
}
