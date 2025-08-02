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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Style,
  borderRadiusValues,
  borderStyleValues,
  boxShadowValues,
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

const StyleGenerator: React.FC<{
  value?: Style;
  onChange: (value: Style) => void;
}> = memo(({ value, onChange }) => {
  const [styleInput, setStyleInput] = useState<Style>({});

  useEffect(() => {
    setStyleInput(value || {});
  }, [value]);

  // A generic onChange handler for Input fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Style
  ) => {
    const newStyle = { ...styleInput, [key]: e.target.value };
    setStyleInput(newStyle);
    onChange(newStyle);
  };

  // A generic onChange handler for Select fields
  const handleSelectChange = (value: any, key: keyof Style) => {
    const newStyle = { ...styleInput, [key]: value };
    setStyleInput(newStyle);
    onChange(newStyle);
  };
  console.log("style-generator");

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="">
      <AccordionItem value="layout">
        <AccordionTrigger className="font-bold text-gray-800">
          Layout Properties
        </AccordionTrigger>
        <AccordionContent>
          <DisplayStyleForm
            style={styleInput.display}
            onChange={(style) => {
              handleSelectChange(style, "display");
            }}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="size">
        <AccordionTrigger className="font-bold text-gray-800">
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
                onChange={(e) => handleInputChange(e, "width")}
                placeholder="e.g., 200px"
                options={sizingValues}
              />
              <DatalistInput
                id="height"
                label="Height"
                value={styleInput.height || ""}
                onChange={(e) => handleInputChange(e, "height")}
                placeholder="e.g., 100px"
                options={sizingValues}
              />
              <DatalistInput
                id="maxWidth"
                label="Max Width"
                value={styleInput.maxWidth || ""}
                onChange={(e) => handleInputChange(e, "maxWidth")}
                placeholder="e.g., 500px"
                options={sizingValues}
              />
              <DatalistInput
                id="maxHeight"
                label="Max Height"
                value={styleInput.maxHeight || ""}
                onChange={(e) => handleInputChange(e, "maxHeight")}
                placeholder="e.g., 300px"
                options={sizingValues}
              />
              <DatalistInput
                id="minWidth"
                label="Min Width"
                value={styleInput.minWidth || ""}
                onChange={(e) => handleInputChange(e, "minWidth")}
                placeholder="e.g., 100px"
                options={sizingValues}
              />
              <DatalistInput
                id="minHeight"
                label="Min Height"
                value={styleInput.minHeight || ""}
                onChange={(e) => handleInputChange(e, "minHeight")}
                placeholder="e.g., 50px"
                options={sizingValues}
              />
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="spacing">
        <AccordionTrigger className="font-bold text-gray-800">
          Spacing Properties
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            {/* Spacing inputs with datalists */}
            <DatalistInput
              id="margin"
              label="Margin"
              value={styleInput.margin || ""}
              onChange={(e) => handleInputChange(e, "margin")}
              placeholder="e.g., 1rem"
              options={spacingValues}
            />
            <div className="grid grid-cols-2 gap-1">
              <DatalistInput
                id="marginLeft"
                label="Margin Left"
                value={styleInput.marginLeft || ""}
                onChange={(e) => handleInputChange(e, "marginLeft")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
              <DatalistInput
                id="marginRight"
                label="Margin Right"
                value={styleInput.marginRight || ""}
                onChange={(e) => handleInputChange(e, "marginRight")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
              <DatalistInput
                id="marginBottom"
                label="Margin Bottom"
                value={styleInput.marginBottom || ""}
                onChange={(e) => handleInputChange(e, "marginBottom")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
              <DatalistInput
                id="marginTop"
                label="Margin Top"
                value={styleInput.marginTop || ""}
                onChange={(e) => handleInputChange(e, "marginTop")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
            </div>
            <DatalistInput
              id="padding"
              label="Padding"
              value={styleInput.padding || ""}
              onChange={(e) => handleInputChange(e, "padding")}
              placeholder="e.g., 16px"
              options={spacingValues}
            />
            <div className="grid grid-cols-2 gap-1">
              <DatalistInput
                id="paddingLeft"
                label="Padding Left"
                value={styleInput.paddingLeft || ""}
                onChange={(e) => handleInputChange(e, "paddingLeft")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
              <DatalistInput
                id="paddingRight"
                label="Padding Right"
                value={styleInput.paddingRight || ""}
                onChange={(e) => handleInputChange(e, "paddingRight")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
              <DatalistInput
                id="paddingBottom"
                label="Padding Bottom"
                value={styleInput.paddingBottom || ""}
                onChange={(e) => handleInputChange(e, "paddingBottom")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
              <DatalistInput
                id="paddingTop"
                label="Padding Top"
                value={styleInput.paddingTop || ""}
                onChange={(e) => handleInputChange(e, "paddingTop")}
                placeholder="e.g., 1rem"
                options={spacingValues}
              />
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Typography & Color Properties */}
      <AccordionItem value="typography">
        <AccordionTrigger className="font-bold text-gray-800">
          Typography & Colors
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <div>
              <Label className="text-xs">Font Family</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange(value, "fontFamily")
                }
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
                    handleSelectChange(value, "fontWeight")
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
                  onChange={(e) => handleInputChange(e, "fontSize")}
                  placeholder="e.g., 1rem"
                  options={fontSizeValues}
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Text Alignment</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange(value, "textAlign")
                }
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
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Label className="text-xs">Text Color</Label>
                <Input
                  type="color"
                  value={styleInput.color || "#ffffff"}
                  onChange={(e) => handleInputChange(e, "color")}
                />
              </div>
              <div>
                <Label className="text-xs">Background</Label>
                <Input
                  type="color"
                  value={styleInput.background || "#3b82f6"}
                  onChange={(e) => handleInputChange(e, "background")}
                />
              </div>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Borders & Shadow */}
      <AccordionItem value="borders">
        <AccordionTrigger className="font-bold text-gray-800">
          Borders & Shadow
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Label className="text-xs">Width</Label>
                <Input
                  value={styleInput.borderWidth || ""}
                  onChange={(e) => handleInputChange(e, "borderWidth")}
                  placeholder="e.g., 2px"
                />
              </div>
              <div>
                <Label className="text-xs">Color</Label>
                <Input
                  type="color"
                  value={styleInput.borderColor || "#1d4ed8"}
                  onChange={(e) => handleInputChange(e, "borderColor")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Label className="text-xs">Style</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "borderStyle")
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
                    handleSelectChange(value, "borderRadius")
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
                onValueChange={(value) =>
                  handleSelectChange(value, "boxShadow")
                }
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
    </Accordion>
  );
});

export default StyleGenerator;
