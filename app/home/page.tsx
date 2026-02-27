import type { Metadata } from "next"
import { Header } from "@/components/header"

export const metadata: Metadata = {
    title: "Home — Korea Premium Concierge Services",
    description: "Temukan layanan concierge terbaik di Korea: Medical Beauty, Day Tour Seoul, K-Pop Tickets, Pharmacy, Currency Exchange, Dining, dan Personal Helper. Bahasa Indonesia tersedia 24/7.",
    keywords: [
        "concierge Korea terbaik", "wisata Korea Indonesia", "medical beauty Seoul",
        "tiket K-Pop Korea", "tour Seoul satu hari", "Korean concierge service",
        "CareOnK layanan", "jasa concierge Korea",
    ],
    openGraph: {
        title: "CareOnK — Your Complete Korea Concierge",
        description: "Medical, Day Tour, K-Pop, Pharmacy, Exchange, Dining dan lebih. Semua layanan Korea dalam satu platform.",
        url: "https://careonk.com/home",
    },
    alternates: { canonical: "https://careonk.com/home" },
}
import { HeroSection } from "@/components/hero-section"
import { PromoBanner } from "@/components/promo-banner"
import { CategoryGrid } from "@/components/category-bar"
import { OnKMateSection } from "@/components/onk-mate-section"
import { PromoCarousel } from "@/components/promo-carousel"
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
                <PromoCarousel />
                <HorizontalScrollSection />
                <TrustSection />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    )
}
