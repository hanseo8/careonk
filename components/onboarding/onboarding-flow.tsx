"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft, ChevronRight, Power, Check,
    Minus, Plus, Star, Sparkles,
} from "lucide-react"

// ─── Geographic coords → SVG coords ─────────────────────────────────────────
// viewBox: 0 0 400 420
// lon: 125.5~129.5  → X: 60~340  (280px / 4°)
// lat: 38.9~33.1    → Y: 10~395  (385px / 5.8°, inverted)
const geoToSvg = (lon: number, lat: number) => ({
    x: Math.round(60 + (lon - 125.5) / 4 * 280),
    y: Math.round(10 + (38.9 - lat) / 5.8 * 385),
})

// ─── Cities ──────────────────────────────────────────────────────────────────
const regions = [
    { id: "seoul", name: "Seoul", sub: "Capital City", emoji: "🏙️", available: 24, theme: "Medical, Shopping, Culture", ...geoToSvg(126.98, 37.57) },
    { id: "incheon", name: "Incheon", sub: "Gateway City", emoji: "✈️", available: 8, theme: "Airport, K-Pop, Chinatown", ...geoToSvg(126.70, 37.45) },
    { id: "gyeonggi", name: "Gyeonggi", sub: "Metropolitan Area", emoji: "🏯", available: 12, theme: "Suwon, Nami Island, DMZ", ...geoToSvg(127.05, 37.27) },
    { id: "gangwon", name: "Gangwon", sub: "Nature & Snow", emoji: "⛷️", available: 6, theme: "Ski Resorts, East Sea, Mountains", ...geoToSvg(127.73, 37.88) },
    { id: "daejeon", name: "Daejeon", sub: "Science City", emoji: "🔬", available: 7, theme: "EXPO Science Park, Gyeryongsan, Spa", ...geoToSvg(127.38, 36.35) },
    { id: "gwangju", name: "Gwangju", sub: "Culture Capital", emoji: "🎨", available: 5, theme: "Art Biennale, Mudeungsan, Local Cuisine", ...geoToSvg(126.85, 35.16) },
    { id: "busan", name: "Busan", sub: "Ocean City", emoji: "🌊", available: 15, theme: "Haeundae Beach, Seafood, Night Market", ...geoToSvg(129.03, 35.10) },
    { id: "gyeongju", name: "Gyeongju", sub: "Ancient Capital", emoji: "🏺", available: 8, theme: "Bulguksa, Cheomseongdae, Royal Tombs", ...geoToSvg(129.21, 35.84) },
    { id: "jeju", name: "Jeju", sub: "Island Paradise", emoji: "🌺", available: 10, theme: "Beaches, Hallasan, Canola Flower Fields", ...geoToSvg(126.53, 33.49) },
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

// ─── SVG Korea Map ────────────────────────────────────────────────────────────
function KoreaMapSVG({
    selected, hovered, onSelect, onHover,
}: {
    selected: string | null; hovered: string | null
    onSelect: (id: string) => void; onHover: (id: string | null) => void
}) {
    return (
        <svg
            viewBox="0 0 400 420"
            className="w-full h-full"
            style={{ maxHeight: "100%", display: "block" }}
            aria-label="Interactive map of South Korea"
        >
            {/* Background */}
            <rect width="400" height="420" fill="#0F0F1B" />

            {/* Sea glow */}
            <radialGradient id="seaGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0047AB" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0047AB" stopOpacity="0" />
            </radialGradient>
            <rect width="400" height="420" fill="url(#seaGlow)" />

            {/* Grid lines */}
            {[100, 150, 200, 250, 300, 340].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="420" stroke="#0047AB" strokeWidth="0.4" opacity="0.12" />
            ))}
            {[70, 120, 170, 220, 270, 320, 370].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#0047AB" strokeWidth="0.4" opacity="0.12" />
            ))}

            {/* ── Korea mainland outline ── */}
            {/* Approximate polygon based on geographic key points */}
            <path
                d={`
          M 168 10
          L 152 16 L 138 26 L 120 44 L 102 70
          L 87 102 L 78 132 L 78 155 L 84 172
          L 95 184 L 100 196 L 95 210 L 104 222
          L 116 234 L 132 244 L 148 252 L 164 258
          L 182 263 L 202 265 L 224 261 L 248 255
          L 272 249 L 294 246 L 315 245 L 330 247
          L 342 243 L 348 230 L 348 214 L 345 196
          L 341 176 L 338 156 L 333 133 L 324 108
          L 312 84 L 297 62 L 278 44 L 256 26
          L 232 14 L 206 7 L 182 6 Z
        `}
                fill="#162436"
                stroke="#0047AB"
                strokeWidth="1.8"
                strokeOpacity="0.7"
                strokeLinejoin="round"
            />

            {/* West coast islands (very simplified) */}
            <ellipse cx="80" cy="175" rx="6" ry="4" fill="#162436" stroke="#0047AB" strokeWidth="1" strokeOpacity="0.5" />
            <ellipse cx="96" cy="230" rx="5" ry="3" fill="#162436" stroke="#0047AB" strokeWidth="1" strokeOpacity="0.5" />

            {/* Jeju Island */}
            <ellipse
                cx="148" cy="360"
                rx="32" ry="14"
                fill="#162436"
                stroke="#0047AB"
                strokeWidth="1.8"
                strokeOpacity="0.7"
            />
            <text x="148" y="375" textAnchor="middle" fontSize="8" fill="#0047AB" opacity="0.5" fontStyle="italic">Jeju Island</text>

            {/* Compass rose */}
            <g transform="translate(365, 30)" opacity="0.4">
                <text x="0" y="-8" textAnchor="middle" fontSize="8" fill="#0047AB" fontWeight="bold">N</text>
                <line x1="0" y1="-6" x2="0" y2="6" stroke="#0047AB" strokeWidth="1" />
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#0047AB" strokeWidth="1" />
            </g>

            {/* ── City Markers ── */}
            {regions.map((r) => {
                const isSel = selected === r.id
                const isHov = hovered === r.id
                const isActive = isSel || isHov
                // Label anchor side: cities on the right half → label left
                const anchor = r.x > 220 ? "end" : "start"
                const lx = r.x > 220 ? -12 : 12
                // Jeju label above
                const ly = r.id === "jeju" ? -14 : 4

                return (
                    <g
                        key={r.id}
                        transform={`translate(${r.x}, ${r.y})`}
                        onClick={() => onSelect(r.id)}
                        onMouseEnter={() => onHover(r.id)}
                        onMouseLeave={() => onHover(null)}
                        style={{ cursor: "pointer" }}
                    >
                        {/* Pulse outer ring */}
                        {isActive && (
                            <circle r="14" fill={isSel ? "#FF8C00" : "#0047AB"} opacity="0.2" className="animate-ping" />
                        )}
                        {/* Mid ring */}
                        <circle
                            r={isActive ? "10" : "7"}
                            fill={isSel ? "#FF8C00" : "#0047AB"}
                            opacity="0.25"
                            className="transition-all duration-200"
                        />
                        {/* Core dot */}
                        <circle
                            r={isActive ? "6" : "4.5"}
                            fill={isSel ? "#FF8C00" : isHov ? "#60A0FF" : "#0047AB"}
                            stroke="white"
                            strokeWidth="1.5"
                            className="transition-all duration-200"
                        />

                        {/* Label background */}
                        <text
                            x={lx}
                            y={ly}
                            textAnchor={anchor}
                            fontSize="9.5"
                            fontWeight="bold"
                            fill="white"
                            opacity={isActive ? 1 : 0.75}
                            style={{ pointerEvents: "none", textShadow: "0 0 4px #000" }}
                            paintOrder="stroke"
                            stroke="#0F0F1B"
                            strokeWidth="3"
                        >
                            {r.name}
                        </text>
                        <text
                            x={lx}
                            y={ly}
                            textAnchor={anchor}
                            fontSize="9.5"
                            fontWeight="bold"
                            fill={isSel ? "#FF8C00" : "white"}
                            opacity={isActive ? 1 : 0.75}
                            style={{ pointerEvents: "none" }}
                        >
                            {r.name}
                        </text>
                    </g>
                )
            })}

            {/* Scale bar */}
            <g transform="translate(20, 400)" opacity="0.4">
                <line x1="0" y1="0" x2="35" y2="0" stroke="#0047AB" strokeWidth="1.5" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="#0047AB" strokeWidth="1" />
                <line x1="35" y1="-3" x2="35" y2="3" stroke="#0047AB" strokeWidth="1" />
                <text x="17" y="-5" textAnchor="middle" fontSize="7" fill="#0047AB">~100km</text>
            </g>
        </svg>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function OnboardingFlow() {
    const [step, setStep] = useState(0)
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    const [previewTheme, setPreviewTheme] = useState<string>("glow")
    const [companion, setCompanion] = useState<string | null>(null)
    const [count, setCount] = useState(2)

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

                {/* Step 0: SVG Korea Map */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${step === 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <KoreaMapSVG
                            selected={selectedRegion}
                            hovered={hoveredRegion}
                            onSelect={setSelectedRegion}
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

                {/* Step 3: Report bg */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#0047AB]/40 via-[#0F0F1B] to-[#FF8C00]/10 transition-opacity duration-700 ${step === 3 ? "opacity-100" : "opacity-0"}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-24 w-24 text-[#FF8C00] opacity-10" />
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
                                            onClick={() => setSelectedRegion(r.id)}
                                            onMouseEnter={() => setHoveredRegion(r.id)}
                                            onMouseLeave={() => setHoveredRegion(null)}
                                            className={`flex flex-col items-start rounded-xl border-2 px-3 py-2.5 text-left transition-all ${selectedRegion === r.id
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
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF8C00]">Step 04 — Total Care Plan ON</p>
                                    <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">Your Korea Journey</h2>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {[regions.find((r) => r.id === selectedRegion)?.name, themes.find((t) => t.id === selectedTheme)?.label, `${count} Traveler${count > 1 ? "s" : ""}`].filter(Boolean).map((tag) => (
                                            <span key={tag} className="rounded-full border border-[#0047AB]/20 bg-[#0047AB]/5 px-3 py-1 text-[11px] font-bold text-[#0047AB]">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-border bg-secondary/50 p-4">
                                    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Your On-K Mates</p>
                                    <div className="flex gap-2">
                                        {mateProfiles.map((m) => (
                                            <div key={m.role} className="flex flex-1 flex-col items-center rounded-xl border border-border bg-card p-3 text-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ backgroundColor: `${m.color}15` }}>{m.emoji}</div>
                                                <p className="mt-1.5 text-[10px] font-bold text-foreground leading-tight">{m.role.replace("On-K ", "")}</p>
                                                <div className="mt-1 flex items-center gap-0.5">
                                                    <Star className="h-2.5 w-2.5 fill-[#FF8C00] text-[#FF8C00]" />
                                                    <span className="text-[10px] font-semibold">{m.rating}</span>
                                                </div>
                                                <span className="mt-1 rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: m.color }}>{m.badge}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                                <a href="https://wa.me/821012345678?text=Hi! I just planned my Korea tour with CareOnK AI. I'd like to connect with my On-K Mate." target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-[14px] font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98]">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Contact Your On-K Mate via WhatsApp
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
