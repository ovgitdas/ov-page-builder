/**
 * @fileoverview This file defines the main layout and orchestrator for the Tag Builder UI.
 * It assembles the navigation, view, and properties panels into a single page.
 */
"use client"
import React from "react"
import { useTagStore } from "./tag_zustand"
import { TagProperties } from "./TagProperties"
import TagNode from "./TagNode"
import { TagNavNode } from "./TagNavNode"

/**
 * The main page component for the Tag Builder application.
 * It orchestrates the layout, including the navigation pane,
 * the view space for rendering components, and the properties panel.
 *
 * @returns {JSX.Element} The rendered Tag Builder page.
 */
const TagBuilderPage = () => {
  const { page, selectedTag } = useTagStore()
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation Pane */}
      <aside className="w-1/4 bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Components
        </h2>
        <div className="space-y-2 p-4 rounded-sm bg-slate-100 dark:bg-gray-700 h-full">
          <TagNavNode tag={page.root} level={0} />
        </div>
      </aside>

      {/* View Space */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">View</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <TagNode tag={page.root} />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold">Selected Component Details:</h3>
          <pre className="bg-gray-800 text-white p-4 rounded-md mt-2 overflow-x-auto">
            {JSON.stringify(selectedTag, null, 2) || "None"}
          </pre>
        </div>
      </main>

      {/* Properties Panel */}
      <aside className="w-1/4 bg-white border-l p-4">
        <TagProperties />
      </aside>
    </div>
  )
}

export default TagBuilderPage
