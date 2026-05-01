import { useState } from 'react'
import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'
import { getStaggerDelay } from '../../lib/motion'

const chevronIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M7 10l5 5 5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const { ref: sectionRef, isVisible } = useRevealInView()

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="faq-shell relative overflow-hidden bg-[#faf7f2] px-7 pb-22 pt-18 text-[#2f2118] sm:px-9 lg:px-14 lg:pb-28 lg:pt-22"
    >
      <div className="mx-auto max-w-[980px]">
        <div className="mx-auto max-w-[38rem] text-center">
          <p className={`faq-kicker ${isVisible ? 'is-visible' : ''}`}>{siteData.faq.label}</p>

          <div className="faq-heading-mask">
            <h2 className={`faq-heading ${isVisible ? 'is-visible' : ''}`}>
              {siteData.faq.headline}
            </h2>
          </div>
        </div>

        <div className={`faq-list ${isVisible ? 'is-visible' : ''}`}>
          {siteData.faq.items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <article
                key={item.question}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                style={{ animationDelay: getStaggerDelay(index) }}
              >
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => handleToggle(index)}
                >
                  <span className="faq-question">{item.question}</span>
                  <span className={`faq-icon ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                    {chevronIcon}
                  </span>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  className={`faq-panel ${isOpen ? 'is-open' : ''}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="faq-panel-inner">
                    <p className="faq-answer">{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
