"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "No tienes permisos para ver esta información",
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log({ Ordernes: orders });
  return {
    ok: true,
    orders: orders,
  };
};
