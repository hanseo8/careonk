import { Header } from "@/components/header"
import { MedicalHero } from "@/components/medical/medical-hero"
import { PromoBanner } from "@/components/promo-banner"
import { ConciergeTrio } from "@/components/medical/concierge-trio"
import { MedicalCategories } from "@/components/medical/medical-categories"
import { SearchFilter } from "@/components/medical/search-filter"
import { ClinicListing } from "@/components/medical/clinic-listing"
import { VVIPBanner } from "@/components/medical/vvip-banner"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServiceLandingBanner } from "@/components/service-landing-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "On-K Medical Concierge - CareOnK",
  description:
    "Premium medical concierge for Indonesians in Korea. On-K Driver, On-K Sitter, and On-K Connect for every clinic visit.",
}

export default function MedicalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <MedicalHero />
        <PromoBanner variant="membership" />
        <ConciergeTrio />
        <MedicalCategories />
        <SearchFilter />
        <ClinicListing />
        <VVIPBanner />
        <ServiceLandingBanner
          service="On-K Medical"
          tagline="Your Trusted Medical Companion in Korea"
          ctaLabel="Consult via WhatsApp"
          accentFrom="from-[#1A5CA8]"
          accentTo="to-[#0D3B6E]"
          bgImage="/images/korea-hospital-bg.png"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
