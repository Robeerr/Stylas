"use client";
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoInformationOutline } from "react-icons/io5";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);
    if (!resp.ok) {
      setErrorMessage([resp.message]);
      return;
    }

    await login(email.toLocaleLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center self-center z-10 w-full max-w-md px-4"
      >
        <div className="p-12 bg-white mx-auto rounded-3xl w-96 mt-10">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">Regístrate</h3>
            <p className="text-gray-400">
              Ya tienes cuenta?{" "}
              <a
                href="/auth/login"
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Inicia sesión
              </a>
            </p>
          </div>

          <div className="space-y-6">
            <div className="">
              <input
                className={clsx(
                  "w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400",
                  {
                    "border-red-500": errors.name,
                  }
                )}
                type="text"
                placeholder="Usuario"
                autoFocus
                {...register("name", { required: true })}
              />
            </div>

            <div className="">
              <input
                className={clsx(
                  "w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400",
                  {
                    "border-red-500": errors.email,
                  }
                )}
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>

            <div className="relative">
              {/* Asegúrate de manejar el estado 'show' correctamente con hooks o estado del componente */}
              <input
                placeholder="Password"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className={clsx(
                  "w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400",
                  {
                    "border-red-500": errors.password,
                  }
                )}
              />
              {/* Aquí deberías insertar los iconos de ojo abierto/cerrado para mostrar/ocultar la contraseña */}
              <div className="absolute right-3 top-4"></div>
            </div>

            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {(errors.name || errors.email || errors.password) && (
                <div className="flex mb-2">
                  <IoInformationOutline className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    Este campo es requerido
                  </p>
                </div>
              )}
              <span className="text-sm text-red-500">{errorMessage}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <RegisterButton />
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

function RegisterButton() {
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
      Registrarse
    </button>
  );
}
