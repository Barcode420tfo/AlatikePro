import { useEffect, useRef, useState } from 'react'
import { siteData } from '../../data/site'
import heroPhoto from '../../../media/photos/hero-whatsapp-2026-04-15.jpeg'

export function HeroSection() {
  const proofRef = useRef(null)
  const [bridesCount, setBridesCount] = useState(0)
  const headlineWords = siteData.hero.headline.split(' ')

  useEffect(() => {
    const node = proofRef.current

    if (!node) {
      return undefined
    }

    let frameId = 0
    let hasAnimated = false

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true
          animateCount()
          observer.disconnect()
        }
      },
      { threshold: 0.55 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  const setPulseOrigin = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pulse-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pulse-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <section
      id="home"
      className="hero-shell relative min-h-screen overflow-hidden"
    >
      <img
        src={heroPhoto}
        alt=""
        className="hero-photo hero-photo-kenburns absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      <div className="hero-tint" aria-hidden="true" />
      <div className="hero-left-shade" aria-hidden="true" />
      <div className="hero-soften" aria-hidden="true" />
      <div className="hero-bottom-curve" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-20 pt-36 text-center sm:px-8 md:pb-24 md:pt-40 lg:px-14 xl:px-20">
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
                style={{ animationDelay: `${300 + index * 75}ms` }}
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

          <div
            ref={proofRef}
            className="hero-proof-row mt-6"
          >
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
              className="cta-button cta-button-bright hero-primary-button justify-center"
              onMouseEnter={setPulseOrigin}
              onMouseMove={setPulseOrigin}
            >
              {siteData.hero.primaryCta.label}
            </a>

            <a
              href={siteData.hero.secondaryCta.href}
              className="hero-secondary-button inline-flex items-center justify-center rounded-full"
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
