import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { LinkImage } from "./tag"

interface LinkImageInputProps {
  linkImage: LinkImage
  index: number
  totalImages: number
  onImageChange: (index: number, field: keyof LinkImage, value: string) => void
  onDeleteImage: (index: number) => void
  onMoveImage: (index: number, direction: "up" | "down") => void
}

export const LinkImageInput: React.FC<LinkImageInputProps> = ({
  linkImage,
  index,
  totalImages,
  onImageChange,
  onDeleteImage,
  onMoveImage,
}) => {
  return (
    <div className="p-4 border rounded-md space-y-3 relative bg-background">
      <div className="absolute top-3 right-3 flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onMoveImage(index, "up")}
          disabled={index === 0}
          aria-label="Move image up"
        >
          <FaArrowUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onMoveImage(index, "down")}
          disabled={index === totalImages - 1}
          aria-label="Move image down"
        >
          <FaArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDeleteImage(index)}
          aria-label="Delete image"
        >
          <FaTrash className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-bold text-sm text-muted-foreground">
        Image {index + 1}
      </p>
      <div className="grid gap-2">
        <Label htmlFor={`src-${index}`}>Image Source (URL)</Label>
        <Input
          id={`src-${index}`}
          value={linkImage.src}
          onChange={(e) => onImageChange(index, "src", e.target.value)}
          placeholder="https://yourdomain.com/image.jpg"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`alt-${index}`}>Alt Text</Label>
        <Input
          id={`alt-${index}`}
          value={linkImage.alt}
          onChange={(e) => onImageChange(index, "alt", e.target.value)}
          placeholder="A description of the image"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`href-${index}`}>Link URL</Label>
        <Input
          id={`href-${index}`}
          value={linkImage.href}
          onChange={(e) => onImageChange(index, "href", e.target.value)}
          placeholder="https://yourdomain.com/page"
        />
      </div>
    </div>
  )
}
