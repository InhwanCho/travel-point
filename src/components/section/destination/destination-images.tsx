/* eslint-disable @next/next/no-img-element */
'use client';

import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface DestinationCarouselProps {
  images: string[];
}

export default function DestinationCarousel({ images }: DestinationCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selected = api.selectedScrollSnap();
      setSelectedIndex(selected);
      if (emblaThumbsApi) {
        emblaThumbsApi.scrollTo(selected);
      }
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, emblaThumbsApi]);

  const onThumbClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div>
      <Carousel
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="flex">
          {images.map((src, index) => (
            <CarouselItem key={index} className="relative w-full">
              <Image
                src={src}
                alt={`Image ${index}`}
                width={800}
                height={550}
                className="object-cover w-full aspect-[16/11]"
                priority={index === 0 ? true : false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div ref={emblaThumbsRef} className="hidden md:flex justify-center space-x-4 mt-4">
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => onThumbClick(index)}
            className={`cursor-pointer p-1 ${index === selectedIndex ? 'ring-2 ring-offset-2 ring-slate-500' : ''}`}
          >
            <img
              src={src}
              alt={`Thumbnail ${index}`}
              className="object-cover aspect-[16/11] w-24 h-16"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
