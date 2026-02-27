"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft, ChevronRight, Power, Check,
    Minus, Plus, Star, Sparkles,
} from "lucide-react"

// ─── Geographic coords → Image Percentages ─────────────────────────────────────
// Base satellite image bounding box (ArcGIS Export)
// bbox: [125.0, 33.0, 131.0, 39.0] (lon_min, lat_min, lon_max, lat_max)
const geoToPercent = (lon: number, lat: number) => {
    const lonMin = 125.0;
    const lonMax = 131.0;
    const latMin = 33.0;
    const latMax = 39.0;

    // Additional manual calibration offsets can be tweaked here if the projection slightly differs
    const xOffset = 0;
    const yOffset = 0;

    return {
        x: ((lon - lonMin) / (lonMax - lonMin) * 100) + xOffset,
        y: ((latMax - lat) / (latMax - latMin) * 100) + yOffset,
    };
};

// ─── Cities ──────────────────────────────────────────────────────────────────
const regions = [
    { id: "seoul", name: "Seoul", sub: "Capital City", emoji: "🏙️", available: 24, theme: "Medical, Shopping, Culture", ...geoToPercent(126.98, 37.57) },
    { id: "incheon", name: "Incheon", sub: "Gateway City", emoji: "✈️", available: 8, theme: "Airport, K-Pop, Chinatown", ...geoToPercent(126.70, 37.45) },
    { id: "gyeonggi", name: "Gyeonggi", sub: "Metropolitan Area", emoji: "🏯", available: 12, theme: "Suwon, Nami Island, DMZ", ...geoToPercent(127.05, 37.27) },
    { id: "gangwon", name: "Gangwon", sub: "Nature & Snow", emoji: "⛷️", available: 6, theme: "Ski Resorts, East Sea, Mountains", ...geoToPercent(127.73, 37.88) },
    { id: "daejeon", name: "Daejeon", sub: "Science City", emoji: "🔬", available: 7, theme: "EXPO Science Park, Gyeryongsan, Spa", ...geoToPercent(127.38, 36.35) },
    { id: "gwangju", name: "Gwangju", sub: "Culture Capital", emoji: "🎨", available: 5, theme: "Art Biennale, Mudeungsan, Local Cuisine", ...geoToPercent(126.85, 35.16) },
    { id: "busan", name: "Busan", sub: "Ocean City", emoji: "🌊", available: 15, theme: "Haeundae Beach, Seafood, Night Market", ...geoToPercent(129.03, 35.10) },
    { id: "gyeongju", name: "Gyeongju", sub: "Ancient Capital", emoji: "🏺", available: 8, theme: "Bulguksa, Cheomseongdae, Royal Tombs", ...geoToPercent(129.21, 35.84) },
    { id: "jeju", name: "Jeju", sub: "Island Paradise", emoji: "🌺", available: 10, theme: "Beaches, Hallasan, Canola Flower Fields", ...geoToPercent(126.53, 33.49) },
]

const themes = [
    { id: "glow", label: "Care:Glow", sub: "Medical Beauty & Clinic", emoji: "✨", image: "/images/gangnam-clinic.jpg", desc: "Top Gangnam clinics, dermatology, K-Beauty skincare." },
    { id: "style", label: "K-Style", sub: "Fashion & Hair", emoji: "💇", image: "/images/hair-salon-kpop.jpg", desc: "K-Pop hair salons, style consultants, fashion streets." },
    { id: "culture", label: "Culture", sub: "Heritage & Experience", emoji: "🏛️", image: "/images/hanok-village.jpg", desc: "Gyeongbokgung, Hanok Village, traditional experiences." },
    { id: "gourmet", label: "Gourmet", sub: "Food & Dining", emoji: "🍽️", image: "/images/korean-bbq.jpg", desc: "Premium Korean BBQ, Michelin restaurants, street food." },
]

const companions = [
    { id: "family", label: "Family", sub: "With kids & parents", emoji: "👨‍👩‍👧‍👦" },
    { id: "couple", label: "Couple", sub: "Romantic getaway", emoji: "👩‍❤️‍👨" },
    { id: "friends", label: "Friends", sub: "Group adventure", emoji: "👯" },
    { id: "solo", label: "Solo", sub: "Independent journey", emoji: "👤" },
]

