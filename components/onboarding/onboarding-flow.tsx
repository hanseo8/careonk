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
        question: "어떤 무드의 여행을 원하시나요?",
        subtitle: "What kind of travel mood are you looking for?",
        options: [
            { id: "beauty", label: "뷰티 & 메디컬", sub: "Medical Beauty" },
            { id: "culture", label: "문화 & 역사", sub: "Culture & Heritage" },
            { id: "nature", label: "자연 & 힐링", sub: "Nature & Wellness" },
            { id: "food", label: "미식 & 쇼핑", sub: "Food & Shopping" },
        ],
    },
    {
        id: 3,
        image: "/images/onboarding-who.jpg",
        imageAlt: "Indonesian family at Gyeongbokgung Palace",
        question: "누구와 함께 오시나요?",
        subtitle: "Who are you traveling with?",
        options: [
            { id: "solo", label: "혼자", sub: "Solo" },
            { id: "couple", label: "커플", sub: "Couple" },
            { id: "family", label: "가족", sub: "Family" },
            { id: "group", label: "단체", sub: "Group" },
        ],
    },
    {
        id: 4,
        image: "/images/onboarding-count.jpg",
        imageAlt: "Passports and flight tickets",
        question: "총 몇 분이서 오시나요?",
        subtitle: "How many travelers in your group?",
    },
    {
        id: 5,
        image: "/images/onboarding-date.jpg",
        imageAlt: "Travel calendar with Jeju Island",
        question: "한국 방문 예정 날짜는?",
        subtitle: "When are you planning to visit Korea?",
    },
    {
        id: 6,
        image: "/images/onboarding-purpose.jpg",
        imageAlt: "Travel purpose still life objects",
        question: "이번 여행에서 가장 기대하는 것은?",
        subtitle: "What are you most excited about? (Choose all that apply)",
        options: [
            { id: "medical", label: "의료 & 뷰티", sub: "Medical & Beauty" },
            { id: "sightseeing", label: "관광 & 체험", sub: "Sightseeing" },
            { id: "wellness", label: "휴식 & 웰니스", sub: "Rest & Wellness" },
            { id: "shopping", label: "쇼핑", sub: "Shopping" },
        ],
    },
]

