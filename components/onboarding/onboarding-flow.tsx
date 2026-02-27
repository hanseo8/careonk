"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    Power,
    Check,
    Minus,
    Plus,
    Car,
    Users,
    MessageCircle,
    MapPin,
    Star,
    Shield,
    Calendar,
    Sparkles,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const regions = [
    {
        id: "seoul",
        name: "Seoul",
        sub: "Capital City",
        emoji: "🏙️",
        available: 24,
        theme: "Medical, Shopping, Culture",
        // SVG position (% of container)
        x: 47,
        y: 38,
    },
    {
        id: "incheon",
        name: "Incheon",
        sub: "Gateway City",
        emoji: "✈️",
        available: 8,
        theme: "Airport, K-Pop, Chinatown",
        x: 40,
        y: 40,
    },
    {
        id: "gyeonggi",
        name: "Gyeonggi",
        sub: "Metropolitan Area",
        emoji: "🏯",
        available: 12,
        theme: "Suwon, Nami Island, DMZ",
        x: 46,
        y: 44,
    },
    {
        id: "gangwon",
        name: "Gangwon",
        sub: "Nature & Snow",
        emoji: "⛷️",
        available: 6,
        theme: "Ski Resorts, East Sea, Mountains",
        x: 62,
        y: 32,
    },
    {
        id: "jeju",
        name: "Jeju",
        sub: "Island Paradise",
        emoji: "🌺",
        available: 10,
        theme: "Beaches, Hallasan, Canola Fields",
        x: 37,
        y: 84,
    },
]

const themes = [
    {
        id: "glow",
        label: "Care:Glow",
        sub: "Medical Beauty & Clinic",
        emoji: "✨",
        image: "/images/gangnam-clinic.jpg",
        desc: "Top Gangnam clinics, dermatology, K-Beauty skincare treatments.",
    },
    {
        id: "style",
        label: "K-Style",
        sub: "Fashion & Hair",
        emoji: "💇",
        image: "/images/hair-salon-kpop.jpg",
        desc: "K-Pop inspired hair salons, style consultants, fashion streets.",
    },
    {
        id: "culture",
        label: "Culture",
        sub: "Heritage & Experience",
        emoji: "🏛️",
        image: "/images/hanok-village.jpg",
        desc: "Gyeongbokgung, Hanok Village, traditional Korean experiences.",
    },
    {
        id: "gourmet",
        label: "Gourmet",
        sub: "Food & Dining",
        emoji: "🍽️",
        image: "/images/korean-bbq.jpg",
        desc: "Premium Korean BBQ, Michelin restaurants, street food tours.",
    },
]

const companions = [
    { id: "family", label: "Family", sub: "With kids & parents", emoji: "👨‍👩‍👧‍👦" },
    { id: "couple", label: "Couple", sub: "Romantic getaway", emoji: "👩‍❤️‍👨" },
    { id: "friends", label: "Friends", sub: "Group adventure", emoji: "👯" },
    { id: "solo", label: "Solo", sub: "Independent journey", emoji: "👤" },
]

const mateProfiles = [
    { role: "On-K Driver", name: "Kim Jae-won", rating: 4.9, trips: 312, badge: "Licensed", color: "#0047AB" },
    { role: "On-K Sitter", name: "Park So-yeon", rating: 4.8, trips: 187, badge: "Certified", color: "#FF8C00" },
    { role: "On-K Connect", name: "Lee Min-jun", rating: 5.0, trips: 248, badge: "Verified", color: "#0F0F1B" },
]

