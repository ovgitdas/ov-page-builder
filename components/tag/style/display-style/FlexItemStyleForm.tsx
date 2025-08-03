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
  FlexItemStyle,
  flexItem,
  flexGrowValues,
  flexShrinkValues,
  flexOrderValues,
  flexBasisValues,
} from "./display-style-data";
import Card from "../Card";
import DatalistInput from "../DatalistInput";
import { deepEqual } from "../../util";

const FlexItemStyleForm: React.FC<{
  style?: FlexItemStyle;
  onChange: (style: FlexItemStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<FlexItemStyle>({});

  useEffect(() => {
    const _style = style || {};
    if (!deepEqual(_style, styleInput)) {
      setStyleInput(_style || {});
    }
  }, [style]);

  const _setStyleInput = async (_styleInput: FlexItemStyle) => {
    const _style = style || {};
    if (!deepEqual(_styleInput, styleInput)) setStyleInput(_styleInput);
    if (!deepEqual(_styleInput, _style)) onChange(_styleInput);
  };

  return (
    <Card>
      {/* Configuration Section */}
      <div className="grid grid-cols-2 gap-1">
        {/* Flex Grow */}
        <div className="space-y-2">
          <DatalistInput
            id="flexGrow"
            label="Grow"
            value={styleInput.flexGrow || ""}
            onChange={(value) =>
              _setStyleInput({ ...styleInput, flexGrow: value })
            }
            placeholder="e.g., 1 or 0"
            options={flexGrowValues}
          />
        </div>

        {/* Flex Shrink */}
        <div className="space-y-2">
          <DatalistInput
            id="flexShrink"
            label="Shrink"
            value={styleInput.flexShrink || ""}
            onChange={(value) =>
              _setStyleInput({
                ...styleInput,
                flexShrink: value,
              })
            }
            placeholder="e.g., 1 or 0"
            options={flexShrinkValues}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {/* Flex Basis */}
        <div className="space-y-2">
          <DatalistInput
            id="flexBasis"
            label="Basis"
            value={styleInput.flexBasis || ""}
            onChange={(value) =>
              _setStyleInput({
                ...styleInput,
                flexBasis: value,
              })
            }
            placeholder="e.g., auto or 200px"
            options={flexBasisValues}
          />
        </div>

        {/* Order */}
        <div className="space-y-2">
          <DatalistInput
            id="order"
            label="Order"
            value={styleInput.order || ""}
            onChange={(value) =>
              _setStyleInput({ ...styleInput, order: value })
            }
            placeholder="e.g., 1"
            options={flexOrderValues}
          />
        </div>
      </div>

      {/* Align Self */}
      <div className="space-y-2">
        <Label className="text-xs">Align Self</Label>
        <Select
          onValueChange={(value: (typeof flexItem.alignSelf)[number]) =>
            _setStyleInput({ ...styleInput, alignSelf: value })
          }
          defaultValue={styleInput.alignSelf || "auto"}
        >
          <SelectTrigger className="w-full">
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
    </Card>
  );
};

export default FlexItemStyleForm;
