import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PharmacyContent } from "@/components/pharmacy/pharmacy-content"
import { ServiceLandingBanner } from "@/components/service-landing-banner"

export const metadata: Metadata = {
    title: "On-K Pharmacy - CareOnK",
    description: "Find the best pharmacies in Korea. K-Beauty skincare, prescriptions, vitamins, supplements, and traditional Korean medicine — with English support.",
}

export default function PharmacyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <PharmacyContent />
                <ServiceLandingBanner
                    service="On-K Pharmacy"
                    tagline="Your Health, Our Priority in Korea"
                    ctaLabel="Get Pharmacy Help via WhatsApp"
                    accentFrom="from-[#10B981]"
                    accentTo="to-[#047857]"
                />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}
