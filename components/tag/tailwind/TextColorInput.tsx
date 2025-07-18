/**
 * @fileoverview A specialized input component for selecting Tailwind CSS text colors.
 */

import * as React from "react";
import { ColorInput } from "./ColorInput";
import { textColorSuggestions } from "./tailwind_suggestions";

interface TextColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TextColorInput: React.FC<TextColorInputProps> = (props) => {
  return (
    <ColorInput
      {...props}
      suggestionList={textColorSuggestions}
      placeholder="e.g., text-red-500"
    />
  );
};
