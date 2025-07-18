/**
 * @fileoverview A specialized input component for selecting Tailwind CSS background colors.
 */

import * as React from "react";
import { ColorInput } from "./ColorInput";
import { backgroundColorSuggestions } from "./tailwind_suggestions";

interface BackgroundColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const BackgroundColorInput: React.FC<BackgroundColorInputProps> = (
  props
) => {
  return (
    <ColorInput
      {...props}
      suggestionList={backgroundColorSuggestions}
      placeholder="e.g., bg-blue-500"
    />
  );
};
