"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByID = async (id: string) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar usuario autenticado
  if (!userId) {
    return {
      ok: false,
      error: "Usuario no autenticado",
    };
  }

  // Obtener la información del producto
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!order) {
      throw new Error(`No se encontro el pedido con el id: ${id}`);
    }

    if (session?.user.role !== "admin" && order.userId !== order.userId) {
      return {
        ok: false,
        error: "No tienes permisos para ver este pedido",
      };
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "No se encontro el pedido",
    };
  }
};
