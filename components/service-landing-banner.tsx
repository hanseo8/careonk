import Link from "next/link"
import { ArrowRight, Shield, Star, Users } from "lucide-react"

interface ServiceLandingBannerProps {
    /** The service title, e.g. "On-K Photo" */
    service: string
    /** Short tagline shown under the title */
    tagline: string
    /** WhatsApp or booking CTA label */
    ctaLabel?: string
    /** CTA href */
    ctaHref?: string
    /** Secondary CTA label */
    secondaryLabel?: string
    /** Secondary CTA href */
    secondaryHref?: string
    /** Accent color class for gradient, e.g. "from-[#2563A8]" */
    accentFrom?: string
    accentTo?: string
}

const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Shield, value: "100%", label: "Verified Partners" },
]

const allServices = [
    { label: "Medical", href: "/medical", emoji: "🏥" },
    { label: "Helper", href: "/helper", emoji: "🤝" },
    { label: "Dining", href: "/dining", emoji: "🍽️" },
    { label: "Activity", href: "/activity", emoji: "🎭" },
    { label: "Photo", href: "/photo", emoji: "📸" },
    { label: "Day Tour", href: "/daytour", emoji: "🗺️" },
    { label: "Pharmacy", href: "/pharmacy", emoji: "💊" },
    { label: "Exchange", href: "/exchange", emoji: "💱" },
    { label: "K-Pop", href: "/kpop", emoji: "🎤" },
]

export function ServiceLandingBanner({
    service,
    tagline,
    ctaLabel = "Book via WhatsApp",
    ctaHref = "https://wa.me/821012345678",
    secondaryLabel = "Explore All Services",
    secondaryHref = "/",
    accentFrom = "from-[#2563A8]",
    accentTo = "to-[#1A4F8B]",
}: ServiceLandingBannerProps) {
    return (
        <section className="mt-0 border-t border-border">
            {/* CTA Banner */}
            <div className={`bg-gradient-to-br ${accentFrom} ${accentTo} py-16`}>
                <div className="mx-auto max-w-5xl px-5 lg:px-8">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                            {service}
                        </p>
                        <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                            {tagline}
                        </h2>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center justify-center gap-8 py-2">
                            {stats.map((s) => {
                                const Icon = s.icon
                                return (
                                    <div key={s.label} className="flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-1.5">
                                            <Icon className="h-4 w-4 text-white/70" />
                                            <span className="text-2xl font-black text-white">{s.value}</span>
                                        </div>
                                        <span className="text-[11px] font-medium text-white/60">{s.label}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <a
                                href={ctaHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[14px] font-bold text-[#2563A8] shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-100"
                            >
                                {ctaLabel}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <Link
                                href={secondaryHref}
                                className="flex items-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3 text-[14px] font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
                            >
                                {secondaryLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Services Grid */}
            <div className="bg-secondary/40 py-12">
                <div className="mx-auto max-w-5xl px-5 lg:px-8">
                    <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Explore Other Services
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {allServices.map((svc) => (
                            <Link
                                key={svc.href}
                                href={svc.href}
                                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-semibold text-foreground shadow-sm transition-all hover:border-[#2563A8]/30 hover:text-[#2563A8] hover:shadow-md"
                            >
                                <span>{svc.emoji}</span>
                                {svc.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
