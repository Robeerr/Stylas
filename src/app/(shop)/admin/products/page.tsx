export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-3 p-6">
        <Link href="/admin/product/new" className="btn-primary text-sm">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-6 p-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded-lg p-3 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
              <div className="md:col-span-1">
                <Link href={`/product/${product.slug}`}>
                  <span>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      width={64}
                      height={64}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </span>
                </Link>
              </div>
              <div className="md:col-span-2">
                <Link href={`/admin/product/${product.slug}`}>
                  <span className="text-md font-medium text-gray-900 hover:underline">
                    {product.title}
                  </span>
                </Link>
                <div className="text-gray-500 text-sm">
                  {currencyFormat(product.price)}
                </div>
              </div>
              <div className="md:col-span-1 text-sm">
                <div className="text-gray-700">Género: {product.gender}</div>
                <div className="text-gray-700">
                  Inventario: {product.inStock}
                </div>
                <div className="text-gray-700">
                  Tallas: {product.sizes.join(", ")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}
