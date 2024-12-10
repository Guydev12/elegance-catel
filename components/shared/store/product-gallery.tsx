"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

import { Image as ImageType } from "@prisma/client";
import { useIsMobile } from "@/hooks/use-mobile";

type ProductGalleryProps = { images: ImageType[] | undefined };

export const ProductMdGallery: FC<ProductGalleryProps> = ({ images }) => {
  const isMobile = useIsMobile();
  if (!images?.length) return <div>No images available</div>;

  return (
    <Tabs defaultValue={images[0].id} className="hidden md:block ">
      {images.map((image) => (
        <TabsContent key={image.id} value={image.id}>
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <div className="relative flex items-center justify-center w-full h-64">
                <Image
                  src={image.imageUrl}
                  width={200}
                  height={200}
                  className="object-cover object-center"
                  alt="image product"
                />
              </div>
            </CardContent>
            <CardFooter>
              {!isMobile && (
                <TabsList className="grid w-full grid-cols-4">
                  {images.map((thumb) => (
                    <TabsTrigger key={thumb.id} value={thumb.id}>
                      <div className="relative flex items-center justify-center aspect-square mt-6 mb-6 w-16 h-16">
                        <Image
                          src={thumb.imageUrl}
                          fill
                          className="object-cover"
                          alt="thumbnail"
                        />
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export const ProductMobileGallery: FC<ProductGalleryProps> = ({ images }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="md:hidden block flex flex-col items-center justify-center w-full">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {images?.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex w-full aspect-square items-center justify-center p-6">
                  <Image
                    width={200}
                    height={250}
                    className="object-cover object-center"
                    src={image.imageUrl}
                    alt="product image"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
};
