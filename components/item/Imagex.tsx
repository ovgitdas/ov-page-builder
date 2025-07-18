"use client"
import React from "react"

interface Props {
  src: string
  alt: string
  onMouseMove: (src: string, x: number, y: number, w: number, h: number) => any
}

const Imagex = ({ src, alt, onMouseMove }: Props) => {
  const ref = React.useRef<HTMLImageElement>(null)

  const _onMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!!ref.current) {
      const img = ref.current.getBoundingClientRect()
      const x = e.clientX - img.left
      const y = e.clientY - img.top
      onMouseMove(ref.current.src, x, y, img.width, img.height)
    }
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className="object-contain h-full mx-auto cursor-zoom-in"
      onMouseMove={_onMouseMove}
      onMouseLeave={(e) => {
        onMouseMove("", 0, 0, 0, 0)
      }}
    />
  )
}

export default Imagex
