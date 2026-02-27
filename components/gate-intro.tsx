"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
    return (
        <motion.div
            className="absolute w-1 h-1 rounded-full bg-[#D4930D]"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [-10, -40] }}
            transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
        />
    )
}

const particles = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    id: i,
}))

export function GateIntro({ onEnter }: { onEnter: () => void }) {
    const [phase, setPhase] = useState<"gate" | "opening" | "split">("gate")
    const [countdown, setCountdown] = useState(5)
    const router = useRouter()

    // 5초 카운트다운 후 자동 개방
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) {
                    clearInterval(interval)
                    handleOpen()
                }
                return c - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleOpen = () => {
        setPhase((prev) => {
            if (prev !== "gate") return prev
            setTimeout(() => setPhase("split"), 1600)
            return "opening"
        })
    }

    const handleAI = () => { onEnter(); router.push("/get-started") }
    const handleExplore = () => { onEnter() }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] overflow-hidden"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* ── Gate phase ── */}
                <AnimatePresence>
                    {(phase === "gate" || phase === "opening") && (
                        <motion.div
                            key="gate-phase"
                            className="absolute inset-0"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Single gate image — split at center seam */}
                            {/* Left half */}
                            <motion.div
                                className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
                                animate={phase === "opening" ? { x: "-100%" } : { x: 0 }}
                                transition={{ duration: 1.5, ease: [0.45, 0.05, 0.55, 0.95] }}
                            >
                                <div
                                    className="absolute top-0 left-0 w-[200%] h-full"
                                    style={{
                                        backgroundImage: "url('/images/gate-unified.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "left center",
                                    }}
                                />
                                {/* Seam glow */}
                                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4930D]/70 to-transparent" />
                                {/* Door ring */}
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-20 rounded-l-full border border-[#D4930D]/50 bg-[#D4930D]/10 backdrop-blur-sm" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                            </motion.div>

                            {/* Right half */}
                            <motion.div
                                className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
                                animate={phase === "opening" ? { x: "100%" } : { x: 0 }}
                                transition={{ duration: 1.5, ease: [0.45, 0.05, 0.55, 0.95] }}
                            >
                                <div
                                    className="absolute top-0 right-0 w-[200%] h-full"
                                    style={{
                                        backgroundImage: "url('/images/gate-unified.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "right center",
                                    }}
                                />
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4930D]/70 to-transparent" />
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-20 rounded-r-full border border-[#D4930D]/50 bg-[#D4930D]/10 backdrop-blur-sm" />
                                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
                            </motion.div>

                            {/* Mist */}
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0D1A]/70 to-transparent pointer-events-none z-10" />

                            {/* Particles */}
                            {particles.map((p) => (
                                <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
                            ))}

                            {/* Center: logo + TURN ON */}
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                                animate={phase === "opening" ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: -16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="mb-8 text-center"
                                >
                                    <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#D4930D]/70 mb-2">
                                        Premium Korea Concierge
                                    </p>
                                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                                        CARE<span className="text-[#D4930D]">ON</span>K
                                    </h1>
                                </motion.div>

                                <motion.button
                                    onClick={handleOpen}
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="pointer-events-auto relative flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full bg-[#2563A8] shadow-[0_0_60px_rgba(37,99,168,0.6)] text-white font-black cursor-pointer"
                                >
                                    <motion.div className="absolute inset-0 rounded-full border border-[#2563A8]/60"
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }} />
                                    <motion.div className="absolute inset-0 rounded-full border border-[#D4930D]/30"
                                        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, delay: 0.6, repeat: Infinity }} />
                                    <span className="text-sm font-black tracking-[0.15em]">TURN</span>
                                    <span className="text-2xl font-black text-[#D4930D] leading-none">ON</span>
                                </motion.button>

                                {/* Countdown */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="mt-5 text-[11px] text-white/30 tracking-widest uppercase"
                                >
                                    {countdown > 0 ? `Auto-opens in ${countdown}s` : "Opening…"}
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Split screen (palace background) ── */}
                <AnimatePresence>
                    {phase === "split" && (
                        <motion.div
                            key="split-phase"
                            className="absolute inset-0 flex"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9 }}
                        >
                            {/* Palace background */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "url('/images/palace-bg.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            {/* Dark overlay for readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D1A]/60 via-[#0B0D1A]/50 to-[#0B0D1A]/75" />

                            {/* Light burst on entry */}
                            <motion.div
                                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0.6 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 1.4 }}
                            >
                                <div className="w-80 h-80 rounded-full bg-white blur-3xl opacity-30" />
                            </motion.div>

                            {/* Divider */}
                            <div className="absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-10" />

                            {/* Left: AI */}
                            <motion.button
                                onClick={handleAI}
                                className="relative w-1/2 h-full flex flex-col items-center justify-center p-8 sm:p-14 text-center z-10 group cursor-pointer"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                whileHover={{ backgroundColor: "rgba(37,99,168,0.12)" }}
                            >
                                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                    <span className="inline-block mb-5 rounded-full border border-[#60a5fa]/40 bg-[#2563A8]/20 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#60a5fa] backdrop-blur-sm">
                                        🤖 VIP Personalization
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
                                        Design My<br /><span className="text-[#60a5fa]">Own Korea</span>
                                    </h2>
                                    <p className="text-white/60 text-sm sm:text-base max-w-xs mx-auto leading-relaxed mb-8">
                                        나만을 위한 AI 맞춤 플랜<br />4단계 컨시어지로 시작
                                    </p>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-[#2563A8] px-8 py-3.5 text-[14px] font-bold text-white shadow-[0_0_30px_rgba(37,99,168,0.5)] group-hover:shadow-[0_0_45px_rgba(37,99,168,0.7)] transition-shadow">
                                        Get Started →
                                    </div>
                                </motion.div>
                            </motion.button>

                            {/* Right: Explore */}
                            <motion.button
                                onClick={handleExplore}
                                className="relative w-1/2 h-full flex flex-col items-center justify-center p-8 sm:p-14 text-center z-10 group cursor-pointer"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                whileHover={{ backgroundColor: "rgba(212,147,13,0.08)" }}
                            >
                                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                                    <span className="inline-block mb-5 rounded-full border border-[#D4930D]/40 bg-[#D4930D]/15 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4930D] backdrop-blur-sm">
                                        ⛩️ Explore All Services
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
                                        Discover<br /><span className="text-[#D4930D]">K-Life</span>
                                    </h2>
                                    <p className="text-white/60 text-sm sm:text-base max-w-xs mx-auto leading-relaxed mb-8">
                                        서비스 둘러보기<br />Medical · Tour · K-Pop & more
                                    </p>
                                    <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-3.5 text-[14px] font-bold text-white group-hover:bg-white/10 transition-colors backdrop-blur-sm">
                                        Enter Site →
                                    </div>
                                </motion.div>
                            </motion.button>

                            {/* Top logo */}
                            <motion.div
                                className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <p className="text-[13px] font-black tracking-widest text-white/70 drop-shadow">
                                    CARE<span className="text-[#D4930D]">ON</span>K
                                </p>
                            </motion.div>

                            {/* Skip */}
                            <motion.button
                                onClick={onEnter}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[11px] text-white/25 hover:text-white/50 transition-colors tracking-widest uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                Skip intro ↓
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    )
}
