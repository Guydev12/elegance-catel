import { Card, CardContent } from "@/components/ui/card";
import { ProductDto } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

type ProductDetailPageProps = {
  product: ProductDto;
};

const ProductDetailPage: FC<ProductDetailPageProps> = ({ product }) => {
  return (
    <div className="flex flex-col w-full space-y-8 ">
      <div className="grid md:grid-cols-2 md:w-full w-full grid-cols-1 md:space-x-8 space-y-4">
        {product.images.slice(0, 1).map((image) => (
          <Card key={image.id}>
            <CardContent>
              <Image
                src={image.imageUrl}
                alt={image.id}
                width={100}
                height={100}
              />
            </CardContent>
          </Card>
        ))}
        <div className="grid gap-4">
          {product.images.slice(2, 4).map((image) => (
            <Card key={image.id}>
              <CardContent>
                <Image
                  src={image.imageUrl}
                  alt={image.id}
                  width={100}
                  height={100}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
