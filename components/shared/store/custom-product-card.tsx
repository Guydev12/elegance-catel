import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  onNavigate: () => void;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  imageUrl,
  onAddToCart,
  onNavigate,
}) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return (
    <Card
      onClick={onNavigate}
      className="w-full max-w-sm overflow-hidden shadow-lg"
    >
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
          width={300}
          height={400}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold mb-2">{name}</CardTitle>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        <p className="text-gray-900 text-xl font-semibold">{formatted}</p>
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-end bg-gray-50">
        <Button
          onClick={onAddToCart}
          size="icon"
          variant="outline"
          className="flex justify-center items-center "
        >
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
