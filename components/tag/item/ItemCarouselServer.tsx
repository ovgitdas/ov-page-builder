"use client";
import React from "react";
import { Itemx } from "../../item/item";
import { CarouselApi, CarouselContent } from "@/components/ui/carousel";
import { _loadItems } from "../../item/item_db_server";
import { ItemCarousel } from "../tag";

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

  return (
    <CarouselContent className="gap-0 py-4">
      {items.length === 0
        ? Array.from({ length: 40 }, (_, i) => i).map((_, index) => (
            <ItemCardCarousel key={index} containerWidth={width} />
          ))
        : items.map((item, index) => (
            <ItemCardCarousel key={index} item={item} containerWidth={width} />
          ))}
    </CarouselContent>
  );
};

export default ItemCarouselClient;
