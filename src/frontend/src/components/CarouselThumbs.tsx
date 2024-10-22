import React from 'react'

type PropType = {
  selected: boolean
  slide: string
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
        <img
            className={"h-16 w-16 rounded".concat(
              selected ? " border border-gray-200 bg-gray-200": ""
            )}
            src={slide}
            alt=""
        />
      </button>
    </div>
  )
}