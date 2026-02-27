import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PhotoContent } from "@/components/photo/photo-content"
import { ServiceLandingBanner } from "@/components/service-landing-banner"

export const metadata: Metadata = {
  title: "On-K Photo - CareOnK",
  description: "Discover the best Korean photo studios. ID portraits, concept shoots, Hanbok photos, wedding photography, candid shots, and more.",
}

export default function PhotoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <PhotoContent />
        <ServiceLandingBanner
          service="On-K Photo"
          tagline="Capture Your Korea Moment — Perfectly"
          ctaLabel="Book a Studio via WhatsApp"
          accentFrom="from-[#6B46C1]"
          accentTo="to-[#4C2A85]"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
