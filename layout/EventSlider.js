import { useKeenSlider } from 'keen-slider/react'
import React, { Children, isValidElement, useState } from 'react'

const EventSlider= ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  const [ref, slider] = useKeenSlider({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      //setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
    <div className="w-full h-full">
      <div ref={ref} className="keen-slider h-full transition-opacity duration-150" style={{ opacity: isMounted ? 1 : 0 }}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className} ` : ''
                }keen-slider__slide`,
              },
            }
          }
          return child
        })}
      </div>
    </div>
  )
}

export default EventSlider