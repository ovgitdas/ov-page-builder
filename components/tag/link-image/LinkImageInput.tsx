"use client";
import React, { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkImage } from "../tag";

interface LinkImageInputProps {
  value: LinkImage;
  onChange: (linkImage: LinkImage) => void;
}

const LinkImageInput: React.FC<LinkImageInputProps> = memo(
  ({ value, onChange }) => {
    const rand = Math.random();
    return (
      <div className="p-4 border rounded-md space-y-3 relative bg-background">
        <div className="grid gap-2">
          <Label htmlFor={`src-${rand}`}>Img URL</Label>
          <Input
            id={`src-${rand}`}
            value={value.src}
            onChange={(e) => onChange({ ...value, src: e.target.value })}
            placeholder="https://yourdomain.com/image.jpg"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`alt-${rand}`}>Alt Text</Label>
          <Input
            id={`alt-${rand}`}
            value={value.alt}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
            placeholder="A description of the image"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`href-${rand}`}>Link URL</Label>
          <Input
            id={`href-${rand}`}
            value={value.href}
            onChange={(e) => onChange({ ...value, href: e.target.value })}
            placeholder="https://yourdomain.com/page"
          />
        </div>
      </div>
    );
  }
);

LinkImageInput.displayName = "LinkImageInput";
export default LinkImageInput;
