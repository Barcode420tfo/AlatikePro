import { useState } from 'react'
import logo from '../../../assets/alatike_pro_yoruba_v3b.svg'
import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'

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

const instagramIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M7.2 3.9h9.6a3.3 3.3 0 013.3 3.3v9.6a3.3 3.3 0 01-3.3 3.3H7.2a3.3 3.3 0 01-3.3-3.3V7.2a3.3 3.3 0 013.3-3.3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3.55" fill="none" stroke="currentColor" strokeWidth="1.45" />
    <circle cx="17.15" cy="6.9" r="0.85" fill="currentColor" />
  </svg>
)

const facebookIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M13.2 20v-6.5h2.2l.4-2.7h-2.6V9.1c0-.78.22-1.3 1.34-1.3h1.43V5.4c-.25-.03-1.1-.1-2.08-.1-2.06 0-3.48 1.26-3.48 3.57v1.99H8.6v2.7h1.85V20h2.75z"
      fill="currentColor"
    />
  </svg>
)

const socialIconMap = {
  Instagram: instagramIcon,
  Facebook: facebookIcon,
}

const locationIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 20.1s6-5.4 6-10.4a6 6 0 10-12 0c0 5 6 10.4 6 10.4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.7" r="2.1" fill="currentColor" />
  </svg>
)

