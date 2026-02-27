"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Power, Check, Minus, Plus, Calendar } from "lucide-react"

// ─── Step data ────────────────────────────────────────────────────────────────
const steps = [
    {
        id: 1,
        image: "/images/onboarding-hero.jpg",
        imageAlt: "Luxury airplane window view of Seoul skyline",
    },
    {
        id: 2,
        image: "/images/onboarding-mood.jpg",
        imageAlt: "Diverse premium South Korean travel experiences",
        question: "What kind of trip are you looking for?",
        subtitle: "Select the vibe that best describes your ideal Korea experience.",
        options: [
            { id: "beauty", label: "Beauty & Medical", sub: "K-Beauty, Clinics, Wellness" },
            { id: "culture", label: "Culture & Heritage", sub: "Palaces, Hanok, History" },
            { id: "nature", label: "Nature & Healing", sub: "Mountains, Jeju, Relaxation" },
            { id: "food", label: "Food & Shopping", sub: "K-Food, Markets, Fashion" },
        ],
    },
    {
        id: 3,
        image: "/images/onboarding-who.jpg",
        imageAlt: "Indonesian family at Gyeongbokgung Palace",
        question: "Who are you traveling with?",
        subtitle: "Tell us who's joining you on this journey.",
        options: [
            { id: "solo", label: "Just Me", sub: "Solo traveler" },
            { id: "couple", label: "Couple", sub: "Traveling with a partner" },
            { id: "family", label: "Family", sub: "With kids or parents" },
            { id: "group", label: "Group", sub: "Friends or colleagues" },
        ],
    },
    {
        id: 4,
        image: "/images/onboarding-count.jpg",
        imageAlt: "Passports and flight tickets",
        question: "How many travelers in your group?",
        subtitle: "Including yourself — we'll tailor our services for the full party.",
    },
    {
        id: 5,
        image: "/images/onboarding-date.jpg",
        imageAlt: "Travel calendar with Jeju Island",
        question: "When are you visiting Korea?",
        subtitle: "Select your arrival and departure dates.",
    },
    {
        id: 6,
        image: "/images/onboarding-purpose.jpg",
        imageAlt: "Travel purpose still life objects",
        question: "What are you most excited about?",
        subtitle: "Choose everything that interests you — we'll match the perfect services.",
        options: [
            { id: "medical", label: "Medical & Beauty", sub: "Clinics, dermatology, skincare" },
            { id: "sightseeing", label: "Sightseeing & Culture", sub: "Tours, palaces, activities" },
            { id: "wellness", label: "Rest & Wellness", sub: "Spa, nature, slow travel" },
            { id: "shopping", label: "Shopping & Dining", sub: "Markets, K-food, fashion" },
        ],
    },
]

