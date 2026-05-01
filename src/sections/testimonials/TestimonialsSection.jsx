import { useState } from 'react'
import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'

const starIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3.7l2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.84 7.3 18.15l.9-5.23-3.8-3.7 5.25-.76L12 3.7z"
      fill="currentColor"
    />
  </svg>
)

const arrowLeftIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M14.8 5.5L8.3 12l6.5 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const arrowRightIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M9.2 5.5l6.5 6.5-6.5 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref: sectionRef, isVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.28,
  })
  const items = siteData.testimonials.items

  const goToPrevious = () => {
    setActiveIndex((current) => Math.max(0, current - 1))
  }

  const goToNext = () => {
    setActiveIndex((current) => Math.min(items.length - 1, current + 1))
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonials-shell relative overflow-hidden bg-[#f5ede5] px-7 pb-22 pt-20 text-[#2f2118] sm:px-9 lg:px-14 lg:pb-28 lg:pt-24"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[40rem] text-center">
          <p className={`testimonials-kicker ${isVisible ? 'is-visible' : ''}`}>{siteData.testimonials.label}</p>

          <div className="testimonials-heading-mask">
            <h2 className={`testimonials-heading ${isVisible ? 'is-visible' : ''}`}>
              {siteData.testimonials.headline}
            </h2>
          </div>
        </div>

        <div className={`testimonials-slider-shell ${isVisible ? 'is-visible' : ''}`}>
          <button
            type="button"
            className="testimonials-arrow"
            onClick={goToPrevious}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
          >
            {arrowLeftIcon}
          </button>

          <div className="testimonials-viewport" aria-live="polite">
            <div
              className="testimonials-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {items.map((item) => (
                <article key={`${item.name}-${item.role}`} className="testimonial-card">
                  <div className="testimonial-card-stars" aria-label={`${item.rating} star review`}>
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <span key={`${item.name}-star-${index}`} className="testimonial-star">
                        {starIcon}
                      </span>
                    ))}
                  </div>

                  <blockquote className="testimonial-quote">“{item.quote}”</blockquote>

                  <div className="testimonial-meta">
                    <span className="testimonial-name">{item.name}</span>
                    <span className="testimonial-role">{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="testimonials-arrow"
            onClick={goToNext}
            disabled={activeIndex === items.length - 1}
            aria-label="Next testimonial"
          >
            {arrowRightIcon}
          </button>
        </div>

        <div className={`testimonials-dots ${isVisible ? 'is-visible' : ''}`} aria-label="Testimonial navigation">
          {items.map((item, index) => (
            <button
              key={`${item.name}-dot`}
              type="button"
              className={`testimonials-dot ${activeIndex === index ? 'is-active' : ''}`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <p className={`testimonials-count ${isVisible ? 'is-visible' : ''}`}>
          {activeIndex + 1} / {items.length} reviews
        </p>
      </div>
    </section>
  )
}
