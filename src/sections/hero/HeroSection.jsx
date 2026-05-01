import { useEffect, useState } from 'react'
import { siteData } from '../../data/site'
import { getStaggerDelay, prefersReducedMotion } from '../../lib/motion'
import heroPhoto from '../../../media/photos/hero-whatsapp-2026-04-15.jpeg'

const primaryRippleTimers = new WeakMap()
const primaryRippleFrames = new WeakMap()

function clearPrimaryRippleFrames(button) {
  const frameIds = primaryRippleFrames.get(button)

  if (!frameIds) {
    return
  }

  frameIds.forEach((frameId) => window.cancelAnimationFrame(frameId))
  primaryRippleFrames.delete(button)
}

export function HeroSection() {
  const reducedMotion = prefersReducedMotion()
  const [bridesCount, setBridesCount] = useState(() =>
    reducedMotion ? siteData.hero.proof.bridesCount : 0,
  )
  const headlineWords = siteData.hero.headline.split(' ')

  useEffect(() => {
    let frameId = 0
    let startTimeoutId = 0

    if (reducedMotion) {
      return undefined
    }

    const animateCount = () => {
      const duration = 900
      const start = performance.now()

      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        setBridesCount(Math.round(siteData.hero.proof.bridesCount * eased))

        if (progress < 1) {
          frameId = window.requestAnimationFrame(step)
        }
      }

      frameId = window.requestAnimationFrame(step)
    }

    startTimeoutId = window.setTimeout(() => {
      animateCount()
    }, 1000)

    return () => {
      window.clearTimeout(startTimeoutId)
      window.cancelAnimationFrame(frameId)
    }
  }, [reducedMotion])

  const triggerPrimaryRipple = (event) => {
    const button = event.currentTarget
    const bounds = button.getBoundingClientRect()
    button.style.setProperty('--pulse-x', `${event.clientX - bounds.left}px`)
    button.style.setProperty('--pulse-y', `${event.clientY - bounds.top}px`)

    const existingTimer = primaryRippleTimers.get(button)
    if (existingTimer) {
      window.clearTimeout(existingTimer)
    }

    clearPrimaryRippleFrames(button)
    button.classList.remove('is-rippling')

    const outerFrame = window.requestAnimationFrame(() => {
      const innerFrame = window.requestAnimationFrame(() => {
        button.classList.add('is-rippling')
        primaryRippleFrames.delete(button)
      })

      primaryRippleFrames.set(button, [outerFrame, innerFrame])
    })

    primaryRippleFrames.set(button, [outerFrame])

    const timer = window.setTimeout(() => {
      button.classList.remove('is-rippling')
      clearPrimaryRippleFrames(button)
      primaryRippleTimers.delete(button)
    }, 600)

    primaryRippleTimers.set(button, timer)
  }

  return (
    <section
      id="home"
      className="hero-shell relative min-h-screen min-h-[100svh] overflow-hidden"
    >
      <div className="hero-photo-stage hero-photo-breathe absolute inset-0" aria-hidden="true">
        <img
          src={heroPhoto}
          alt=""
          className="hero-photo hero-photo-base hero-photo-kenburns absolute inset-0 h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
        <img
          src={heroPhoto}
          alt=""
          className="hero-photo hero-photo-blur-overlay absolute inset-0 h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      <div className="hero-tint" aria-hidden="true" />
      <div className="hero-left-shade" aria-hidden="true" />
      <div className="hero-soften" aria-hidden="true" />
      <div className="hero-bottom-curve" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center px-5 pb-20 pt-36 text-center sm:px-8 md:pb-24 md:pt-40 lg:px-14 xl:px-20">
        <div className="hero-copy-panel mx-auto flex max-w-[860px] flex-col items-center">
          <div className="hero-kicker-reveal mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#faf1ea]">
            <span className="block h-px w-10 bg-[#faf1ea]/70" />
            <span>{siteData.hero.eyebrow}</span>
            <span className="block h-px w-10 bg-[#faf1ea]/70" />
          </div>

          <h1 className="hero-headline font-display max-w-[11ch] text-[3.15rem] leading-[0.92] tracking-[-0.05em] text-[#fffaf6] sm:text-[4.35rem] lg:text-[5.3rem]">
            {headlineWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="hero-headline-word"
                style={{ animationDelay: getStaggerDelay(index, 400) }}
              >
                {word}
                {index < headlineWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h1>

          <p
            className="hero-subtext-reveal mt-5 max-w-[34ch] text-[1rem] font-light leading-8 text-[#faf1ea]/92 sm:text-[1.08rem]"
          >
            {siteData.hero.subtext}
          </p>

          <div className="hero-proof-row mt-6">
            <div className="hero-proof-pill hero-proof-pill-rating">
              <span className="hero-proof-stars" aria-hidden="true">
                ★
              </span>
              <span className="hero-proof-rating">{siteData.hero.proof.rating}</span>
              <span className="hero-proof-text">{siteData.hero.proof.ratingLabel}</span>
            </div>

            <div className="hero-proof-pill hero-proof-pill-count">
              <span className="hero-proof-count">{bridesCount}+</span>
              <span className="hero-proof-text">{siteData.hero.proof.bridesLabel}</span>
            </div>
          </div>

          <div className="hero-cta-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={siteData.hero.primaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="cta-button cta-button-bright hero-primary-button hero-cta-button justify-center"
              style={{ animationDelay: getStaggerDelay(0, 1150, 60) }}
              onPointerDown={triggerPrimaryRipple}
            >
              {siteData.hero.primaryCta.label}
            </a>

            <a
              href={siteData.hero.secondaryCta.href}
              className="hero-secondary-button hero-cta-button inline-flex items-center justify-center rounded-full"
              style={{ animationDelay: getStaggerDelay(1, 1150, 60) }}
            >
              <span className="hero-secondary-button-label">{siteData.hero.secondaryCta.label}</span>
              <svg
                className="hero-secondary-button-outline"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <rect x="1" y="1" width="98" height="38" rx="19" ry="19" pathLength="100" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
