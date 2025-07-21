"use client"
import React from "react"
import { useViewPort } from "./viewport_zustand"
import { Button } from "../ui/button"
import { useTagStore } from "./tag_zustand"

const ViewPort = ({ children }: any) => {
  const { deviceType, setDeviceType, width, height } = useViewPort()
  const [zoom, setZoom] = React.useState(50)
  const [position, setPosition] = React.useState({ left: 0, top: 0 })
  const handleResize = () => {
    if (typeof window !== "undefined") {
      setPosition({
        left: (window.innerWidth - width) / 2 - 15,
        top: (window.innerHeight - height) / 2 - 15,
      })
      if (deviceType === "pc") {
        // since view area is 3/5 of the screen width
        setZoom(
          (((((3 * window.innerWidth) / (5 * width)) * 100) / 10) | 0) * 10
        )
      } else {
        setZoom(
          (((((8 * window.innerHeight) / (10 * height)) * 100) / 10) | 0) * 10
        )
      }
    }
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [deviceType])

  const [code, setCode] = React.useState(false)
  const { page } = useTagStore()

  return (
    <div>
      <div className="flex gap-2 justify-between">
        <h2 className="text-2xl font-bold mb-4">
          {code
            ? "Source code"
            : `${
                deviceType === "pc"
                  ? "PC Screen"
                  : deviceType === "tab"
                  ? "Tablet Screen"
                  : "Smartphone Screen"
              } [${zoom}%]`}
        </h2>
        <div className="flex gap-2">
          <Button
            disabled={code || deviceType === "pc"}
            onClick={() => {
              setDeviceType("pc")
              setZoom(50)
            }}
          >
            PC
          </Button>
          <Button
            disabled={code || deviceType === "tab"}
            onClick={() => {
              setDeviceType("tab")
              setZoom(70)
            }}
          >
            Tab
          </Button>
          <Button
            disabled={code || deviceType === "mob"}
            onClick={() => {
              setDeviceType("mob")
              setZoom(90)
            }}
          >
            Mob
          </Button>
        </div>
        <div>
          <Button onClick={() => setCode(!code)}>
            {code ? "Show UX/UI" : "Show Code"}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={code || zoom === 50}
            onClick={() => setZoom(zoom - 10)}
          >
            Zoom out
          </Button>
          <Button
            disabled={code || zoom === 150}
            onClick={() => setZoom(zoom + 10)}
          >
            Zoom in
          </Button>
        </div>
      </div>
      {code ? (
        <div>{JSON.stringify(page)}</div>
      ) : (
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
      )}
    </div>
  )
}

export default ViewPort
