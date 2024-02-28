import { redirect } from "next/navigation";
import Image from "next/image";

import { getPaginatedProductsWithImages } from "@/actions";
import { Arrow, Pagination, ProductGrid, Title } from "@/components";
import Banner from "../../../public/imgs/BannerStylas.jpg";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <div>
        {/* Aplica la clase hidden en tamaños sm y md para ocultar la imagen */}
        <div
          className="relative w-full overflow-hidden lg:block hidden"
          style={{ height: "1000px" }}
        >
          <Image
            src={Banner}
            alt="Banner Stylas"
            layout="responsive"
            width={1920}
            height={500}
            objectFit="cover"
            quality={100}
          />
          <div className="absolute bottom-40 w-full flex justify-center items-center">
            <Arrow />
          </div>
        </div>
      </div>

      <div className="mt-10 p-3">
        <ProductGrid products={products} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
