/**
 * @fileoverview Zustand store for managing the state of the Tag Builder page.
 * This includes the page structure, the currently selected tag, and actions
 * for manipulating the state, such as selecting a tag or updating its properties.
 */

import { create } from "zustand"
import { Page, Tag, TagChildren, TagChildrenType } from "./tag"

const findTag = (id: number, tags: Array<Tag>): Tag | null => {
  if (!id || !tags) return null
  for (const tag of tags) {
    if (tag.id === id) return tag
    if (!!tag.children && "tags" in tag.children) {
      const found = findTag(id, tag.children.tags)
      if (found) return found
    }
  }
  return null // Tag not found
}

const findParentTag = (childId: number, parentTag: Tag): Tag | null => {
  if (!childId || !parentTag.children || !("tags" in parentTag.children))
    return null
  for (const child of parentTag.children.tags) {
    if (child.id === childId) return parentTag
    const found = findParentTag(childId, child)
    if (!!found) return found
  }
  return null // Tag not found
}

/**
 * Generates a new unique ID for a tag.
 * Combines the current timestamp with a random number to ensure uniqueness.
 *
 * @returns {number} A new unique ID.
 */
const getNewId = (): number => {
  return +`${new Date().getTime()}${Math.ceil(Math.random() * 100)}`
}

const cloneTag = (tag: Tag): Tag => ({
  id: getNewId(),
  children: !!tag.children
    ? "tags" in tag.children
      ? tag.children.tags.map(cloneTag)
      : JSON.parse(JSON.stringify(tag.children))
    : undefined,
  className: !!tag.className
    ? JSON.parse(JSON.stringify(tag.className))
    : undefined,
  style: !!tag.style ? JSON.parse(JSON.stringify(tag.style)) : undefined,
})

/**
 * `useTagStore` is a custom hook for accessing the tag builder's state and actions.
 * It manages the entire `Page` object, tracks the currently selected `Tag`,
 * and provides functions to modify the state.
 *
 */
