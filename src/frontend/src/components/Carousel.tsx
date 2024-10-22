import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
// import {
//   PrevButton,
//   NextButton,
//   usePrevNextButtons
// } from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselThumbs } from './CarouselThumbs'

type PropType = {
  slides?: string[]
  options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
  // const { slides, options } = props
  // const [emblaRef, emblaApi] = useEmblaCarousel(options)

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick
  // } = usePrevNextButtons(emblaApi)

  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <section className="m-auto">
      <div className="overflow-hidden w-full mx-auto flex items-center justify-center" ref={emblaMainRef}>
        <div className="flex touch-pan-y">
          {slides?.map((slide, index) => (
            <div className="flex-none min-w-0 h-full w-full" key={index}>
              {/* <div className="embla__slide h-full w-full"> */}
                <img
                  className="w-full h-full rounded"
                  src={slide}
                  alt=""
                />
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="m-auto">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex flex-row space-x-1 pt-3 px-1">
            {slides?.map((slide, index) => (
              <CarouselThumbs
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                slide={slide}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div> */}
    </section>
  )
}

export default Carousel