/**
 * @fileoverview Zustand store for managing the state of the Tag Builder page.
 * This includes the page structure, the currently selected tag, and actions
 * for manipulating the state, such as selecting a tag or updating its properties.
 */

import { create } from "zustand"
import { Page, Tag, TagChildren, TagChildrenType } from "./tag"
import { DeviceType } from "./viewport_zustand"

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
  name: `Copy of ${tag.name}`,
  children: !!tag.children
    ? "tags" in tag.children
      ? tag.children.tags.map(cloneTag)
      : JSON.parse(JSON.stringify(tag.children))
    : undefined,
  pcStyle: !!tag.pcStyle ? JSON.parse(JSON.stringify(tag.pcStyle)) : undefined,
  mobStyle: !!tag.mobStyle
    ? JSON.parse(JSON.stringify(tag.mobStyle))
    : undefined,
  tabStyle: !!tag.tabStyle
    ? JSON.parse(JSON.stringify(tag.tabStyle))
    : undefined,
  wideStyle: !!tag.wideStyle
    ? JSON.parse(JSON.stringify(tag.wideStyle))
    : undefined,
  ultraStyle: !!tag.ultraStyle
    ? JSON.parse(JSON.stringify(tag.ultraStyle))
    : undefined,
})

/**
 * `useTagStore` is a custom hook for accessing the tag builder's state and actions.
 * It manages the entire `Page` object, tracks the currently selected `Tag`,
 * and provides functions to modify the state.
 *
 */
