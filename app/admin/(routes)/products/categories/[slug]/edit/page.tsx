import { CategoryEditForm } from "@/components/shared/categories/category-edit-form";
import { FC } from "react";

type EditCategoryProps = {
  params: Promise<{ slug: string }>;
};

const EditCategory: FC<EditCategoryProps> = async ({ params }) => {
  const resolvedParams = await params; // Resolve the Promise if required.
  return <CategoryEditForm id={resolvedParams.slug} />;
};

export default EditCategory;
