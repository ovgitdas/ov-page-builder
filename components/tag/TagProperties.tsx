"use client"

import { useTagStore } from "./tag_zustand"
import { Button } from "@/components/ui/button"
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
import { Input } from "../ui/input"
import { UndoIcon } from "../icons/UndoIcon"
import { RedoIcon } from "../icons/RedoIcon"
import { WrapIcon } from "../icons/WrapIcon"
import { UnwrapIcon } from "../icons/UnwrapIcon"
import { DeleteIcon } from "../icons/DeleteIcon"
import { AppendIcon } from "../icons/AppendIcon"
import { CloneIcon } from "../icons/CloneIcon"
import ItemCarouselForm from "./ItemCarouselForm"
import { useViewPort } from "./viewport_zustand"

export const TagProperties = () => {
  const {
    page,
    selectedTag,
    history,
    undo_history,
    undo,
    redo,
    setName,
    wrap,
    unWrap,
    deleteTag,
    append,
    clone,
    setStyle,
    changeChildrenType,
    updateChildren,
  } = useTagStore()
  const { deviceType } = useViewPort()

  if (!selectedTag) {
    return <div>No tag selected</div>
  }

  return (
    <div className="space-y-4 p-2">
      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" disabled={history.length === 0} onClick={undo}>
          <UndoIcon />
          <div className="text-xs">Undo</div>
        </Button>
        <Button size="sm" disabled={undo_history.length === 0} onClick={redo}>
          <RedoIcon />
          <div className="text-xs">Redo</div>
        </Button>
      </div>
      <div className="bg-slate-200 p-4 rounded-sm flex flex-col gap-4">
        <div>
          <h3 className="text-base font-medium">
            Properties of{" "}
            <i className="text-slate-600">(ID: {selectedTag.id})</i>
          </h3>
          <div>
            <Input
              className="bg-white"
              disabled={page.root.id === selectedTag.id}
              id="name"
              value={selectedTag.name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            disabled={page.root.id === selectedTag.id}
            onClick={wrap}
          >
            <WrapIcon />
            <div className="text-xs">Wrap</div>
          </Button>
          <Button
            size="sm"
            disabled={page.root.id === selectedTag.id}
            onClick={unWrap}
          >
            <UnwrapIcon />
            <div className="text-xs">Unwrap</div>
          </Button>
          <Button
            size="sm"
            disabled={page.root.id === selectedTag.id}
            onClick={deleteTag}
            variant="destructive"
          >
            <DeleteIcon />
            <div className="text-xs">Delete</div>
          </Button>
          <Button
            size="sm"
            disabled={page.root.id === selectedTag.id}
            onClick={clone}
          >
            <CloneIcon />
            <div className="text-xs">Clone</div>
          </Button>
        </div>
        <div>
          <Label htmlFor="style">PC Style</Label>
          <Textarea
            id="style"
            value={selectedTag.pcStyle || ""}
            onChange={(e) => setStyle(e.target.value, "pc")}
            className="bg-white"
          />
        </div>
        {deviceType === "tab" && (
          <div>
            <Label htmlFor="tabStyle">Tablet Style</Label>
            <Textarea
              disabled={deviceType !== "tab"}
              id="tabStyle"
              value={selectedTag.tabStyle || ""}
              onChange={(e) => setStyle(e.target.value, "tab")}
              className="bg-yellow-100"
            />
          </div>
        )}
        {deviceType === "mob" && (
          <div>
            <Label htmlFor="mobStyle">Mobile Style</Label>
            <Textarea
              disabled={deviceType !== "mob"}
              id="mobStyle"
              value={selectedTag.mobStyle || ""}
              onChange={(e) => setStyle(e.target.value, "mob")}
              className="bg-yellow-100"
            />
          </div>
        )}
        {deviceType === "wide" && (
          <div>
            <Label htmlFor="wideStyle">Wide Style</Label>
            <Textarea
              disabled={deviceType !== "wide"}
              id="wideStyle"
              value={selectedTag.wideStyle || ""}
              onChange={(e) => setStyle(e.target.value, "wide")}
              className="bg-yellow-100"
            />
          </div>
        )}
        {deviceType === "ultra" && (
          <div>
            <Label htmlFor="ultraStyle">Ultra Style</Label>
            <Textarea
              disabled={deviceType !== "ultra"}
              id="ultraStyle"
              value={selectedTag.ultraStyle || ""}
              onChange={(e) => setStyle(e.target.value, "ultra")}
              className="bg-yellow-100"
            />
          </div>
        )}
        <div className="flex gap-2 justify-center items-center">
          <Select
            onValueChange={(value: TagChildrenType) =>
              changeChildrenType(value)
            }
          >
            <SelectTrigger id="childrenType" className="bg-white">
              <SelectValue placeholder="Select children type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tags">Tags</SelectItem>
              <SelectItem
                disabled={page.root.id === selectedTag.id}
                value="text"
              >
                Text
              </SelectItem>
              <SelectItem
                disabled={page.root.id === selectedTag.id}
                value="imageCarousel"
              >
                Image Carousel
              </SelectItem>
              <SelectItem
                disabled={page.root.id === selectedTag.id}
                value="itemCarousel"
              >
                Item Carousel
              </SelectItem>
              <SelectItem
                disabled={page.root.id === selectedTag.id}
                value="linkImage"
              >
                Link Image
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            disabled={
              !selectedTag.children ||
              "text" in selectedTag.children ||
              "itemCarousel" in selectedTag.children ||
              "linkImage" in selectedTag.children
            }
            onClick={append}
          >
            <AppendIcon />
            <div>Append</div>
          </Button>
        </div>
      </div>
      <div className="bg-yellow-200 p-4 rounded-sm flex flex-col gap-4">
        {selectedTag.children && "text" in selectedTag.children ? (
          <div>
            <Label htmlFor="children">Children (JSON)</Label>
            <Textarea
              id="children"
              value={selectedTag.children.text || ""}
              onChange={(e) => {
                updateChildren({ text: e.target.value })
              }}
              className="bg-white"
            />
          </div>
        ) : selectedTag.children && "itemCarousel" in selectedTag.children ? (
          <ItemCarouselForm
            carousel={selectedTag.children.itemCarousel}
            onUpdate={(newCarousel) => {}}
          />
        ) : selectedTag.children && "linkImage" in selectedTag.children ? (
          <p className="text-muted-foreground">
            Link Image children cannot be edited directly here.
          </p>
        ) : selectedTag.children && "imageCarousel" in selectedTag.children ? (
          <p className="text-muted-foreground">
            Image Carousel children cannot be edited directly here.
          </p>
        ) : selectedTag.children ? (
          <p className="text-muted-foreground">Selected tag has no children.</p>
        ) : (
          <p className="text-muted-foreground">No text children to display.</p>
        )}
      </div>
    </div>
  )
}
