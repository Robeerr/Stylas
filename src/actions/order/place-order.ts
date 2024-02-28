"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  id: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
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
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((product) => product.id),
      },
    },
  });

  // Calcular el total de productos en la orden
  const productsInOrder = productsId.reduce(
    (count, product) => count + product.quantity,
    0
  );

  // Colocar Total, Subtotal y Tax
  const { subTotal, tax, total } = productsId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.id);

      if (!product) throw new Error(`${item.id} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transacción
  try {
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProdutsPromises = products.map(async (product) => {
        // Verificar si hay suficiente stock
        const productQuantity = productsId
          .filter((p) => p.id === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`Producto ${product.id} sin stock`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProdutsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: productsInOrder,
          subtotal: subTotal,
          tax: tax,
          total: total,
          isPaid: false,

          OrderItem: {
            createMany: {
              data: productsId.map((product) => ({
                quantity: product.quantity,
                size: product.size,
                productId: product.id,
                price: products.find((p) => p.id === product.id)?.price ?? 0,
              })),
            },
          },
        },
      });

      // Si el precio es 0, mandar un error
      if (order.total === 0) {
        throw new Error("El total de la orden es 0");
      }

      // 3. Crear la dirección de envío
      console.log({ Address: address });
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...address,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });
    return {
      ok: true,
      order: prismaTransaction.order.id,
      prismaTransaction: prismaTransaction,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
