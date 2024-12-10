import { getAllProducts } from "@/lib/actions/product.actions";
import React from "react";
import { NewPage } from "./_components/_page";

const NouveautePage = async () => {
  const products = await getAllProducts();

  return (
    <div>
      <NewPage products={products} />
    </div>
  );
};

export default NouveautePage;
