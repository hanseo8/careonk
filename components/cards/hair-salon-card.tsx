"use client"

import Image from "next/image"
import { Scissors, ArrowRight, Star, TrendingUp } from "lucide-react"

export function HairSalonCard() {
  return (
    <div className="group relative flex h-full overflow-hidden rounded-2xl shadow-md">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hair-salon-kpop.jpg"
          alt="Trendy K-pop style Korean hair salon"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F36]/95 via-[#1A1F36]/70 to-[#1A1F36]/25" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 border border-white/20">
            <Scissors className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Hair Salon</h3>
            <p className="text-[12px] text-white/50">K-Pop Idol Style Transformation</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
            <TrendingUp className="h-3 w-3 text-white/80" />
            <span className="text-[11px] font-medium text-white/85">Trending 2026</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#D4930D]/20 px-2.5 py-1">
            <Star className="h-3 w-3 fill-[#F0C85A] text-[#F0C85A]" />
            <span className="text-[11px] font-semibold text-[#F0C85A]">4.8</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-base font-bold text-white">{"KRW 45,000~"}</span>
          <span className="text-[11px] text-white/40">{"Rp 531.000~"}</span>
        </div>

        <button className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-white/25 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40 active:scale-95 self-start">
          Booking Salon
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
