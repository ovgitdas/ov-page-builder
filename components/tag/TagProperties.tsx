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
import { LinkImageInput } from "./link-image/LinkImageInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StyleGenerator from "./style/StyleGenerator";
import { memo } from "react";

export const TagProperties: React.FC = memo(() => {
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
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="flex gap-1">
          <TabsTrigger value="standard-screen">Standard</TabsTrigger>
          <TabsTrigger value="wide-screen">Wide</TabsTrigger>
          <TabsTrigger value="ultra-screen">Ultra</TabsTrigger>
          <TabsTrigger value="tablet-screen">Tablet</TabsTrigger>
          <TabsTrigger value="mobile-screen">Mobile</TabsTrigger>
        </TabsList>
        <TabsContent value="standard-screen">
          <StyleGenerator
            value={selectedTag.pcStyle}
            onChange={(value) => {
              setStyle(value, "pc");
            }}
          />
        </TabsContent>
        <TabsContent value="wide-screen">
          <StyleGenerator
            value={selectedTag.wideStyle}
            onChange={(value) => {
              setStyle(value, "wide");
            }}
          />
        </TabsContent>
        <TabsContent value="ultra-screen">
          <StyleGenerator
            value={selectedTag.ultraStyle}
            onChange={(value) => {
              setStyle(value, "ultra");
            }}
          />
        </TabsContent>
        <TabsContent value="tablet-screen">
          <StyleGenerator
            value={selectedTag.tabStyle}
            onChange={(value) => {
              setStyle(value, "tab");
            }}
          />
        </TabsContent>
        <TabsContent value="mobile-screen">
          <StyleGenerator
            value={selectedTag.mobStyle}
            onChange={(value) => {
              setStyle(value, "mob");
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
});
