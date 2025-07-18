import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges two Tailwind CSS className strings, resolving conflicts.
 * The classes from the second string will override the first in case of a conflict.
 *
 * This function is a specific implementation using `twMerge`.
 * For more complex scenarios involving conditional classes, consider using the `cn` utility.
 *
 * @param {string} [className1=""] - The base className string.
 * @param {string} [className2=""] - The className string with overrides.
 * @returns {string} The merged and cleaned-up className string.
 */
export function mergeTailwindClasses(
  className1?: string,
  className2?: string
): string {
  return twMerge(className1, className2);
}

/**
 * A utility function to merge multiple Tailwind CSS class names, resolving conflicts
 * and handling conditional classes gracefully.
 * This is a best-practice utility for combining class names in React/Next.js components.
 *
 * @param {...ClassValue[]} inputs - A list of class names. Can be strings, objects, or arrays.
 * @returns {string} The merged and cleaned-up className string.
 *
 * @example
 * cn("bg-red-500", "p-4", { "text-white": true }, false && "m-2")
 * // => "bg-red-500 p-4 text-white"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// --- Example Usage ---

// Your example:
const className1 = "bg-white text-black rounded-md p-4";
const className2 = "text-2xl text-slate-200 bg-blue-800/90";

const mergedClassName = mergeTailwindClasses(className1, className2);

console.log(mergedClassName);
// Expected output: "rounded-md p-4 text-2xl text-slate-200 bg-blue-800/90"

// The same can be achieved with the more versatile `cn` function:
const mergedWithCn = cn(className1, className2);
console.log(mergedWithCn);
// Expected output: "rounded-md p-4 text-2xl text-slate-200 bg-blue-800/90"
