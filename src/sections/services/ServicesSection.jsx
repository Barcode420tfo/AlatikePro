import { useEffect, useRef, useState } from 'react'
import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'
import { getStaggerDelay } from '../../lib/motion'
import bridalImage from '../../../media/optimized/photos/FTP02639.jpg'
import everydayImage from '../../../media/optimized/photos/IMG_1911.jpg'
import geleImage from '../../../media/optimized/photos/IMG_7209.jpg'
import trainingImage from '../../../media/optimized/photos/about-ceo-adeola-v3.jpg'

const imageMap = {
  'ftp-portrait': bridalImage,
  'img-1911': everydayImage,
  'gele-portrait': geleImage,
  'training-portrait': trainingImage,
}

const iconMap = {
  diamond: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 8.1L9.1 4.7h5.8l2.6 3.4-5.5 10.8L6.5 8.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 4.7l2.9 13.9 2.9-13.9M6.5 8.1h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.1l1.65 4.35L18 9.1l-4.35 1.65L12 15.1l-1.65-4.35L6 9.1l4.35-1.65L12 3.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6 15.7l.66 1.67 1.67.66-1.67.66-.66 1.67-.66-1.67-1.67-.66 1.67-.66.66-1.67z"
        fill="currentColor"
      />
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 18.2l1.3-8.1 4.1 3.4 1.6-5.5 1.6 5.5 4.1-3.4 1.3 8.1H5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M8 18.2h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  ),
  academy: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.4 7.8L12 4l7.6 3.8-7.6 3.8-7.6-3.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M7.1 9.2v4.1c0 1.5 2.2 2.7 4.9 2.7s4.9-1.2 4.9-2.7V9.2M19.6 7.8v5.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4 15.2h2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  ),
}

const whatsappIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 4.5a7.28 7.28 0 00-6.29 10.94L4.7 19.5l4.2-1.04A7.28 7.28 0 1012 4.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.27 8.8c-.2-.45-.42-.46-.61-.47h-.52c-.18 0-.46.07-.7.34-.25.26-.95.93-.95 2.27s.97 2.64 1.1 2.82c.14.18 1.88 3.03 4.64 4.12 2.28.9 2.75.72 3.25.68.5-.05 1.61-.66 1.84-1.3.23-.64.23-1.19.16-1.3-.07-.11-.27-.18-.56-.34-.3-.16-1.75-.86-2.02-.95-.28-.1-.48-.14-.68.16-.2.3-.78.95-.95 1.14-.18.2-.35.22-.65.08-.3-.16-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.62.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.53-.08-.15-.68-1.65-.95-2.28z"
      fill="currentColor"
    />
  </svg>
)

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  whatsapp: '',
  whatsappSame: true,
  preferredService: siteData.services.items[0].title,
  preferredDate: '',
  occasionType: siteData.services.booking.occasionOptions[0],
  message: '',
}

const bookingDraftStorageKey = 'alatike-pro-booking-draft'
const SERVICES_CARD_STAGGER_MS = 180
const serviceWaveOffsets = [-28, -10, 10, 28]
const serviceWaveTilts = [-1.8, -0.7, 0.7, 1.8]
const BRIDAL_MIN_DAYS_AHEAD = 30
const WALK_IN_MIN_DAYS_AHEAD = 1
const WALK_IN_SERVICE_LABEL = 'Store Visit / Walk-in'

function getStartOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function addDays(date, days) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

