"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

// Particle effect component
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

const particles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    id: i,
}))

export function GateIntro({ onEnter }: { onEnter: () => void }) {
    const [phase, setPhase] = useState<"gate" | "opening" | "split">("gate")
    const router = useRouter()

    // Auto-trigger gate open after 2.5s
    useEffect(() => {
        const timer = setTimeout(() => handleOpen(), 2500)
        return () => clearTimeout(timer)
    }, [])

    const handleOpen = () => {
        if (phase !== "gate") return
        setPhase("opening")
        setTimeout(() => setPhase("split"), 1600)
    }

    const handleAI = () => {
        onEnter()
        router.push("/get-started")
    }

    const handleExplore = () => {
        onEnter()
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] bg-[#0B0D1A] overflow-hidden"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* ── Phase: gate & opening ── */}
                <AnimatePresence>
                    {(phase === "gate" || phase === "opening") && (
                        <>
                            {/* Ambient glow behind the gate */}
                            <div className="absolute inset-0 flex">
                                <div className="w-1/2 h-full bg-gradient-to-r from-[#0B0D1A] via-[#12172E] to-[#1a1f3c]" />
                                <div className="w-1/2 h-full bg-gradient-to-l from-[#0B0D1A] via-[#12172E] to-[#1a1f3c]" />
                            </div>

                            {/* Floating particles */}
                            {particles.map((p) => (
                                <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
                            ))}

                            {/* Mist at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1a2040]/60 to-transparent pointer-events-none" />

                            {/* Left door */}
                            <motion.div
                                className="absolute top-0 left-0 w-1/2 h-full origin-left overflow-hidden"
                                initial={{ x: 0 }}
                                animate={phase === "opening" ? { x: "-100%" } : { x: 0 }}
                                transition={{ duration: 1.5, ease: [0.45, 0.05, 0.55, 0.95] }}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: "url('/images/gate-left.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "right center",
                                    }}
                                />
                                {/* Inner door shadow/sheen */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D1A]/10 to-black/40" />
                                {/* Vertical line at center seam */}
                                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4930D]/60 to-transparent" />
                                {/* Door ring detail */}
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-20 rounded-l-full border-2 border-[#D4930D]/50 bg-[#D4930D]/10 backdrop-blur-sm" />
                            </motion.div>

                            {/* Right door */}
                            <motion.div
                                className="absolute top-0 right-0 w-1/2 h-full origin-right overflow-hidden"
                                initial={{ x: 0 }}
                                animate={phase === "opening" ? { x: "100%" } : { x: 0 }}
                                transition={{ duration: 1.5, ease: [0.45, 0.05, 0.55, 0.95] }}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: "url('/images/gate-right.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "left center",
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-[#0B0D1A]/10 to-black/40" />
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4930D]/60 to-transparent" />
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-20 rounded-r-full border-2 border-[#D4930D]/50 bg-[#D4930D]/10 backdrop-blur-sm" />
                            </motion.div>

                            {/* Center logo + TURN ON button */}
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                                animate={phase === "opening" ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Brand */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="mb-8 text-center"
                                >
                                    <p className="text-[11px] font-semibold tracking-[0.4em] uppercase text-[#D4930D]/70 mb-2">
                                        Premium Korea Concierge
                                    </p>
                                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                                        CARE<span className="text-[#D4930D]">ON</span>K
                                    </h1>
                                </motion.div>

                                {/* TURN ON button */}
                                <motion.button
                                    onClick={handleOpen}
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="pointer-events-auto relative flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full border border-[#2563A8]/40 bg-[#2563A8] shadow-[0_0_60px_rgba(37,99,168,0.5)] text-white font-black text-lg tracking-widest cursor-pointer"
                                >
                                    {/* Pulse ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-[#2563A8]/50"
                                        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-[#D4930D]/30"
                                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                                    />
                                    <span className="text-sm font-black tracking-[0.15em]">TURN</span>
                                    <span className="text-2xl font-black text-[#D4930D] leading-none">ON</span>
                                </motion.button>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.6 }}
                                    className="mt-5 text-[11px] text-white/30 tracking-widest uppercase"
                                >
                                    Click to open · Auto-opens in 2.5s
                                </motion.p>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* ── Phase: split screen after gate opens ── */}
                <AnimatePresence>
                    {phase === "split" && (
                        <motion.div
                            className="absolute inset-0 flex"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Light burst from center */}
                            <motion.div
                                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 1.2 }}
                            >
                                <div className="w-64 h-64 rounded-full bg-white blur-3xl opacity-40" />
                            </motion.div>

                            {/* Left: AI Personalized */}
                            <motion.button
                                onClick={handleAI}
                                className="relative w-1/2 h-full group flex flex-col items-center justify-center p-8 sm:p-14 text-center overflow-hidden cursor-pointer"
                                initial={{ x: -60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                whileHover="hover"
                            >
                                {/* Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1e2d5a] to-[#0F172A]" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-[#2563A8]/30 to-transparent"
                                    variants={{ hover: { opacity: 1.5 } }}
                                />
                                {/* Korean life style grid overlay */}
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                                    style={{ backgroundImage: "url('/images/medical-hero-hospital.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 to-[#0F172A]/90" />
                                {/* Animated data particles */}
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-0.5 h-0.5 rounded-full bg-[#2563A8]"
                                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                                        animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
                                        transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity }}
                                    />
                                ))}
                                {/* Divider line */}
                                <div className="absolute right-0 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <span className="inline-block mb-4 rounded-full border border-[#2563A8]/40 bg-[#2563A8]/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#60a5fa]">
                                            🤖 For VIP Personalization
                                        </span>
                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                                            Design My<br />
                                            <span className="text-[#2563A8]">Own Korea</span>
                                        </h2>
                                        <p className="text-white/50 text-sm sm:text-base max-w-xs mx-auto leading-relaxed mb-8">
                                            나만을 위한 AI 맞춤 플랜<br />4단계 컨시어지로 시작
                                        </p>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="inline-flex items-center gap-2 rounded-full bg-[#2563A8] px-8 py-3.5 text-[14px] font-bold text-white shadow-[0_0_30px_rgba(37,99,168,0.4)]"
                                        >
                                            Get Started →
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.button>

                            {/* Right: Explore K-Life */}
                            <motion.button
                                onClick={handleExplore}
                                className="relative w-1/2 h-full group flex flex-col items-center justify-center p-8 sm:p-14 text-center overflow-hidden cursor-pointer"
                                initial={{ x: 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                whileHover="hover"
                            >
                                <div className="absolute inset-0 bg-gradient-to-bl from-[#0D0F13] via-[#1a1f2e] to-[#0D0F13]" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-bl from-[#D4930D]/15 to-transparent"
                                    variants={{ hover: { opacity: 1.5 } }}
                                />
                                {/* Korean lifestyle collage */}
                                <div className="absolute inset-0"
                                    style={{ backgroundImage: "url('/images/gate-left.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F13]/80 to-[#0D0F13]/95" />

                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <span className="inline-block mb-4 rounded-full border border-[#D4930D]/40 bg-[#D4930D]/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4930D]">
                                            ⛩️ Explore All Services
                                        </span>
                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                                            Discover<br />
                                            <span className="text-[#D4930D]">K-Life</span>
                                        </h2>
                                        <p className="text-white/50 text-sm sm:text-base max-w-xs mx-auto leading-relaxed mb-8">
                                            서비스 둘러보기<br />Medical · Tour · K-Pop & more
                                        </p>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-3.5 text-[14px] font-bold text-white hover:bg-white/10 transition-colors"
                                        >
                                            Enter Site →
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.button>

                            {/* CareOnK top logo */}
                            <motion.div
                                className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <p className="text-[13px] font-black tracking-widest text-white/60">
                                    CARE<span className="text-[#D4930D]">ON</span>K
                                </p>
                            </motion.div>

                            {/* Skip button */}
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
