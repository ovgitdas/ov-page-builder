import React from "react";
import {
  GenericLayoutJson,
  ItemSmall,
  defaultGenericLayoutJson,
  replacePlaceholders,
} from "./item";
import Link from "next/link";

const textNode = ({
  text,
  style,
  item,
}: {
  text: string;
  style: string;
  item: ItemSmall;
}): string =>
  `<div style="${style}">${replacePlaceholders(text, item as any)}</div>`;

const imageNode = ({
  src,
  alt,
  style,
  item,
}: {
  src: string;
  alt: string;
  style: string;
  item: ItemSmall;
}): string =>
  `<img style="${style}" src="${replacePlaceholders(
    src,
    item as any
  )}" alt="${replacePlaceholders(alt, item as any)}" />`;

const containerNode = ({
  children,
  style,
  item,
}: {
  children: Array<GenericLayoutJson.Node>;
  style: string;
  item: ItemSmall;
}): string =>
  `<div style="${style}">${children
    .map((child) => node({ node: child, item }))
    .join("")}</div>`;

const node = ({
  node,
  item,
}: {
  node: GenericLayoutJson.Node;
  item: ItemSmall;
}): string => {
  const { width, height, style, value } = node;
  const widthx =
    width !== null && width !== undefined ? `width: ${width}px;` : "";
  const heightx =
    height !== null && height !== undefined ? `height: ${height}px;` : "";
  const stylex = !!style ? `${style}; ` : "";
  const _style = `${stylex} ${widthx} ${heightx}`;

  return value.type === "text"
    ? textNode({ text: value.text, style: _style, item })
    : value.type === "image"
    ? imageNode({ src: value.src, alt: value.alt, style: _style, item })
    : value.type === "container"
    ? containerNode({ style: _style, item, children: value.children })
    : "";
};

const ItemSmallNode: React.FC<{
  item: ItemSmall;
}> = ({ item }) => {
  const layout = item.gen_layout_json || defaultGenericLayoutJson;
  const __html = node({ node: layout, item });
  return (
    <div className="flex justify-center items-center">
      <Link
        href={`/item/${item.item_slug}/${item.item_id}`}
        target="_blank"
        className="hover:scale-105 transition-all duration-300 ease-in cursor-pointer"
        dangerouslySetInnerHTML={{ __html }}
      ></Link>
    </div>
  );
};

export default ItemSmallNode;
