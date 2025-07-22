"use client"
import React from "react"
import { defaultLayout, ItemLayout } from "./ItemLayout"
import { CarouselItem } from "@/components/ui/carousel"
import ItemCard, { ItemShimmer } from "./ItemCard"

const ItemCardCarousel: React.FC<{
  itemLayout?: ItemLayout
  containerWidth: number
  isShimmer?: boolean
}> = ({ itemLayout, containerWidth, isShimmer }) => {
  const _itemLayout = itemLayout || defaultLayout
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      const _itemLayout = itemLayout || defaultLayout
      const itemWidth = _itemLayout.node.width || 100
      const flexBasis = `${(itemWidth / containerWidth) * 100}%`
      ref.current.style.flexBasis = flexBasis
    }
  }, [containerWidth, ref, itemLayout])

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className="min-w-0 shrink-0 grow-0"
    >
      <CarouselItem ref={ref}>
        {isShimmer ? (
          <ItemShimmer itemLayout={_itemLayout} />
        ) : (
          <ItemCard itemLayout={_itemLayout} />
        )}
      </CarouselItem>
    </div>
  )
}

export default ItemCardCarousel
