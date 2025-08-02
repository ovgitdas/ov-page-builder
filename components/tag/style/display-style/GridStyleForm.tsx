"use client";
import React, { useState, useEffect, memo } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { GridStyle, grid } from "./display-style-data";
import Card from "../Card";

const GridStyleForm: React.FC<{
  style?: GridStyle;
  onChange: (style: GridStyle) => void;
}> = memo(({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<GridStyle>({});

  useEffect(() => {
    setStyleInput(style || {});
  }, [style]);

  const _setStyleInput = (newStyle: GridStyle) => {
    setStyleInput(newStyle);
    onChange(newStyle);
  };

  console.log("grid-style");

  return (
    <Card>
      {/* Configuration Section */}
      {/* GridStyle Template Columns */}
      <div className="space-y-2">
        <Label className="text-xs">Columns</Label>
        <Input
          value={styleInput.gridTemplateColumns || ""}
          onChange={(e) =>
            _setStyleInput({
              ...styleInput,
              gridTemplateColumns: e.target.value,
            })
          }
          placeholder="e.g., 1fr 2fr 1fr"
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* GridStyle Template Rows */}
        <div className="space-y-2">
          <Label className="text-xs">Rows</Label>
          <Input
            value={styleInput.gridTemplateRows || ""}
            onChange={(e) =>
              _setStyleInput({
                ...styleInput,
                gridTemplateRows: e.target.value,
              })
            }
            placeholder="e.g., 100px auto"
          />
        </div>
        {/* GridStyle Gap */}
        <div className="space-y-2">
          <Label className="text-xs">GridStyle Gap</Label>
          <Input
            value={styleInput.gridGap || ""}
            onChange={(e) =>
              _setStyleInput({ ...styleInput, gridGap: e.target.value })
            }
            placeholder="e.g., 1rem"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {/* Row Gap */}
        <div className="space-y-2">
          <Label className="text-xs">Row Gap</Label>
          <Input
            value={styleInput.rowGap || ""}
            onChange={(e) =>
              _setStyleInput({ ...styleInput, rowGap: e.target.value })
            }
            placeholder="e.g., 10px"
          />
        </div>
        {/* Column Gap */}
        <div className="space-y-2">
          <Label className="text-xs">Column Gap</Label>
          <Input
            value={styleInput.columnGap || ""}
            onChange={(e) =>
              _setStyleInput({ ...styleInput, columnGap: e.target.value })
            }
            placeholder="e.g., 10px"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* Justify Items */}
        <div className="space-y-2">
          <Label className="text-xs">Justify Items</Label>
          <Select
            onValueChange={(value: (typeof grid.justifyItems)[number]) =>
              _setStyleInput({ ...styleInput, justifyItems: value })
            }
            defaultValue={styleInput.justifyItems || "stretch"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select justification" />
            </SelectTrigger>
            <SelectContent>
              {grid.justifyItems.map((justify) => (
                <SelectItem key={justify} value={justify}>
                  {justify}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Align Items */}
        <div className="space-y-2">
          <Label className="text-xs">Align Items</Label>
          <Select
            onValueChange={(value: (typeof grid.alignItems)[number]) =>
              _setStyleInput({ ...styleInput, alignItems: value })
            }
            defaultValue={styleInput.alignItems || "stretch"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an alignment" />
            </SelectTrigger>
            <SelectContent>
              {grid.alignItems.map((align) => (
                <SelectItem key={align} value={align}>
                  {align}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* Justify Content */}
        <div className="space-y-2">
          <Label className="text-xs">Justify Content</Label>
          <Select
            onValueChange={(value: (typeof grid.justifyContent)[number]) =>
              _setStyleInput({ ...styleInput, justifyContent: value })
            }
            defaultValue={styleInput.justifyContent || "stretch"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select content justification" />
            </SelectTrigger>
            <SelectContent>
              {grid.justifyContent.map((justify) => (
                <SelectItem key={justify} value={justify}>
                  {justify}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Align Content */}
        <div className="space-y-2">
          <Label className="text-xs">Align Content</Label>
          <Select
            onValueChange={(value: (typeof grid.alignContent)[number]) =>
              _setStyleInput({ ...styleInput, alignContent: value })
            }
            defaultValue={styleInput.alignContent || "stretch"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select content alignment" />
            </SelectTrigger>
            <SelectContent>
              {grid.alignContent.map((align) => (
                <SelectItem key={align} value={align}>
                  {align}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
});

export default GridStyleForm;
