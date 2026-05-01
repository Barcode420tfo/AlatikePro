import { useEffect, useMemo, useRef, useState } from 'react'
import { siteData } from '../../data/site'
import { useRevealInView } from '../../hooks/useRevealInView'
import { getStaggerDelay, prefersReducedMotion } from '../../lib/motion'
import heroWhatsapp from '../../../media/photos/hero-whatsapp-2026-04-15.jpeg'
import ftpPortrait from '../../../media/photos/FTP02639.jpg.jpeg'
import geleLook from '../../../media/photos/IMG_7209.JPEG'
import everydayPortrait from '../../../media/photos/IMG_1826.PNG'
import greenSmile from '../../../media/photos/IMG_7545.JPG.jpeg'
import mintPortrait from '../../../media/photos/IMG_7463.JPG.jpeg'
import greenProfile from '../../../media/photos/IMG_7539.JPG.jpeg'
import everydayShot01 from '../../../media/photos/everyday-shot-01.PNG'
import everydayShot02 from '../../../media/photos/everyday-shot-02.PNG'
import everydayShot03 from '../../../media/photos/everyday-shot-03.PNG'
import everydayShot04 from '../../../media/photos/everyday-shot-04.PNG'
import everydayShot05 from '../../../media/photos/everyday-shot-05.PNG'
import everydayShot06 from '../../../media/photos/everyday-shot-06.PNG'
import everydayShot07 from '../../../media/photos/everyday-shot-07.PNG'
import bridalShot01 from '../../../media/photos/bridal-shot-01.PNG'
import bridalShot02 from '../../../media/photos/bridal-shot-02.PNG'
import bridalShot03 from '../../../media/photos/bridal-shot-03.PNG'
import bridalShot04 from '../../../media/photos/bridal-shot-04.PNG'
import bridalShot05 from '../../../media/photos/bridal-shot-05.PNG'
import bridalShot06 from '../../../media/photos/bridal-shot-06.PNG'
import bridalShot07 from '../../../media/photos/bridal-shot-07.PNG'
import bridalShot08 from '../../../media/photos/bridal-shot-08.PNG'
import bridalShot09 from '../../../media/photos/bridal-shot-09.PNG'
import bridalShot10 from '../../../media/photos/bridal-shot-10.PNG'
import bridalShot11 from '../../../media/photos/bridal-shot-11.PNG'
import bridalShot12 from '../../../media/photos/bridal-shot-12.PNG'
import bridalShot13 from '../../../media/photos/bridal-shot-13.PNG'
import bridalShot14 from '../../../media/photos/bridal-shot-14.PNG'
import btsVideoMain from '../../../media/videos/IMG_1847.MP4'
import bridalVideoFeature from '../../../media/videos/IMG_1918.MP4'
import btsVideoAlt from '../../../media/videos/IMG_1831.MP4'
import btsVideoClose from '../../../media/videos/IMG_1827-1.MP4'

const mediaMap = {
  'hero-whatsapp': heroWhatsapp,
  'ftp-portrait': ftpPortrait,
  'gele-portrait': geleLook,
  'purple-portrait': everydayPortrait,
  'green-smile': greenSmile,
  'mint-portrait': mintPortrait,
  'green-profile': greenProfile,
  'everyday-shot-01': everydayShot01,
  'everyday-shot-02': everydayShot02,
  'everyday-shot-03': everydayShot03,
  'everyday-shot-04': everydayShot04,
  'everyday-shot-05': everydayShot05,
  'everyday-shot-06': everydayShot06,
  'everyday-shot-07': everydayShot07,
  'bridal-shot-01': bridalShot01,
  'bridal-shot-02': bridalShot02,
  'bridal-shot-03': bridalShot03,
  'bridal-shot-04': bridalShot04,
  'bridal-shot-05': bridalShot05,
  'bridal-shot-06': bridalShot06,
  'bridal-shot-07': bridalShot07,
  'bridal-shot-08': bridalShot08,
  'bridal-shot-09': bridalShot09,
  'bridal-shot-10': bridalShot10,
  'bridal-shot-11': bridalShot11,
  'bridal-shot-12': bridalShot12,
  'bridal-shot-13': bridalShot13,
  'bridal-shot-14': bridalShot14,
  'bts-video-main': btsVideoMain,
  'bridal-video-feature': bridalVideoFeature,
  'bts-video-alt': btsVideoAlt,
  'bts-video-close': btsVideoClose,
}

const countTargets = {
  0: siteData.gallery.stats[0].value,
  2: siteData.gallery.stats[2].value,
}

