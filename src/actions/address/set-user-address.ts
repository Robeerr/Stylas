"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  console.log({ userId });
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "No se pudo crear la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const addresToSave = {
      userId: userId,
      direccion: address.direccion,
      direccion2: address.direccion2,
      pais: address.pais,
      ciudad: address.ciudad,
      nombre: address.nombre,
      apellidos: address.apellidos,
      telefono: address.telefono,
      codigoPostal: address.codigoPostal,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addresToSave,
      });
      return newAddress;
    } else {
      const updatedAddres = await prisma.userAddress.update({
        where: {
          userId,
        },
        data: addresToSave,
      });
      return updatedAddres;
    }
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo crear la dirección");
  }
};
