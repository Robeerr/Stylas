"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debes iniciar sesión para ver tus pedidos",
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      OrderAddress: {
        select: {
          nombre: true,
          apellidos: true,
        },
      },
    },
  });
  return {
    ok: true,
    orders: orders,
  };
};
