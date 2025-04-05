import React from "react";
import { useLocation } from "react-router";
import ProductByCat from "../components/Products/ProductByCat";

export default function CategoryPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryName = searchParams.get("name");

  return (
    <div className="py-16 md:py-44 px-6 sm:px-20">
      <div className="py-10 flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">Explore {categoryName}</h1>
        <p>Varied range of products in {categoryName}</p>
      </div>
      <ProductByCat category={categoryName} />
    </div>
  );
}
