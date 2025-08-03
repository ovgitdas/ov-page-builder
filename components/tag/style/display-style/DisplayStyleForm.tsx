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
import { DisplayStyle, display } from "./display-style-data";
import FlexStyleForm from "./FlexStyleForm";
import GridStyleForm from "./GridStyleForm";
import Card from "../Card";
import { deepEqual } from "../../util";

const DisplayStyleForm: React.FC<{
  style?: DisplayStyle;
  onChange: (style: DisplayStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<DisplayStyle>({});

  useEffect(() => {
    const _style = style || {};
    if (!deepEqual(_style, styleInput)) {
      setStyleInput(_style || {});
    }
  }, [style]);

  const _setStyleInput = async (_styleInput: DisplayStyle) => {
    const _style = style || {};
    if (!deepEqual(_styleInput, styleInput)) setStyleInput(_styleInput);
    if (!deepEqual(_styleInput, _style)) onChange(_styleInput);
  };

  return (
    <div className="flex flex-col gap-2">
      <Card>
        {/* DisplayStyle */}
        <div className="space-y-2">
          <Label className="text-xs">Display</Label>
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
    </div>
  );
};

export default DisplayStyleForm;
