import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ExchangeContent } from "@/components/exchange/exchange-content"
import { ServiceLandingBanner } from "@/components/service-landing-banner"

export const metadata: Metadata = {
    title: "On-K Exchange - CareOnK",
    description: "Get the best currency exchange rates in Korea. IDR to KRW, USD, EUR and more. Airport pickup, hotel delivery, and online pre-order available.",
}

export default function ExchangePage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <ExchangeContent />
                <ServiceLandingBanner
                    service="On-K Exchange"
                    tagline="Get the Best KRW Rate — Guaranteed"
                    ctaLabel="Check Rate via WhatsApp"
                    accentFrom="from-[#F59E0B]"
                    accentTo="to-[#B45309]"
                />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}
