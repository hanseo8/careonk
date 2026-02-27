import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PromoBanner } from "@/components/promo-banner"
import { CategoryGrid } from "@/components/category-bar"

import { OnKMateSection } from "@/components/onk-mate-section"
import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { TrustSection } from "@/components/trust-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PromoBanner variant="membership" />
        <CategoryGrid />
        <PromoBanner variant="voucher" />

        <OnKMateSection />
        <HorizontalScrollSection />
        <TrustSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
