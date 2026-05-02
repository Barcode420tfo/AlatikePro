import { useEffect, useState } from 'react'
import logo from '../../../assets/alatike_pro_yoruba_v3b.svg'
import { siteData } from '../../data/site'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeroHeaderSuppressed, setIsHeroHeaderSuppressed] = useState(false)

  useEffect(() => {
    const heroSection = document.getElementById('home')

    if (!heroSection || typeof IntersectionObserver === 'undefined') {
      const onScroll = () => {
        setIsScrolled(window.scrollY > window.innerHeight * 0.65)
      }

      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })

      return () => window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '-88px 0px 0px 0px',
      },
    )

    observer.observe(heroSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let frameId = 0

    const updateHeaderSuppression = () => {
      const heroSection = document.getElementById('home')
      const trustSection = document.getElementById('trust-strip')

      if ((window.innerWidth < 1024 && isMenuOpen) || !heroSection || !trustSection) {
        setIsHeroHeaderSuppressed(false)
        return
      }

      const heroBottom = heroSection.getBoundingClientRect().bottom
      const trustTop = trustSection.getBoundingClientRect().top
      const hasMovedIntoHero = window.scrollY > 24
      const hasLeftHero = heroBottom <= 96
      const hasReachedTrust = trustTop <= window.innerHeight * 0.82

      setIsHeroHeaderSuppressed(hasMovedIntoHero && !(hasLeftHero && hasReachedTrust))
    }

    const requestUpdate = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        updateHeaderSuppression()
      })
    }

    updateHeaderSuppression()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [isMenuOpen])

  const isHeaderSuppressed = isHeroHeaderSuppressed && !isMenuOpen

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow,border-color,opacity,transform] duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#745e4d] py-2.5 shadow-[0_18px_42px_rgba(44,33,24,0.24)]'
          : 'bg-transparent py-3'
        } ${isHeaderSuppressed ? 'hero-header-hidden border-transparent bg-transparent shadow-none' : ''}`}
      >
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-4 sm:px-6 lg:px-10 xl:px-14">
          <a
            href="#home"
            className={`mobile-brand-link animate-fade-up block shrink-0 transition-[transform,opacity] duration-300 ${
              isScrolled ? '-translate-y-1' : '-translate-y-1.5'
            } ${isHeaderSuppressed ? 'pointer-events-none' : 'opacity-100'}`}
            style={{ animationDelay: '0ms' }}
            aria-label={siteData.brandName}
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt={`${siteData.brandName} logo`}
              className={`w-[214px] object-contain transition-all duration-300 brightness-[1.42] contrast-[1.24] saturate-[0.96] drop-shadow-[0_18px_38px_rgba(44,33,24,0.34)] sm:w-[248px] ${
                isScrolled ? 'sm:w-[224px]' : 'lg:w-[262px]'
              }`}
            />
          </a>

          <nav
            className={`desktop-nav-shell animate-fade-up hidden items-center justify-center gap-6 transition-[transform,opacity] duration-300 xl:gap-8 lg:flex ${
              isHeaderSuppressed ? 'pointer-events-none' : 'opacity-100'
            }`}
            style={{ animationDelay: '0ms' }}
            aria-label="Primary navigation"
          >
            {siteData.navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={`mobile-nav-toggle justify-self-end transition-[transform,opacity] duration-300 ${isMenuOpen ? 'is-open' : ''} ${
              isHeaderSuppressed ? 'pointer-events-none' : 'opacity-100'
            }`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-overlay"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav-overlay"
        className={`mobile-nav-overlay ${isMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-nav-overlay-backdrop" />
        <nav className="mobile-nav-panel" aria-label="Mobile navigation">
          {siteData.navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              style={{ transitionDelay: `${index * 55}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            href={siteData.bookingWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="mobile-nav-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </a>
        </nav>
      </div>
    </>
  )
}
