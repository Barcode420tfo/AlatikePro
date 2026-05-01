import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'
import { getStaggerDelay } from '../../lib/motion'
import planeIcon from '../../../media/photos/plane-icon.png'

const TRUST_STAGGER_MS = 820

const iconMap = {
  medal: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8.1 3.5h3.2l1.25 4.15H9.35L8.1 3.5zm4.6 0h3.2l-1.25 4.15h-3.2L12.7 3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.6a5.4 5.4 0 100 10.8 5.4 5.4 0 000-10.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 11.1l1.05 2.1 2.35.34-1.7 1.66.4 2.34-2.1-1.1-2.1 1.1.4-2.34-1.7-1.66 2.35-.34L12 11.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  travel: <img src={planeIcon} alt="" className="trust-icon-image" aria-hidden="true" />,
  tones: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.2 18.25c-1.85 0-3.2-1.4-3.2-3.25 0-2.75 2.2-4.85 5.1-4.85 1.15 0 2.3.4 3.2 1.2.9-.8 2.05-1.2 3.2-1.2 2.9 0 5.1 2.1 5.1 4.85 0 1.85-1.35 3.25-3.2 3.25H7.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.95 12.4a1.75 1.75 0 113.5 0v1.55h-3.5V12.4zm4.3-1.15a1.95 1.95 0 113.9 0v2.7h-3.9v-2.7zm4.7 1.15a1.75 1.75 0 113.5 0v1.55h-3.5V12.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export function TrustStrip() {
  const { ref: sectionRef, isVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.28,
  })

  return (
    <section
      ref={sectionRef}
      className="trust-shell relative z-10 bg-[#faf9f6] px-6 pb-10 pt-5 sm:px-8 sm:pb-12 sm:pt-6 lg:px-12 lg:pb-14 lg:pt-6"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-7 md:grid-cols-3 md:gap-4 lg:gap-7">
          {siteData.trustStrip.items.map((item, index) => (
            <article
              key={item.title}
              className={`trust-item trust-reveal trust-tone-${item.tone} ${isVisible ? 'is-visible' : ''}`}
              style={{ '--trust-delay': getStaggerDelay(index, 0, TRUST_STAGGER_MS) }}
            >
              <div className="trust-blob">
                <div className="trust-icon">{iconMap[item.icon]}</div>
              </div>
              <h3 className="trust-card-title">{item.title}</h3>
              {item.subtitle ? (
                <p className="trust-card-subtitle">{item.subtitle}</p>
              ) : null}
              <p className="trust-card-line">{item.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
