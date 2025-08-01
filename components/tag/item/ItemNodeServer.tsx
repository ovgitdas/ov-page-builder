import React, { ReactNode } from "react";
import {
  GenericLayoutJson,
  Item,
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
  item: Item;
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
  item: Item;
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
  item: Item;
}): string =>
  `<div style="${style}">${children
    .map((child) => node({ node: child, item }))
    .join("")}</div>`;

const node = ({
  node,
  item,
}: {
  node: GenericLayoutJson.Node;
  item: Item;
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

export const ItemNode: React.FC<{
  item: Item;
}> = React.cache(({ item }): ReactNode => {
  const layout = item.gen_layout_json || defaultGenericLayoutJson;
  const __html = node({ node: layout, item });
  return (
    <Link
      href={`/item/${item.item_slug}/${item.item_id}`}
      target="_blank"
      className="hover:scale-105 transition-all duration-300 ease-in cursor-pointer"
      dangerouslySetInnerHTML={{ __html }}
    ></Link>
  );
});

export const ItemShimmer: React.FC = React.cache(() => {
  return (
    <div className="bg-slate-200 w-[233px] rounded-md p-4 flex flex-col gap-2">
      <div className="bg-gradient-to-r from-slate-300/30 to-slate-300/80 animate-pulse w-full h-48 rounded-sm"></div>
      <div className="bg-gradient-to-r from-slate-300/30 to-slate-300/80 animate-pulse w-full h-4 rounded-full"></div>
      <div className="flex flex-row gap-2">
        <div className="bg-gradient-to-r from-slate-300/30 to-slate-300/80 animate-spin h-12 w-12 rounded-full"></div>
        <div className="flex-1 flex flex-col gap-2 justify-center items-center">
          <div className="bg-gradient-to-r from-slate-300/30 to-slate-300/80 animate-pulse w-full h-4"></div>
          <div className="bg-gradient-to-r from-slate-300/30 to-slate-300/80 animate-pulse w-full h-4"></div>
        </div>
      </div>
    </div>
  );
});
