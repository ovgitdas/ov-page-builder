"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo, useEffect, useState } from "react";

interface DatalistInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options?: readonly string[];
  id: string;
  type?: string;
}

const DatalistInput: React.FC<DatalistInputProps> = memo(
  ({ label, value, onChange, placeholder, options, id, type }) => {
    const [data, setData] = useState(value);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
      if (value !== data) setData(value);
    }, [value]);

    const _setData = async (_data: string) => {
      if (data !== _data) setData(_data);
      if (value !== _data) {
        clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            onChange(_data);
          }, 500)
        );
      }
    };

    return (
      <div className="space-y-1">
        <Label htmlFor={id} className="text-xs">
          {label}
        </Label>
        {type === "color" ? (
          <div className="flex justify-center items-center">
            <Input
              id={id}
              type="text"
              list={`${id}-datalist`}
              value={data || ""}
              onChange={(e) => {
                _setData(e.target.value);
              }}
              placeholder={placeholder}
              className="flex-1"
            />
            <input
              id={id}
              type={type}
              list={`${id}-datalist`}
              value={data || ""}
              onChange={(e) => {
                _setData(e.target.value);
              }}
              className="w-16 h-8"
            />
          </div>
        ) : (
          <Input
            id={id}
            type={type}
            list={`${id}-datalist`}
            value={data || ""}
            onChange={(e) => {
              _setData(e.target.value);
            }}
            placeholder={placeholder}
          />
        )}
        {!!options && (
          <datalist id={`${id}-datalist`}>
            {options.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        )}
      </div>
    );
  }
);

DatalistInput.displayName = "DatalistInput";
export default DatalistInput;
