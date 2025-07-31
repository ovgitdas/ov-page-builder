"use client";
import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { ItemSmall } from "./item";
import ItemNode, { ItemShimmer } from "./ItemNodeClient";

const ItemCardCarousel: React.FC<{
  item?: ItemSmall;
  containerWidth: number;
}> = ({ item, containerWidth }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(100);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.flexBasis = `${(width / containerWidth) * 100}%`;
    }
  }, [ref, containerWidth, width]);

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className="min-w-0 shrink-0 grow-0"
    >
      {!item ? (
        <ItemShimmer onLoad={setWidth} />
      ) : (
        <ItemNode item={item} onLoad={setWidth} />
      )}
    </div>
  );
};

export default ItemCardCarousel;