export const useTagStore = create<{
  page: Page
  selectedTag?: Tag

  setSelectedTag: (id?: number) => void
  /** Actions for manipulating the page structure */
  /** Wraps a tag in a new tag, creating a parent-child relationship. */
  wrap: () => void
  /** Unwraps a tag, moving it out of its parent tag. */
  unWrap: () => void
  /** Deletes a tag from the page structure. */
  deleteTag: () => void
  /** Appends a new tag as a child of the specified tag. */
  append: () => void
  /** Sets the className for a tag. */
  setClassName: (className: string) => void
  /** Sets the style for a tag. */
  setStyle: (style: string) => void
  /** Changes the type of children for a tag. */
  changeChildrenType: (type: TagChildrenType) => void
  /** Updates the children of a tag. */
  updateChildren: (children: TagChildren) => void
}>()((set, get) => ({
  page: { name: "Home", root: { id: getNewId() } },

  setSelectedTag(id) {
    const { page } = get()
    if (!id) {
      set({ selectedTag: undefined })
      return
    }
    const tag = findTag(id, [page.root])
    if (!tag) return
    set({ selectedTag: tag })
  },

  wrap() {
    const { page, selectedTag } = get()
    if (!selectedTag || page.root.id === selectedTag.id) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    const tags = [JSON.parse(JSON.stringify(tag))]
    ;(tag.id = getNewId()), (tag.children = { tags })
    set({ page: JSON.parse(JSON.stringify(page)) })
  },

  unWrap() {
    const { page, selectedTag } = get()
    if (!selectedTag || page.root.id === selectedTag.id) return
    const { id } = selectedTag
    const parentTag = findParentTag(id, page.root)
    if (
      !parentTag ||
      parentTag.id === page.root.id ||
      !parentTag.children ||
      !("tags" in parentTag.children)
    )
      return
    const grandParentTag = findParentTag(parentTag.id, page.root)
    if (
      !grandParentTag ||
      !grandParentTag.children ||
      !("tags" in grandParentTag.children)
    )
      return
    const index = grandParentTag.children.tags.findIndex(
      (tag) => tag.id === parentTag.id
    )
    if (index < 0) return
    const tag = findTag(id, [page.root])
    if (!tag) return
    grandParentTag.children.tags.splice(index, 0, tag)
    const index2 = parentTag.children.tags.findIndex((tag) => tag.id === id)
    if (index2 < 0) return
    parentTag.children.tags.splice(index2, 1)
    set({ page: JSON.parse(JSON.stringify(page)) })
  },

  deleteTag() {
    const { page, selectedTag } = get()
    if (!selectedTag || page.root.id === selectedTag.id) return
    const { id } = selectedTag
    const parentTag = findParentTag(id, page.root)
    if (!parentTag || !parentTag.children || !("tags" in parentTag.children))
      return
    const index = parentTag.children.tags.findIndex((tag) => tag.id === id)
    if (index < 0) return
    parentTag.children.tags.splice(index, 1)
    set({ page: JSON.parse(JSON.stringify(page)) })
  },

  append() {
    const { page, selectedTag } = get()
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag || !tag.children) return
    if ("tags" in tag.children) {
      tag.children.tags.push({
        id: getNewId(),
        children: { text: "New div" },
        className:
          "bg-white p-4 text-black rounded-md border-2 border-blue-600",
      })
      set({ page: JSON.parse(JSON.stringify(page)) })
    } else if ("imageCarousel" in tag.children) {
      tag.children.imageCarousel.linkImages.push({
        src: "https://yourLink.com/image.jpg",
        alt: "Placeholder Image",
        href: "#",
      })
      set({ page: JSON.parse(JSON.stringify(page)) })
    }
  },

  setClassName(className: string) {
    const { page, selectedTag } = get()
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    tag.className = className || tag.className
    // Zustand requires a new object for state changes to be detected
    set({ page: JSON.parse(JSON.stringify(page)) })
  },

  setStyle(style: string) {
    const { page, selectedTag } = get()
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    tag.style = style || tag.style
    // Zustand requires a new object for state changes to be detected
    set({ page: JSON.parse(JSON.stringify(page)) })
  },

  changeChildrenType(type: TagChildrenType) {
    const { page, selectedTag } = get()
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    switch (type) {
      case "text":
        if (!!tag.children && "text" in tag.children) return
        tag.children = { text: "New text" }
        tag.className = "bg-white p-4 text-black"
        break
      case "tags":
        if (!!tag.children && "tags" in tag.children) return
        tag.children = {
          tags: [
            {
              id: getNewId(),
              children: { text: "New div" },
              className:
                "bg-white p-4 text-black rounded-md border-2 border-blue-600",
            },
          ],
        }
        break
      case "imageCarousel":
        if (!!tag.children && "imageCarousel" in tag.children) return
        tag.children = {
          imageCarousel: {
            linkImages: [
              {
                src: "https://yourLink.com/image.jpg",
                alt: "Placeholder Image",
                href: "#",
              },
            ],
            showController: true,
          },
        }
        break
      case "itemCarousel":
        if (!!tag.children && "itemCarousel" in tag.children) return
        tag.children = {
          itemCarousel: {
            query: "SELECT * FROM item",
            cols: 3,
            showController: true,
          },
        }
        break
      case "linkImage":
        if (!!tag.children && "linkImage" in tag.children) return
        tag.children = {
          linkImage: {
            src: "https://yourLink.com/image.jpg",
            alt: "Placeholder Image",
            href: "#",
          },
        }
        break
      default:
        return // Invalid type, do nothing
    }
  },

  updateChildren(children: TagChildren) {
    const { page, selectedTag } = get()
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    tag.children = children
    // Zustand requires a new object for state changes to be detected
    set({ page: JSON.parse(JSON.stringify(page)) })
  },
}))
