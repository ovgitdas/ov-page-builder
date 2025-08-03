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
import FlexItemStyleForm from "./FlexItemStyleForm";
import GridItemStyleForm from "./GridItemStyleForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { deepEqual } from "../../util";

const DisplayStyleForm: React.FC<{
  style?: DisplayStyle;
  onChange: (style: DisplayStyle) => void;
}> = ({ style, onChange }) => {
  const [styleInput, setStyleInput] = useState<DisplayStyle>({});

  useEffect(() => {
    if (!deepEqual(style, styleInput)) {
      setStyleInput(style || {});
    }
  }, [style]);

  useEffect(() => {
    onChange(styleInput);
  }, [styleInput]);

  console.log("deisplay-style");

  return (
    <div className="flex flex-col gap-2">
      <Accordion type="single" collapsible className="w-full" defaultValue="">
        <AccordionItem value="flex-item" className="border-none">
          <AccordionTrigger className="font-bold text-gray-400 hover:no-underline p-2">
            Only if parent is flex
          </AccordionTrigger>
          <AccordionContent>
            {/* FlexItemStyle */}
            <FlexItemStyleForm
              style={styleInput.flexItem}
              onChange={(style) =>
                setStyleInput({ ...styleInput, flexItem: style })
              }
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="grid-item" className="border-none">
          <AccordionTrigger className="font-bold text-gray-400 hover:no-underline p-2">
            Only if parent is grid
          </AccordionTrigger>
          <AccordionContent>
            {/* GridItemStyle */}
            <GridItemStyleForm
              style={styleInput.gridItem}
              onChange={(style) =>
                setStyleInput({ ...styleInput, gridItem: style })
              }
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Card>
        {/* DisplayStyle */}
        <div className="space-y-2">
          <Label className="text-xs">Display</Label>
          <Select
            onValueChange={(value: (typeof display)[number]) =>
              setStyleInput({ ...styleInput, display: value })
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
            onChange={(style) => setStyleInput({ ...styleInput, flex: style })}
          />
        ) : (
          <></>
        )}
        {styleInput.display === "grid" ? (
          <GridStyleForm
            style={styleInput.grid}
            onChange={(style) => setStyleInput({ ...styleInput, grid: style })}
          />
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default DisplayStyleForm;
