import { DataTable } from "@/components/ui/data-tables";
import { CategoryColumns } from "../category-columns";
import { getAllCategories } from "@/lib/actions/categorie.actians";

const CategoryPage = async () => {
  const categories = await getAllCategories();
  return (
    <>
      <DataTable columns={CategoryColumns} data={categories} />
    </>
  );
};

export default CategoryPage;