export function ContactSection() {
  const [isLiveMapVisible, setIsLiveMapVisible] = useState(false)
  const { ref: ctaRef, isVisible: isCtaVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.24,
  })
  const { ref: footerRef, isVisible: isFooterVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.16,
  })
  const { ref: footerCreditRef, isVisible: isFooterCreditVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.2,
  })
  const [footerHoursPrimary, footerHoursSecondary] = siteData.contact.secondary.hours
    .split('·')
    .map((part) => part.trim())

  return (
    <section
      id="contact"
      className="contact-shell deferred-section relative overflow-hidden bg-[#faf1ea] px-7 pb-10 pt-18 text-[#2f2118] sm:px-9 lg:px-14 lg:pb-12 lg:pt-22"
    >
      <div className="mx-auto max-w-[1220px]">
        <div ref={ctaRef} className="contact-cta-panel">
          <div className={`contact-kicker ${isCtaVisible ? 'is-visible' : ''}`}>
            <span className="contact-kicker-line" aria-hidden="true" />
            <span className="contact-kicker-text">{siteData.contact.label}</span>
            <span className="contact-kicker-line" aria-hidden="true" />
          </div>

          <div className="contact-main-grid">
            <div className="contact-copy-column">
              <div className="contact-heading-mask">
                <h2 className={`contact-heading ${isCtaVisible ? 'is-visible' : ''}`}>
                  <span className="contact-heading-line contact-heading-line-regular">
                    {siteData.contact.headlineLead}
                  </span>
                  <span className="contact-heading-line contact-heading-line-accent">
                    {siteData.contact.headlineAccent}
                  </span>
                </h2>
              </div>

              <p className={`contact-intro ${isCtaVisible ? 'is-visible' : ''}`}>{siteData.contact.intro}</p>

              <p className={`contact-hours ${isCtaVisible ? 'is-visible' : ''}`}>
                <span className="contact-hours-dot" aria-hidden="true" />
                <span>{siteData.contact.secondary.hours}</span>
              </p>
            </div>

            <div className={`contact-divider ${isCtaVisible ? 'is-visible' : ''}`} aria-hidden="true" />

            <div className="contact-actions-column">
              <div className={`contact-info-stack ${isCtaVisible ? 'is-visible' : ''}`}>
                <div className="contact-info-item">
                  <span className="contact-info-label">{siteData.contact.secondary.phoneLabel}</span>
                  <a href="tel:+2347036332149" className="contact-info-value">
                    {siteData.contact.secondary.phone}
                  </a>
                </div>

                <div className="contact-info-item">
                  <span className="contact-info-label">{siteData.contact.secondary.emailLabel}</span>
                  <a href={`mailto:${siteData.contact.secondary.email}`} className="contact-info-value contact-info-value-email">
                    {siteData.contact.secondary.email}
                  </a>
                </div>

                <div className="contact-info-item">
                  <span className="contact-info-label">{siteData.contact.secondary.addressLabel}</span>
                  <a
                    href={siteData.contact.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-info-value contact-info-value-address"
                  >
                    {siteData.contact.secondary.address}
                  </a>
                </div>
              </div>

              <div className={`contact-actions ${isCtaVisible ? 'is-visible' : ''}`}>
                <a
                  href={siteData.contact.primaryCta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-primary-button"
                >
                  {whatsappIcon}
                  <span>{siteData.contact.primaryCta.label}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`contact-map-panel ${isCtaVisible ? 'is-visible' : ''}`}>
          <div className="contact-map-copy">
            <p className="contact-map-kicker">Location</p>
            <h3 className="contact-map-title">Visit the Alatike Pro studio</h3>
            <p className="contact-map-address">{siteData.contact.secondary.address}</p>
            <div className="contact-map-actions">
              <a
                href={siteData.contact.mapLink}
                target="_blank"
                rel="noreferrer"
                className="contact-map-link"
              >
                Open in Google Maps
              </a>
              <button
                type="button"
                className="contact-map-toggle"
                onClick={() => setIsLiveMapVisible((current) => !current)}
              >
                {isLiveMapVisible ? 'Hide live map' : 'Load live map'}
              </button>
            </div>
          </div>

          <div className="contact-map-frame">
            {isLiveMapVisible ? (
              <iframe
                title="Alatike Pro studio map"
                src={siteData.contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="contact-map-placeholder">
                <span className="contact-map-placeholder-pill">
                  {locationIcon}
                  <span>Studio location</span>
                </span>
                <div className="contact-map-placeholder-card">
                  <span className="contact-map-placeholder-road">Bariga Road</span>
                  <span className="contact-map-placeholder-area">Bajulaiye, Shomolu</span>
                </div>
                <p className="contact-map-placeholder-note">
                  Open the live map whenever you would like a closer view of the studio location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div ref={footerRef} className="contact-footer-shell">
        <div className={`contact-footer ${isFooterVisible ? 'is-visible' : ''}`}>
          <div className="contact-footer-inner">
            <div className="contact-footer-column contact-footer-brand-col">
              <img
                src={logo}
                alt={`${siteData.brandName} logo`}
                className="contact-footer-logo"
                loading="lazy"
                decoding="async"
              />
              <p className="contact-footer-note">{siteData.contact.footerNote}</p>
              <p className="contact-footer-about">{siteData.contact.footerAbout}</p>
            </div>

            <div className="contact-footer-column contact-footer-links-col">
              <p className="contact-footer-title">Quick Links</p>
              <div className="contact-footer-link-list">
                {siteData.navItems.map((item) => (
                  <a key={item.href} href={item.href} className="contact-footer-link">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-footer-column contact-footer-contact-col">
              <p className="contact-footer-title">Get In Touch</p>
              <div className="contact-footer-stack">
                <div className="contact-footer-info-group">
                  <p className="contact-footer-label">{siteData.contact.secondary.phoneLabel}</p>
                  <a href="tel:+2347036332149" className="contact-footer-link contact-footer-link-strong">
                    {siteData.contact.secondary.phone}
                  </a>
                </div>

                <div className="contact-footer-info-group">
                  <p className="contact-footer-label">{siteData.contact.secondary.emailLabel}</p>
                  <a href={`mailto:${siteData.contact.secondary.email}`} className="contact-footer-link contact-footer-link-small">
                    {siteData.contact.secondary.email}
                  </a>
                </div>

                <div className="contact-footer-info-group">
                  <p className="contact-footer-label">{siteData.contact.secondary.addressLabel}</p>
                  <a
                    href={siteData.contact.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-footer-link contact-footer-link-small"
                  >
                    {siteData.contact.secondary.address}
                  </a>
                </div>

                <div className="contact-footer-info-group">
                  <p className="contact-footer-label">Hours</p>
                  <p className="contact-footer-hours-main">{footerHoursPrimary}</p>
                  {footerHoursSecondary ? (
                    <p className="contact-footer-hours-sub">{footerHoursSecondary}</p>
                  ) : null}
                </div>
              </div>

              <div className="contact-footer-socials">
                {siteData.contact.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-footer-social"
                    aria-label={social.label}
                  >
                    {socialIconMap[social.label]}
                  </a>
                ))}
                <a
                  href={siteData.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-footer-social"
                  aria-label="WhatsApp"
                >
                  {whatsappIcon}
                </a>
              </div>
            </div>
          </div>

          <div className="contact-footer-middle">
            <p className="contact-footer-quote">“Makeup is not just about appearance — it is about confidence.”</p>
            <p className="contact-footer-availability">Available on request</p>
          </div>
        </div>

        <div ref={footerCreditRef} className={`contact-footer-credit ${isFooterCreditVisible ? 'is-visible' : ''}`}>
          <div className="contact-footer-credit-inner">
            <span>{siteData.contact.copyright}</span>
            <div className="contact-footer-credit-links">
              <a href={`https://${siteData.contact.website}`} target="_blank" rel="noreferrer">
                {siteData.contact.website}
              </a>
              <span aria-hidden="true">•</span>
              <span>Privacy</span>
              <span aria-hidden="true">•</span>
              <a href="https://www.instagram.com/alatike_mua" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
