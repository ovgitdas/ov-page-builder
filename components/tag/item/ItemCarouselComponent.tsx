"use client"
import React, { ReactNode } from "react"
import { Itemx } from "../../item/item"
import ItemNode from "../../item/ItemNode"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { ItemCarousel } from "../tag"
import { _loadItems } from "../../item/item_db_server"

const loadItems = async (query: string): Promise<Array<Itemx>> => {
  const data = localStorage.getItem(query)
  const list = !!data ? JSON.parse(data) : []
  if (list.length > 0) {
    return list
  } else {
    const items = await _loadItems(query)
    localStorage.setItem(query, JSON.stringify(items))
    return items
  }
}

const _carouselItem = (item: Itemx, cols: number): ReactNode => {
  const basis = [2, 3, 4, 5, 6, 12].includes(cols)
    ? cols
    : cols > 6 && cols < 11
    ? 6
    : cols > 10
    ? 12
    : 1
  switch (basis) {
    case 2:
      return (
        <CarouselItem key={item.item_id} className="lg:basis-1/2">
          <ItemNode item={item} />
        </CarouselItem>
      )
    case 3:
      return (
        <CarouselItem key={item.item_id} className="md:basis-1/2 lg:basis-1/3">
          <ItemNode item={item} />
        </CarouselItem>
      )
    case 4:
      return (
        <CarouselItem key={item.item_id} className="md:basis-1/2 lg:basis-1/4">
          <ItemNode item={item} />
        </CarouselItem>
      )
    case 5:
      return (
        <CarouselItem key={item.item_id} className="md:basis-1/2 lg:basis-1/5">
          <ItemNode item={item} />
        </CarouselItem>
      )
    case 6:
      return (
        <CarouselItem key={item.item_id} className="md:basis-1/3 lg:basis-1/6">
          <ItemNode item={item} />
        </CarouselItem>
      )
    case 12:
      return (
        <CarouselItem
          key={item.item_id}
          className="sm:basis-1/3 md:basis-1/6 lg:basis-1/12"
        >
          <ItemNode item={item} />
        </CarouselItem>
      )
    default:
      return (
        <CarouselItem key={item.item_id}>
          <ItemNode item={item} />
        </CarouselItem>
      )
  }
}

const _carouselItemShimmer = (cols: number, key: number): ReactNode => {
  const basis = [2, 3, 4, 5, 6, 12].includes(cols)
    ? cols
    : cols > 6 && cols < 11
    ? 6
    : cols > 10
    ? 12
    : 1

  const shimmerContent = (
    <div className="p-1 w-60 h-96">
      <div className="animate-pulse flex flex-col space-y-2">
        <div className="rounded-md bg-slate-200 h-40 w-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )

  switch (basis) {
    case 2:
      return (
        <CarouselItem key={key} className="lg:basis-1/2">
          {shimmerContent}
        </CarouselItem>
      )
    case 3:
      return (
        <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/3">
          {shimmerContent}
        </CarouselItem>
      )
    case 4:
      return (
        <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/4">
          {shimmerContent}
        </CarouselItem>
      )
    case 5:
      return (
        <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/5">
          {shimmerContent}
        </CarouselItem>
      )
    case 6:
      return (
        <CarouselItem key={key} className="md:basis-1/3 lg:basis-1/6">
          {shimmerContent}
        </CarouselItem>
      )
    case 12:
      return (
        <CarouselItem
          key={key}
          className="sm:basis-1/3 md:basis-1/6 lg:basis-1/12"
        >
          {shimmerContent}
        </CarouselItem>
      )
    default:
      return <CarouselItem key={key}>{shimmerContent}</CarouselItem>
  }
}

interface Props {
  itemCarousel: ItemCarousel
}
const ItemCarouselComponent = ({ itemCarousel }: Props) => {
  const [items, setItems] = React.useState<Array<Itemx>>([])
  React.useEffect(() => {
    loadItems(itemCarousel.query).then((items) => setItems(items))
  }, [itemCarousel])

  const [api, setApi] = React.useState<CarouselApi>()
  const [scrollable, setScrollable] = React.useState({
    prev: false,
    next: true,
  })

  React.useEffect(() => {
    if (!!api)
      api.on("scroll", () => {
        setScrollable({
          prev: !!api && api.canScrollPrev(),
          next: !!api && api.canScrollNext(),
        })
      })
  }, [api])

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi}>
        <CarouselContent className="py-4">
          {items.length === 0
            ? Array.from({
                length: itemCarousel.cols > 6 ? 6 : itemCarousel.cols,
              }).map((_, i) => _carouselItemShimmer(itemCarousel.cols, i))
            : items.map((item) => _carouselItem(item, itemCarousel.cols))}
        </CarouselContent>
      </Carousel>
      {scrollable.prev ? (
        <div className="absolute left-0 top-0 bottom-0 flex justify-center items-center">
          <div
            onClick={() => {
              if (!!api) api.scrollPrev()
            }}
            className="bg-black/50 hover:bg-blue-700/50 duration-300 ease-in transition-all text-white backdrop-blur-sm rounded-e-md cursor-pointer h-20 z-10 flex justify-center items-center"
          >
            <FaChevronLeft />
          </div>
        </div>
      ) : (
        <></>
      )}
      {scrollable.next ? (
        <div className="absolute right-0 top-0 bottom-0 flex justify-center items-center">
          <div
            onClick={() => {
              if (!!api) api.scrollNext()
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
  )
}

export default ItemCarouselComponent
