"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  console.log({ userId });
  try {
    const deleted = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
      deleted,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "No se pudo borrar la dirección",
    };
  }
};
