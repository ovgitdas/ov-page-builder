import Image from "next/image";
import React from "react"
import { _item_slug, Itemx } from "./item"
import Link from "next/link"

interface Props {
  item: Itemx
}
const ItemNode = ({ item }: Props) => {
  const itemImage = item.images.find((image) =>
    image.item_image_url.includes("_sm.")
  )
  const imageUrl = !!itemImage
    ? itemImage.item_image_url
    : item.images.length > 0
    ? item.images[0].item_image_url
    : ""

  const slug = _item_slug(item)
  const name = (
    JSON.parse(
      item.item_name_json || '[{"id":"", "source":"alias", "text": ""}]'
    ) as Array<{id: string, source: string, text: string}>
  ).filter((x) => x.source === "alias")[0].text
  const desc = JSON.parse(
    item.item_meta_json || '{"description":""}'
  ).description
  return (
    <div className="flex justify-center items-center">
      <Link href={`/item/${slug}/${item.item_id}`} target="_blank">
        <div className="min-w-60 bg-white text-slate-800 rounded-md shadow-md overflow-hidden hover:scale-105 transition-all duration-300 ease-in cursor-pointer">
          <div className="w-60 h-60 overflow-hidden relative">
            <Image
              alt={desc}
              src={imageUrl}
              width={240}
              height={240}
              className="object-cover w-full h-full z-10"
            />
            <div className="absolute inset-0">{name}</div>
          </div>
          <div className="h-36 px-4 py-2 w-full text-center flex flex-col gap-1 justify-between">
            <div className="text-base">{item.generic_name}</div>
            <div className="w-full text-center flex gap-1 font-mono justify-center items-center">
              <div className="text-teal-700 text-base font-semibold">
                ₹{+item.unit_price | 0}
              </div>
              <div className="line-through text-red-800 text-xs">
                ₹{+item.unit_mrp | 0}
              </div>
            </div>
            <div className="px-4 py-1 bg-orange-400 rounded-sm">Buy now</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ItemNode
