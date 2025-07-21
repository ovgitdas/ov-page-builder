"use client"
import React from "react"
import { devices, useViewPort } from "./viewport_zustand"
import { Button } from "../ui/button"
import { useTagStore } from "./tag_zustand"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const ViewPort = ({ children }: { children: React.ReactNode }) => {
  const { deviceType, setDevice, label, width, height } = useViewPort()
  const [zoom, setZoom] = React.useState(50)
  const [position, setPosition] = React.useState({ left: 0, top: 0 })
  const handleResize = React.useCallback(() => {
    if (typeof window !== "undefined") {
      setPosition({
        left: (window.innerWidth - width) / 2 - 16, //16px (p-4) is the border of the screen
        top: (window.innerHeight - height) / 2 - 16, //16px (p-4) is the border of the screen
      })
      if (width > height) {
        // since view width is 3/5 of the screen width
        setZoom(
          (((((3 * window.innerWidth) / (5 * width)) * 100) / 10) | 0) * 10
        )
      } else {
        // since view height is 8/10 of the screen width
        setZoom(
          (((((8 * window.innerHeight) / (10 * height)) * 100) / 10) | 0) * 10
        )
      }
    }
  }, [width, height])

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [deviceType, handleResize])

  const [code, setCode] = React.useState(false)
  const { page } = useTagStore()

  return (
    <div>
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <Select value={label} onValueChange={(value) => setDevice(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device) => (
                <SelectItem key={device.label} value={device.label}>
                  <div className="flex items-center gap-2">
                    <div>{device.category}: </div>
                    <div>{device.label}</div>
                    <div className="text-xs text-gray-500">
                      {device.width} x {device.height}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button size="sm" onClick={() => setCode(!code)}>
            {code ? "Show UX/UI" : "Show Code"}
          </Button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button
            size="sm"
            disabled={code || zoom === 50}
            onClick={() => setZoom(zoom - 10)}
          >
            Zoom out
          </Button>
          {zoom}%
          <Button
            size="sm"
            disabled={code || zoom === 150}
            onClick={() => setZoom(zoom + 10)}
          >
            Zoom in
          </Button>
        </div>
      </div>
      {code ? (
        <div className="m-4 p-4 bg-slate-700 text-slate-100 rounded-md font-mono overflow-auto">
          {JSON.stringify(page)}
        </div>
      ) : (
        <div
          className="bg-slate-400 rounded-md p-4 w-fit absolute duration-300 ease-in z-50"
          style={{
            left: position.left,
            top: position.top,
            scale: zoom / 100,
          }}
        >
          <div
            style={{ width: width, height: height }}
            className="bg-white rounded-sm overflow-auto"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewPort
