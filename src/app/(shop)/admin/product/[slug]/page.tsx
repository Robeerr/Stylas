import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product) {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo Producto" : "Editar producto";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
