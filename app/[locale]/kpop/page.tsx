import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { KpopContent } from "@/components/kpop/kpop-content"
import { ServiceLandingBanner } from "@/components/service-landing-banner"

export const metadata: Metadata = {
    title: "On-K K-Pop - CareOnK",
    description: "Get K-Pop concert tickets, fan meeting seats, and music show access in Korea. BLACKPINK, BTS, TWICE, and more with English assistance.",
}

export default function KpopPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <KpopContent />
                <ServiceLandingBanner
                    service="On-K K-Pop"
                    tagline="Your VIP Pass to Korea's K-Pop Scene"
                    ctaLabel="Get Tickets via WhatsApp"
                    accentFrom="from-[#BE185D]"
                    accentTo="to-[#831843]"
                />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}
