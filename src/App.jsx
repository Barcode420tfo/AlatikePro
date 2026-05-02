import { useEffect } from 'react'
import { Navbar } from './components/layout/Navbar'
import { AboutSection } from './sections/about/AboutSection'
import { ContactSection } from './sections/contact/ContactSection'
import { FaqSection } from './sections/faq/FaqSection'
import { GallerySection } from './sections/gallery/GallerySection'
import { HeroSection } from './sections/hero/HeroSection'
import { InstagramStripSection } from './sections/instagram/InstagramStripSection'
import { ServicesSection } from './sections/services/ServicesSection'
import { TestimonialsSection } from './sections/testimonials/TestimonialsSection'
import { TrustStrip } from './sections/trust/TrustStrip'

function App() {
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c2118]">
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <FaqSection />
        <InstagramStripSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
