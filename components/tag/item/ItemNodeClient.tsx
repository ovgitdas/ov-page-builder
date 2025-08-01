"use client";
import React, { ReactNode } from "react";
import { ItemShimmer } from "./ItemNodeServer";

const ItemNodeClient: React.FC<{
  children?: ReactNode;
  carouselContainerWidth: number;
}> = ({ children, carouselContainerWidth }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!!nodeRef.current && !!containerRef.current) {
      const width = nodeRef.current.getBoundingClientRect().width;
      containerRef.current.style.flexBasis = `${
        (width / carouselContainerWidth) * 100
      }%`;
    }
  }, [nodeRef, containerRef, carouselContainerWidth]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className="min-w-0 shrink-0 grow-0"
    >
      <div ref={nodeRef} className="flex justify-center items-center">
        {children || <ItemShimmer />}
      </div>
    </div>
  );
};

export default ItemNodeClient;
