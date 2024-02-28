"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  console.log({ userId });
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!address) {
      return null;
    }

    const { direccion2, ...restAddress } = address;

    return {
      ...restAddress,
      direccion2: direccion2 ? direccion2 : "",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
