import { useEffect, useRef, useState } from 'react'

export function DeferredVideo({
  src,
  poster,
  eager = false,
  autoPlay = false,
  preload = 'none',
  rootMargin = '360px 0px',
  type = 'video/mp4',
  ...props
}) {
  const videoRef = useRef(null)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const shouldLoadSource =
    eager || hasEnteredViewport || typeof IntersectionObserver === 'undefined'

  useEffect(() => {
    const node = videoRef.current

    if (!node) {
      return undefined
    }

    if (shouldLoadSource) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setHasEnteredViewport(true)
        observer.disconnect()
      },
      { rootMargin },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin, shouldLoadSource])

  useEffect(() => {
    if (!shouldLoadSource) {
      return
    }

    const node = videoRef.current

    if (!node) {
      return
    }

    node.load()

    if (autoPlay) {
      node.play().catch(() => {})
    }
  }, [autoPlay, shouldLoadSource])

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload={shouldLoadSource ? preload : 'none'}
      autoPlay={shouldLoadSource && autoPlay}
      {...props}
    >
      {shouldLoadSource ? <source src={src} type={type} /> : null}
    </video>
  )
}
