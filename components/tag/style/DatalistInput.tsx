"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo } from "react";

interface DatalistInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  options: readonly string[];
  id: string;
}

const DatalistInput: React.FC<DatalistInputProps> = memo(
  ({ label, value, onChange, placeholder, options, id }) => (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input
        id={id}
        list={`${id}-datalist`}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
      />
      <datalist id={`${id}-datalist`}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  )
);

export default DatalistInput;
