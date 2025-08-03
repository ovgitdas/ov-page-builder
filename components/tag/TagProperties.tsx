"use client";
import { childrenTypes, getChildrenType, useTagStore } from "./tag_zustand";
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
import { UndoIcon } from "../icons/UndoIcon";
import { RedoIcon } from "../icons/RedoIcon";
import { WrapIcon } from "../icons/WrapIcon";
import { UnwrapIcon } from "../icons/UnwrapIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AppendIcon } from "../icons/AppendIcon";
import { CloneIcon } from "../icons/CloneIcon";
import ItemCarouselForm from "./item/ItemCarouselForm";
import { ArrowDown, ArrowUp } from "lucide-react";
import LinkImageCarouselForm from "./link-image/ImageCarouselForm";
import LinkImageInput from "./link-image/LinkImageInput";
import StyleGenerator from "./style/StyleGenerator";
import { memo, useState } from "react";
import { DeviceType } from "./device";
import { cn } from "@/lib/utils";

const TagProperties: React.FC = memo(() => {
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
    up,
    down,
    setStyle,
    changeChildrenType,
    updateChildren,
  } = useTagStore();

  const [selectedStyle, setSelectedStyle] = useState<DeviceType>("pc");

  if (!selectedTag) {
    return <div>No tag selected</div>;
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
          <Button
            size="sm"
            disabled={page.root.id === selectedTag.id}
            onClick={up}
          >
            <ArrowUp />
            <div className="text-xs">Move Up</div>
          </Button>
          <Button
            size="sm"
            disabled={page.root.id === selectedTag.id}
            onClick={down}
          >
            <ArrowDown />
            <div className="text-xs">Move Down</div>
          </Button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Select
            onValueChange={(value: TagChildrenType) =>
              changeChildrenType(value)
            }
            value={getChildrenType(selectedTag)}
          >
            <SelectTrigger id="childrenType" className="bg-white">
              <SelectValue placeholder="Select children type" />
            </SelectTrigger>
            <SelectContent>
              {childrenTypes.map((type) => (
                <SelectItem
                  disabled={
                    type.value !== "tags" && page.root.id === selectedTag.id
                  }
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </SelectItem>
              ))}
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
            <Label htmlFor="children">Text</Label>
            <Textarea
              id="children"
              value={selectedTag.children.text || ""}
              onChange={(e) => {
                updateChildren({ text: e.target.value });
              }}
              className="bg-white"
            />
          </div>
        ) : selectedTag.children && "itemCarousel" in selectedTag.children ? (
          <ItemCarouselForm />
        ) : selectedTag.children && "imageCarousel" in selectedTag.children ? (
          <LinkImageCarouselForm />
        ) : selectedTag.children && "linkImage" in selectedTag.children ? (
          <LinkImageInput
            value={selectedTag.children.linkImage}
            onChange={(linkImage) => {
              updateChildren({ linkImage });
            }}
          />
        ) : selectedTag.children ? (
          <p className="text-muted-foreground">Selected tag has no children.</p>
        ) : (
          <p className="text-muted-foreground">No text children to display.</p>
        )}
      </div>
      <div defaultValue="pc-screen" className="bg-gray-100 p-2 pb-0 rounded-sm">
        <div className="flex justify-evenly items-center gap-1 w-full text-xs">
          <div
            onClick={() => setSelectedStyle("ultra")}
            className={cn(
              selectedStyle === "ultra"
                ? "bg-blue-200 border-blue-300"
                : "bg-gray-100 border-gray-200",
              "py-1 hover:bg-white rounded-sm border border-gray-200 cursor-pointer w-full text-center duration-300 ease-in-out"
            )}
          >
            Ultra
          </div>
          <div
            onClick={() => setSelectedStyle("wide")}
            className={cn(
              selectedStyle === "wide"
                ? "bg-blue-200 border-blue-300"
                : "bg-gray-100 border-gray-200",
              "py-1 hover:bg-white rounded-sm border border-gray-200 cursor-pointer w-full text-center duration-300 ease-in-out"
            )}
          >
            Wide
          </div>
          <div
            onClick={() => setSelectedStyle("pc")}
            className={cn(
              selectedStyle === "pc"
                ? "bg-blue-200 border-blue-300"
                : "bg-gray-100 border-gray-200",
              "py-1 hover:bg-white rounded-sm border border-gray-200 cursor-pointer w-full text-center duration-300 ease-in-out"
            )}
          >
            PC
          </div>
          <div
            onClick={() => setSelectedStyle("tab")}
            className={cn(
              selectedStyle === "tab"
                ? "bg-blue-200 border-blue-300"
                : "bg-gray-100 border-gray-200",
              "py-1 hover:bg-white rounded-sm border border-gray-200 cursor-pointer w-full text-center duration-300 ease-in-out"
            )}
          >
            Tab
          </div>
          <div
            onClick={() => setSelectedStyle("mob")}
            className={cn(
              selectedStyle === "mob"
                ? "bg-blue-200 border-blue-300"
                : "bg-gray-100 border-gray-200",
              "py-1 hover:bg-white rounded-sm border border-gray-200 cursor-pointer w-full text-center duration-300 ease-in-out"
            )}
          >
            Mob
          </div>
        </div>
        <StyleGenerator
          label={
            selectedStyle === "ultra"
              ? "Ultra Wide Screen"
              : selectedStyle === "wide"
              ? "Wide Screen"
              : selectedStyle === "pc"
              ? "PC Screen"
              : selectedStyle === "tab"
              ? "Tablet Screen"
              : selectedStyle === "mob"
              ? "Mobile Screen"
              : "PC Screen"
          }
          style={selectedTag[`${selectedStyle}Style`]}
          onChange={(style) => {
            setStyle(style, selectedStyle);
          }}
        />
      </div>
    </div>
  );
});

TagProperties.displayName = "TagProperties";
export default TagProperties;
