import React, { useState, useEffect } from 'react'
import { Spinner } from '@material-tailwind/react'

interface ProgressiveImageProps {
  thumbnailSrc: string
  hdSrc: string
  alt: string
  className?: string
  spinner?: boolean
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ thumbnailSrc, hdSrc, alt, className, spinner = true }) => {
  const [src, setSrc] = useState(thumbnailSrc)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = hdSrc
    img.onload = () => {
      setSrc(hdSrc)
      setLoading(false)
    }
  }, [hdSrc])

  return (
    <div className="relative w-full h-full">
      {loading && spinner && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="text-gray-600" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
      />
    </div>
  )
}

export default ProgressiveImage
