export const revalidate = 604800; // 1 week

import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow } from "@/components";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title || "Producto no encontrado",
    description: product?.description || "Producto no encontrado",
    openGraph: {
      title: product?.title || "Producto no encontrado",
      description: product?.description || "Producto no encontrado",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2">
          {/* Mobile Slideshow */}
          <ProductMobileSlideshow
            images={product.images}
            title={product.title}
            className="block md:hidden "
          />

          {/* Desktop Slideshow */}
          <ProductSlideshow
            images={product.images}
            title={product.title}
            className="hidden md:block "
          />
        </div>

        {/* Detalles del producto */}
        <div className="col-span-1 px-5 md:col-span-1">
          <h1
            className={`${titleFont.className} antialiased font-bold text-xl my-5 `}
          >
            {product.title}
          </h1>

          {/* Descripcion de producto */}
          <p className="text-gray-500 mt-5">{product.description}</p>

          {/* Añadir al carrito */}
          <AddToCart product={product} />
        </div>
      </div>
    </>
  );
}
