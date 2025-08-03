"use client";
import React, { ReactNode, memo } from "react";

const Card: React.FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <div className="bg-white rounded-sm p-2 border-gray-200 flex flex-col gap-2">
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
