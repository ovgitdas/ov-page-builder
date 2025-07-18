/**
 * @fileoverview A React component for a textbox that suggests Tailwind CSS classes.
 * The suggestions are based on a pre-generated list derived from the project's
 * `tailwind.config.ts` safelist.
 */

import * as React from "react";
import { tailwindSuggestionList } from "./tailwind_suggestions";
import { cn } from "@/lib/utils";

interface ClassNameInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ClassNameInput: React.FC<ClassNameInputProps> = ({
  value,
  onChange,
  className,
}) => {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    onChange(userInput);

    const words = userInput.split(" ");
    const currentWord = words[words.length - 1];

    if (currentWord) {
      const filteredSuggestions = tailwindSuggestionList.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(currentWord.toLowerCase()) > -1
      );
      setSuggestions(filteredSuggestions.slice(0, 10)); // Limit to 10 suggestions
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClick = (suggestion: string) => {
    const words = value.split(" ");
    words.pop(); // remove current partial word
    const newValue = [...words, suggestion, ""].join(" "); // add a space for the next class
    onChange(newValue);
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
        className={cn(
          "w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground border-border",
          className
        )}
        placeholder="Type Tailwind classes..."
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // delay to allow click
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleClick(suggestion)}
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
