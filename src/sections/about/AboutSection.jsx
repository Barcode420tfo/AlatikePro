import { useEffect, useState } from 'react'
import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'
import { getStaggerDelay, prefersReducedMotion } from '../../lib/motion'
import aboutPhoto from '../../../media/photos/about-ceo-adeola-v4.jpeg'

export function AboutSection() {
  const reducedMotion = prefersReducedMotion()
  const [clientCount, setClientCount] = useState(() => (reducedMotion ? 300 : 0))
  const { ref: sectionRef, isVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.22,
  })
  const { ref: quoteRef, isVisible: isQuoteVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.5,
  })
  const headingWords = siteData.about.headline.split(' ')

  useEffect(() => {
    if (!isVisible) {
      return undefined
    }

    let frameId = 0

    if (reducedMotion) {
      return undefined
    }

    const animateCount = () => {
      const duration = 1200
      const target = 300
      const start = performance.now()

      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        setClientCount(Math.round(target * eased))

        if (progress < 1) {
          frameId = window.requestAnimationFrame(step)
        }
      }

      frameId = window.requestAnimationFrame(step)
    }

    animateCount()

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [isVisible, reducedMotion])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-shell relative px-6 pb-18 pt-18 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24"
    >
      <div className="about-top-curve" aria-hidden="true" />

      <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className={`about-photo-wrap ${isVisible ? 'is-visible' : ''}`}>
          <div className="about-photo-frame">
            <img
              src={aboutPhoto}
              alt="Adeola, founder of Alatike Pro"
              className="about-photo"
            />
            <div className="about-photo-grain" aria-hidden="true" />
            <div className={`about-counter-card ${isVisible ? 'is-visible' : ''}`}>
              <strong className="about-counter-value">{clientCount}+</strong>
              <span className="about-counter-label">Clients Styled</span>
            </div>
            <span className="about-photo-accent" aria-hidden="true" />
          </div>
        </div>

        <div className={`about-copy ${isVisible ? 'is-visible' : ''}`}>
          <div className="about-kicker" aria-label={siteData.about.label}>
            <span className={`about-kicker-line ${isVisible ? 'is-visible' : ''}`} aria-hidden="true" />
            <span className="about-kicker-text">{siteData.about.label}</span>
          </div>
          <h2 className="about-headline mt-4 font-[var(--font-display)] text-[2.35rem] leading-[0.94] tracking-[-0.04em] text-[#3e2c22] sm:text-[3rem] lg:text-[4rem]">
            {headingWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="about-headline-word"
                style={{ animationDelay: getStaggerDelay(index, 720, 120) }}
              >
                {word}
                {index < headingWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h2>

          <div className="about-stats">
            {siteData.about.stats.map((stat, index) => (
              <span
                key={stat}
                className={`about-stat-pill ${isVisible ? 'is-visible' : ''}`}
                style={{ animationDelay: getStaggerDelay(index, 500) }}
              >
                {stat}
              </span>
            ))}
          </div>

          <div className="about-body-group mt-5 space-y-4">
            {siteData.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="about-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className={`about-divider ${isVisible ? 'is-visible' : ''}`} aria-hidden="true" />

          <blockquote ref={quoteRef} className={`about-quote ${isQuoteVisible ? 'is-visible' : ''}`}>
            <span className="about-quote-accent" aria-hidden="true" />
            <span className="about-quote-text">“{siteData.about.quote}”</span>
          </blockquote>

          <div className={`about-cta-row ${isVisible ? 'is-visible' : ''}`}>
            <a
              href={siteData.about.primaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="cta-button cta-button-bright justify-center"
            >
              {siteData.about.primaryCta.label}
            </a>

            <a
              href={siteData.about.secondaryCta.href}
              className="about-secondary-button inline-flex items-center justify-center rounded-full"
            >
              {siteData.about.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
