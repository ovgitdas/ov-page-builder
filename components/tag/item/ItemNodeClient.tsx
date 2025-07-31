"use client";
import React, { ReactNode } from "react";

const ItemNodeClient: React.FC<{
  children: ReactNode;
  onLoad: (width: number) => any;
}> = ({ children, onLoad }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!!ref.current) {
      const width = ref.current.getBoundingClientRect().width;
      onLoad(width);
    }
  }, [onLoad, ref]);

  return (
    <div ref={ref} className="flex justify-center items-center">
      {children}
    </div>
  );
};

export default ItemNodeClient;
