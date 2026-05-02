import { useEffect, useRef, useState } from 'react'
import { MOTION_TOKENS, prefersReducedMotion } from '../lib/motion'

function getAdaptiveThreshold(node, threshold) {
  if (typeof window === 'undefined' || threshold <= 0) {
    return threshold
  }

  const viewportHeight = window.innerHeight || 0
  const nodeHeight = node.getBoundingClientRect().height

  if (!viewportHeight || !nodeHeight) {
    return threshold
  }

  const maxVisibleRatio = Math.min(viewportHeight / nodeHeight, 1)
  const isSmallScreen = window.matchMedia('(max-width: 767px)').matches

  if (isSmallScreen) {
    return Math.min(threshold, Math.max(0.08, maxVisibleRatio * 0.45))
  }

  return Math.min(threshold, maxVisibleRatio * 0.7)
}

export function useRevealInView(options = {}) {
  const {
    once = true,
    offsetPx = MOTION_TOKENS.scrollTriggerOffsetPx,
    threshold = 0,
  } = options
  const reducedMotion = prefersReducedMotion()
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(() => reducedMotion)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    if (reducedMotion) {
      return undefined
    }

    const resolvedThreshold = getAdaptiveThreshold(node, threshold)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (once) {
            observer.disconnect()
          }

          return
        }

        if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: resolvedThreshold,
        rootMargin: `0px 0px -${offsetPx}px 0px`,
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [offsetPx, once, reducedMotion, threshold])

  return { ref, isVisible }
}
