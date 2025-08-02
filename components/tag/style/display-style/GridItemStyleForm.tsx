"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GridItemStyle, gridItem } from "./display-style-data";

const GridItemStyleForm: React.FC<{
  style: GridItemStyle;
  onChange: (style: GridItemStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<GridItemStyle>({});

  useEffect(() => {
    setStyleInput(style || {});
  }, [style]);

  const _setStyleInput = (newStyle: GridItemStyle) => {
    setStyleInput(newStyle);
    onChange(newStyle);
  };

  return (
    <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
      {/* Configuration Section */}
      <Card className="rounded-xl shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Grid Item Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Grid Column */}
          <div className="space-y-2">
            <Label>Grid Column</Label>
            <Input
              value={styleInput.gridColumn || ""}
              onChange={(e) =>
                _setStyleInput({
                  ...styleInput,
                  gridColumn: e.target.value,
                })
              }
              placeholder="e.g., 2 / 4"
            />
          </div>

          {/* Grid Row */}
          <div className="space-y-2">
            <Label>Grid Row</Label>
            <Input
              value={styleInput.gridRow || ""}
              onChange={(e) =>
                _setStyleInput({ ...styleInput, gridRow: e.target.value })
              }
              placeholder="e.g., 1 / 3"
            />
          </div>

          {/* Justify Self */}
          <div className="space-y-2">
            <Label>Justify Self</Label>
            <Select
              onValueChange={(value: (typeof gridItem.justifySelf)[number]) =>
                _setStyleInput({ ...styleInput, justifySelf: value })
              }
              defaultValue={styleInput.justifySelf || "stretch"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select justification" />
              </SelectTrigger>
              <SelectContent>
                {gridItem.justifySelf.map((justify) => (
                  <SelectItem key={justify} value={justify}>
                    {justify}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Align Self */}
          <div className="space-y-2">
            <Label>Align Self</Label>
            <Select
              onValueChange={(value: (typeof gridItem.alignSelf)[number]) =>
                _setStyleInput({ ...styleInput, alignSelf: value })
              }
              defaultValue={styleInput.alignSelf || "stretch"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an alignment" />
              </SelectTrigger>
              <SelectContent>
                {gridItem.alignSelf.map((align) => (
                  <SelectItem key={align} value={align}>
                    {align}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GridItemStyleForm;
