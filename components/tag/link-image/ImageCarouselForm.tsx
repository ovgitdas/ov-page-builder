/**
 * @fileoverview A form component for creating and editing an ImageCarousel.
 * It allows for adding, deleting, reordering, and altering linkImages,
 * as well as toggling the visibility of navigation controllers.
 */

"use client";

import React from "react";
import { Label } from "@/components/ui/label";
// import { FaPlus } from "react-icons/fa";
import { LinkImageInput } from "./LinkImageInput";
import { useTagStore } from "../tag_zustand";
import { Switch } from "@/components/ui/switch";

const ImageCarouselForm: React.FC = () => {
  const { selectedTag, updateChildren } = useTagStore();

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

        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Images</h4>
          {imageCarousel.linkImages.length > 0 ? (
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                {imageCarousel.linkImages.map((linkImage, index) => (
                  <TabsTrigger key={index} value={index}>
                    {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {imageCarousel.linkImages.map((linkImage, index) => (
                <TabsContent key={index} value={index}>
                  <LinkImageInput
                    key={index}
                    value={linkImage}
                    onChange={(linkImage) => {
                      updateChildren({
                        imageCarousel: {
                          ...imageCarousel,
                          linkImages: imageCarousel.linkImages.map(
                            (image, i) => {
                              if (i === index) {
                                return linkImage;
                              } else {
                                return image;
                              }
                            }
                          ),
                        },
                      });
                    }}
                  />
                </TabsContent>
              ))}
            </Tabs>
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
};

export default ImageCarouselForm;
