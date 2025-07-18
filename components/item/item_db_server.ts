/**
 * @fileoverview This file contains server-side actions for fetching e-commerce item data from the database.
 * It is marked with "use server" to indicate that the functions within are Next.js Server Actions.
 */
"use server"

import { execute } from "turiy-mysql"
import { ItemImage, Itemx } from "./item"

/**
 * Asynchronously loads a list of items and their associated images from the database.
 * This function performs two queries: one to fetch the items based on the provided query,
 * and a second to fetch all images for the retrieved items.
 *
 * @param {string} query - The SQL query string to select items. It should not include LIMIT or OFFSET clauses, as they are appended internally.
 * @returns {Promise<Array<Itemx>>} A promise that resolves to an array of items, each populated with its corresponding images. Returns an empty array if no items are found.
 */
export const _loadItems = async (query: string): Promise<Array<Itemx>> => {
  const items = await execute(`${query} LIMIT 20 OFFSET 0`)
  if (items.length > 0) {
    const itemxs: Array<Itemx> = items.map((item) => ({
      ...item,
      images: [],
    })) as any
    const images: Array<ItemImage> = (await execute(
      `SELECT * FROM item_image WHERE item_id IN (${itemxs
        .map((item) => `'${item.item_id}'`)
        .join(",")})`
    )) as any
    for (const image of images) {
      const index = itemxs.findIndex((item) => item.item_id === image.item_id)
      if (index >= 0) {
        itemxs[index].images.push(image)
      }
    }
    return itemxs
  }
  return []
}