function getFilteredItems(filter) {
  if (filter === 'All Work') {
    return siteData.gallery.allWorkSlugs
      .map((slug) => siteData.gallery.items.find((item) => item.slug === slug))
      .filter(Boolean)
  }

  return siteData.gallery.items.filter((item) => item.category === filter)
}

function getInitialVisibleCountForFilter(filter) {
  if (filter === 'Bridal Glam') {
    return 10
  }

  return siteData.gallery.initialVisibleCount
}

export function GallerySection() {
  const { ref: sectionRef, isVisible } = useRevealInView()
  const reducedMotion = prefersReducedMotion()
  const [activeFilter, setActiveFilter] = useState(siteData.gallery.filters[0])
  const [pendingFilter, setPendingFilter] = useState(null)
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false)
  const [visibleCount, setVisibleCount] = useState(() =>
    getInitialVisibleCountForFilter(siteData.gallery.filters[0]),
  )
  const [lightboxSlug, setLightboxSlug] = useState(null)
  const [statCounts, setStatCounts] = useState(() => (
    reducedMotion
      ? {
          0: countTargets[0],
          2: countTargets[2],
        }
      : { 0: 0, 2: 0 }
  ))
  const filterTimeoutRef = useRef(null)

  useEffect(() => {
    if (!isVisible) {
      return undefined
    }

    if (reducedMotion) {
      return undefined
    }

    const timers = Object.entries(countTargets).map(([index, target]) => {
      const duration = 1300
      const steps = 36
      const increment = target / steps
      let currentStep = 0

      const timer = window.setInterval(() => {
        currentStep += 1

        setStatCounts((current) => ({
          ...current,
          [index]: currentStep >= steps ? target : Math.round(increment * currentStep),
        }))
        if (currentStep >= steps) {
          window.clearInterval(timer)
        }
      }, duration / steps)

      return timer
    })

    return () => timers.forEach((timer) => window.clearInterval(timer))
  }, [isVisible, reducedMotion])

  useEffect(() => {
    if (!lightboxSlug) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxSlug(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxSlug])

  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) {
        window.clearTimeout(filterTimeoutRef.current)
      }
    }
  }, [])

  const filteredItems = useMemo(() => getFilteredItems(activeFilter), [activeFilter])
  const visibleItems = filteredItems.slice(0, visibleCount)
  const activeLightboxIndex = filteredItems.findIndex((item) => item.slug === lightboxSlug)
  const activeLightboxItem = activeLightboxIndex >= 0 ? filteredItems[activeLightboxIndex] : null

  const handleFilterChange = (filter) => {
    if (filter === activeFilter || filter === pendingFilter) {
      return
    }

    if (reducedMotion) {
      setActiveFilter(filter)
      setVisibleCount(getInitialVisibleCountForFilter(filter))
      setLightboxSlug(null)
      setPendingFilter(null)
      setIsFilterTransitioning(false)
      return
    }

    if (filterTimeoutRef.current) {
      window.clearTimeout(filterTimeoutRef.current)
    }

    setPendingFilter(filter)
    setIsFilterTransitioning(true)

    filterTimeoutRef.current = window.setTimeout(() => {
      setActiveFilter(filter)
      setVisibleCount(getInitialVisibleCountForFilter(filter))
      setLightboxSlug(null)
      setPendingFilter(null)
      setIsFilterTransitioning(false)
    }, 160)
  }

  const handleNavigateLightbox = (direction) => {
    if (activeLightboxIndex < 0) {
      return
    }

    const nextIndex = (activeLightboxIndex + direction + filteredItems.length) % filteredItems.length
    setLightboxSlug(filteredItems[nextIndex].slug)
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="gallery-shell relative overflow-hidden bg-[#211610] px-7 pb-22 pt-20 text-[#f7efe8] sm:px-9 lg:px-14 lg:pb-28 lg:pt-24"
    >
      <div className="gallery-shell-glow gallery-shell-glow-top" aria-hidden="true" />
      <div className="gallery-shell-glow gallery-shell-glow-bottom" aria-hidden="true" />

      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[44rem] text-center">
          <p className={`gallery-kicker ${isVisible ? 'is-visible' : ''}`}>{siteData.gallery.label}</p>

          <div className="gallery-heading-mask">
            <h2 className={`gallery-heading ${isVisible ? 'is-visible' : ''}`}>
              {siteData.gallery.headline}
            </h2>
          </div>

          <div className={`gallery-ornament ${isVisible ? 'is-visible' : ''}`} aria-hidden="true">
            <span className="gallery-ornament-line" />
            <span className="gallery-ornament-diamond" />
            <span className="gallery-ornament-line" />
          </div>
        </div>

        <div className={`gallery-stats ${isVisible ? 'is-visible' : ''}`}>
          {siteData.gallery.stats.map((stat, index) => (
            <div key={stat.label} className="gallery-stat">
              <span className="gallery-stat-value">
                {typeof stat.value === 'number' ? statCounts[index] : stat.value}
                {stat.suffix ?? ''}
              </span>
              <span className="gallery-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={`gallery-filter-row ${isVisible ? 'is-visible' : ''}`} role="tablist" aria-label="Gallery filters">
          {siteData.gallery.filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`gallery-filter-tab ${activeFilter === filter ? 'is-active' : ''}`}
              onClick={() => handleFilterChange(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={`gallery-grid ${isFilterTransitioning ? 'is-filtering' : ''}`}>
          {visibleItems.map((item, index) => (
            <button
              key={`${activeFilter}-${item.slug}`}
              type="button"
              className={`gallery-card gallery-card-${item.span} ${
                item.type === 'video' && index === visibleItems.length - 1 && visibleItems.length % 2 === 1
                  ? 'gallery-card-mobile-centered'
                  : ''
              } ${isVisible && !isFilterTransitioning ? 'is-visible' : ''}`}
              style={{ animationDelay: getStaggerDelay(index) }}
              onClick={() => setLightboxSlug(item.slug)}
            >
              <div className="gallery-card-media-wrap">
                {item.type === 'video' ? (
                  <video
                    src={mediaMap[item.asset]}
                    className="gallery-card-media"
                    style={{ objectPosition: item.position ?? 'center' }}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={mediaMap[item.asset]}
                    alt={item.title}
                    className="gallery-card-media"
                    style={{ objectPosition: item.position ?? 'center' }}
                  />
                )}

                <div className="gallery-card-overlay" aria-hidden="true" />

                <div className="gallery-card-caption">
                  <span className="gallery-card-category">{item.category}</span>
                  <span className="gallery-card-title">{item.title}</span>
                </div>

                {item.type === 'video' ? (
                  <span className="gallery-card-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 7.2l8.1 4.8L9 16.8V7.2z" fill="currentColor" />
                    </svg>
                  </span>
                ) : null}
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length > visibleCount ? (
          <div className="gallery-load-row">
            <button
              type="button"
              className="gallery-load-more"
              onClick={() =>
                setVisibleCount((current) => current + getInitialVisibleCountForFilter(activeFilter))
              }
            >
              {siteData.gallery.loadMoreLabel}
            </button>
          </div>
        ) : null}
      </div>

      {activeLightboxItem ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeLightboxItem.title} onClick={() => setLightboxSlug(null)}>
          <div
            className={`gallery-lightbox-panel ${
              activeLightboxItem.type === 'video' ? 'gallery-lightbox-panel-video' : ''
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setLightboxSlug(null)}
              aria-label="Close gallery preview"
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

            <div className={`gallery-lightbox-media ${activeLightboxItem.type === 'video' ? 'gallery-lightbox-media-video' : ''}`}>
              <div className={`gallery-lightbox-frame ${activeLightboxItem.type === 'video' ? 'gallery-lightbox-frame-video' : ''}`}>
                {activeLightboxItem.type === 'video' ? (
                  <video
                    src={mediaMap[activeLightboxItem.asset]}
                    controls
                    autoPlay
                    playsInline
                    className="gallery-lightbox-asset gallery-lightbox-asset-video"
                  />
                ) : (
                  <img
                    src={mediaMap[activeLightboxItem.asset]}
                    alt={activeLightboxItem.title}
                    className="gallery-lightbox-asset"
                  />
                )}
              </div>
            </div>

            <div className="gallery-lightbox-footer">
              <div>
                <p className="gallery-lightbox-category">{activeLightboxItem.category}</p>
                <h3 className="gallery-lightbox-title">{activeLightboxItem.title}</h3>
              </div>

              <div className="gallery-lightbox-actions">
                <button
                  type="button"
                  className="gallery-lightbox-dismiss"
                  onClick={() => setLightboxSlug(null)}
                  aria-label="Close gallery preview"
                >
                  Close Preview
                </button>

                <button
                  type="button"
                  className="gallery-lightbox-nav"
                  onClick={() => handleNavigateLightbox(-1)}
                  aria-label="Previous gallery item"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M14.5 5.5L8 12l6.5 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="gallery-lightbox-dots">
                  {filteredItems.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      className={`gallery-lightbox-dot ${item.slug === activeLightboxItem.slug ? 'is-active' : ''}`}
                      onClick={() => setLightboxSlug(item.slug)}
                      aria-label={`View ${item.title}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="gallery-lightbox-nav"
                  onClick={() => handleNavigateLightbox(1)}
                  aria-label="Next gallery item"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M9.5 5.5L16 12l-6.5 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
