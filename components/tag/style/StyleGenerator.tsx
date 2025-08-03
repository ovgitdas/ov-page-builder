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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Style,
  backgroundValues,
  borderRadiusValues,
  borderStyleValues,
  boxShadowValues,
  colorValues,
  fontFamilyValues,
  fontSizeValues,
  fontWeightValues,
  sizingValues,
  spacingValues,
  textAlignValues,
} from "./style-data";
import DatalistInput from "./DatalistInput";
import DisplayStyleForm from "./display-style/DisplayStyleForm";
import Card from "./Card";
import { deepEqual } from "../util";
import FlexItemStyleForm from "./display-style/FlexItemStyleForm";
import GridItemStyleForm from "./display-style/GridItemStyleForm";

const StyleGenerator: React.FC<{
  label: string;
  style?: Style;
  onChange: (style: Style) => void;
}> = memo(({ label, style, onChange }) => {
  const [styleInput, setStyleInput] = useState<Style>({});

  useEffect(() => {
    const _style = style || {};
    if (!deepEqual(_style, styleInput)) {
      setStyleInput(_style || {});
    }
  }, [style]);

  // A generic onChange handler for Select fields
  const _setStyleInput = (value: any, key: keyof Style) => {
    const _styleInput = { ...styleInput, [key]: value };
    const _style = style || {};
    if (!deepEqual(_styleInput, styleInput)) setStyleInput(_styleInput);
    if (!deepEqual(_styleInput, _style)) onChange(_styleInput);
  };

  return (
    <div>
      <div className="text-center font-extrabold text-gray-400">
        {label} Style
      </div>
      <DisplayStyleForm
        style={styleInput.display}
        onChange={(style) => {
          _setStyleInput(style, "display");
        }}
      />
      <Accordion type="single" collapsible className="w-full" defaultValue="">
        <AccordionItem value="size" className="border-none">
          <AccordionTrigger className="font-bold text-gray-500 hover:no-underline p-2">
            Size Properties
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              {/* Sizing inputs with datalists */}
              <div className="grid grid-cols-2 gap-1">
                <DatalistInput
                  id="width"
                  label="Width"
                  value={styleInput.width || ""}
                  onChange={(value) => _setStyleInput(value, "width")}
                  placeholder="e.g., 200px"
                  options={sizingValues}
                />
                <DatalistInput
                  id="height"
                  label="Height"
                  value={styleInput.height || ""}
                  onChange={(value) => _setStyleInput(value, "height")}
                  placeholder="e.g., 100px"
                  options={sizingValues}
                />
                <DatalistInput
                  id="maxWidth"
                  label="Max Width"
                  value={styleInput.maxWidth || ""}
                  onChange={(value) => _setStyleInput(value, "maxWidth")}
                  placeholder="e.g., 500px"
                  options={sizingValues}
                />
                <DatalistInput
                  id="maxHeight"
                  label="Max Height"
                  value={styleInput.maxHeight || ""}
                  onChange={(value) => _setStyleInput(value, "maxHeight")}
                  placeholder="e.g., 300px"
                  options={sizingValues}
                />
                <DatalistInput
                  id="minWidth"
                  label="Min Width"
                  value={styleInput.minWidth || ""}
                  onChange={(value) => _setStyleInput(value, "minWidth")}
                  placeholder="e.g., 100px"
                  options={sizingValues}
                />
                <DatalistInput
                  id="minHeight"
                  label="Min Height"
                  value={styleInput.minHeight || ""}
                  onChange={(value) => _setStyleInput(value, "minHeight")}
                  placeholder="e.g., 50px"
                  options={sizingValues}
                />
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="spacing" className="border-none">
          <AccordionTrigger className="font-bold text-gray-500 hover:no-underline p-2">
            Spacing Properties
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              {/* Spacing inputs with datalists */}
              <DatalistInput
                id="margin"
                label="Margin"
                value={styleInput.margin || ""}
                onChange={(value) => _setStyleInput(value, "margin")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
              <div className="grid grid-cols-2 gap-1">
                <DatalistInput
                  id="marginLeft"
                  label="Margin Left"
                  value={styleInput.marginLeft || ""}
                  onChange={(value) => _setStyleInput(value, "marginLeft")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
                <DatalistInput
                  id="marginRight"
                  label="Margin Right"
                  value={styleInput.marginRight || ""}
                  onChange={(value) => _setStyleInput(value, "marginRight")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
                <DatalistInput
                  id="marginBottom"
                  label="Margin Bottom"
                  value={styleInput.marginBottom || ""}
                  onChange={(value) => _setStyleInput(value, "marginBottom")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
                <DatalistInput
                  id="marginTop"
                  label="Margin Top"
                  value={styleInput.marginTop || ""}
                  onChange={(value) => _setStyleInput(value, "marginTop")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
              </div>
              <DatalistInput
                id="padding"
                label="Padding"
                value={styleInput.padding || ""}
                onChange={(value) => _setStyleInput(value, "padding")}
                placeholder="e.g., 16px"
                options={spacingValues}
              />
              <div className="grid grid-cols-2 gap-1">
                <DatalistInput
                  id="paddingLeft"
                  label="Padding Left"
                  value={styleInput.paddingLeft || ""}
                  onChange={(value) => _setStyleInput(value, "paddingLeft")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
                <DatalistInput
                  id="paddingRight"
                  label="Padding Right"
                  value={styleInput.paddingRight || ""}
                  onChange={(value) => _setStyleInput(value, "paddingRight")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
                <DatalistInput
                  id="paddingBottom"
                  label="Padding Bottom"
                  value={styleInput.paddingBottom || ""}
                  onChange={(value) => _setStyleInput(value, "paddingBottom")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
                <DatalistInput
                  id="paddingTop"
                  label="Padding Top"
                  value={styleInput.paddingTop || ""}
                  onChange={(value) => _setStyleInput(value, "paddingTop")}
                  placeholder="e.g., 1rem"
                  options={spacingValues}
                />
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Typography & Color Properties */}
        <AccordionItem value="typography" className="border-none">
          <AccordionTrigger className="font-bold text-gray-500 hover:no-underline p-2">
            Typography & Colors
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <div>
                <Label className="text-xs">Font Family</Label>
                <Select
                  onValueChange={(value) => _setStyleInput(value, "fontFamily")}
                  defaultValue={styleInput.fontFamily}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilyValues.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Font Weight</Label>
                  <Select
                    onValueChange={(value) =>
                      _setStyleInput(value, "fontWeight")
                    }
                    defaultValue={styleInput.fontWeight}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select font weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontWeightValues.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  {/* Font size input with datalist */}
                  <DatalistInput
                    id="fontSize"
                    label="Font Size"
                    value={styleInput.fontSize || ""}
                    onChange={(value) => _setStyleInput(value, "fontSize")}
                    placeholder="e.g., 1rem"
                    options={fontSizeValues}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Text Alignment</Label>
                <Select
                  onValueChange={(value) => _setStyleInput(value, "textAlign")}
                  defaultValue={styleInput.textAlign}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select text alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    {textAlignValues.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <DatalistInput
                  id="color"
                  label="Color"
                  type="color"
                  value={styleInput.color || "#ffffff"}
                  onChange={(value) => _setStyleInput(value, "color")}
                  placeholder="e.g., #ffffff"
                  options={colorValues}
                />
              </div>
              <div className="space-y-2">
                <DatalistInput
                  id="background"
                  label="Background"
                  type="color"
                  value={styleInput.background || "#3b82f6"}
                  onChange={(value) => _setStyleInput(value, "background")}
                  placeholder="e.g., #3b82f6"
                  options={backgroundValues}
                />
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Borders & Shadow */}
        <AccordionItem value="borders" className="border-none">
          <AccordionTrigger className="font-bold text-gray-500 hover:no-underline p-2">
            Borders & Shadow
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <DatalistInput
                    id="borderWidth"
                    label="Width"
                    value={styleInput.borderWidth || ""}
                    onChange={(value) => _setStyleInput(value, "borderWidth")}
                    placeholder="e.g., 2px"
                  />
                </div>
                <div>
                  <DatalistInput
                    id="borderColor"
                    label="Color"
                    type="color"
                    value={styleInput.borderColor || "#1d4ed8"}
                    onChange={(value) => _setStyleInput(value, "borderColor")}
                    placeholder="e.g., #1d4ed8"
                    options={colorValues}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <Label className="text-xs">Style</Label>
                  <Select
                    onValueChange={(value) =>
                      _setStyleInput(value, "borderStyle")
                    }
                    defaultValue={styleInput.borderStyle}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {borderStyleValues.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Radius</Label>
                  <Select
                    onValueChange={(value) =>
                      _setStyleInput(value, "borderRadius")
                    }
                    defaultValue={styleInput.borderRadius}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select radius" />
                    </SelectTrigger>
                    <SelectContent>
                      {borderRadiusValues.map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs">Box Shadow</Label>
                <Select
                  onValueChange={(value) => _setStyleInput(value, "boxShadow")}
                  defaultValue={styleInput.boxShadow}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select box shadow" />
                  </SelectTrigger>
                  <SelectContent>
                    {boxShadowValues.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="flex-item" className="border-none">
          <AccordionTrigger className="font-bold text-gray-400 hover:no-underline p-2">
            Only if parent is flex
          </AccordionTrigger>
          <AccordionContent>
            {/* FlexItemStyle */}
            <FlexItemStyleForm
              style={styleInput.flexItem}
              onChange={(style) => _setStyleInput(style, "flexItem")}
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
              onChange={(style) => _setStyleInput(style, "gridItem")}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});
StyleGenerator.displayName = "StyleGenerator";
export default StyleGenerator;
