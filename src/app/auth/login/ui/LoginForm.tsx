"use client";
import { authenticate } from "@/actions";
import { useAddressStore } from "@/store";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { IoEye, IoEyeOff, IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      useAddressStore.getState().setDireccion({
        nombre: "",
        apellidos: "",
        direccion: "",
        direccion2: "",
        codigoPostal: "",
        pais: "",
        ciudad: "",
        telefono: "",
      });
      window.location.replace("/");
    }
  }, [state]);

  return (
    <>
      <form action={dispatch} className="flex justify-center self-center z-10">
        <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">
              Inicia sesión
            </h3>
            <p className="text-gray-400">
              No tienes cuenta?{" "}
              <a
                href="/auth/register"
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Regístrate
              </a>
            </p>
          </div>

          <div className="space-y-6">
            <div className="">
              <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                type="text"
                placeholder="Email"
                name="email"
              />
            </div>

            <div className="relative">
              {/* Asegúrate de manejar el estado 'show' correctamente con hooks o estado del componente */}
              <input
                placeholder="Password"
                type="password"
                name="password"
                className="text-sm  px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
              />
              {/* Aquí deberías insertar los iconos de ojo abierto/cerrado para mostrar/ocultar la contraseña */}
              <div className="absolute right-3 top-4"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm ml-auto">
                <a href="#" className="text-blue-700 hover:text-blue-600">
                  Has olvidado tu contraseña?
                </a>
              </div>
            </div>

            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {state === "CredentialsSignin" && (
                <div className="flex mb-2">
                  <IoInformationOutline className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    Email o contraseña incorrectos
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center">
              <LoginButton />
            </div>

            <div className="flex items-center justify-center space-x-2 my-5">
              <span className="h-px w-20 bg-gray-200"></span>
              <span className="text-gray-300 font-normal">o</span>
              <span className="h-px w-20 bg-gray-200"></span>
            </div>

            <div className="flex justify-center gap-5 w-full ">
              {/* Botones de inicio de sesión de Google y Facebook y Github aquí */}
              <button className="btn-primary">Google</button>
              <button className="btn-primary">Facebook</button>
            </div>
          </div>

          <div className="mt-7 text-center text-gray-300 text-xs">
            <span>© 2024 STYLAS | SHOP. All rights reserved.</span>
          </div>
        </div>
      </form>
    </>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "w-full flex justify-center bg-blue-800  hover:bg-blue-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500":
          !pending,
        "cursor-not-allowed": pending,
      })}
      disabled={pending}
    >
      Iniciar sesión
    </button>
  );
}
