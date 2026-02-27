import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DayTourContent } from "@/components/daytour/daytour-content"
import { ServiceLandingBanner } from "@/components/service-landing-banner"

export const metadata: Metadata = {
    title: "On-K Day Tour - CareOnK",
    description: "Explore Korea's best day tours. Nami Island, DMZ, Seoul city highlights, K-drama spots, Busan day trips, and more — with English-speaking guides.",
}

export default function DayTourPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <DayTourContent />
                <ServiceLandingBanner
                    service="On-K Day Tour"
                    tagline="Explore Korea — One Perfect Day at a Time"
                    ctaLabel="Book a Tour via WhatsApp"
                    accentFrom="from-[#0EA5E9]"
                    accentTo="to-[#0369A1]"
                />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}
