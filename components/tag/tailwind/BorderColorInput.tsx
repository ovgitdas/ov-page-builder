/**
 * @fileoverview A specialized input component for selecting Tailwind CSS border colors.
 */

import * as React from "react";
import { ColorInput } from "./ColorInput";
import { borderColorSuggestions } from "./tailwind_suggestions";

interface BorderColorInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const BorderColorInput: React.FC<BorderColorInputProps> = (props) => {
  return (
    <ColorInput
      {...props}
      suggestionList={borderColorSuggestions}
      placeholder="e.g., border-green-500"
    />
  );
};