export const useTagStore = create<{
  page: Page
  selectedTag: Tag | null
  history: Array<{ page: Page; selectedTag: Tag | null }>
  undo_history: Array<{ page: Page; selectedTag: Tag | null }>

  setSelectedTag: (id?: number) => void
  setName(name: string): void
  undo(): void
  redo(): void

  /** Actions for manipulating the page structure */
  /** Wraps a tag in a new tag, creating a parent-child relationship. */
  wrap: () => void
  /** Unwraps a tag, moving it out of its parent tag. */
  unWrap: () => void
  /** Deletes a tag from the page structure. */
  deleteTag: () => void
  /** Appends a new tag as a child of the specified tag. */
  append: () => void
  /** Appends a new tag as a child of the specified tag. */
  clone: () => void
  /** Sets the style for a tag. */
  setStyle: (style: string, deviceType: DeviceType) => void
  /** Changes the type of children for a tag. */
  changeChildrenType: (type: TagChildrenType) => void
  /** Updates the children of a tag. */
  updateChildren: (children: TagChildren) => void
}>()((set, get) => ({
  page: { name: "Home", root: { id: getNewId(), name: "root" } },
  selectedTag: null,
  history: [],
  undo_history: [],

  undo() {
    const { history, page, selectedTag, undo_history } = get()
    const _undo_history = JSON.parse(JSON.stringify({ page, selectedTag }))
    if (history.length === 0) return
    const { page: _page, selectedTag: _selectedTag } = history.pop()!
    set({
      page: _page,
      selectedTag: _selectedTag,
      undo_history: [...undo_history, _undo_history],
      history: history,
    })
  },

  redo() {
    const { undo_history, page, selectedTag, history } = get()
    const _history = JSON.parse(JSON.stringify({ page, selectedTag }))
    if (undo_history.length === 0) return
    const { page: _page, selectedTag: _selectedTag } = undo_history.pop()!
    set({
      page: _page,
      selectedTag: _selectedTag,
      history: [...history, _history],
      undo_history: undo_history,
    })
  },

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

  setName(name: string) {
    const { page, selectedTag } = get()
    if (!selectedTag || page.root.id === selectedTag.id) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    tag.name = name
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(id, [_page.root])
    set({ page: _page, selectedTag: _selectedTag })
  },

  wrap() {
    const { page, selectedTag, history } = get()
    const _history = JSON.parse(JSON.stringify({ page, selectedTag }))
    if (!selectedTag || page.root.id === selectedTag.id) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    const tags = [JSON.parse(JSON.stringify(tag))]
    tag.id = getNewId()
    tag.name = `New div ${tag.id}`
    tag.children = { tags }
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(id, [_page.root])
    set({
      page: _page,
      selectedTag: _selectedTag,
      history: [...history, _history],
    })
  },

  unWrap() {
    const { page, selectedTag, history } = get()
    const _history = JSON.parse(JSON.stringify({ page, selectedTag }))
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
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(id, [_page.root])
    set({
      page: _page,
      selectedTag: _selectedTag,
      history: [...history, _history],
    })
  },

  deleteTag() {
    const { page, selectedTag, history } = get()
    const _history = JSON.parse(JSON.stringify({ page, selectedTag }))
    if (!selectedTag || page.root.id === selectedTag.id) return
    const { id } = selectedTag
    const parentTag = findParentTag(id, page.root)
    if (!parentTag || !parentTag.children || !("tags" in parentTag.children))
      return
    const index = parentTag.children.tags.findIndex((tag) => tag.id === id)
    if (index < 0) return
    parentTag.children.tags.splice(index, 1)
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(parentTag.id, [_page.root])
    set({
      page: _page,
      selectedTag: _selectedTag,
      history: [...history, _history],
    })
  },

  append() {
    const { page, selectedTag, history } = get()
    const _history = JSON.parse(JSON.stringify({ page, selectedTag }))
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag || !tag.children) return
    if ("tags" in tag.children) {
      const newId = getNewId()
      tag.children.tags.push({
        id: newId,
        name: `New div ${newId}`,
        children: { text: `New div ${newId}` },
      })
    } else if ("imageCarousel" in tag.children) {
      tag.children.imageCarousel.linkImages.push({
        src: "https://yourLink.com/image.jpg",
        alt: "Placeholder Image",
        href: "#",
      })
    }
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(id, [_page.root])
    set({
      page: _page,
      selectedTag: _selectedTag,
      history: [...history, _history],
    })
  },

  clone() {
    const { page, selectedTag, history } = get()
    const _history = JSON.parse(JSON.stringify({ page, selectedTag }))
    if (!selectedTag) return
    const { id } = selectedTag
    const parentTag = findParentTag(id, page.root)
    if (!parentTag || !parentTag.children) return
    if ("tags" in parentTag.children) {
      const clone = cloneTag(selectedTag)
      parentTag.children.tags.push(clone)
      const _page = JSON.parse(JSON.stringify(page))
      const _selectedTag = findTag(id, [_page.root])
      set({
        page: _page,
        selectedTag: _selectedTag,
        history: [...history, _history],
      })
    }
  },

  setStyle(style: string, deviceType: DeviceType) {
    const { page, selectedTag } = get()
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    tag.pcStyle = deviceType === "pc" ? style : tag.pcStyle
    tag.wideStyle = deviceType === "wide" ? style : tag.wideStyle
    tag.ultraStyle = deviceType === "ultra" ? style : tag.ultraStyle
    tag.mobStyle = deviceType === "mob" ? style : tag.mobStyle
    tag.tabStyle = deviceType === "tab" ? style : tag.tabStyle
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(id, [_page.root])
    set({ page: _page, selectedTag: _selectedTag })
  },

  changeChildrenType(type: TagChildrenType) {
    const { page, selectedTag, history } = get()
    const _history = JSON.parse(JSON.stringify({ page, selectedTag }))
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    switch (type) {
      case "text":
        if (!!tag.children && "text" in tag.children) return
        tag.children = { text: "New text" }
        break
      case "tags":
        if (!!tag.children && "tags" in tag.children) return
        const newId = getNewId()
        tag.children = {
          tags: [
            {
              id: newId,
              name: `New div ${newId}`,
              children: { text: `New div ${newId}` },
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
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(id, [_page.root])
    set({
      page: _page,
      selectedTag: _selectedTag,
      history: [...history, _history],
    })
  },

  updateChildren(children: TagChildren) {
    const { page, selectedTag } = get()
    if (!selectedTag) return
    const { id } = selectedTag
    const tag = findTag(id, [page.root])
    if (!tag) return
    tag.children = children
    const _page = JSON.parse(JSON.stringify(page))
    const _selectedTag = findTag(id, [_page.root])
    set({ page: _page, selectedTag: _selectedTag })
  },
}))

export const getStyle = (tag: Tag, deviceType: DeviceType): string => {
  return (
    (deviceType === "mob"
      ? tag.mobStyle || tag.tabStyle
      : deviceType === "tab"
      ? tag.tabStyle || tag.mobStyle
      : deviceType === "wide"
      ? tag.wideStyle || tag.ultraStyle
      : deviceType === "ultra"
      ? tag.ultraStyle || tag.wideStyle
      : tag.pcStyle) ||
    tag.pcStyle ||
    tag.tabStyle ||
    tag.mobStyle ||
    tag.wideStyle ||
    tag.ultraStyle ||
    ""
  )
}
