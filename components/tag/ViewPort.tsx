"use client";
import React from "react";
import { useViewPort } from "./viewport_zustand";
import { Button } from "../ui/button";

const ViewPort = ({ children }: any) => {
  const { deviceType, setDeviceType, width, height } = useViewPort();
  const [zoom, setZoom] = React.useState(50);
  const [position, setPosition] = React.useState({ left: 0, top: 0 });
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
      });
    }
  }, [deviceType]);

  return (
    <div>
      <div className="flex gap-2 justify-between">
        <h2 className="text-2xl font-bold mb-4">View [{zoom}%]</h2>
        <div className="flex gap-2">
          <Button
            disabled={deviceType === "pc"}
            onClick={() => {
              setDeviceType("pc");
              setZoom(50);
            }}
          >
            PC
          </Button>
          <Button
            disabled={deviceType === "tab"}
            onClick={() => {
              setDeviceType("tab");
              setZoom(70);
            }}
          >
            Tab
          </Button>
          <Button
            disabled={deviceType === "mob"}
            onClick={() => {
              setDeviceType("mob");
              setZoom(90);
            }}
          >
            Mob
          </Button>
        </div>
        <div className="flex gap-2">
          <Button disabled={zoom === 50} onClick={() => setZoom(zoom - 10)}>
            Zoom out
          </Button>
          <Button disabled={zoom === 150} onClick={() => setZoom(zoom + 10)}>
            Zoom in
          </Button>
        </div>
      </div>
      <div
        className="bg-slate-400 rounded-md p-4 w-fit absolute duration-300 ease-in"
        style={{
          left: position.left,
          top: position.top,
          scale: zoom / 100,
        }}
        draggable
      >
        <div
          style={{ width: width, height: height }}
          className="bg-white rounded-sm overflow-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ViewPort;
