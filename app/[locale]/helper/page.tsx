"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HelperHero } from "@/components/helper/helper-hero"
import { HelperTabs } from "@/components/helper/helper-tabs"
import { DriverSection } from "@/components/helper/driver-section"
import { SitterSection } from "@/components/helper/sitter-section"
import { TranslatorSection } from "@/components/helper/translator-section"
import { VVIPBanner } from "@/components/medical/vvip-banner"
import { ServiceLandingBanner } from "@/components/service-landing-banner"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HelperPage() {
  const [activeTab, setActiveTab] = useState("driver")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HelperHero />
        <HelperTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "driver" && <DriverSection />}
        {activeTab === "sitter" && <SitterSection />}
        {activeTab === "connect" && <TranslatorSection />}

        <VVIPBanner />
        <ServiceLandingBanner
          service="On-K Helper"
          tagline="Your Personal Companion Throughout Korea"
          ctaLabel="Get a Helper via WhatsApp"
          accentFrom="from-[#2563A8]"
          accentTo="to-[#1A4F8B]"
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
