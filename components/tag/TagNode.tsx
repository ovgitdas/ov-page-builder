"use client";
/**
 * @fileoverview This file contains the logic for recursively generating React components
 * from a structured `Tag` data object. This generator is the core of the dynamic page rendering engine,
 * capable of creating a component tree from a JSON-like structure. It supports rendering `div` elements
 * (which can contain text, other tags, or specialized components), `Link` with `Image`, and carousel components.
 */

import React from "react";
import { Tag } from "./tag";
import Link from "next/link";
import Image from "next/image";
import ImageCarouselComponent from "./ImageCarouselComponent";
import ItemCarouselComponent from "./ItemCarouselComponent";
import { useViewPort } from "./viewport_zustand";
import { useTagStore } from "./tag_zustand";

interface TagNodeProps {
  tag: Tag;
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
  const ref = React.useRef<HTMLDivElement>(null);
  const { deviceType } = useViewPort();
  const { selectedTag } = useTagStore();
  const isSelected = !!selectedTag && selectedTag.id === tag.id;

  React.useEffect(() => {
    if (!!ref.current) {
      const style =
        (deviceType === "mob"
          ? tag.mobStyle
          : deviceType === "tab"
          ? tag.tabStyle
          : tag.style) ||
        tag.style ||
        tag.tabStyle ||
        tag.mobStyle ||
        "";
      ref.current.setAttribute("style", style);
    }
  }, [deviceType, ref, tag]);

  return (
    <div
      ref={ref}
      className={
        isSelected
          ? "outline-blue-400 hover:bg-blue-400 outline-4 cursor-pointer duration-300 ease-in"
          : ""
      }
      key={`tag-${tag.id}`}
      // id={`tag-${tag.id}`}
    >
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
      ) : tag.children && "linkImage" in tag.children ? (
        <Link href={tag.children.linkImage.href} target="_blank">
          <div className="relative w-full h-40">
            {/* Wrapper div is necessary for Next/Image with fill */}
            <Image
              src={tag.children.linkImage.src}
              alt={tag.children.linkImage.alt}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TagNode;
