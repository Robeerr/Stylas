"use client";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { Address } from "@/interfaces";
import { useAddressStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormInput {
  nombre: string;
  apellidos: string;
  direccion: string;
  direccion2?: string;
  codigoPostal: string;
  pais: string;
  ciudad: string;
  telefono: string;
}

export const AddressForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormInput>();

  const { data: session } = useSession({
    required: true,
  });

  const onSubmit = async (data: FormInput) => {
    await setUserAddress(data, session!.user.id);
    router.push("/checkout");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 mt-10">
          <div className="form__group">
            <input
              type="text"
              className="form__input "
              placeholder="Nombre"
              id="nombre"
              {...register("nombre", { required: true })}
              autoFocus
            />
            <label htmlFor="name" className="form__label">
              Nombre
            </label>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Apellidos"
              id="apellidos"
              required
              {...register("apellidos", { required: true })}
            />
            <label htmlFor="apellidos" className="form__label">
              Apellidos
            </label>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Dirección"
              id="direccion"
              {...register("direccion", { required: true })}
            />
            <label htmlFor="name" className="form__label">
              Dirección
            </label>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Dirección 2 (opcional)"
              id="direccion2"
              {...register("direccion2")}
            />
            <label htmlFor="name" className="form__label">
              Dirección 2 (opcional)
            </label>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Código Postal"
              id="codigoPostal"
              {...register("codigoPostal", { required: true })}
            />
            <label htmlFor="name" className="form__label">
              Código Postal
            </label>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="País"
              id="pais"
              {...register("pais", { required: true })}
            />
            <label htmlFor="name" className="form__label">
              País
            </label>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Ciudad"
              id="ciudad"
              {...register("ciudad", { required: true })}
            />
            <label htmlFor="name" className="form__label">
              Ciudad
            </label>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Teléfono"
              id="telefono"
              {...register("telefono", { required: true })}
            />
            <label htmlFor="name" className="form__label">
              Teléfono
            </label>
          </div>
        </div>

        <div className="flex flex-col mb-2 sm:mt-1 justify-center items-center">
          <button
            disabled={!isValid}
            type="submit"
            className={clsx({
              "btn-primary flex sm:w-1/2 justify-center items-center": true,
              "cursor-not-allowed btn-disabled": !isValid,
            })}
          >
            Siguiente
          </button>
        </div>
      </form>
    </>
  );
};
