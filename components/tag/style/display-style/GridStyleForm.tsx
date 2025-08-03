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
  GridStyle,
  grid,
  gridTemplateAreasValues,
  gridTemplateColumnsValues,
  gridTemplateRowsValues,
} from "./display-style-data";
import Card from "../Card";
import DatalistInput from "../DatalistInput";
import { deepEqual } from "../../util";

const GridStyleForm: React.FC<{
  style?: GridStyle;
  onChange: (style: GridStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<GridStyle>({});

  useEffect(() => {
    const _style = style || {};
    if (!deepEqual(_style, styleInput)) {
      setStyleInput(_style || {});
    }
  }, [style]);

  const _setStyleInput = async (_styleInput: GridStyle) => {
    const _style = style || {};
    if (!deepEqual(_styleInput, styleInput)) setStyleInput(_styleInput);
    if (!deepEqual(_styleInput, _style)) onChange(_styleInput);
  };

  return (
    <Card>
      {/* Configuration Section */}
      <div className="grid grid-cols-2 gap-1">
        {/* GridStyle Template Columns */}
        <div className="space-y-2">
          <DatalistInput
            id="gridTemplateColumns"
            label="Columns"
            value={styleInput.gridTemplateColumns || ""}
            onChange={(value) =>
              _setStyleInput({
                ...styleInput,
                gridTemplateColumns: value,
              })
            }
            placeholder="e.g., 1fr 2fr 1fr"
            options={gridTemplateColumnsValues}
          />
        </div>
        {/* GridStyle Template Rows */}
        <div className="space-y-2">
          <DatalistInput
            id="gridTemplateRows"
            label="Rows"
            value={styleInput.gridTemplateRows || ""}
            onChange={(value) =>
              _setStyleInput({
                ...styleInput,
                gridTemplateRows: value,
              })
            }
            placeholder="e.g., 100px auto"
            options={gridTemplateRowsValues}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* GridStyle Template Areas */}
        <div className="space-y-2">
          <DatalistInput
            id="gridTemplateAreas"
            label="Areas"
            value={styleInput.gridTemplateAreas || ""}
            onChange={(value) =>
              _setStyleInput({
                ...styleInput,
                gridTemplateAreas: value,
              })
            }
            placeholder="e.g., 'header main footer'"
            options={gridTemplateAreasValues}
          />
        </div>
        {/* GridStyle Gap */}
        <div className="space-y-2">
          <DatalistInput
            id="gridGap"
            label="Grid gap"
            value={styleInput.gridGap || ""}
            onChange={(value) =>
              _setStyleInput({ ...styleInput, gridGap: value })
            }
            placeholder="e.g., 1rem"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {/* Row Gap */}
        <div className="space-y-2">
          <DatalistInput
            id="rowGap"
            label="Row gap"
            value={styleInput.rowGap || ""}
            onChange={(value) =>
              _setStyleInput({ ...styleInput, rowGap: value })
            }
            placeholder="e.g., 10px"
          />
        </div>
        {/* Column Gap */}
        <div className="space-y-2">
          <DatalistInput
            id="columnGap"
            label="Column gap"
            value={styleInput.columnGap || ""}
            onChange={(value) =>
              _setStyleInput({ ...styleInput, columnGap: value })
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
};

export default GridStyleForm;
