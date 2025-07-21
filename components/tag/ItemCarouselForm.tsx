/**
 * @fileoverview Form for inputting ItemCarousel data.
 */
"use client"
import React from "react"
import { ItemCarousel } from "./tag"
import { Textarea } from "../ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ItemCarouselFormProps {
  carousel: ItemCarousel
  onUpdate: (newCarousel: ItemCarousel) => void
}

const ItemCarouselForm: React.FC<ItemCarouselFormProps> = ({
  carousel,
  onUpdate,
}) => {
  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...carousel, query: e.target.value })
  }

  const handleColsChange = (value: string) => {
    const numericValue = parseInt(value, 10)
    onUpdate({ ...carousel, cols: numericValue as ItemCarousel["cols"] })
  }

  const handleShowControllerChange = (checked: boolean) => {
    onUpdate({ ...carousel, showController: checked })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="item-carousel-query">Query</Label>
        <Textarea
          id="item-carousel-query"
          value={carousel.query}
          onChange={handleQueryChange}
          placeholder="Enter SQL query"
          className="bg-white"
        />
      </div>
      <div>
        <Label htmlFor="item-carousel-cols">Columns</Label>
        <Select
          value={carousel.cols.toString()}
          onValueChange={handleColsChange}
        >
          <SelectTrigger id="item-carousel-cols">
            <SelectValue placeholder="Number of columns" />
          </SelectTrigger>
          <SelectContent>
            {[2, 3, 4, 5, 6, 12].map((col) => (
              <SelectItem key={col} value={col.toString()}>
                {col}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="item-carousel-show-controller"
          checked={carousel.showController}
          onCheckedChange={handleShowControllerChange}
        />
        <Label htmlFor="item-carousel-show-controller">Show Controller</Label>
      </div>
    </div>
  )
}

export default ItemCarouselForm
