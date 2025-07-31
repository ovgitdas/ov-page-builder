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
import { ImageCarousel } from "../tag";
import Link from "next/link";
import { useViewPort } from "../viewport_zustand";

interface Props {
  imageCarousel: ImageCarousel;
}
const ImageCarouselComponent = ({ imageCarousel }: Props) => {
  const { linkImages } = imageCarousel;
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

  const { deviceType } = useViewPort();

  return (
    <div className="relative block h-full w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="h-full w-full"
      >
        <CarouselContent>
          {linkImages.map((linkImage, i) => (
            <CarouselItem key={i}>
              <Link href={linkImage.href}>
                <img
                  alt={linkImage.alt}
                  src={linkImage.src}
                  className="w-full h-full object-cover"
                  // fill={true}
                  // objectFit="cover"
                  // objectPosition="center"
                  loading="lazy"
                  draggable={false}
                  // unoptimized={true}
                  fetchPriority="low"
                  // quality={75}
                  // placeholder="blur"
                  // blurDataURL="https://placehold.co/100x100/e0e0e0/333?text=Loading+Image"
                  // priority={false}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    // e.currentTarget
                    e.currentTarget.src =
                      "https://placehold.co/100x100/e0e0e0/333?text=No+Image";
                  }}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {imageCarousel[`${deviceType}ShowController`] && scrollable.prev ? (
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
      {imageCarousel[`${deviceType}ShowController`] && scrollable.next ? (
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
