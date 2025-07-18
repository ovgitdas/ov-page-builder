"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageCarousel } from "./tag";
import Link from "next/link";

interface Props {
  imageCarousel: ImageCarousel;
}
const ImageCarouselComponent = ({ imageCarousel }: Props) => {
  const { linkImages, showController } = imageCarousel;
  const [api, setApi] = React.useState<CarouselApi>();
  const [scrollable, setScrollable] = React.useState({
    prev: false,
    next: true,
  });

  React.useEffect(() => {
    if (!!api)
      api.on("scroll", () => {
        setScrollable({
          prev: !!api && api.canScrollPrev(),
          next: !!api && api.canScrollNext(),
        });
      });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="relative">
      <Carousel setApi={setApi} plugins={[plugin.current]}>
        <CarouselContent>
          {linkImages.map((linkImage, i) => (
            <CarouselItem key={i}>
              <Link href={linkImage.href}>
                <img
                  alt={linkImage.alt}
                  src={linkImage.src}
                  className="w-full h-auto object-cover"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {showController && scrollable.prev ? (
        <div className="absolute left-0 top-0 bottom-0 flex justify-center items-center">
          <div
            onClick={() => {
              if (!!api) api.scrollPrev();
            }}
            className="bg-black/50 hover:bg-blue-700/50 duration-300 ease-in transition-all text-white backdrop-blur-sm rounded-e-md cursor-pointer h-20 z-10 flex justify-center items-center"
          >
            <FaChevronLeft />
          </div>
        </div>
      ) : (
        <></>
      )}
      {showController && scrollable.next ? (
        <div className="absolute right-0 top-0 bottom-0 flex justify-center items-center">
          <div
            onClick={() => {
              if (!!api) api.scrollNext();
            }}
            className="bg-black/50 hover:bg-blue-700/50 duration-300 ease-in transition-all text-white backdrop-blur-sm rounded-s-md cursor-pointer h-20 z-10 flex justify-center items-center"
          >
            <FaChevronRight />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageCarouselComponent;
