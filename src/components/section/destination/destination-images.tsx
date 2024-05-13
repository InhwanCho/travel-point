'use client';

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; 
import Image from 'next/image'; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"; 
import { useEffect, useRef, useState } from "react"; 

export default function CarouselPlugin() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });
  
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

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
        plugins={[autoplay.current]} 
        className="w-full"
        onMouseEnter={autoplay.current.stop} 
        onMouseLeave={autoplay.current.reset} 
      >
        <CarouselContent className="flex">
          {Array.from({ length: 5 }, (_, index) => `/img/sample.avif`).map((src, index) => (
            <CarouselItem key={index} className="relative w-full">
              <Image
                src={src}
                alt={`Image ${index}`}
                width={800}
                height={500}
                className="object-cover w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext /> 
      </Carousel>

      <div ref={emblaThumbsRef} className="hidden md:flex justify-center space-x-4 mt-4">
        {Array.from({ length: 5 }, (_, index) => `/img/sample.avif`).map((src, index) => (
          <div
            key={index}
            onClick={() => onThumbClick(index)}
            className={`cursor-pointer p-1 ${index === selectedIndex ? 'ring-2 ring-offset-2 ring-slate-500' : ''}`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${index}`}
              width={100}
              height={66}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
