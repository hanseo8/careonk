"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Sparkles } from "lucide-react"

const banners = [
    {
        id: 1,
        bgColor: "bg-[#2A3158]",
        textColor: "text-white",
        subTextColor: "text-white/80",
        title: "Looking for a place to stay?",
        subtitle: "Get up to 80% off the best stays!",
        rightContent: (
            <div className="relative h-full w-full flex items-center justify-end pr-8 sm:pr-16">
                {/* Decorative elements */}
                <div className="absolute right-32 top-1/4 w-3 h-8 bg-blue-400 rotate-12 rounded-full opacity-60" />
                <div className="absolute right-12 bottom-1/4 w-4 h-4 rounded-full border-2 border-pink-400 opacity-60" />
                <div className="absolute right-48 bottom-1/3 w-3 h-3 bg-yellow-400 rotate-45 opacity-60" />

                {/* Cyan Tag */}
                <div className="relative z-10 flex h-32 w-24 flex-col items-center justify-center rounded-lg bg-[#00D2C8] shadow-lg -rotate-6 translate-y-2 border-t-8 border-white">
                    <div className="absolute -top-6 w-12 h-4 border-2 border-gray-300 rounded-t-xl bg-gray-100" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Get up to</span>
                    <span className="text-3xl font-black text-yellow-300 leading-none drop-shadow-sm">80%</span>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider mt-1">OFF</span>
                </div>

                {/* Orange Tag */}
                <div className="relative z-0 flex h-28 w-20 flex-col items-center justify-center rounded-lg bg-[#FF6B35] shadow-xl rotate-12 -translate-x-6 shrink-0">
                    <span className="text-2xl font-black text-white leading-none -rotate-12">80%</span>
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest -rotate-12 mt-1">Sale</span>
                </div>
            </div>
        ),
    },
    {
        id: 2,
        bgColor: "bg-gradient-to-r from-[#FCFCF9] to-[#F1F6EC]",
        textColor: "text-slate-800",
        subTextColor: "text-slate-600",
        title: "Hanbok Rental × Makeup",
        subtitle: "Haewadal Hanbok at Gyeongbokgung",
        rightContent: (
            <div className="relative h-full w-full overflow-hidden">
                {/* Soft gradient fade on the left side of the image */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF4] via-[#FAFAF4]/80 to-transparent z-10 w-1/3 left-0" />
                <div
                    className="absolute inset-y-0 right-0 w-3/4 sm:w-2/3 lg:w-1/2 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1588693822550-6aa6a2ccaa23?auto=format&fit=crop&q=80')",
                    }}
                />
            </div>
        ),
    },
    {
        id: 3,
        bgColor: "bg-[#E6F0F9]",
        textColor: "text-[#2B3A4A]",
        subTextColor: "text-[#4A5D70]",
        title: "Up to $60 discount coupon",
        subtitle: "Must-visit place in Korea",
        rightContent: (
            <div className="relative h-full w-full flex items-center justify-end pr-8 sm:pr-20">
                <div className="relative flex h-24 sm:h-28 w-56 sm:w-64 bg-[#E53935] rounded-l-md rounded-r-xl shadow-xl overflow-hidden text-white font-sans">
                    {/* Coupon perforations */}
                    <div className="absolute right-16 top-0 bottom-0 w-0 border-r-[3px] border-dashed border-white/40" />
                    <div className="absolute right-[60px] -top-3 w-6 h-6 rounded-full bg-[#E6F0F9]" />
                    <div className="absolute right-[60px] -bottom-3 w-6 h-6 rounded-full bg-[#E6F0F9]" />

                    <div className="flex-1 flex flex-col justify-center pl-6">
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest opacity-90 mb-1">COUPON</span>
                        <span className="text-3xl sm:text-5xl font-black leading-none drop-shadow-md">$60</span>
                        <span className="text-[8px] sm:text-[10px] mt-2 font-medium opacity-80 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> LOTTE DUTY FREE
                        </span>
                    </div>
                    <div className="w-16 flex items-center justify-center bg-[#D32F2F]">
                        <span className="rotate-90 text-[10px] font-bold tracking-widest whitespace-nowrap opacity-80">FREE COUPON</span>
                    </div>
                </div>
            </div>
        ),
    },
]

export function PromoCarousel() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length)
        }, 5000) // 5 seconds per slide
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-8 relative">
            <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-2xl shadow-sm border border-black/5 bg-white group cursor-pointer">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`absolute inset-0 w-full h-full flex ${banners[current].bgColor}`}
                    >
                        {/* Left Text Content */}
                        <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-center pl-6 sm:pl-10 w-3/5 sm:w-1/2">
                            <h3 className={`text-xl sm:text-2xl font-bold ${banners[current].textColor} mb-1 sm:mb-2 leading-tight drop-shadow-sm`}>
                                {banners[current].title}
                            </h3>
                            <p className={`text-xs sm:text-sm font-medium ${banners[current].subTextColor}`}>
                                {banners[current].subtitle}
                            </p>
                        </div>

                        {/* Right Graphic Content */}
                        <div className="absolute inset-y-0 right-0 w-2/3 z-10">
                            {banners[current].rightContent}
                        </div>

                        {/* Dark gradient overlay for text readability on smaller screens if needed */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent z-10 sm:hidden block pointer-events-none" />
                    </motion.div>
                </AnimatePresence>

                {/* Counter Badge */}
                <div className="absolute bottom-3 right-4 z-30 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs text-white">
                    <span className="font-medium tracking-wide">
                        {current + 1} / {banners.length}
                    </span>
                    <div className="h-3 w-px bg-white/30" />
                    <button
                        className="hover:text-white/70 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation()
                            setCurrent((prev) => (prev + 1) % banners.length)
                        }}
                    >
                        <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </section>
    )
}
