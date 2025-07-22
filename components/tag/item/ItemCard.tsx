"use client"
import React from "react"
import { Node, ItemLayout, defaultLayout } from "./ItemLayout"
import Link from "next/link"
import Image from "next/image"

export interface ImageNodeProps {
  node: Node
  itemLayout: ItemLayout
}

const DivNode: React.FC<{ node: Node; itemLayout: ItemLayout }> = ({
  node,
  itemLayout,
}) => {
  const ref = React.useRef<any>(null)
  React.useEffect(() => {
    if (ref.current) {
      const width =
        node.width === undefined || node.width === null
          ? ""
          : `width: ${node.width}px; `
      const height =
        node.height === undefined || node.height === null
          ? ""
          : `height: ${node.height}px; `
      ref.current.setAttribute("style", `${width}${height}${node.style}`)
    }
  }, [node])

  return Array.isArray(node.children) ? (
    <div ref={ref}>
      {node.children.map((child, index) => (
        <DivNode key={index} node={child} itemLayout={itemLayout} />
      ))}
    </div>
  ) : node.children.type === "image" ? (
    <Image
      ref={ref}
      src={node.children.value}
      width={node.width}
      height={node.height}
      alt={itemLayout.meta?.item_name || "Item Image"} // Use optional chaining for item_name
      onError={(e) => {
        // e.currentTarget refers to the <img> element that triggered the error
        e.currentTarget.src =
          "https://placehold.co/100x100/e0e0e0/333?text=No+Image"
      }}
      loading="lazy"
      draggable={false}
      unoptimized={true}
      fetchPriority="low"
      quality={75}
      placeholder="blur"
      blurDataURL="https://placehold.co/100x100/e0e0e0/333?text=Loading+Image"
      priority={false}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
  ) : (
    <div ref={ref}>{node.children.value}</div>
  )
}

const ItemCard: React.FC<{ itemLayout: ItemLayout }> = ({ itemLayout }) => {
  return (
    <Link href={itemLayout.link}>
      <DivNode node={itemLayout.node} itemLayout={itemLayout} />
    </Link>
  )
}

export default ItemCard

const DivNodeShimmer: React.FC<{ node: Node; itemLayout: ItemLayout }> = ({
  node,
  itemLayout,
}) => {
  const ref = React.useRef<any>(null)
  React.useEffect(() => {
    if (ref.current) {
      const width =
        node.width === undefined || node.width === null
          ? ""
          : `width: ${node.width}px; `
      const height =
        node.height === undefined || node.height === null
          ? ""
          : `height: ${node.height}px; `
      ref.current.setAttribute("style", `${width}${height}${node.style}`)
    }
  }, [node])

  return (
    <div ref={ref} className="bg-slate-200/50 animate-pulse">
      {Array.isArray(node.children) ? (
        node.children.map((child, index) => (
          <DivNodeShimmer key={index} node={child} itemLayout={itemLayout} />
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export const ItemShimmer: React.FC<{ itemLayout: ItemLayout }> = ({
  itemLayout,
}) => {
  return (
    <Link href={itemLayout.link}>
      <DivNodeShimmer node={itemLayout.node} itemLayout={itemLayout} />
    </Link>
  )
}

export const DefaultItemCard = <ItemCard itemLayout={defaultLayout} />
export const DefaultItemShimmer = <ItemShimmer itemLayout={defaultLayout} />