// ─── Component ────────────────────────────────────────────────────────────────
export function OnboardingFlow() {
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string | string[] | number>>({})
    const [count, setCount] = useState(2)
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")

    const step = steps[current]
    const isFirst = current === 0
    const isLast = current === steps.length - 1
    const progress = (current / (steps.length - 1)) * 100

    const handleOptionSelect = (stepId: number, optionId: string, multi = false) => {
        if (multi) {
            const prev = (answers[stepId] as string[]) || []
            const next = prev.includes(optionId)
                ? prev.filter((id) => id !== optionId)
                : [...prev, optionId]
            setAnswers({ ...answers, [stepId]: next })
        } else {
            setAnswers({ ...answers, [stepId]: optionId })
        }
    }

    const isSelected = (stepId: number, optionId: string, multi = false) => {
        if (multi) return ((answers[stepId] as string[]) || []).includes(optionId)
        return answers[stepId] === optionId
    }

    const canProceed = () => {
        if (current === 0) return true
        if (current === 1 || current === 2) return !!answers[steps[current].id]
        if (current === 3) return count > 0
        if (current === 4) return !!dateFrom
        if (current === 5) return ((answers[steps[current].id] as string[]) || []).length > 0
        return true
    }

    const nightCount = dateFrom && dateTo
        ? Math.max(0, Math.ceil((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24)))
        : 0

    return (
        <div className="flex min-h-screen flex-col bg-background lg:flex-row">
            {/* ── Left: Image Panel ─────────────────────────────────────── */}
            <div className="relative h-64 w-full shrink-0 overflow-hidden lg:h-screen lg:w-1/2">
                {steps.map((s, i) => (
                    <div
                        key={s.id}
                        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                        style={{ opacity: i === current ? 1 : 0 }}
                    >
                        <Image
                            src={s.image}
                            alt={s.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={i === 0}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />

                {/* Logo */}
                <Link href="/" className="absolute left-6 top-6 flex items-center gap-0.5" aria-label="CareOnK Home">
                    <span className="font-serif text-[18px] font-normal uppercase tracking-[0.08em] text-white drop-shadow">CARE</span>
                    <span className="relative mx-[1px] inline-flex h-[19px] w-[19px] items-center justify-center">
                        <span className="absolute inset-0 rounded-full border-[2px] border-[#D4930D]" />
                        <Power className="h-[9px] w-[9px] text-[#D4930D]" strokeWidth={2.5} />
                    </span>
                    <span className="text-[18px] font-black uppercase tracking-[0.02em] text-white drop-shadow">NK</span>
                </Link>

                {/* Step dots (mobile) */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 lg:hidden">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
                    ))}
                </div>
            </div>

            {/* ── Right: Question Panel ──────────────────────────────────── */}
            <div className="flex flex-1 flex-col">
                {/* Progress bar */}
                <div className="h-1 w-full bg-border">
                    <div className="h-full bg-[#2563A8] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex flex-1 flex-col justify-between px-8 py-10 lg:px-16 lg:py-16">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <p className="text-[12px] font-semibold uppercase tracking-widest text-[#6B7A99]">
                            Step {current + 1} of {steps.length}
                        </p>
                        <Link href="/" className="text-[12px] font-medium text-[#6B7A99] transition-colors hover:text-foreground">
                            Skip →
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-center py-8">

                        {/* ── Step 1: Intro ── */}
                        {current === 0 && (
                            <div className="flex flex-col gap-6">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4930D]/20 bg-[#D4930D]/5 px-4 py-2">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4930D]" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4930D]">Premium Concierge Service</span>
                                </div>
                                <h1 className="text-3xl font-bold leading-tight text-foreground lg:text-4xl">
                                    Let's plan your<br />
                                    <span className="text-[#2563A8]">perfect Korea</span><br />
                                    experience.
                                </h1>
                                <p className="text-[15px] leading-relaxed text-[#6B7A99]">
                                    From the moment you land to the moment you leave,<br />
                                    CareOnK takes care of everything. Answer a few quick<br />
                                    questions and we'll recommend the perfect services for you.
                                </p>
                                <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3">
                                    <span className="text-[13px] text-[#6B7A99]">⏱ Takes less than 2 minutes</span>
                                </div>
                            </div>
                        )}

                        {/* ── Step 2 & 3: Single select cards ── */}
                        {(current === 1 || current === 2) && step.options && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground lg:text-3xl">{step.question}</h2>
                                    <p className="mt-1.5 text-[14px] text-[#6B7A99]">{step.subtitle}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {step.options.map((opt) => {
                                        const selected = isSelected(step.id, opt.id)
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleOptionSelect(step.id, opt.id)}
                                                className={`flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all active:scale-[0.98] ${selected
                                                        ? "border-[#2563A8] bg-[#2563A8]/5 shadow-md"
                                                        : "border-border bg-card hover:border-[#2563A8]/30 hover:shadow-sm"
                                                    }`}
                                            >
                                                <div className={`mb-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${selected ? "border-[#2563A8] bg-[#2563A8]" : "border-border"
                                                    }`}>
                                                    {selected && <Check className="h-3 w-3 text-white" />}
                                                </div>
                                                <span className="text-[14px] font-bold text-foreground">{opt.label}</span>
                                                <span className="mt-0.5 text-[12px] text-[#6B7A99]">{opt.sub}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── Step 4: Count ── */}
                        {current === 3 && (
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground lg:text-3xl">{step.question}</h2>
                                    <p className="mt-1.5 text-[14px] text-[#6B7A99]">{step.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setCount(Math.max(1, count - 1))}
                                        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-card text-foreground transition-all hover:border-[#2563A8]/40 active:scale-95"
                                    >
                                        <Minus className="h-5 w-5" />
                                    </button>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-5xl font-bold text-[#2563A8]">{count}</span>
                                        <span className="text-[13px] text-[#6B7A99]">{count === 1 ? "traveler" : "travelers"}</span>
                                    </div>
                                    <button
                                        onClick={() => setCount(Math.min(30, count + 1))}
                                        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2563A8]/20 bg-[#2563A8]/5 text-[#2563A8] transition-all hover:border-[#2563A8]/50 active:scale-95"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3, 4, 6, 8, 10].map((n) => (
                                        <button
                                            key={n}
                                            onClick={() => setCount(n)}
                                            className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all ${count === n
                                                    ? "border-[#2563A8] bg-[#2563A8] text-white"
                                                    : "border-border bg-card text-foreground hover:border-[#2563A8]/30"
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Step 5: Dates ── */}
                        {current === 4 && (
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground lg:text-3xl">{step.question}</h2>
                                    <p className="mt-1.5 text-[14px] text-[#6B7A99]">{step.subtitle}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[13px] font-semibold text-foreground">Arrival Date</label>
                                        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 focus-within:border-[#2563A8]/50">
                                            <Calendar className="h-4 w-4 shrink-0 text-[#6B7A99]" />
                                            <input
                                                type="date"
                                                value={dateFrom}
                                                onChange={(e) => setDateFrom(e.target.value)}
                                                className="flex-1 bg-transparent text-[14px] text-foreground outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[13px] font-semibold text-foreground">Departure Date</label>
                                        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 focus-within:border-[#2563A8]/50">
                                            <Calendar className="h-4 w-4 shrink-0 text-[#6B7A99]" />
                                            <input
                                                type="date"
                                                value={dateTo}
                                                min={dateFrom}
                                                onChange={(e) => setDateTo(e.target.value)}
                                                className="flex-1 bg-transparent text-[14px] text-foreground outline-none"
                                            />
                                        </div>
                                    </div>
                                    {dateFrom && dateTo && nightCount > 0 && (
                                        <div className="rounded-xl border border-[#2563A8]/20 bg-[#2563A8]/5 px-4 py-3">
                                            <p className="text-[13px] font-semibold text-[#2563A8]">
                                                {nightCount} night{nightCount !== 1 ? "s" : ""} in Korea ✈️
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── Step 6: Multi-select purpose ── */}
                        {current === 5 && step.options && (
                            <div className="flex flex-col gap-5">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground lg:text-3xl">{step.question}</h2>
                                    <p className="mt-1.5 text-[14px] text-[#6B7A99]">{step.subtitle}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {step.options.map((opt) => {
                                        const selected = isSelected(step.id, opt.id, true)
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleOptionSelect(step.id, opt.id, true)}
                                                className={`flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all active:scale-[0.98] ${selected
                                                        ? "border-[#D4930D] bg-[#D4930D]/5 shadow-md"
                                                        : "border-border bg-card hover:border-[#D4930D]/30 hover:shadow-sm"
                                                    }`}
                                            >
                                                <div className={`mb-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${selected ? "border-[#D4930D] bg-[#D4930D]" : "border-border"
                                                    }`}>
                                                    {selected && <Check className="h-3 w-3 text-white" />}
                                                </div>
                                                <span className="text-[14px] font-bold text-foreground">{opt.label}</span>
                                                <span className="mt-0.5 text-[12px] text-[#6B7A99]">{opt.sub}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4">
                        {!isFirst ? (
                            <button
                                onClick={() => setCurrent(current - 1)}
                                className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-[14px] font-semibold text-foreground transition-all hover:border-[#2563A8]/30 hover:shadow-sm active:scale-[0.98]"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {isLast ? (
                            <Link
                                href="/medical"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563A8] px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98]"
                            >
                                <Power className="h-4 w-4" />
                                Turn ON Your Korea Life!
                            </Link>
                        ) : (
                            <button
                                onClick={() => { if (canProceed()) setCurrent(current + 1) }}
                                disabled={!canProceed()}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all active:scale-[0.98] ${canProceed() ? "bg-[#2563A8] hover:brightness-110" : "cursor-not-allowed bg-[#6B7A99]/30"
                                    }`}
                            >
                                {current === 0 ? "Get Started" : "Next"}
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
