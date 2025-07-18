/**
 * @fileoverview Defines the `TagNavNode` component, a recursive component used to display
 * a single node in the tag hierarchy within the Tag Builder's navigation panel.
 */
"use client"
import React, { useState } from "react"
import { Tag } from "./tag"
import { useTagStore } from "./tag_zustand"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

/**
 * Props for the TagNavNode component.
 * @interface TagNavNodeProps
 */
interface TagNavNodeProps {
  /** The tag object to render. */
  tag: Tag
  /** The nesting level of the tag, used for indentation. */
  level: number
}

/**
 * Represents a single node in the tag navigation tree.
 * It displays the tag type and handles selection.
 * If the tag has children tags, it recursively renders `TagNavNode`
 * components for its children, creating an indented tree structure.
 *
 * @param {TagNavNodeProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered TagNavNode component or null if tag is invalid.
 */
export const TagNavNode: React.FC<TagNavNodeProps> = ({ tag, level }) => {
  const { selectedTag, setSelectedTag } = useTagStore()
  const [isExpanded, setIsExpanded] = useState(true) // Default to expanded

  if (!tag) {
    return null
  }

  /** Determines if the current node is the selected one in the store. */
  const isSelected = selectedTag === tag

  const hasChildren =
    !!tag.children &&
    "tags" in tag.children &&
    Array.isArray(tag.children.tags) &&
    tag.children.tags.length > 0

  /**
   * A helper function to determine the display name of a tag.
   * @param {Tag} t - The tag to analyze.
   * @returns {string} 'div' for a container tag, or 'item' for a leaf tag.
   */
  const getTagName = (t: Tag) => {
    if (t.children && "tags" in t.children) {
      return "div"
    }
    return "item"
  }

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the setSelectedTag from firing when clicking the icon
    setIsExpanded(!isExpanded)
  }

  return (
    <div style={{ paddingLeft: `${level * 16}px` }}>
      <div
        className={cn(
          "flex items-center p-2 cursor-pointer rounded-md text-gray-800 dark:text-gray-200",
          isSelected
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
        onClick={() => setSelectedTag(tag.id)}
      >
        {hasChildren ? (
          <div onClick={handleToggleExpand} className="mr-1">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        ) : (
          <div className="w-[20px]" /> // Placeholder for alignment
        )}
        <span>{getTagName(tag)}</span>
      </div>
      {hasChildren && isExpanded && tag.children && "tags" in tag.children && (
        <div>
          {tag.children.tags.map((child, index) => (
            <TagNavNode key={child.id ?? index} tag={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
