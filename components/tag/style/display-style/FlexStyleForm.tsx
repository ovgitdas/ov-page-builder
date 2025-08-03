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
import { FlexStyle, flex } from "./display-style-data";
import Card from "../Card";
import { deepEqual } from "../../util";
import DatalistInput from "../DatalistInput";

const FlexStyleForm: React.FC<{
  style?: FlexStyle;
  onChange: (style: FlexStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<FlexStyle>({});

  useEffect(() => {
    if (!deepEqual(style, styleInput)) {
      setStyleInput(style || {});
    }
  }, [style]);

  useEffect(() => {
    onChange(styleInput);
  }, [styleInput]);

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
              setStyleInput({ ...styleInput, flexDirection: value })
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
              setStyleInput({ ...styleInput, flexWrap: value })
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
              setStyleInput({ ...styleInput, justifyContent: value })
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
              setStyleInput({ ...styleInput, alignItems: value })
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
              setStyleInput({ ...styleInput, alignContent: value })
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
        <div className="space-y-2">
          <DatalistInput
            id="gap"
            label="Gap"
            value={styleInput.gap || ""}
            onChange={(value) => setStyleInput({ ...styleInput, gap: value })}
            placeholder="e.g., 16px or 1rem"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* FlexStyle Grow */}
        <div className="space-y-2">
          <DatalistInput
            id="flexGrow"
            label="Grow"
            value={styleInput.flexGrow || ""}
            onChange={(value) =>
              setStyleInput({ ...styleInput, flexGrow: value })
            }
            placeholder="e.g., 1 or 0"
          />
        </div>

        {/* FlexStyle Shrink */}
        <div className="space-y-2">
          <DatalistInput
            id="flexShrink"
            label="Shrink"
            value={styleInput.flexShrink || ""}
            onChange={(value) =>
              setStyleInput({ ...styleInput, flexShrink: value })
            }
            placeholder="e.g., 1 or 0"
          />
        </div>
      </div>
    </Card>
  );
};

export default FlexStyleForm;
