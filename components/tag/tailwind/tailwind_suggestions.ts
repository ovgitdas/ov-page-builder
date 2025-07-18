/**
 * @fileoverview This file contains the pre-generated list of Tailwind CSS classes
 * based on the `safelist` configuration. This is used to provide suggestions
 * in the class name input component.
 */

const baseClasses = [
  // Colors
  "bg-slate-50",
  "bg-red-500",
  "bg-blue-800/90",
  "text-black",
  "text-slate-200",
  "text-white",
  "border-blue-600",
  "ring-blue-500",

  // Borders & Rounded
  "rounded-sm",
  "rounded-md",
  "rounded-lg",
  "rounded-full",
  "border-0",
  "border",
  "border-2",
  "border-4",
  "border-solid",
  "border-dashed",

  // Effects
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "backdrop-blur-sm",
  "backdrop-blur-md",

  // Flex & Grid
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "flex-row",
  "flex-row-reverse",
  "flex-col",
  "flex-col-reverse",
  "justify-start",
  "justify-end",
  "justify-center",
  "justify-between",
  "justify-around",
  "justify-evenly",
  "items-start",
  "items-end",
  "items-center",
  "items-baseline",
  "items-stretch",
  "gap-1",
  "gap-2",
  "gap-4",
  "gap-8",
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-12",
  "col-span-1",
  "col-span-2",
  "row-span-1",
  "row-span-2",
  "space-x-1",
  "space-x-2",
  "space-y-1",
  "space-y-2",

  // Spacing (Padding & Margin)
  "p-0",
  "p-1",
  "p-2",
  "p-4",
  "p-8",
  "px-1",
  "py-2",
  "pt-4",
  "pb-8",
  "pl-2",
  "pr-4",
  "m-0",
  "m-1",
  "m-2",
  "m-4",
  "m-8",
  "mx-auto",
  "mx-1",
  "my-2",
  "mt-4",
  "mb-8",
  "ml-2",
  "mr-4",

  // Sizing
  "w-full",
  "w-screen",
  "w-1/2",
  "w-auto",
  "w-fit",
  "w-64",
  "h-full",
  "h-screen",
  "h-1/2",
  "h-auto",
  "h-fit",
  "h-64",

  // Layout
  "block",
  "inline-block",
  "inline",
  "hidden",
  "relative",
  "absolute",
  "fixed",
  "sticky",
  "top-0",
  "bottom-0",
  "left-0",
  "right-0",
  "object-contain",
  "object-cover",
  "object-fill",

  // Typography
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "font-thin",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "italic",
  "not-italic",
  "underline",
  "line-through",
  "text-left",
  "text-center",
  "text-right",
  "text-justify",

  // Transitions & Animations
  "transition",
  "transition-all",
  "duration-150",
  "duration-300",
  "duration-500",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "delay-100",
  "delay-300",
  "animate-spin",
  "animate-ping",
  "animate-pulse",

  // Interactivity
  "cursor-pointer",
  "cursor-wait",
  "cursor-not-allowed",
];

const variants = ["hover", "md", "lg"];

const generatedClasses = new Set(baseClasses);

baseClasses.forEach((baseClass) => {
  // Don't add variants to other variants or class groups that don't need them
  if (baseClass.includes(":") || baseClass.startsWith("animate-")) {
    return;
  }
  variants.forEach((variant) => {
    generatedClasses.add(`${variant}:${baseClass}`);
  });
});

const generateColorSuggestions = (prefix: string) => {
  const colorClasses = baseClasses.filter((c) => c.startsWith(prefix));
  const generated = new Set(colorClasses);

  colorClasses.forEach((baseClass) => {
    variants.forEach((variant) => {
      generated.add(`${variant}:${baseClass}`);
    });
  });

  return Array.from(generated);
};

export const tailwindSuggestionList = Array.from(generatedClasses);
export const backgroundColorSuggestions = generateColorSuggestions("bg-");
export const textColorSuggestions = generateColorSuggestions("text-");
export const borderColorSuggestions = generateColorSuggestions("border-");