const mateProfiles = [
    { role: "On-K Driver", rating: 4.9, trips: 312, badge: "Licensed", color: "#0047AB", emoji: "🚗" },
    { role: "On-K Sitter", rating: 4.8, trips: 187, badge: "Certified", color: "#FF8C00", emoji: "👶" },
    { role: "On-K Connect", rating: 5.0, trips: 248, badge: "Verified", color: "#0F0F1B", emoji: "🗣️" },
]

const itinerary = [
    { day: "Day 1", title: "Arrival & Clinic Day", desc: "Airport pickup → Gangnam Clinic → Hotel check-in", icon: "✈️" },
    { day: "Day 2", title: "Beauty & Culture", desc: "K-Beauty treatment → Bukchon Hanok → Myeongdong", icon: "✨" },
    { day: "Day 3", title: "Gourmet & Shopping", desc: "Korean BBQ lunch → Hongdae shopping → Han River", icon: "🍽️" },
    { day: "Day 4", title: "Leisure & Departure", desc: "Namsan Tower → Duty Free → Airport transfer", icon: "🗼" },
]

// ─── Real Korea Map ────────────────────────────────────────────────────────────
function KoreaMapReal({
    selected, hovered, onSelect, onHover,
}: {
    selected: string[]; hovered: string | null
    onSelect: (id: string) => void; onHover: (id: string | null) => void
}) {
    return (
        <div className="relative w-full h-[80vh] min-h-[500px] overflow-hidden rounded-3xl shadow-2xl border border-white/10 mx-auto max-w-[500px]" aria-label="Interactive map of South Korea">
            {/* Satellite Background */}
            <Image src="/images/korea-map-hq.jpg" alt="Korea Satellite Map High Resolution" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1B]/90 via-[#0047AB]/20 to-transparent pointer-events-none" />

            {/* ── City Markers ── */}
            {regions.map((r) => {
                const isSel = selected.includes(r.id)
                const isHov = hovered === r.id
                const isActive = isSel || isHov
                // Label positioning: if point is on the right half, label goes left
                const labelLeft = r.x > 50

                return (
                    <div
                        key={r.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 hover:z-20"
                        style={{ left: `${r.x}%`, top: `${r.y}%` }}
                        onClick={() => onSelect(r.id)}
                        onMouseEnter={() => onHover(r.id)}
                        onMouseLeave={() => onHover(null)}
                    >
                        {/* Pulse effect */}
                        {isActive && (
                            <div className="absolute inset-0 m-auto h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF8C00] opacity-40 animate-ping" />
                        )}
                        {/* Core pin */}
                        <div className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-xl transition-all duration-300 ${isSel ? "scale-125 bg-[#FF8C00]" : isHov ? "scale-110 bg-[#60A0FF]" : "bg-[#0047AB]"}`}>
                            <div className="h-2 w-2 rounded-full bg-white" />
                        </div>

                        {/* Label */}
                        <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-all duration-300 ${labelLeft ? "right-full mr-3 flex-row-reverse" : "left-full ml-3"}`}>
                            <span className="text-[18px] drop-shadow-md">{r.emoji}</span>
                            <span className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] font-bold shadow-xl backdrop-blur-md transition-all ${isActive ? "bg-[#FF8C00] text-white" : "bg-[#0F0F1B]/70 text-white/95 border border-white/20"}`}>
                                {r.name}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function OnboardingFlow() {
    const [step, setStep] = useState(0)
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    const [previewTheme, setPreviewTheme] = useState<string>("glow")
    const [companion, setCompanion] = useState<string | null>(null)
    const [count, setCount] = useState(2)

    const steps = ["Region", "Theme", "Companions", "Your Plan"]
    const isLast = step === 3
    const progress = (step / 3) * 100
    const isVan = count >= 5
    const activeRegion = hoveredRegion
        ? regions.find((r) => r.id === hoveredRegion)
        : selectedRegions.length > 0
            ? regions.find((r) => r.id === selectedRegions[selectedRegions.length - 1])
            : null

    const canNext = () => {
        if (step === 0) return selectedRegions.length > 0
        if (step === 1) return !!selectedTheme
        if (step === 2) return !!companion
        return true
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#0F0F1B] text-white lg:flex-row">
            {/* ── Left panel ──────────────────────────────────────────── */}
            <div className="relative flex w-full flex-col overflow-hidden lg:w-1/2 lg:min-h-screen">

                {/* Step 0: Real Korea Map */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${step === 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <KoreaMapReal
                            selected={selectedRegions}
                            hovered={hoveredRegion}
                            onSelect={(id) => setSelectedRegions(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])}
                            onHover={setHoveredRegion}
                        />
                    </div>

                    {/* Region info card */}
                    {activeRegion && (
                        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-md transition-all">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{activeRegion.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white">
                                        {activeRegion.name}
                                        <span className="ml-2 text-[11px] font-normal text-white/50">{activeRegion.sub}</span>
                                    </p>
                                    <p className="text-[12px] text-[#FF8C00] truncate">{activeRegion.theme}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-lg font-bold text-[#0047AB]">{activeRegion.available}</p>
                                    <p className="text-[10px] text-white/50">mates</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 1: Theme preview */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${step === 1 ? "opacity-100" : "opacity-0"}`}>
                    {themes.map((t) => (
                        <div key={t.id} className={`absolute inset-0 transition-opacity duration-500 ${previewTheme === t.id ? "opacity-100" : "opacity-0"}`}>
                            <Image src={t.image} alt={t.label} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1B] via-[#0F0F1B]/30 to-transparent" />
                        </div>
                    ))}
                    <div className="absolute bottom-8 left-8 right-8">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Selected Theme</p>
                        <p className="mt-1 text-2xl font-bold">{themes.find((t) => t.id === (selectedTheme || previewTheme))?.label}</p>
                        <p className="text-[13px] text-white/60">{themes.find((t) => t.id === (selectedTheme || previewTheme))?.desc}</p>
                    </div>
                </div>

                {/* Step 2: Vehicle match */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#0047AB]/30 to-[#0F0F1B] transition-opacity duration-700 ${step === 2 ? "opacity-100" : "opacity-0"}`}>
                    <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Vehicle Matching</p>
                        <div className="mt-6 flex flex-col items-center gap-2">
                            <span className="text-8xl transition-all duration-500">{isVan ? "🚐" : "🚗"}</span>
                            <p className="mt-2 text-xl font-bold">{isVan ? "Premium Large Van" : "Premium Sedan"}</p>
                            <p className="text-[13px] text-white/50">{isVan ? "For groups of 5 or more" : "For up to 4 travelers"}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center backdrop-blur-sm">
                        <p className="text-[12px] text-white/50">Group: <span className="font-bold text-white">{count} {count === 1 ? "person" : "people"}</span></p>
                        {isVan && <p className="mt-1 text-[12px] text-[#FF8C00]">✓ Group van + dedicated translator assigned</p>}
                    </div>
                </div>

                {/* Step 3: Report — magazine cover */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${step === 3 ? "opacity-100" : "opacity-0"}`}>
                    {/* Background image — use hanok or hero */}
                    <Image src="/images/hanok-village.jpg" alt="Korea" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1B] via-[#0F0F1B]/60 to-[#0047AB]/30" />

                    {/* Magazine header */}
                    <div className="absolute top-20 left-8 right-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF8C00]">CareOnK × AI Tour Plan</p>
                        <h1 className="mt-2 font-serif text-4xl font-light italic text-white leading-tight lg:text-5xl">
                            Your Korea<br />
                            <span className="font-bold not-italic text-[#FF8C00]">Total Care</span><br />
                            Journey
                        </h1>
                        <div className="mt-4 h-px w-16 bg-[#FF8C00]" />
                    </div>

                    {/* Selected tags over image */}
                    <div className="absolute bottom-32 left-8 right-8 flex flex-wrap gap-2">
                        {[...selectedRegions.map(id => regions.find((r) => r.id === id)), themes.find((t) => t.id === selectedTheme)]
                            .filter(Boolean)
                            .map((item: any) => (
                                <span key={item.id} className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                                    {item.emoji} {item.name || item.label}
                                </span>
                            ))}
                        <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                            👥 {count} {count === 1 ? "Traveler" : "Travelers"}
                        </span>
                    </div>

                    {/* Magazine issue date */}
                    <div className="absolute bottom-10 left-8 right-8 flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Estimated 4-Day Itinerary</p>
                            <p className="mt-1 text-[13px] font-bold text-white">Arrive · Discover · Transform · Depart</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-white/30">On-K Mates</p>
                            <p className="text-lg font-bold text-[#FF8C00]">3 Verified</p>
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
                <div className="h-1 w-full bg-border">
                    <div className="h-full bg-[#0047AB] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex flex-1 flex-col justify-between px-8 py-10 lg:px-14 lg:py-14">
                    {/* Step indicator */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
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

                    <div className="flex flex-1 flex-col justify-center py-6">

                        {/* ── STEP 0: Region ── */}
                        {step === 0 && (
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 01 — Destination</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">Where in Korea?</h2>
                                    <p className="mt-1 text-[13px] text-muted-foreground">Click the map or select a city below.</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {regions.map((r) => (
                                        <button
                                            key={r.id}
                                            onClick={() => setSelectedRegions(prev => prev.includes(r.id) ? prev.filter(x => x !== r.id) : [...prev, r.id])}
                                            onMouseEnter={() => setHoveredRegion(r.id)}
                                            onMouseLeave={() => setHoveredRegion(null)}
                                            className={`flex flex-col items-start rounded-xl border-2 px-3 py-2.5 text-left transition-all ${selectedRegions.includes(r.id)
                                                ? "border-[#FF8C00] bg-[#FF8C00]/5"
                                                : "border-border hover:border-[#0047AB]/40"
                                                }`}
                                        >
                                            <span className="text-lg">{r.emoji}</span>
                                            <span className="mt-1 text-[12px] font-bold text-foreground">{r.name}</span>
                                            <span className="text-[10px] text-muted-foreground">{r.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 1: Theme ── */}
                        {step === 1 && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 02 — Travel Theme</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">Choose Your Desire</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {themes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => { setSelectedTheme(t.id); setPreviewTheme(t.id) }}
                                            onMouseEnter={() => setPreviewTheme(t.id)}
                                            onMouseLeave={() => setPreviewTheme(selectedTheme || "glow")}
                                            className={`flex flex-col items-start rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.98] ${selectedTheme === t.id ? "border-[#0047AB] bg-[#0047AB]/5 shadow-md" : "border-border hover:border-[#0047AB]/30"
                                                }`}
                                        >
                                            <div className={`mb-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedTheme === t.id ? "border-[#0047AB] bg-[#0047AB]" : "border-border"}`}>
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
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 03 — Companion Matching</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">Who&apos;s Joining You?</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {companions.map((c) => (
                                        <button key={c.id} onClick={() => setCompanion(c.id)}
                                            className={`flex flex-col items-center rounded-2xl border-2 p-4 transition-all active:scale-[0.98] ${companion === c.id ? "border-[#0047AB] bg-[#0047AB]/5 shadow-md" : "border-border hover:border-[#0047AB]/30"}`}>
                                            <span className="text-3xl">{c.emoji}</span>
                                            <span className="mt-2 text-[13px] font-bold text-foreground">{c.label}</span>
                                            <span className="text-[11px] text-muted-foreground">{c.sub}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="rounded-2xl border border-border bg-secondary/50 p-4">
                                    <p className="mb-3 text-[12px] font-semibold text-muted-foreground">Number of travelers</p>
                                    <div className="flex items-center justify-between">
                                        <button onClick={() => setCount(Math.max(1, count - 1))} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card transition-all hover:border-[#0047AB]/40 active:scale-95"><Minus className="h-4 w-4" /></button>
                                        <div className="text-center">
                                            <span className="text-4xl font-bold text-[#0047AB]">{count}</span>
                                            <p className="text-[12px] text-muted-foreground">{count === 1 ? "traveler" : "travelers"}</p>
                                        </div>
                                        <button onClick={() => setCount(Math.min(20, count + 1))} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0047AB]/20 bg-[#0047AB]/5 text-[#0047AB] transition-all hover:border-[#0047AB]/50 active:scale-95"><Plus className="h-4 w-4" /></button>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#0047AB]/15 bg-[#0047AB]/5 px-3 py-2">
                                        <span className="text-lg">{isVan ? "🚐" : "🚗"}</span>
                                        <p className="text-[12px] font-medium text-foreground">{isVan ? "Premium Large Van — Group transport" : "Premium Sedan — Private transfer"}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 3: Total Care Plan ── */}
                        {step === 3 && (
                            <div className="flex flex-col gap-3">
                                {/* Magazine masthead */}
                                <div className="rounded-2xl border border-[#0047AB]/20 bg-gradient-to-r from-[#0047AB]/8 to-[#FF8C00]/5 px-5 py-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF8C00]">Total Care Plan · ON</p>
                                    <h2 className="mt-1 text-xl font-bold text-foreground">Your Korea Journey</h2>
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {[...selectedRegions.map(id => regions.find(r => r.id === id)?.name), themes.find((t) => t.id === selectedTheme)?.label, `${count} Traveler${count > 1 ? 's' : ''}`, isVan ? '🚐 Van' : '🚗 Sedan']
                                            .filter(Boolean).map((tag, idx) => (
                                                <span key={`${tag}-${idx}`} className="rounded-full bg-[#0047AB]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#0047AB]">{tag}</span>
                                            ))}
                                    </div>
                                </div>

                                {/* On-K Mate profiles — circular */}
                                <div className="rounded-2xl border border-border bg-secondary/50 px-4 py-4">
                                    <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your On-K Mates — Verified Team</p>
                                    <div className="flex justify-around">
                                        {mateProfiles.map((m) => (
                                            <div key={m.role} className="flex flex-col items-center gap-1.5">
                                                {/* Circular avatar */}
                                                <div className="relative">
                                                    <div
                                                        className="flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-lg"
                                                        style={{ background: `radial-gradient(circle at 35% 35%, ${m.color}30, ${m.color}10)`, border: `2px solid ${m.color}40` }}
                                                    >
                                                        {m.emoji}
                                                    </div>
                                                    {/* Verified badge */}
                                                    <span
                                                        className="absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white shadow"
                                                        style={{ backgroundColor: m.color }}
                                                    >
                                                        ✓
                                                    </span>
                                                </div>
                                                <p className="text-[11px] font-bold text-foreground">{m.role.replace('On-K ', '')}</p>
                                                <div className="flex items-center gap-0.5">
                                                    <Star className="h-2.5 w-2.5 fill-[#FF8C00] text-[#FF8C00]" />
                                                    <span className="text-[10px] font-semibold text-foreground">{m.rating}</span>
                                                </div>
                                                <span className="rounded-full border text-[9px] font-bold px-2 py-0.5"
                                                    style={{ borderColor: `${m.color}50`, color: m.color }}>
                                                    {m.badge}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 4-Day Timeline */}
                                <div className="rounded-2xl border border-border bg-secondary/50 px-4 py-4">
                                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">4-Day Itinerary Timeline</p>
                                    <div className="relative">
                                        {/* Vertical line */}
                                        <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-[#0047AB] via-[#FF8C00] to-[#0047AB]/20" />
                                        <div className="flex flex-col gap-3">
                                            {itinerary.map((item, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    {/* Day dot */}
                                                    <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow"
                                                        style={{ background: i === 0 ? '#0047AB' : i === 3 ? '#FF8C00' : '#162436', border: '2px solid', borderColor: i === 0 ? '#0047AB' : i === 3 ? '#FF8C00' : '#0047AB40' }}>
                                                        <span className="text-xs">{item.icon}</span>
                                                    </div>
                                                    <div className="flex-1 pb-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8C00]">{item.day}</span>
                                                            <span className="h-px flex-1 bg-border" />
                                                        </div>
                                                        <p className="mt-0.5 text-[12px] font-bold text-foreground">{item.title}</p>
                                                        <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp CTA — "Hubungi Mate Anda" */}
                                <a
                                    href="https://wa.me/821012345678?text=Hi! I just planned my Korea tour with CareOnK AI Tour Plan. I'd like to connect with my On-K Mate."
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-[14px] font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white flex-shrink-0">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-[13px] font-black">Hubungi Mate Anda</p>
                                        <p className="text-[10px] opacity-80">Contact via WhatsApp</p>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Nav */}
                    <div className="flex items-center gap-3">
                        {step > 0 ? (
                            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-[14px] font-semibold text-foreground transition-all hover:shadow-sm active:scale-[0.98]">
                                <ChevronLeft className="h-4 w-4" /> Back
                            </button>
                        ) : <div />}
                        {isLast ? (
                            <Link href="/" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0047AB] px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98]">
                                <Power className="h-4 w-4" /> Korea Life ON!
                            </Link>
                        ) : (
                            <button onClick={() => { if (canNext()) setStep(step + 1) }} disabled={!canNext()}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all active:scale-[0.98] ${canNext() ? "bg-[#0047AB] hover:brightness-110" : "cursor-not-allowed bg-muted-foreground/30"}`}>
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
