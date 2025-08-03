/**
 * @fileoverview A form component for creating and editing an ImageCarousel.
 * It allows for adding, deleting, reordering, and altering linkImages,
 * as well as toggling the visibility of navigation controllers.
 */

"use client";

import React, { memo } from "react";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import LinkImageInput from "./LinkImageInput";
import { useTagStore } from "../tag_zustand";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const ImageCarouselForm: React.FC = memo(() => {
  const { selectedTag, updateChildren } = useTagStore();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  if (
    !!selectedTag &&
    !!selectedTag.children &&
    !!("imageCarousel" in selectedTag.children)
  ) {
    const imageCarousel = selectedTag.children.imageCarousel;

    return (
      <div className="space-y-6 p-4 border rounded-lg bg-card text-card-foreground">
        <div className="flex flex-wrap gap-2">
          <div>Show controller for</div>
          <div className="flex items-center space-x-2">
            <Switch
              id="pc-show-controller"
              checked={imageCarousel.pcShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  imageCarousel: {
                    ...imageCarousel,
                    pcShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="pc-show-controller">PC</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="wide-show-controller"
              checked={imageCarousel.wideShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  imageCarousel: {
                    ...imageCarousel,
                    wideShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="wide-show-controller">Wide Screen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="ultra-show-controller"
              checked={imageCarousel.ultraShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  imageCarousel: {
                    ...imageCarousel,
                    ultraShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="ultra-show-controller">Ultra Wide</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="mob-show-controller"
              checked={imageCarousel.mobShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  imageCarousel: {
                    ...imageCarousel,
                    mobShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="mob-show-controller">Mobile</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="tab-show-controller"
              checked={imageCarousel.tabShowController}
              onCheckedChange={(checked) => {
                updateChildren({
                  imageCarousel: {
                    ...imageCarousel,
                    tabShowController: checked,
                  },
                });
              }}
            />
            <Label htmlFor="tab-show-controller">Tablet</Label>
          </div>
        </div>

        <div>
          {imageCarousel.linkImages.length > 0 ? (
            <div className="flex flex-col gap-2 rounded-md p-2 shadow-md bg-slate-100">
              <div className="flex flex-wrap gap-1 justify-center items-center">
                {imageCarousel.linkImages.map((linkImage, index) => (
                  <Button
                    size="sm"
                    variant={selectedIndex === index ? "default" : "outline"}
                    onClick={() => setSelectedIndex(index)}
                    key={index}
                    value={index}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const index = imageCarousel.linkImages.length + 1;
                    updateChildren({
                      imageCarousel: {
                        ...imageCarousel,
                        linkImages: [
                          ...imageCarousel.linkImages,
                          {
                            src: `https://yourdomain.com/image-${index}.jpg`,
                            alt: `alt text for the image-${index}`,
                            href: `https://yourdomain.com/page-${index}`,
                          },
                        ],
                      },
                    });
                  }}
                >
                  <FaPlus />
                </Button>
              </div>
              <LinkImageInput
                value={imageCarousel.linkImages[selectedIndex]}
                onChange={(linkImage) => {
                  updateChildren({
                    imageCarousel: {
                      ...imageCarousel,
                      linkImages: imageCarousel.linkImages.map((image, i) => {
                        if (i === selectedIndex) {
                          return linkImage;
                        } else {
                          return image;
                        }
                      }),
                    },
                  });
                }}
              />
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No linkImages in the carousel yet.
            </p>
          )}
        </div>
      </div>
    );
  }
  return <></>;
});
ImageCarouselForm.displayName = "ImageCarouselForm";
export default ImageCarouselForm;
