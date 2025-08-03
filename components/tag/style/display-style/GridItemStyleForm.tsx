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
import {
  GridItemStyle,
  gridItem,
  gridColumnValues,
  gridRowValues,
} from "./display-style-data";
import Card from "../Card";
import DatalistInput from "../DatalistInput";
import { deepEqual } from "../../util";

const GridItemStyleForm: React.FC<{
  style?: GridItemStyle;
  onChange: (style: GridItemStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<GridItemStyle>({});

  useEffect(() => {
    const _style = style || {};
    if (!deepEqual(_style, styleInput)) {
      setStyleInput(_style || {});
    }
  }, [style]);

  const _setStyleInput = async (_styleInput: GridItemStyle) => {
    const _style = style || {};
    if (!deepEqual(_styleInput, styleInput)) setStyleInput(_styleInput);
    if (!deepEqual(_styleInput, _style)) onChange(_styleInput);
  };

  return (
    <Card>
      {/* Configuration Section */}
      <div className="grid grid-cols-2 gap-1">
        {/* Grid Column */}
        <div className="space-y-2">
          <DatalistInput
            id="gridColumn"
            label="Column"
            value={styleInput.gridColumn || ""}
            onChange={(value) =>
              _setStyleInput({
                ...styleInput,
                gridColumn: value,
              })
            }
            placeholder="e.g., 2 / 4"
            options={gridColumnValues}
          />
        </div>

        {/* Grid Row */}
        <div className="space-y-2">
          <DatalistInput
            id="gridRow"
            label="Row"
            value={styleInput.gridRow || ""}
            onChange={(value) =>
              _setStyleInput({ ...styleInput, gridRow: value })
            }
            placeholder="e.g., 1 / 3"
            options={gridRowValues}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* Justify Self */}
        <div className="space-y-2">
          <Label className="text-xs">Justify Self</Label>
          <Select
            onValueChange={(value: (typeof gridItem.justifySelf)[number]) =>
              _setStyleInput({ ...styleInput, justifySelf: value })
            }
            defaultValue={styleInput.justifySelf || "stretch"}
          >
            <SelectTrigger className="w-full">
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
          <Label className="text-xs">Align Self</Label>
          <Select
            onValueChange={(value: (typeof gridItem.alignSelf)[number]) =>
              _setStyleInput({ ...styleInput, alignSelf: value })
            }
            defaultValue={styleInput.alignSelf || "stretch"}
          >
            <SelectTrigger className="w-full">
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
      </div>
    </Card>
  );
};

export default GridItemStyleForm;
