/**
 * @fileoverview A form component for creating and editing an ImageCarousel.
 * It allows for adding, deleting, reordering, and altering linkImages,
 * as well as toggling the visibility of navigation controllers.
 */

"use client"

import React, { useState } from "react"
import { ImageCarousel } from "./tag"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FaPlus } from "react-icons/fa"
import { LinkImageInput } from "./LinkImageInput"

interface Props {
  imageCarousel: ImageCarousel
  onUpdate: (updatedCarousel: ImageCarousel) => void
}

const ImageCarouselForm = ({ imageCarousel, onUpdate }: Props) => {
  const [newLinkImage, setNewImage] = useState({ src: "", alt: "", href: "" })

  const handleImageChange = (
    index: number,
    field: "src" | "alt" | "href",
    value: string
  ) => {
    const updatedImages = [...imageCarousel.linkImages]
    updatedImages[index] = { ...updatedImages[index], [field]: value }
    onUpdate({ ...imageCarousel, linkImages: updatedImages })
  }

  const handleDeleteImage = (index: number) => {
    const updatedImages = imageCarousel.linkImages.filter((_, i) => i !== index)
    onUpdate({ ...imageCarousel, linkImages: updatedImages })
  }

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const updatedImages = [...imageCarousel.linkImages]
    const item = updatedImages[index]
    const swapIndex = direction === "up" ? index - 1 : index + 1

    if (swapIndex < 0 || swapIndex >= updatedImages.length) {
      return
    }

    // Simple swap
    updatedImages[index] = updatedImages[swapIndex]
    updatedImages[swapIndex] = item

    onUpdate({ ...imageCarousel, linkImages: updatedImages })
  }

  const handleAddNewImage = () => {
    if (newLinkImage.src && newLinkImage.alt && newLinkImage.href) {
      onUpdate({
        ...imageCarousel,
        linkImages: [...imageCarousel.linkImages, newLinkImage],
      })
      setNewImage({ src: "", alt: "", href: "" })
    } else {
      alert("Please fill all fields for the new image.")
    }
  }

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-card text-card-foreground">
      <h3 className="text-xl font-bold">Image Carousel Settings</h3>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showController"
          checked={imageCarousel.showController}
          onCheckedChange={(checked) => {
            onUpdate({ ...imageCarousel, showController: !!checked })
          }}
        />
        <Label
          htmlFor="showController"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show Navigation Controls
        </Label>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-lg">Images</h4>
        {imageCarousel.linkImages.length > 0 ? (
          imageCarousel.linkImages.map((image, index) => (
            <LinkImageInput
              key={index}
              linkImage={image}
              index={index}
              totalImages={imageCarousel.linkImages.length}
              onImageChange={handleImageChange}
              onDeleteImage={handleDeleteImage}
              onMoveImage={handleMoveImage}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">
            No linkImages in the carousel yet.
          </p>
        )}
      </div>

      <div className="p-4 border rounded-md space-y-3 bg-muted/50">
        <h4 className="font-semibold text-lg">Add New Image</h4>
        <div className="grid gap-2">
          <Label htmlFor="new-src">Image Source (URL)</Label>
          <Input
            id="new-src"
            value={newLinkImage.src}
            onChange={(e) =>
              setNewImage({ ...newLinkImage, src: e.target.value })
            }
            placeholder="https://yourdomain.com/new-image.jpg"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="new-alt">Alt Text</Label>
          <Input
            id="new-alt"
            value={newLinkImage.alt}
            onChange={(e) =>
              setNewImage({ ...newLinkImage, alt: e.target.value })
            }
            placeholder="A description of the new image"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="new-href">Link URL</Label>
          <Input
            id="new-href"
            value={newLinkImage.href}
            onChange={(e) =>
              setNewImage({ ...newLinkImage, href: e.target.value })
            }
            placeholder="https://example.com/new-page"
          />
        </div>
        <Button onClick={handleAddNewImage} className="w-full">
          <FaPlus className="mr-2 h-4 w-4" /> Add Image to Carousel
        </Button>
      </div>
    </div>
  )
}

export default ImageCarouselForm