function formatDateInputValue(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function isBridalService(serviceName) {
  return serviceName.toLowerCase().includes('bridal')
}

function getMinBookingDateForService(serviceName) {
  const today = getStartOfToday()

  if (serviceName === WALK_IN_SERVICE_LABEL) {
    return formatDateInputValue(addDays(today, WALK_IN_MIN_DAYS_AHEAD))
  }

  if (isBridalService(serviceName)) {
    return formatDateInputValue(addDays(today, BRIDAL_MIN_DAYS_AHEAD))
  }

  return formatDateInputValue(today)
}

export function ServicesSection() {
  const bookingEnabled = siteData.services.booking.enabled !== false
  const bookingRecipient = siteData.services.booking.recipientEmail
  const bookingSubmitUrl = `https://formsubmit.co/ajax/${bookingRecipient}`
  const bookingFallbackUrl = `https://formsubmit.co/${bookingRecipient}`
  const bookingServiceOptions = [
    ...siteData.services.items.map((item) => item.title),
    ...(siteData.services.booking.additionalServiceOptions ?? []),
  ]
  const [formState, setFormState] = useState(() => {
    if (typeof window === 'undefined') {
      return initialFormState
    }

    try {
      const savedDraft = window.localStorage.getItem(bookingDraftStorageKey)

      if (!savedDraft) {
        return initialFormState
      }

      return {
        ...initialFormState,
        ...JSON.parse(savedDraft),
      }
    } catch {
      return initialFormState
    }
  })
  const [submitState, setSubmitState] = useState('idle')
  const [expandedServiceSlug, setExpandedServiceSlug] = useState(null)
  const { ref: sectionRef, isVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.2,
  })
  const submitAbortRef = useRef(null)
  const minBookingDate = getMinBookingDateForService(formState.preferredService)
  const isDateSelectionTooEarly =
    Boolean(formState.preferredDate) && formState.preferredDate < minBookingDate
  const bookingDateMessage = isBridalService(formState.preferredService)
    ? 'Bridal bookings should be made at least one month ahead. If your date is sooner, please call Alatike for verbal enquiries.'
    : formState.preferredService === WALK_IN_SERVICE_LABEL
      ? 'Store Visit / Walk-in bookings should be made 1 or 2 days ahead of your visit date.'
      : null

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(bookingDraftStorageKey, JSON.stringify(formState))
  }, [formState])

  useEffect(() => {
    return () => {
      submitAbortRef.current?.abort()
    }
  }, [])

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormState((current) => {
      if (name === 'whatsappSame') {
        return {
          ...current,
          whatsappSame: checked,
          whatsapp: checked ? current.phone : current.whatsapp,
        }
      }

      if (name === 'phone') {
        return {
          ...current,
          phone: value,
          whatsapp: current.whatsappSame ? value : current.whatsapp,
        }
      }

      if (name === 'preferredService') {
        const nextMinBookingDate = getMinBookingDateForService(value)

        return {
          ...current,
          preferredService: value,
          preferredDate:
            current.preferredDate && current.preferredDate < nextMinBookingDate
              ? ''
              : current.preferredDate,
        }
      }

      return {
        ...current,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!bookingEnabled || submitState === 'submitting') {
      return
    }

    if (isDateSelectionTooEarly) {
      setSubmitState('error')
      return
    }

    setSubmitState('submitting')

    const formData = new FormData(event.currentTarget)
    formData.set('whatsapp', formState.whatsappSame ? formState.phone : formState.whatsapp)
    formData.set('_subject', `Booking Request - ${formState.preferredService}`)
    formData.set('_template', 'table')
    formData.set('_replyto', formState.email)
    formData.set('_captcha', 'false')

    submitAbortRef.current?.abort()
    const controller = new AbortController()
    submitAbortRef.current = controller

    try {
      const response = await fetch(bookingSubmitUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      })

      const result = await response.json()

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Form submission failed.')
      }

      setSubmitState('success')
      setFormState({
        ...initialFormState,
        preferredService: formState.preferredService,
      })
      window.localStorage.removeItem(bookingDraftStorageKey)
    } catch (error) {
      if (error.name === 'AbortError') {
        return
      }

      setSubmitState('error')
    } finally {
      submitAbortRef.current = null
    }
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-shell deferred-section relative bg-[#faf9f6] px-7 pb-20 pt-8 sm:px-9 lg:px-14 lg:pb-28 lg:pt-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="services-intro">
          <div className={`services-kicker ${isVisible ? 'is-visible' : ''}`} aria-label={siteData.services.label}>
            <span className="services-kicker-line" aria-hidden="true" />
            <span className="services-kicker-gem" aria-hidden="true" />
            <span className="services-kicker-text">{siteData.services.label}</span>
            <span className="services-kicker-gem" aria-hidden="true" />
            <span className="services-kicker-line services-kicker-line-right" aria-hidden="true" />
          </div>

          <div className="services-heading-stack" aria-label={siteData.services.headline}>
            {siteData.services.headlineLines.map((line, index) => (
              <span className="services-heading-mask" key={line}>
                <span
                  className={`services-heading-line ${isVisible ? 'is-visible' : ''}`}
                  style={{ animationDelay: getStaggerDelay(index, 140) }}
                >
                  {line}
                </span>
              </span>
            ))}
          </div>

          <p className={`services-subtext ${isVisible ? 'is-visible' : ''}`}>
            {siteData.services.subtext}
          </p>
        </div>

        <span className={`services-divider ${isVisible ? 'is-visible' : ''}`} aria-hidden="true" />

        <div className="services-card-grid">
          {siteData.services.items.map((service, index) => {
            const isFlagship = index === 0
            const isAlwaysOpen = isFlagship || service.slug === 'beauty-training'
            const isMobileOpen = expandedServiceSlug === service.slug
            const stageDelay = getStaggerDelay(index, 540, SERVICES_CARD_STAGGER_MS)
            const waveOffset = serviceWaveOffsets[index] ?? 0
            const waveTilt = serviceWaveTilts[index] ?? 0

            return (
              <article
                key={service.slug}
                className={`service-card service-card-${service.theme} ${isFlagship ? 'service-card-flagship' : ''} ${isAlwaysOpen ? 'service-card-always-open' : ''} ${isMobileOpen ? 'service-card-mobile-open' : ''} ${isVisible ? 'is-visible' : ''}`}
                style={{
                  animationDelay: stageDelay,
                  '--service-wave-x': `${waveOffset}px`,
                  '--service-wave-tilt': `${waveTilt}deg`,
                }}
              >
                <div className="service-card-image-wrap">
                  <img
                    src={imageMap[service.image]}
                    alt={service.title}
                    className="service-card-image"
                    style={{ objectPosition: service.imagePosition ?? 'center' }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="service-card-overlay" aria-hidden="true" />
                  <div className="service-card-topbar">
                    <span className="service-card-icon" aria-hidden="true">
                      {iconMap[service.icon]}
                    </span>
                    <span className="service-card-number">{service.number}</span>
                  </div>
                  <div className="service-card-body">
                    <div className="service-card-overlay-content">
                      <p className="service-card-eyebrow">{service.eyebrow}</p>
                      <h3 className="service-card-title">{service.title}</h3>
                      <button
                        type="button"
                        className="service-card-learn-more"
                        aria-expanded={isMobileOpen}
                        aria-controls={`service-mobile-panel-${service.slug}`}
                        onClick={() =>
                          setExpandedServiceSlug((current) => (current === service.slug ? null : service.slug))
                        }
                      >
                        {isMobileOpen ? 'Hide details' : 'Learn more'}
                      </button>
                    </div>
                    <div className="service-card-hover-panel">
                      <p className="service-card-description">{service.description}</p>
                      <p className="service-card-details">{service.details}</p>
                      <a
                        href={`${siteData.whatsappUrl}?text=${encodeURIComponent(service.whatsappMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="service-card-whatsapp"
                        aria-label={`WhatsApp enquiry for ${service.title}`}
                      >
                        {whatsappIcon}
                        <span>{service.ctaLabel ?? 'Enquire on WhatsApp'}</span>
                      </a>
                    </div>
                  </div>
                  <div
                    id={`service-mobile-panel-${service.slug}`}
                    className="service-card-mobile-panel"
                  >
                    <button
                      type="button"
                      className="service-card-close"
                      aria-label={`Close details for ${service.title}`}
                      onClick={() => setExpandedServiceSlug(null)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <p className="service-card-mobile-description">{service.description}</p>
                    <p className="service-card-mobile-details">{service.details}</p>
                    <a
                      href={`${siteData.whatsappUrl}?text=${encodeURIComponent(service.whatsappMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="service-card-mobile-whatsapp"
                      aria-label={`WhatsApp enquiry for ${service.title}`}
                    >
                      {whatsappIcon}
                      <span>{service.ctaLabel ?? 'Enquire on WhatsApp'}</span>
                    </a>
                  </div>
                  <span className="service-card-accent" aria-hidden="true" />
                </div>
              </article>
            )
          })}
        </div>

        <div className={`services-info-strip ${isVisible ? 'is-visible' : ''}`}>
          {siteData.services.infoStrip.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="services-info-cell"
              style={{ animationDelay: getStaggerDelay(index, 900) }}
            >
              <span className="services-info-label">{item.label}</span>
              <span className="services-info-value">{item.value}</span>
              <span className="services-info-arrow" aria-hidden="true">
                -&gt;
              </span>
            </a>
          ))}
        </div>

        <section
          id="booking"
          className={`booking-shell ${isVisible ? 'is-visible' : ''}`}
          aria-labelledby="booking-title"
        >
          <div className="booking-copy">
            <span className="booking-kicker">{siteData.services.booking.label}</span>
            <h3 id="booking-title" className="booking-title">
              {siteData.services.booking.headline}
            </h3>
            <p className="booking-intro">{siteData.services.booking.intro}</p>
          </div>

          <form
            className="booking-form"
            method="post"
            action={bookingFallbackUrl}
            noValidate
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_honey" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <div className="booking-grid">
              <label className="booking-field">
                <span>Full name</span>
                <input
                  name="name"
                  value={formState.fullName}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, fullName: event.target.value }))
                  }
                  placeholder="Your full name"
                  required={bookingEnabled}
                  disabled={!bookingEnabled}
                />
              </label>

              <label className="booking-field">
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="yourname@email.com"
                  required={bookingEnabled}
                  disabled={!bookingEnabled}
                />
              </label>

              <label className="booking-field">
                <span>Phone number</span>
                <input
                  name="phone"
                  value={formState.phone}
                  onChange={handleFormChange}
                  placeholder="0800 000 0000"
                  required={bookingEnabled}
                  disabled={!bookingEnabled}
                />
              </label>

              <label className="booking-field">
                <span>WhatsApp number</span>
                <input
                  name="whatsapp"
                  value={formState.whatsappSame ? formState.phone : formState.whatsapp}
                  onChange={handleFormChange}
                  placeholder="Same as phone"
                  disabled={!bookingEnabled || formState.whatsappSame}
                  required={bookingEnabled}
                />
              </label>

              <label className="booking-field booking-field-check">
                <span>Use same number for WhatsApp</span>
                <input
                  type="checkbox"
                  name="whatsappSame"
                  checked={formState.whatsappSame}
                  onChange={handleFormChange}
                  disabled={!bookingEnabled}
                />
              </label>

              <label className="booking-field">
                <span>Preferred service</span>
                <select
                  name="preferredService"
                  value={formState.preferredService}
                  onChange={handleFormChange}
                  disabled={!bookingEnabled}
                >
                  {bookingServiceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="booking-field">
                <span>Preferred date</span>
                <input
                  type="date"
                  name="preferredDate"
                  value={formState.preferredDate}
                  onChange={handleFormChange}
                  min={minBookingDate}
                  disabled={!bookingEnabled}
                />
                {bookingDateMessage ? (
                  <p className="booking-alert" role="status">
                    {bookingDateMessage}
                  </p>
                ) : null}
                {isDateSelectionTooEarly ? (
                  <p className="booking-alert" role="alert">
                    Please choose a valid date that matches this booking window.
                  </p>
                ) : null}
              </label>

              <label className="booking-field">
                <span>Occasion type</span>
                <select
                  name="occasionType"
                  value={formState.occasionType}
                  onChange={handleFormChange}
                  disabled={!bookingEnabled}
                >
                  {siteData.services.booking.occasionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="booking-field booking-field-full">
                <span>Message</span>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleFormChange}
                  rows="5"
                  placeholder="Tell us about your event, look preference, location, or any other helpful detail."
                  disabled={!bookingEnabled}
                />
              </label>
            </div>

            <div className="booking-actions">
              <button
                type="submit"
                className="booking-submit"
                disabled={!bookingEnabled || submitState === 'submitting' || isDateSelectionTooEarly}
              >
                {submitState === 'submitting' ? 'Sending...' : siteData.services.booking.submitLabel}
              </button>
              <p className="booking-note">{siteData.services.booking.note}</p>
            </div>

            {submitState === 'success' ? (
              <p className="booking-success">
                Booking request sent successfully. It has been sent to the business mailbox.
              </p>
            ) : null}

            {submitState === 'error' ? (
              <p className="booking-success">
                Something went wrong while sending the booking request. Please try again or use the WhatsApp icon on a service card.
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </section>
  )
}