// ─── Component ────────────────────────────────────────────────────────────────
export function OnboardingFlow() {
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string | string[] | number | string>>({})
    const [count, setCount] = useState(2)
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")

    const step = steps[current]
    const isFirst = current === 0
    const isLast = current === steps.length - 1
    const progress = ((current) / (steps.length - 1)) * 100

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
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />

                {/* Logo on image */}
                <Link
                    href="/"
                    className="absolute left-6 top-6 flex items-center gap-0.5"
                    aria-label="CareOnK Home"
                >
                    <span className="font-serif text-[18px] font-normal uppercase tracking-[0.08em] text-white drop-shadow">CARE</span>
                    <span className="relative mx-[1px] inline-flex h-[19px] w-[19px] items-center justify-center">
                        <span className="absolute inset-0 rounded-full border-[2px] border-[#D4930D]" />
                        <Power className="h-[9px] w-[9px] text-[#D4930D]" strokeWidth={2.5} />
                    </span>
                    <span className="text-[18px] font-black uppercase tracking-[0.02em] text-white drop-shadow">NK</span>
                </Link>

                {/* Step indicator dots on image */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 lg:hidden">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Right: Question Panel ──────────────────────────────────── */}
            <div className="flex flex-1 flex-col">
                {/* Progress bar */}
                <div className="h-1 w-full bg-border">
                    <div
                        className="h-full bg-[#2563A8] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex flex-1 flex-col justify-between px-8 py-10 lg:px-16 lg:py-16">
                    {/* Step counter */}
                    <div className="flex items-center justify-between">
                        <p className="text-[12px] font-semibold uppercase tracking-widest text-[#6B7A99]">
                            STEP {current + 1} / {steps.length}
                        </p>
                        <Link
                            href="/"
                            className="text-[12px] font-medium text-[#6B7A99] transition-colors hover:text-foreground"
                        >
                            Skip →
                        </Link>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col justify-center py-8">

                        {/* ── STEP 1: Hero / Intro ── */}
                        {current === 0 && (
                            <div className="flex flex-col gap-6">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4930D]/20 bg-[#D4930D]/5 px-4 py-2">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4930D]" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4930D]">Premium Concierge Service</span>
                                </div>
                                <h1 className="text-3xl font-bold leading-tight text-foreground lg:text-4xl">
                                    당신의 완벽한<br />
                                    <span className="text-[#2563A8]">한국 여행</span>을<br />
                                    시작해봐요
                                </h1>
                                <p className="text-[15px] leading-relaxed text-[#6B7A99]">
                                    CareOnK가 항공편 도착부터 귀국까지,<br />
                                    모든 순간을 함께합니다. 몇 가지 질문에 답해주시면<br />
                                    맞춤형 서비스를 추천해드릴게요.
                                </p>
                                <p className="text-[13px] text-[#6B7A99]/70 italic">
                                    Kami siap menemani perjalanan Korea Anda dari awal hingga akhir.
                                </p>
                            </div>
                        )}

                        {/* ── STEP 2, 3: Card option selection (single) ── */}
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
                                                {selected && (
                                                    <div className="mb-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2563A8]">
                                                        <Check className="h-3 w-3 text-white" />
                                                    </div>
                                                )}
                                                {!selected && (
                                                    <div className="mb-2 h-5 w-5 rounded-full border-2 border-border" />
                                                )}
                                                <span className="text-[14px] font-bold text-foreground">{opt.label}</span>
                                                <span className="text-[12px] text-[#6B7A99]">{opt.sub}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 4: Count selector ── */}
                        {current === 3 && (
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground lg:text-3xl">{step.question}</h2>
                                    <p className="mt-1.5 text-[14px] text-[#6B7A99]">{step.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setCount(Math.max(1, count - 1))}
                                        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-card text-foreground transition-all hover:border-[#2563A8]/40 hover:shadow-sm active:scale-95"
                                    >
                                        <Minus className="h-5 w-5" />
                                    </button>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-5xl font-bold text-[#2563A8]">{count}</span>
                                        <span className="text-[13px] text-[#6B7A99]">명 / persons</span>
                                    </div>
                                    <button
                                        onClick={() => setCount(Math.min(30, count + 1))}
                                        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2563A8]/20 bg-[#2563A8]/5 text-[#2563A8] transition-all hover:border-[#2563A8]/50 hover:shadow-sm active:scale-95"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    {[1, 2, 4, 6, 10].map((n) => (
                                        <button
                                            key={n}
                                            onClick={() => setCount(n)}
                                            className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all ${count === n
                                                    ? "border-[#2563A8] bg-[#2563A8] text-white"
                                                    : "border-border bg-card text-foreground hover:border-[#2563A8]/30"
                                                }`}
                                        >
                                            {n}명
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 5: Date picker ── */}
                        {current === 4 && (
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground lg:text-3xl">{step.question}</h2>
                                    <p className="mt-1.5 text-[14px] text-[#6B7A99]">{step.subtitle}</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[13px] font-semibold text-foreground">입국일 / Arrival</label>
                                        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 focus-within:border-[#2563A8]/50">
                                            <Calendar className="h-4 w-4 text-[#6B7A99]" />
                                            <input
                                                type="date"
                                                value={dateFrom}
                                                onChange={(e) => setDateFrom(e.target.value)}
                                                className="flex-1 bg-transparent text-[14px] text-foreground outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[13px] font-semibold text-foreground">출국일 / Departure</label>
                                        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 focus-within:border-[#2563A8]/50">
                                            <Calendar className="h-4 w-4 text-[#6B7A99]" />
                                            <input
                                                type="date"
                                                value={dateTo}
                                                min={dateFrom}
                                                onChange={(e) => setDateTo(e.target.value)}
                                                className="flex-1 bg-transparent text-[14px] text-foreground outline-none"
                                            />
                                        </div>
                                    </div>
                                    {dateFrom && dateTo && (
                                        <div className="rounded-xl border border-[#2563A8]/20 bg-[#2563A8]/5 px-4 py-3">
                                            <p className="text-[13px] font-medium text-[#2563A8]">
                                                총 {Math.max(1, Math.ceil((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24)))}박 여행 일정
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 6: Multi-select purpose ── */}
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
                                                {selected ? (
                                                    <div className="mb-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4930D]">
                                                        <Check className="h-3 w-3 text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="mb-2 h-5 w-5 rounded-full border-2 border-border" />
                                                )}
                                                <span className="text-[14px] font-bold text-foreground">{opt.label}</span>
                                                <span className="text-[12px] text-[#6B7A99]">{opt.sub}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between gap-4">
                        {!isFirst ? (
                            <button
                                onClick={() => setCurrent(current - 1)}
                                className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-[14px] font-semibold text-foreground transition-all hover:border-[#2563A8]/30 hover:shadow-sm active:scale-[0.98]"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                이전
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
                                Korea Life ON! 시작하기
                            </Link>
                        ) : (
                            <button
                                onClick={() => { if (canProceed()) setCurrent(current + 1) }}
                                disabled={!canProceed()}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all active:scale-[0.98] ${canProceed()
                                        ? "bg-[#2563A8] hover:brightness-110"
                                        : "cursor-not-allowed bg-[#6B7A99]/30"
                                    }`}
                            >
                                {current === 0 ? "시작하기" : "다음"}
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
