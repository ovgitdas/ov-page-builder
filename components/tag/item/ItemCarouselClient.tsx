"use client";
import React from "react";
import { Itemx } from "../../item/item";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import { _loadItems } from "../../item/item_db_server";
import { ItemCarousel } from "../tag";
import { useViewPort } from "../viewport_zustand";

// const loadItems = async (query: string): Promise<Array<Itemx>> => {
//   const data = localStorage.getItem(query)
//   const list = !!data ? JSON.parse(data) : []
//   if (list.length > 0) {
//     return list
//   } else {
//     const items = await _loadItems(query)
//     localStorage.setItem(query, JSON.stringify(items))
//     return items
//   }
// }

interface Props {
  itemCarousel: ItemCarousel;
}
const ItemCarouselClient = ({ itemCarousel }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const handleResize = () => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  };
  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("resize", handleResize);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("resize", handleResize);
      }
    };
  }, [ref]);

  const [items, setItems] = React.useState<Array<Itemx>>([]);
  // React.useEffect(() => {
  //   loadItems(itemCarousel.query).then((items) => setItems(items))
  // }, [itemCarousel])

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

  const { deviceType } = useViewPort();

  return (
    <div ref={ref} className="relative w-full">
      <Carousel setApi={setApi}>
        <CarouselContent className="gap-0 py-4">
          {items.length === 0
            ? Array.from({ length: 40 }, (_, i) => i).map((_, index) => (
                <ItemCardCarousel key={index} containerWidth={width} />
              ))
            : items.map((item, index) => (
                <ItemCardCarousel
                  key={index}
                  item={item}
                  containerWidth={width}
                />
              ))}
        </CarouselContent>
      </Carousel>
      {scrollable.prev && itemCarousel[`${deviceType}ShowController`] ? (
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
      {scrollable.next && itemCarousel[`${deviceType}ShowController`] ? (
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

export default ItemCarouselClient;
