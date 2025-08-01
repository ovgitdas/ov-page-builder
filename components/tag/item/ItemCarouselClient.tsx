"use client"
import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel"
import { ItemCarousel } from "../tag"
import { useViewPort } from "../viewport_zustand"
import { Item } from "./item"
import ItemNodeClient from "./ItemNodeClient"
import { ItemNode } from "./ItemNodeServer"

interface Props {
  itemCarousel: ItemCarousel
  searchItems: (itemCarousel: ItemCarousel) => Promise<Array<Item>>
  createSlug: (itemCarousel: ItemCarousel) => string
}
const ItemCarouselClient = ({
  itemCarousel,
  searchItems,
  createSlug,
}: Props) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  const handleResize = () => {
    if (ref.current) {
      setWidth(ref.current.clientWidth)
    }
  }
  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("resize", handleResize)
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("resize", handleResize)
      }
    }
  }, [ref])

  const [items, setItems] = React.useState<Array<Item>>([])

  React.useEffect(() => {
    const slug = createSlug(itemCarousel)
    const data = localStorage.getItem(slug)
    const list = !!data ? JSON.parse(data) : []
    if (list.length >= itemCarousel.limit) {
      setItems(list)
    } else {
      searchItems(itemCarousel).then((items) => {
        setItems(items)
        localStorage.setItem(slug, JSON.stringify(items))
      })
    }
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

  const { deviceType } = useViewPort()

  return (
    <div ref={ref} className="relative w-full">
      <Carousel setApi={setApi}>
        <CarouselContent className="gap-0 py-4">
          {Array.from({ length: itemCarousel.limit }, (_, i) => i).map(
            (_, index) => (
              <ItemNodeClient key={index} carouselContainerWidth={width}>
                {items.length > index ? (
                  <ItemNode item={items[index]} />
                ) : undefined}
              </ItemNodeClient>
            )
          )}
        </CarouselContent>
      </Carousel>
      {scrollable.prev && itemCarousel[`${deviceType}ShowController`] ? (
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
      {scrollable.next && itemCarousel[`${deviceType}ShowController`] ? (
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

export default ItemCarouselClient
