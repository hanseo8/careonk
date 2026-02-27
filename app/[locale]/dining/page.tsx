import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DiningContent } from "@/components/dining/dining-content"
import { ServiceLandingBanner } from "@/components/service-landing-banner"

export const metadata: Metadata = {
  title: "On-K Dining - CareOnK",
  description: "Discover the best Korean dining experiences. From delivery to fine dining, Michelin-starred restaurants to hidden local gems.",
}

export default function DiningPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <DiningContent />
        <ServiceLandingBanner
          service="On-K Dining"
          tagline="Taste the Best of Korea, Effortlessly"
          ctaLabel="Reserve via WhatsApp"
          accentFrom="from-[#D4930D]"
          accentTo="to-[#9A6B00]"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
