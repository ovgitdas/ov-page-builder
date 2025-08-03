import { DisplayStyle, displayStyle } from "./display-style/display-style-data";

export const textAlignValues = ["left", "right", "center", "justify"] as const;
export const borderStyleValues = [
  "solid",
  "dotted",
  "dashed",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
  "none",
] as const;
export const fontWeightValues = [
  "normal",
  "bold",
  "bolder",
  "lighter",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;
export const fontFamilyValues = [
  "'Helvetica Neue', Helvetica, Arial, sans-serif",
  "Arial, sans-serif",
  "Verdana, Geneva, sans-serif",
  "Trebuchet, 'Trebuchet MS', sans-serif",
  "'Lucida Grande', 'Lucida Sans Unicode', Lucida, sans-serif",
  "Georgia, serif",
  "Palatino, 'Palatino Linotype', 'Book Antiqua', serif",
  "'Times New Roman', Times, serif",
  "Impact, fantasy",
  "'Comic Sans MS', cursive",
  "'Courier New', Courier, monospace",
  "'Lucida Console', Monaco, monospace",
  "'Arial Black', Gadget, sans-serif",
] as const;
export const borderRadiusValues = [
  "0",
  "4px",
  "8px",
  "16px",
  "100%",
  "50%",
] as const;
export const boxShadowValues = [
  "none",
  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
] as const;

// New constants for autocomplete suggestions with more options
export const sizingValues = [
  "auto",
  "100%",
  "50%",
  "25%",
  "100px",
  "200px",
  "500px",
  "1rem",
  "2rem",
  "inherit",
  "initial",
  "unset",
  "fit-content",
  "max-content",
  "min-content",
  "100vw",
  "100vh",
] as const;
export const spacingValues = [
  "0",
  "4px",
  "8px",
  "16px",
  "1rem",
  "2rem",
  "0.5rem",
  "inherit",
  "initial",
  "unset",
  "auto",
  "0.25rem",
  "1.5rem",
  "32px",
] as const;
export const fontSizeValues = [
  "12px",
  "14px",
  "16px",
  "18px",
  "1rem",
  "1.25rem",
  "1.5rem",
  "2rem",
  "inherit",
  "initial",
  "unset",
  "small",
  "medium",
  "large",
  "x-large",
  "xx-large",
  "smaller",
  "larger",
  "1.5em",
  "2em",
  "1.5vw",
] as const;

export const backgroundValues = [
  // Solid Colors & Transparency
  "white",
  "black",
  "red",
  "green",
  "blue",
  "transparent",
  "inherit",

  // Hex Codes
  "#f1f5f9",
  "#e2e8f0",
  "#94a3b8",
  "#1e293b",
  "#ff5733",
  "#33ff57",
  "#3357ff",

  // RGB and RGBA Formats
  "rgb(255, 0, 0)",
  "rgb(0, 128, 0)",
  "rgb(51, 102, 204)",
  "rgba(255, 0, 0, 0.5)",
  "rgba(0, 128, 0, 0.7)",
  "rgba(51, 102, 204, 0.3)",
  "rgba(0, 0, 0, 0)", // Fully transparent

  // Gradients
  "linear-gradient(to right, #3b82f6, #60a5fa)",
  "linear-gradient(to bottom, #d946ef, #a855f7)",
  "radial-gradient(circle, #facc15, #f59e0b)",

  // Background Image with Layout (shorthand: [image] [position] / [size] [repeat])
  "url('https://placehold.co/600x400/94a3b8/FFF/png') center center / cover no-repeat", // Center and scale to cover
  "url('https://placehold.co/600x400/94a3b8/FFF/png') center center / contain no-repeat", // Center and scale to contain
  "url('https://placehold.co/600x400/94a3b8/FFF/png') top left no-repeat", // Position at top left
  "url('https://placehold.co/600x400/94a3b8/FFF/png') repeat", // Repeat the image
  "url('https://placehold.co/600x400/94a3b8/FFF/png') no-repeat", // Repeat the image
  "url('https://placehold.co/600x400/94a3b8/FFF/png')", // Repeat the image
] as const;

export const colorValues = [
  // Color Keywords
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "transparent",
  "currentcolor",

  // Hex Codes
  "#f1f5f9", // Tailwind gray-100
  "#e2e8f0", // Tailwind gray-200
  "#cbd5e1", // Tailwind gray-300
  "#94a3b8", // Tailwind gray-400
  "#64748b", // Tailwind gray-500
  "#334155", // Tailwind gray-700
  "#1e293b", // Tailwind gray-800
  "#14b8a6", // Tailwind teal-500
  "#f97316", // Tailwind orange-500
  "#6366f1", // Tailwind indigo-500
  "#ff5733",
  "#33ff57",
  "#3357ff",

  // RGB and RGBA Formats
  "rgb(255, 0, 0)",
  "rgb(0, 128, 0)",
  "rgb(51, 102, 204)",
  "rgba(255, 0, 0, 0.5)",
  "rgba(0, 128, 0, 0.7)",
  "rgba(51, 102, 204, 0.3)",
  "rgba(0, 0, 0, 0)",

  // HSL and HSLA Formats
  "hsl(0, 100%, 50%)", // Pure Red
  "hsl(120, 100%, 25%)", // Dark Green
  "hsl(240, 50%, 75%)", // Light Blue
  "hsla(0, 100%, 50%, 0.5)",
  "hsla(120, 100%, 25%, 0.7)",
  "hsla(240, 50%, 75%, 0.3)",
] as const;

export interface Style {
  // Layout Properties
  display?: DisplayStyle;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;

  // Typography Properties
  fontFamily?: (typeof fontFamilyValues)[number];
  fontSize?: string;
  fontWeight?: (typeof fontWeightValues)[number];
  textAlign?: (typeof textAlignValues)[number];
  color?: string;

  // Background Properties
  background?: string;

  // Border Properties
  borderWidth?: string;
  borderStyle?: (typeof borderStyleValues)[number];
  borderColor?: string;
  borderRadius?: (typeof borderRadiusValues)[number];
  boxShadow?: (typeof boxShadowValues)[number];
}

export const styleGenerator = (style: Style) => `
  ${style.display ? `${displayStyle(style.display)}` : ""}
  ${style.width ? `width: ${style.width};` : ""}
  ${style.maxWidth ? `max-width: ${style.maxWidth};` : ""}
  ${style.minWidth ? `min-width: ${style.minWidth};` : ""}
  ${style.height ? `height: ${style.height};` : ""}
  ${style.maxHeight ? `max-height: ${style.maxHeight};` : ""}
  ${style.minHeight ? `min-height: ${style.minHeight};` : ""}
  ${style.padding ? `padding: ${style.padding};` : ""}
  ${style.paddingTop ? `padding-top: ${style.paddingTop};` : ""}
  ${style.paddingBottom ? `padding-bottom: ${style.paddingBottom};` : ""}
  ${style.paddingLeft ? `padding-left: ${style.paddingLeft};` : ""}
  ${style.paddingRight ? `padding-right: ${style.paddingRight};` : ""}
  ${style.margin ? `margin: ${style.margin};` : ""}
  ${style.marginTop ? `margin-top: ${style.marginTop};` : ""}
  ${style.marginBottom ? `margin-bottom: ${style.marginBottom};` : ""}
  ${style.marginLeft ? `margin-left: ${style.marginLeft};` : ""}
  ${style.marginRight ? `margin-right: ${style.marginRight};` : ""}
  ${style.fontFamily ? `font-family: ${style.fontFamily};` : ""}
  ${style.fontSize ? `font-size: ${style.fontSize};` : ""}
  ${style.fontWeight ? `font-weight: ${style.fontWeight};` : ""}
  ${style.textAlign ? `text-align: ${style.textAlign};` : ""}
  ${style.color ? `color: ${style.color};` : ""}
  ${style.background ? `background: ${style.background};` : ""}
  ${style.borderWidth ? `border-width: ${style.borderWidth};` : ""}
  ${style.borderStyle ? `border-style: ${style.borderStyle};` : ""}
  ${style.borderColor ? `border-color: ${style.borderColor};` : ""}
  ${style.borderRadius ? `border-radius: ${style.borderRadius};` : ""}
  ${style.boxShadow ? `box-shadow: ${style.boxShadow};` : ""}
`;
