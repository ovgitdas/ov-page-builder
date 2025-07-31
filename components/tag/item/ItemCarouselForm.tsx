/**
 * @fileoverview Form for inputting ItemCarousel data.
 */
"use client";
import React from "react";
import { useTagStore } from "../tag_zustand";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderByList } from "../tag";

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
          <Label htmlFor="item-carousel-search-text">Search text</Label>
          <Input
            id="item-carousel-search-text"
            value={selectedTag.children.itemCarousel.searchText}
            onChange={(e) => {
              updateChildren({
                itemCarousel: {
                  ...itemCarousel,
                  searchText: e.target.value,
                },
              });
            }}
            placeholder="Item search text"
            className="bg-white"
          />
        </div>
        <div>
          <Label htmlFor="item-carousel-limit">Total items</Label>
          <Input
            id="item-carousel-limit"
            value={`${selectedTag.children.itemCarousel.limit}`}
            onChange={(e) => {
              updateChildren({
                itemCarousel: {
                  ...itemCarousel,
                  limit: +e.target.value,
                },
              });
            }}
            placeholder="Total items to be shown"
            className="bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Label htmlFor="item-carousel-order-by">View by</Label>
          <Select
            defaultValue={selectedTag.children.itemCarousel.orderBy}
            value={selectedTag.children.itemCarousel.orderBy}
            onValueChange={(orderBy: (typeof OrderByList)[number]) => {
              updateChildren({
                itemCarousel: {
                  ...itemCarousel,
                  orderBy,
                },
              });
            }}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="View by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {OrderByList.map((orderBy, index) => (
                  <SelectItem key={index} value={orderBy}>
                    {orderBy}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
