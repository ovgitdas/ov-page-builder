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
import { FlexStyle, flex } from "./display-style-data";
import Card from "../Card";

const FlexStyleForm: React.FC<{
  style?: FlexStyle;
  onChange: (style: FlexStyle) => void;
}> = memo(({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<FlexStyle>({});

  useEffect(() => {
    setStyleInput(style || {});
  }, [style]);

  const _setStyleInput = (newStyle: FlexStyle) => {
    setStyleInput(newStyle);
    onChange(newStyle);
  };

  console.log("flex-style");

  return (
    <Card>
      {/* Configuration Section */}
      <div className="grid grid-cols-2 gap-1">
        {/* FlexStyle Direction */}
        <div>
          <Label className="text-xs">Direction</Label>
          <Select
            onValueChange={(value: (typeof flex.flexDirection)[number]) =>
              _setStyleInput({ ...styleInput, flexDirection: value })
            }
            defaultValue={(styleInput ? styleInput.flexDirection : "") || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a direction" />
            </SelectTrigger>
            <SelectContent>
              {flex.flexDirection.map((direction) => (
                <SelectItem key={direction} value={direction}>
                  {direction}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* FlexStyle Wrap */}
        <div>
          <Label className="text-xs">Wrap</Label>
          <Select
            onValueChange={(value: (typeof flex.flexWrap)[number]) =>
              _setStyleInput({ ...styleInput, flexWrap: value })
            }
            defaultValue={(styleInput ? styleInput.flexWrap : "") || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a wrap option" />
            </SelectTrigger>
            <SelectContent>
              {flex.flexWrap.map((wrap) => (
                <SelectItem key={wrap} value={wrap}>
                  {wrap}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* Justify Content */}
        <div>
          <Label className="text-xs">Justify Content</Label>
          <Select
            onValueChange={(value: (typeof flex.justifyContent)[number]) =>
              _setStyleInput({ ...styleInput, justifyContent: value })
            }
            defaultValue={(styleInput ? styleInput.justifyContent : "") || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select justification" />
            </SelectTrigger>
            <SelectContent>
              {flex.justifyContent.map((justify) => (
                <SelectItem key={justify} value={justify}>
                  {justify}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Align Items */}
        <div>
          <Label className="text-xs">Align Items</Label>
          <Select
            onValueChange={(value: (typeof flex.alignItems)[number]) =>
              _setStyleInput({ ...styleInput, alignItems: value })
            }
            defaultValue={(styleInput ? styleInput.alignItems : "") || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an alignment" />
            </SelectTrigger>
            <SelectContent>
              {flex.alignItems.map((align) => (
                <SelectItem key={align} value={align}>
                  {align}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* Align Content */}
        <div>
          <Label className="text-xs">Align Content</Label>
          <Select
            onValueChange={(value: (typeof flex.alignContent)[number]) =>
              _setStyleInput({ ...styleInput, alignContent: value })
            }
            defaultValue={(styleInput ? styleInput.alignContent : "") || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select content alignment" />
            </SelectTrigger>
            <SelectContent>
              {flex.alignContent.map((align) => (
                <SelectItem key={align} value={align}>
                  {align}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gap */}
        <div>
          <Label className="text-xs">Gap</Label>
          <Input
            value={styleInput.gap || ""}
            onChange={(e) =>
              _setStyleInput({ ...styleInput, gap: e.target.value })
            }
            placeholder="e.g., 16px or 1rem"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* FlexStyle Grow */}
        <div>
          <Label className="text-xs">Grow</Label>
          <Input
            value={styleInput.flexGrow || ""}
            onChange={(e) =>
              _setStyleInput({ ...styleInput, flexGrow: e.target.value })
            }
            placeholder="e.g., 1 or 0"
          />
        </div>

        {/* FlexStyle Shrink */}
        <div>
          <Label className="text-xs">Shrink</Label>
          <Input
            value={styleInput.flexShrink || ""}
            onChange={(e) =>
              _setStyleInput({ ...styleInput, flexShrink: e.target.value })
            }
            placeholder="e.g., 1 or 0"
          />
        </div>
      </div>
    </Card>
  );
});

export default FlexStyleForm;
