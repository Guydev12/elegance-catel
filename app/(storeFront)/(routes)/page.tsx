import Hero from "@/components/shared/store/hero";
import { NewSection } from "@/components/shared/store/new-section";
import { getAllProducts } from "@/lib/actions/product.actions";
import React from "react";

const HomeBoutique = async () => {
  const products = await getAllProducts();

  return (
    <>
      <Hero /> <NewSection products={products} />
    </>
  );
};

export default HomeBoutique;
