export const OrderByList = [
  "Best Match",
  "Best deals",
  "Bestselling",
  "Biggest Savings",
  "Customer Favorites",
  "Discount High to Low",
  "Exclusive",
  "Featured",
  "Highest offers",
  "Highest price",
  "Highest ratings",
  "Just In",
  "Latest",
  "Lowest price",
  "Most Popular",
  "Most Sold",
  "Most Viewed",
  "Most discounted",
  "Most liked",
  "Most recent",
  "New arrivals",
  "On Sale",
  "Popularity",
  "Price High to Low",
  "Price Low to High",
  "Recommended",
  "Relevance",
  "Recently Added",
  "Top Picks",
  "Top Rated",
  "Top Sellers",
  "Trending",
  "What's Hot",
] as const

/**
 * @fileoverview This file defines the core data structures and TypeScript interfaces
 * used for the dynamic tag-based page rendering system. These types model the
 * different components and their properties that can be rendered on a page.
 */

/**
 * Defines the properties for a carousel of items.
 * @interface ItemCarousel
 */
export interface ItemCarousel {
  /** The SQL query used to fetch the items for the carousel. */
  searchText: string
  orderBy: (typeof OrderByList)[number]
  limit: number
  /** The number of columns to display on larger screens. */
  pcShowController: boolean
  mobShowController: boolean
  tabShowController: boolean
  wideShowController: boolean
  ultraShowController: boolean
}

// Represents a linked image
export interface LinkImage {
  src: string
  alt: string
  href: string
}

/**
 * Defines the properties for a carousel of images.
 * @interface ImageCarousel
 */
export interface ImageCarousel {
  /** An array of image objects, each with a source, alt text, and link. */
  linkImages: Array<LinkImage>
  /** Whether to show the next/previous navigation controls. */
  pcShowController: boolean
  mobShowController: boolean
  tabShowController: boolean
  wideShowController: boolean
  ultraShowController: boolean
}

export type TagChildrenType =
  | "text"
  | "tags"
  | "imageCarousel"
  | "itemCarousel"
  | "linkImage"

export type TagChildren =
  | { text: string }
  | { tags: Array<Tag> }
  | { imageCarousel: ImageCarousel }
  | { itemCarousel: ItemCarousel }
  | { linkImage: LinkImage }

/**
 * Represents a single renderable element in the page structure.
 * This is a discriminated union where the `value` property determines the type of element.
 * @interface Tag
 */
export interface Tag {
  id: number
  name: string
  /** The core children of the tag, which defines what will be rendered. */
  children?: TagChildren
  /** Optional attributes for styling and identification. */
  // CSS styles
  pcStyle?: string
  mobStyle?: string
  tabStyle?: string
  wideStyle?: string
  ultraStyle?: string
}

/**
 * Represents an entire page, composed of a name and a root tag.
 * @interface Page
 */
export interface Page {
  /** The name of the page. */
  name: string
  /** The root tag of the page, which contains the entire component tree. */
  root: Tag
}
