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
import { DisplayStyle, display } from "./display-style-data";
import FlexStyleForm from "./FlexStyleForm";
import GridStyleForm from "./GridStyleForm";
import Card from "../Card";

const DisplayStyleForm: React.FC<{
  style?: DisplayStyle;
  onChange: (style: DisplayStyle) => void;
}> = memo(({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<DisplayStyle>({});

  useEffect(() => {
    setStyleInput(style || {});
  }, [style]);

  const _setStyleInput = (newStyle: DisplayStyle) => {
    setStyleInput(newStyle);
    onChange(newStyle);
  };

  console.log("deisplay-style");

  return (
    <Card>
      {/* DisplayStyle */}
      <div className="space-y-2">
        <Label className="text-xs">DisplayStyle</Label>
        <Select
          onValueChange={(value: (typeof display)[number]) =>
            _setStyleInput({ ...styleInput, display: value })
          }
          defaultValue={styleInput.display}
          value={styleInput.display}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a display value" />
          </SelectTrigger>
          <SelectContent>
            {display.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {styleInput.display === "flex" ? (
        <FlexStyleForm
          style={styleInput.flex}
          onChange={(style) => _setStyleInput({ ...styleInput, flex: style })}
        />
      ) : (
        <></>
      )}
      {styleInput.display === "grid" ? (
        <GridStyleForm
          style={styleInput.grid}
          onChange={(style) => _setStyleInput({ ...styleInput, grid: style })}
        />
      ) : (
        <></>
      )}
    </Card>
  );
});

export default DisplayStyleForm;
