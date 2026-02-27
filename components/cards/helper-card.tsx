"use client"

import Image from "next/image"
import { Baby, Shield, ArrowRight, Clock, MessageCircle } from "lucide-react"

export function HelperCard() {
  return (
    <div className="group relative flex h-full overflow-hidden rounded-2xl shadow-md">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/babysitter-helper.jpg"
          alt="Professional childcare helper with child"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F36]/95 via-[#1A1F36]/75 to-[#1A1F36]/30" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4930D]/20 border border-[#D4930D]/30">
            <Baby className="h-5 w-5 text-[#D4930D]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Care:Mate</h3>
            <p className="text-[12px] text-white/50">Helper / Childcare / Driver</p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-[#D4930D]/20 px-3 py-1.5 border border-[#D4930D]/25 backdrop-blur-md">
            <MessageCircle className="h-3 w-3 text-[#F0C85A]" />
            <span className="text-[11px] font-semibold text-[#F0C85A]">Bahasa Indonesia</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[#2563A8]/20 px-3 py-1.5 border border-[#2563A8]/25 backdrop-blur-md">
            <Shield className="h-3 w-3 text-[#60A5FA]" />
            <span className="text-[11px] font-semibold text-[#60A5FA]">Verified Staff</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-base font-bold text-white">KRW 35,000</span>
          <span className="text-[11px] text-white/40">/ jam</span>
          <span className="text-[11px] text-white/40">Rp 413.000 / jam</span>
        </div>

        <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D4930D] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95 self-start">
          Pesan Care:Mate
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