const itinerary = [
    { day: "Day 1", title: "Arrival & Clinic Day", desc: "Airport pickup → Gangnam Clinic → Luxury hotel check-in", icon: "✈️" },
    { day: "Day 2", title: "Beauty & Culture", desc: "K-Beauty treatment → Bukchon Hanok → Myeongdong", icon: "✨" },
    { day: "Day 3", title: "Gourmet & Shopping", desc: "Korean BBQ lunch → Hongdae shopping → Han River", icon: "🍽️" },
    { day: "Day 4", title: "Leisure & Departure", desc: "Namsan Tower → Duty Free → Airport transfer", icon: "🗼" },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function OnboardingFlow() {
    const [step, setStep] = useState(0)
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    const [companion, setCompanion] = useState<string | null>(null)
    const [count, setCount] = useState(2)
    const [previewTheme, setPreviewTheme] = useState<string>("glow")

    const steps = ["Region", "Theme", "Companions", "Your Plan"]
    const isLast = step === 3
    const progress = (step / 3) * 100
    const isVan = count >= 5
    const activeRegion = regions.find((r) => r.id === (hoveredRegion || selectedRegion))

    const canNext = () => {
        if (step === 0) return !!selectedRegion
        if (step === 1) return !!selectedTheme
        if (step === 2) return !!companion
        return true
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#0F0F1B] text-white lg:flex-row">
            {/* ── Left panel ──────────────────────────────────────────── */}
            <div className="relative flex w-full flex-col overflow-hidden lg:w-1/2 lg:min-h-screen">
                {/* Step 0: Korea Map */}
                <div
                    className={`absolute inset-0 transition-opacity duration-700 ${step === 0 ? "opacity-100" : "opacity-0"}`}
                >
                    <Image src="/images/korea-map-3d.jpg" alt="Korea Map" fill className="object-cover opacity-90" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1B]/80 via-[#0F0F1B]/20 to-transparent" />

                    {/* Hotspot overlay */}
                    <div className="absolute inset-0">
                        {regions.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setSelectedRegion(region.id)}
                                onMouseEnter={() => setHoveredRegion(region.id)}
                                onMouseLeave={() => setHoveredRegion(null)}
                                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                            >
                                {/* Pulse ring */}
                                <span className={`absolute inset-0 rounded-full animate-ping ${selectedRegion === region.id ? "bg-[#FF8C00]/50" : "bg-[#0047AB]/50"}`} />
                                {/* Dot */}
                                <span className={`relative flex h-4 w-4 rounded-full border-2 transition-all ${selectedRegion === region.id
                                        ? "bg-[#FF8C00] border-white scale-150"
                                        : "bg-[#0047AB] border-white/60 group-hover:scale-125 group-hover:bg-[#FF8C00]"
                                    }`} />
                                {/* Label */}
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black/70 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                                    {region.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Region info card */}
                    {activeRegion && (
                        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{activeRegion.emoji}</span>
                                <div>
                                    <p className="font-bold text-white">{activeRegion.name}
                                        <span className="ml-2 text-[11px] font-normal text-white/50">{activeRegion.sub}</span>
                                    </p>
                                    <p className="text-[12px] text-[#FF8C00]">{activeRegion.theme}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-lg font-bold text-[#0047AB]">{activeRegion.available}</p>
                                    <p className="text-[10px] text-white/50">Mates available</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 1: Theme preview image */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${step === 1 ? "opacity-100" : "opacity-0"}`}>
                    {themes.map((t) => (
                        <div key={t.id} className={`absolute inset-0 transition-opacity duration-500 ${previewTheme === t.id ? "opacity-100" : "opacity-0"}`}>
                            <Image src={t.image} alt={t.label} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1B] via-[#0F0F1B]/30 to-transparent" />
                        </div>
                    ))}
                    <div className="absolute bottom-8 left-8">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Selected Theme</p>
                        <p className="mt-1 text-2xl font-bold">{themes.find((t) => t.id === (selectedTheme || previewTheme))?.label}</p>
                        <p className="text-[13px] text-white/60">{themes.find((t) => t.id === (selectedTheme || previewTheme))?.desc}</p>
                    </div>
                </div>

                {/* Step 2: Vehicle */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#0047AB]/30 to-[#0F0F1B] transition-opacity duration-700 ${step === 2 ? "opacity-100" : "opacity-0"}`}>
                    <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Vehicle Matching</p>
                        <div className="mt-6 flex flex-col items-center gap-2">
                            <span className="text-7xl transition-all duration-500">{isVan ? "🚐" : "🚗"}</span>
                            <p className="mt-2 text-xl font-bold">{isVan ? "Premium Large Van" : "Premium Sedan"}</p>
                            <p className="text-[13px] text-white/50">{isVan ? "For groups of 5 or more" : "For up to 4 travelers"}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center backdrop-blur-sm">
                        <p className="text-[12px] text-white/50">Group size: <span className="font-bold text-white">{count} {count === 1 ? "person" : "people"}</span></p>
                        {isVan && <p className="mt-1 text-[12px] text-[#FF8C00]">✓ Group van + dedicated translator assigned</p>}
                    </div>
                </div>

                {/* Step 3: Report background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#0047AB]/40 via-[#0F0F1B] to-[#FF8C00]/10 transition-opacity duration-700 ${step === 3 ? "opacity-100" : "opacity-0"}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Sparkles className="mx-auto h-16 w-16 text-[#FF8C00] opacity-30" />
                            <p className="mt-4 text-[13px] font-semibold uppercase tracking-widest text-white/30">Your Personalized Plan</p>
                        </div>
                    </div>
                </div>

                {/* Logo */}
                <Link href="/" className="absolute left-6 top-6 z-10 flex items-center gap-0">
                    <span className="font-serif text-[18px] font-normal uppercase tracking-[0.08em] text-white drop-shadow">CARE</span>
                    <span className="relative mx-[1px] inline-flex h-[19px] w-[19px] items-center justify-center">
                        <span className="absolute inset-0 rounded-full border-[2px] border-[#FF8C00]" />
                        <Power className="h-[9px] w-[9px] text-[#FF8C00]" strokeWidth={2.5} />
                    </span>
                    <span className="text-[18px] font-black uppercase tracking-[0.02em] text-white drop-shadow">NK</span>
                </Link>
            </div>

            {/* ── Right panel ─────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col bg-card">
                {/* Progress */}
                <div className="h-1 w-full bg-border">
                    <div className="h-full bg-[#0047AB] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex flex-1 flex-col justify-between px-8 py-10 lg:px-14 lg:py-14">
                    {/* Step indicator */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {steps.map((s, i) => (
                                <div key={s} className="flex items-center gap-1.5">
                                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${i < step ? "bg-[#0047AB] text-white" : i === step ? "bg-[#FF8C00] text-white" : "bg-border text-muted-foreground"
                                        }`}>
                                        {i < step ? <Check className="h-3 w-3" /> : i + 1}
                                    </div>
                                    {i < steps.length - 1 && <div className={`h-px w-4 ${i < step ? "bg-[#0047AB]" : "bg-border"}`} />}
                                </div>
                            ))}
                        </div>
                        <Link href="/" className="text-[12px] text-muted-foreground hover:text-foreground">Skip →</Link>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-center py-6">

                        {/* ── STEP 0: Region ── */}
                        {step === 0 && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 01</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">Where in Korea?</h2>
                                    <p className="mt-1 text-[14px] text-muted-foreground">Select your destination on the map, or choose below.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {regions.map((r) => (
                                        <button
                                            key={r.id}
                                            onClick={() => setSelectedRegion(r.id)}
                                            onMouseEnter={() => setHoveredRegion(r.id)}
                                            onMouseLeave={() => setHoveredRegion(null)}
                                            className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${selectedRegion === r.id
                                                    ? "border-[#0047AB] bg-[#0047AB]/5"
                                                    : "border-border hover:border-[#0047AB]/30"
                                                }`}
                                        >
                                            <span className="text-xl">{r.emoji}</span>
                                            <div className="flex-1">
                                                <span className="text-[13px] font-bold text-foreground">{r.name}</span>
                                                <span className="ml-2 text-[11px] text-muted-foreground">{r.sub}</span>
                                            </div>
                                            <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedRegion === r.id ? "border-[#0047AB] bg-[#0047AB]" : "border-border"
                                                }`}>
                                                {selectedRegion === r.id && <Check className="h-3 w-3 text-white" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 1: Theme ── */}
                        {step === 1 && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 02</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">Choose Your Desire</h2>
                                    <p className="mt-1 text-[14px] text-muted-foreground">What experience are you looking for?</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {themes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => { setSelectedTheme(t.id); setPreviewTheme(t.id) }}
                                            onMouseEnter={() => setPreviewTheme(t.id)}
                                            onMouseLeave={() => setPreviewTheme(selectedTheme || "glow")}
                                            className={`flex flex-col items-start rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.98] ${selectedTheme === t.id
                                                    ? "border-[#0047AB] bg-[#0047AB]/5 shadow-md"
                                                    : "border-border hover:border-[#0047AB]/30"
                                                }`}
                                        >
                                            <div className={`mb-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedTheme === t.id ? "border-[#0047AB] bg-[#0047AB]" : "border-border"
                                                }`}>
                                                {selectedTheme === t.id && <Check className="h-3 w-3 text-white" />}
                                            </div>
                                            <span className="text-xl">{t.emoji}</span>
                                            <span className="mt-1 text-[13px] font-bold text-foreground">{t.label}</span>
                                            <span className="text-[11px] text-muted-foreground">{t.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 2: Companions ── */}
                        {step === 2 && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 03</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">The On-K Mate Matching</h2>
                                    <p className="mt-1 text-[14px] text-muted-foreground">Who's joining you, and how many?</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {companions.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => setCompanion(c.id)}
                                            className={`flex flex-col items-center rounded-2xl border-2 p-4 transition-all active:scale-[0.98] ${companion === c.id ? "border-[#0047AB] bg-[#0047AB]/5 shadow-md" : "border-border hover:border-[#0047AB]/30"
                                                }`}
                                        >
                                            <span className="text-3xl">{c.emoji}</span>
                                            <span className="mt-2 text-[13px] font-bold text-foreground">{c.label}</span>
                                            <span className="text-[11px] text-muted-foreground">{c.sub}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Count dial */}
                                <div className="rounded-2xl border border-border bg-secondary/50 p-4">
                                    <p className="mb-3 text-[12px] font-semibold text-muted-foreground">Number of travelers</p>
                                    <div className="flex items-center justify-between">
                                        <button onClick={() => setCount(Math.max(1, count - 1))} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card transition-all hover:border-[#0047AB]/40 active:scale-95">
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <div className="text-center">
                                            <span className="text-4xl font-bold text-[#0047AB]">{count}</span>
                                            <p className="text-[12px] text-muted-foreground">{count === 1 ? "traveler" : "travelers"}</p>
                                        </div>
                                        <button onClick={() => setCount(Math.min(20, count + 1))} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0047AB]/20 bg-[#0047AB]/5 text-[#0047AB] transition-all hover:border-[#0047AB]/50 active:scale-95">
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#0047AB]/15 bg-[#0047AB]/5 px-3 py-2">
                                        <span className="text-lg">{isVan ? "🚐" : "🚗"}</span>
                                        <p className="text-[12px] font-medium text-foreground">
                                            {isVan ? "Premium Large Van — Group transport" : "Premium Sedan — Private transfer"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 3: Total Care Plan ── */}
                        {step === 3 && (
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 04 — Total Care Plan ON</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">Your Korea Journey</h2>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {[
                                            regions.find((r) => r.id === selectedRegion)?.name,
                                            themes.find((t) => t.id === selectedTheme)?.label,
                                            `${count} Traveler${count > 1 ? "s" : ""}`,
                                        ].filter(Boolean).map((tag) => (
                                            <span key={tag} className="rounded-full border border-[#0047AB]/20 bg-[#0047AB]/5 px-3 py-1 text-[11px] font-bold text-[#0047AB]">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* On-K Mate profiles */}
                                <div className="rounded-2xl border border-border bg-secondary/50 p-4">
                                    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Your On-K Mates</p>
                                    <div className="flex gap-3">
                                        {mateProfiles.map((m) => (
                                            <div key={m.role} className="flex flex-1 flex-col items-center rounded-xl border border-border bg-card p-3 text-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ backgroundColor: `${m.color}15` }}>
                                                    {m.role.includes("Driver") ? "🚗" : m.role.includes("Sitter") ? "👶" : "🗣️"}
                                                </div>
                                                <p className="mt-1.5 text-[11px] font-bold text-foreground leading-tight">{m.role.replace("On-K ", "")}</p>
                                                <div className="mt-1 flex items-center gap-0.5">
                                                    <Star className="h-2.5 w-2.5 fill-[#FF8C00] text-[#FF8C00]" />
                                                    <span className="text-[10px] font-semibold text-foreground">{m.rating}</span>
                                                </div>
                                                <span className="mt-1 rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: m.color }}>{m.badge}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Itinerary */}
                                <div className="rounded-2xl border border-border bg-secondary/50 p-4">
                                    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">4-Day Itinerary</p>
                                    <div className="flex flex-col gap-2">
                                        {itinerary.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0047AB]/10 text-sm">{item.icon}</div>
                                                    {i < itinerary.length - 1 && <div className="mt-1 h-4 w-px bg-border" />}
                                                </div>
                                                <div className="pb-2">
                                                    <p className="text-[11px] font-bold text-[#FF8C00]">{item.day}</p>
                                                    <p className="text-[12px] font-semibold text-foreground">{item.title}</p>
                                                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* WhatsApp CTA */}
                                <a
                                    href="https://wa.me/821012345678?text=안녕하세요! CareOnK AI Tour Plan을 통해 연락드립니다."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-[14px] font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Contact Your On-K Mate via WhatsApp
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Nav */}
                    <div className="flex items-center gap-3">
                        {step > 0 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-[14px] font-semibold text-foreground transition-all hover:shadow-sm active:scale-[0.98]"
                            >
                                <ChevronLeft className="h-4 w-4" /> Back
                            </button>
                        ) : <div />}

                        {isLast ? (
                            <Link
                                href="/"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0047AB] px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98]"
                            >
                                <Power className="h-4 w-4" /> Korea Life ON!
                            </Link>
                        ) : (
                            <button
                                onClick={() => { if (canNext()) setStep(step + 1) }}
                                disabled={!canNext()}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all active:scale-[0.98] ${canNext() ? "bg-[#0047AB] hover:brightness-110" : "cursor-not-allowed bg-muted-foreground/30"
                                    }`}
                            >
                                {step === 0 ? "Select Destination" : step === 1 ? "Choose Theme" : "Match My Mates"}
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
