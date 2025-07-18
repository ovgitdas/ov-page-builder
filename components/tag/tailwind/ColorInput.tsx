/**
 * @fileoverview A generic, reusable React component for a textbox that suggests
 * specific Tailwind CSS color classes. It's designed to be specialized for
 * background, text, or border colors.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestionList: string[];
  placeholder: string;
  className?: string;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  value,
  onChange,
  suggestionList,
  placeholder,
  className,
}) => {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    onChange(userInput);

    if (userInput) {
      const filteredSuggestions = suggestionList.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      setSuggestions(filteredSuggestions.slice(0, 10)); // Limit to 10 suggestions
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
    } else {
      // Show all suggestions if input is empty
      setSuggestions(suggestionList.slice(0, 10));
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
    }
  };

  const handleClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleClick(suggestions[activeSuggestionIndex]);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestionIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleChange} // Show suggestions on focus
        className={cn(
          "w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground border-border",
          className
        )}
        placeholder={placeholder}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // delay to allow click
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onMouseDown={(e) => {
                e.preventDefault();
                handleClick(suggestion);
              }}
              className={cn(
                "px-3 py-2 cursor-pointer text-sm",
                index === activeSuggestionIndex
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50"
              )}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
