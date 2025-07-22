/**
 * @fileoverview Form for inputting ItemCarousel data.
 */
"use client";
import React from "react";
import { Textarea } from "../../ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTagStore } from "../tag_zustand";

const ItemCarouselForm: React.FC = () => {
  const { selectedTag, updateChildren } = useTagStore();
  if (
    !!selectedTag &&
    !!selectedTag.children &&
    !!("itemCarousel" in selectedTag.children)
  ) {
    const itemCarousel = selectedTag.children.itemCarousel;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="item-carousel-query">Query</Label>
          <Textarea
            id="item-carousel-query"
            value={selectedTag.children.itemCarousel.query}
            onChange={(e) => {
              updateChildren({
                itemCarousel: {
                  ...itemCarousel,
                  query: e.target.value,
                },
              });
            }}
            placeholder="Enter SQL query"
            className="bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div>Show controller for</div>
          <div className="flex items-center space-x-2">
            <Switch
              id="pc-show-controller"
              checked={itemCarousel.pcShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  itemCarousel: {
                    ...itemCarousel,
                    pcShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="pc-show-controller">PC</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="wide-show-controller"
              checked={itemCarousel.wideShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  itemCarousel: {
                    ...itemCarousel,
                    wideShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="wide-show-controller">Wide Screen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="ultra-show-controller"
              checked={itemCarousel.ultraShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  itemCarousel: {
                    ...itemCarousel,
                    ultraShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="ultra-show-controller">Ultra Wide</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="mob-show-controller"
              checked={itemCarousel.mobShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  itemCarousel: {
                    ...itemCarousel,
                    mobShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="mob-show-controller">Mobile</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="tab-show-controller"
              checked={itemCarousel.tabShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  itemCarousel: {
                    ...itemCarousel,
                    tabShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="tab-show-controller">Tablet</Label>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default ItemCarouselForm;
