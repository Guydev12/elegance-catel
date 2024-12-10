import { getAllProducts } from "@/lib/actions/product.actions";
import BoutiquePage from "./_components/boutique";
import { getAllCategories } from "@/lib/actions/categorie.actians";

const Boutique = async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <>
      <BoutiquePage
        categories={categories.map((c) => c.name)}
        products={products}
      />
    </>
  );
};

export default Boutique;
