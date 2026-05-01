import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'
import { getStaggerDelay } from '../../lib/motion'
import instagram01 from '../../../media/photos/IMG_1911.PNG'
import instagram02 from '../../../media/photos/IMG_7209.JPEG'
import instagram03 from '../../../media/photos/everyday-shot-01.PNG'
import instagram04 from '../../../media/photos/instagram-bridal-orange-2026-04-22.jpeg'

const imageMap = {
  'instagram-01': instagram01,
  'instagram-02': instagram02,
  'instagram-03': instagram03,
  'instagram-04': instagram04,
}

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

export function InstagramStripSection() {
  const { ref: sectionRef, isVisible } = useRevealInView({
    offsetPx: 0,
    threshold: 0.24,
  })

  return (
    <section
      ref={sectionRef}
      className="instagram-shell relative overflow-hidden bg-[#fbf7f2] px-7 pb-20 pt-18 text-[#2f2118] sm:px-9 lg:px-14 lg:pb-24 lg:pt-20"
    >
      <div className="mx-auto max-w-[1220px]">
        <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
          <div>
            <p className={`instagram-kicker ${isVisible ? 'is-visible' : ''}`}>{siteData.instagram.label}</p>
            <div className="instagram-heading-mask">
              <h2 className={`instagram-heading ${isVisible ? 'is-visible' : ''}`}>
                {siteData.instagram.headline}
              </h2>
            </div>
          </div>

          <a
            href={siteData.instagram.url}
            target="_blank"
            rel="noreferrer"
            className={`instagram-follow-link ${isVisible ? 'is-visible' : ''}`}
          >
            <span>{siteData.instagram.handle}</span>
            <span>{siteData.instagram.followLabel}</span>
          </a>
        </div>

        <div className="instagram-grid">
          {siteData.instagram.tiles.map((tile, index) => (
            <a
              key={tile.image}
              href={siteData.instagram.url}
              target="_blank"
              rel="noreferrer"
              className={`instagram-tile ${isVisible ? 'is-visible' : ''}`}
              style={{ animationDelay: getStaggerDelay(index, 520, 140) }}
              aria-label={`Open Instagram post preview ${index + 1}`}
            >
              <img
                src={imageMap[tile.image]}
                alt={tile.alt}
                className="instagram-tile-image"
                style={{ objectPosition: tile.position ?? 'center' }}
                loading="lazy"
                decoding="async"
              />
              <div className="instagram-tile-overlay" aria-hidden="true">
                <span className="instagram-tile-icon">{instagramIcon}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
