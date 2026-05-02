export const MOTION_TOKENS = {
  easingEnter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easingExit: 'cubic-bezier(0.4, 0, 1, 1)',
  staggerSiblingMs: 80,
  scrollTriggerOffsetPx: 80,
  reducedMotionDurationMs: 200,
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getStaggerDelay(index, baseMs = 0, stepMs = MOTION_TOKENS.staggerSiblingMs) {
  return `${baseMs + index * stepMs}ms`
}
