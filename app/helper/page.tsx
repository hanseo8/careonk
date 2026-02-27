"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HelperHero } from "@/components/helper/helper-hero"
import { HelperTabs } from "@/components/helper/helper-tabs"
import { DriverSection } from "@/components/helper/driver-section"
import { SitterSection } from "@/components/helper/sitter-section"
import { TranslatorSection } from "@/components/helper/translator-section"
import { VVIPBanner } from "@/components/medical/vvip-banner"
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
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
