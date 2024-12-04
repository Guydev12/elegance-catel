import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";
import React from "react";

const NavAction = () => {
  const cart = useCart();

  return (
    <Button
      size="icon"
      variant="outline"
      className="bg-transparent hover:text-brand-primary  relative border-0 outline-0"
    >
      <ShoppingCart className=" text-white hover:text-brand-primary" />
      {cart.items.length > 0 && (
        <span className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-pink-700 flex items-center justify-center text-[2.5px] text-white"></span>
      )}
    </Button>
  );
};

export default NavAction;
