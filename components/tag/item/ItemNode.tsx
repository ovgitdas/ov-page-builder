"use client";
import React from "react";
import { ItemSmall } from "./item";
import ItemSmallNode from "./ItemSmallNode";

const ItemNode: React.FC<{
  item: ItemSmall;
  onLoad?: (width: number) => any;
}> = ({ item, onLoad }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current && onLoad) {
      const width = ref.current.getBoundingClientRect().width;
      onLoad(width);
    }
  }, [item, onLoad, ref]);

  return (
    <div ref={ref} className="flex justify-center items-center">
      <ItemSmallNode item={item} />
    </div>
  );
};

export default ItemNode;

export const ItemShimmer: React.FC<{ onLoad?: (width: number) => any }> = ({
  onLoad,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current && onLoad) {
      const width = ref.current.getBoundingClientRect().width;
      onLoad(width);
    }
  }, [onLoad, ref]);
  return (
    <div className="bg-slate-200/50 animate-pulse w-[100px] h-[100px] rounded-md"></div>
  );
};
