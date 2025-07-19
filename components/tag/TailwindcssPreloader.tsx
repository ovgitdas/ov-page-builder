"use client";
import React from "react";

//Please include this in the main component
const TailwindcssPreloader = () => {
  return (
    <i className="invisible hidden w-0 h-0 opacity-0 absolute left-[-3000px] top-[-3000px] -z-50">
      {/* This is used to pre-load tailwindcss classes */}
      <i className="outline-blue-400 hover:bg-blue-400 outline-4 cursor-pointer duration-300 ease-in" />
    </i>
  );
};

export default TailwindcssPreloader;
