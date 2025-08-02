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
import { FlexItemStyle, flexItem } from "./display-style-data";

const FlexItemStyleForm: React.FC<{
  style?: FlexItemStyle;
  onChange: (style: FlexItemStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<FlexItemStyle>({});

  useEffect(() => {
    setStyleInput(style || {});
  }, [style]);

  const _setStyleInput = (newStyle: FlexItemStyle) => {
    setStyleInput(newStyle);
    onChange(newStyle);
  };

  return (
    <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
      {/* Configuration Section */}
      <Card className="rounded-xl shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Flex Item Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Flex Grow */}
          <div className="space-y-2">
            <Label>Flex Grow</Label>
            <Input
              value={styleInput.flexGrow || ""}
              onChange={(e) =>
                _setStyleInput({ ...styleInput, flexGrow: e.target.value })
              }
              placeholder="e.g., 1 or 0"
            />
          </div>

          {/* Flex Shrink */}
          <div className="space-y-2">
            <Label>Flex Shrink</Label>
            <Input
              value={styleInput.flexShrink || ""}
              onChange={(e) =>
                _setStyleInput({
                  ...styleInput,
                  flexShrink: e.target.value,
                })
              }
              placeholder="e.g., 1 or 0"
            />
          </div>

          {/* Flex Basis */}
          <div className="space-y-2">
            <Label>Flex Basis</Label>
            <Input
              value={styleInput.flexBasis || ""}
              onChange={(e) =>
                _setStyleInput({
                  ...styleInput,
                  flexBasis: e.target.value,
                })
              }
              placeholder="e.g., auto or 200px"
            />
          </div>

          {/* Order */}
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              value={styleInput.order || ""}
              onChange={(e) =>
                _setStyleInput({ ...styleInput, order: e.target.value })
              }
              placeholder="e.g., 1"
            />
          </div>

          {/* Align Self */}
          <div className="space-y-2">
            <Label>Align Self</Label>
            <Select
              onValueChange={(value: (typeof flexItem.alignSelf)[number]) =>
                _setStyleInput({ ...styleInput, alignSelf: value })
              }
              defaultValue={styleInput.alignSelf || "auto"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an alignment" />
              </SelectTrigger>
              <SelectContent>
                {flexItem.alignSelf.map((align) => (
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

export default FlexItemStyleForm;
