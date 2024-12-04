"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
const Billboards = [
  {
    image: "/b1.jpg",
    text: "Discover the latest in skincare essentials.",
  },
  {
    image: "/b2.jpg",
    text: "Luxury beauty products, just a click away.",
  },
  {
    image: "/b3.webp",
    text: "Transform your routine with our top picks.",
  },
  {
    image: "/b4.webp",
    text: "Your beauty, your way, every day.",
  },
  {
    image: "/b6.webp",
    text: "Pamper yourself with our premium range.",
  },
  {
    image: "/b5.jpg",
    text: "Redefine beauty with our unique products.",
  },
];

const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Billboards.map((billboard, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[16/9]">
                <Image
                  src={billboard.image}
                  alt={billboard.text}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <p className="text-white text-2xl font-bold text-center px-4">
                    {billboard.text}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
             </Carousel>
    </div>
  );
};

export default Hero;
