import { useEffect, useState } from 'react'
import logo from '../../../assets/alatike_pro_yoruba_v3b.svg'
import { siteData } from '../../data/site'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const heroSection = document.getElementById('home')

      if (!heroSection) {
        setIsScrolled(window.scrollY > window.innerHeight * 0.65)
        return
      }

      const heroBottom = heroSection.getBoundingClientRect().bottom
      setIsScrolled(heroBottom <= 88)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow,border-color] duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#745e4d] py-2.5 shadow-[0_18px_42px_rgba(44,33,24,0.24)]'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-4 sm:px-6 lg:px-10 xl:px-14">
        <a
          href="#home"
          className={`animate-fade-up block shrink-0 transition-transform duration-300 ${
            isScrolled ? '-translate-y-1' : '-translate-y-1.5'
          }`}
          style={{ animationDelay: '0ms' }}
          aria-label={siteData.brandName}
        >
          <img
            src={logo}
            alt={`${siteData.brandName} logo`}
            className={`w-[188px] object-contain transition-all duration-300 brightness-[1.34] contrast-[1.22] saturate-[0.94] drop-shadow-[0_16px_34px_rgba(44,33,24,0.3)] sm:w-[226px] ${
              isScrolled ? 'sm:w-[206px]' : ''
            }`}
          />
        </a>

        <nav
          className="animate-fade-up hidden items-center justify-center gap-6 xl:gap-8 lg:flex"
          style={{ animationDelay: '0ms' }}
          aria-label="Primary navigation"
        >
          {siteData.navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={siteData.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="cta-button cta-button-light hidden justify-self-end lg:inline-flex"
        >
          Book Now
        </a>
      </div>
    </header>
  )
}
