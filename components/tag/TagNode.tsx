/**
 * @fileoverview This file contains the logic for recursively generating React components
 * from a structured `Tag` data object. This generator is the core of the dynamic page rendering engine,
 * capable of creating a component tree from a JSON-like structure. It supports rendering `div` elements
 * (which can contain text, other tags, or specialized components), `Link` with `Image`, and carousel components.
 */

import React from "react"
import { Tag } from "./tag"
import Link from "next/link"
import Image from "next/image"
import ImageCarouselComponent from "./ImageCarouselComponent"
import ItemCarouselComponent from "./ItemCarouselComponent"
import { parseStyle } from "./style/util"

interface TagNodeProps {
  tag: Tag
}

/**
 * Renders a tag node based on the provided `tag` prop.
 *
 * This component recursively renders nested tags, text, image carousels, or item carousels
 * depending on the structure of the `tag.children`. If the tag represents a link, it renders
 * a clickable image using Next.js's `Link` and `Image` components.
 *
 * @param tag - The tag object to render. The structure of the tag determines what is rendered:
 *   - If `tag.children` contains `linkImage`, it renders a linked image.
 *   - Otherwise, it renders a div with optional text, nested tags, image carousel, or item carousel.
 * @returns The rendered tag node as a React element.
 */
const TagNode = ({ tag }: TagNodeProps) => {
  if (tag.children && "linkImage" in tag.children) {
    const { href, src, alt } = tag.children.linkImage
    return (
      <Link href={href} target="_blank">
        <div className="relative w-full h-40">
          {/* Wrapper div is necessary for Next/Image with fill */}
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
      </Link>
    )
  }

  return (
    <div className={tag.className} style={parseStyle(tag.style)}>
      {tag.children && "text" in tag.children ? (
        tag.children.text
      ) : tag.children && "tags" in tag.children ? (
        tag.children.tags.map((innerTag, index) => (
          <TagNode tag={innerTag} key={index} />
        ))
      ) : tag.children && "imageCarousel" in tag.children ? (
        <ImageCarouselComponent imageCarousel={tag.children.imageCarousel} />
      ) : tag.children && "itemCarousel" in tag.children ? (
        <ItemCarouselComponent itemCarousel={tag.children.itemCarousel} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default TagNode
