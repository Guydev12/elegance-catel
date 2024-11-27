import React from "react";
import GeneralProductForm from "../general-product-form";
import { getAllCategories } from "@/lib/actions/categorie.actians";

const AddProductPage = async () => {
  const categories = await getAllCategories();
  console.log(categories);
  return (
    <main className=" w-full">
      <div className=" w-full m-0 ">
        <GeneralProductForm categoryOptions={categories} />
      </div>
    </main>
  );
};

export default AddProductPage;
