"use client"

import { useTagStore } from "./tag_zustand"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TagChildrenType } from "./tag"

export const TagProperties = () => {
  const {
    selectedTag,
    wrap,
    unWrap,
    deleteTag,
    append,
    setClassName,
    setStyle,
    changeChildrenType,
    updateChildren,
  } = useTagStore()

  if (!selectedTag) {
    return <div>No tag selected</div>
  }

  const handleUpdateChildren = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedTag) return
    try {
      const newChildren = JSON.parse(e.target.value)
      updateChildren(newChildren)
    } catch (error) {
      console.error("Invalid JSON for children", error)
    }
  }
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-medium">
        Tag Properties (ID: {selectedTag.id})
      </h3>
      <div className="space-x-2">
        <Button onClick={wrap}>Wrap</Button>
        <Button onClick={unWrap}>Unwrap</Button>
        <Button onClick={deleteTag} variant="destructive">
          Delete
        </Button>
        <Button onClick={append}>Append</Button>
      </div>
      <div>
        <Label htmlFor="className">Class Name</Label>
        <Input
          id="className"
          value={selectedTag.className || ""}
          onChange={(e) => setClassName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="style">Style</Label>
        <Textarea
          id="style"
          value={selectedTag.style || ""}
          onChange={(e) => setStyle(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="childrenType">Children Type</Label>
        <Select
          onValueChange={(value: TagChildrenType) => changeChildrenType(value)}
        >
          <SelectTrigger id="childrenType">
            <SelectValue placeholder="Select children type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="tags">Tags</SelectItem>
            <SelectItem value="imageCarousel">Image Carousel</SelectItem>
            <SelectItem value="itemCarousel">Item Carousel</SelectItem>
            <SelectItem value="linkImage">Link Image</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="children">Children</Label>
        <Textarea
          id="children"
          rows={10}
          defaultValue={JSON.stringify(selectedTag.children, null, 2)}
          onBlur={handleUpdateChildren}
        />
      </div>
    </div>
  )
}
