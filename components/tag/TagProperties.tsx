"use client";

import { useTagStore } from "./tag_zustand";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TagChildrenType } from "./tag";
import { Input } from "../ui/input";

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
  } = useTagStore();

  if (!selectedTag) {
    return <div>No tag selected</div>;
  }

  const handleUpdateChildren = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedTag) return;
    try {
      const newChildren = JSON.parse(e.target.value);
      updateChildren(newChildren);
    } catch (error) {
      console.error("Invalid JSON for children", error);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Button disabled={history.length === 0} onClick={undo}>
          Undo {history.length}
        </Button>
        <Button disabled={undo_history.length === 0} onClick={redo}>
          Redo {undo_history.length}
        </Button>
      </div>
      <h3 className="text-lg font-medium">
        Tag Properties (ID: {selectedTag.id})
      </h3>
      <div>
        <Label htmlFor="name">Label</Label>
        <Input
          disabled={page.root.id === selectedTag.id}
          id="name"
          value={selectedTag.name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-x-2">
        <Button disabled={page.root.id === selectedTag.id} onClick={wrap}>
          Wrap
        </Button>
        <Button disabled={page.root.id === selectedTag.id} onClick={unWrap}>
          Unwrap
        </Button>
        <Button
          disabled={page.root.id === selectedTag.id}
          onClick={deleteTag}
          variant="destructive"
        >
          Delete
        </Button>
        <Button
          disabled={
            !selectedTag.children ||
            "text" in selectedTag.children ||
            "itemCarousel" in selectedTag.children ||
            "linkImage" in selectedTag.children
          }
          onClick={append}
        >
          Append
        </Button>
        <Button disabled={page.root.id === selectedTag.id} onClick={clone}>
          Clone
        </Button>
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
        <Label htmlFor="tabStyle">Tablet Style</Label>
        <Textarea
          id="tabStyle"
          value={selectedTag.tabStyle || ""}
          onChange={(e) => setStyle(e.target.value, "tab")}
        />
      </div>
      <div>
        <Label htmlFor="mobStyle">Mobile Style</Label>
        <Textarea
          id="mobStyle"
          value={selectedTag.mobStyle || ""}
          onChange={(e) => setStyle(e.target.value, "mob")}
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
  );
};
