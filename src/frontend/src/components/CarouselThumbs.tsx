import React from 'react'
import ProgressiveImage from './ProgressiveImage'

type SlideType = {
  thumbnailSrc: string
  hdSrc: string
}

type PropType = {
  selected: boolean
  slide: SlideType
  onClick: () => void
}

export const CarouselThumbs: React.FC<PropType> = (props) => {
  const { selected, slide, onClick } = props

  return (
    <div
      className={"flex-none".concat(
        selected ? " scale-105" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
      >
        <ProgressiveImage
          thumbnailSrc={slide.thumbnailSrc}
          hdSrc={slide.hdSrc}
          alt=""
          className={"h-16 w-16 rounded".concat(
            selected ? " border border-gray-200 bg-gray-200": ""
          )}
        />
      </button>
    </div>
  )
}