/**
 * @fileoverview This file defines the main layout and orchestrator for the Tag Builder UI.
 * It assembles the navigation, view, and properties panels into a single page.
 */
"use client";
import React from "react";
import { useTagStore } from "./tag_zustand";
import { TagProperties } from "./TagProperties";
import TagNode from "./TagNode";
import { TagNavNode } from "./TagNavNode";
import ViewPort from "./ViewPort";

/**
 * The main page component for the Tag Builder application.
 * It orchestrates the layout, including the navigation pane,
 * the view space for rendering components, and the properties panel.
 *
 * @returns {JSX.Element} The rendered Tag Builder page.
 */
const TagBuilderPage = () => {
  const { page, setSelectedTag } = useTagStore();
  React.useEffect(() => {
    setSelectedTag(page.root.id);
  }, []);

  return (
    <>
      {/* <TailwindcssPreloader /> */}
      <div className="grid grid-cols-5 gap-4 w-screen h-screen bg-gray-100 dark:bg-gray-900">
        {/* Navigation Pane */}
        <aside className="bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-y-auto p-4 max-h-screen overflow-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Components
          </h2>
          <div className="space-y-2 p-4 rounded-sm bg-slate-100 dark:bg-gray-700">
            <TagNavNode tag={page.root} level={0} />
          </div>
        </aside>
        {/* View Space */}
        <main className="col-span-3 p-4 max-h-screen">
          <ViewPort>
            <TagNode tag={page.root} />
          </ViewPort>
        </main>
        {/* Properties Panel */}
        <aside className="bg-white border-l max-h-screen overflow-auto">
          <TagProperties />
        </aside>
      </div>
    </>
  );
};

export default TagBuilderPage;
