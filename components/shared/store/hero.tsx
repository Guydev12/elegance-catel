import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div>
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src="/hero.png"
          alt="Photo by Drew Beamer"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
};

export default Hero;
