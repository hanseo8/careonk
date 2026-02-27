"use client"

import Image from "next/image"
import { Star, Shield, ArrowRight, Sparkles } from "lucide-react"

const treatments = [
  { name: "Aqua Peel Hydrafacial", price: "KRW 89,000", priceIdr: "Rp 1.050.000", rating: 4.9 },
  { name: "Premium Laser Toning", price: "KRW 150,000", priceIdr: "Rp 1.770.000", rating: 4.8 },
  { name: "V-Shape Lifting", price: "KRW 350,000", priceIdr: "Rp 4.130.000", rating: 4.9 },
]

export function MedicalBeautyCard() {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-md">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/clinic-luxury.jpg"
          alt="Luxury Korean dermatology clinic interior"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/95 via-[#1A1F36]/60 to-[#1A1F36]/20" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-between p-6">
        {/* Top badges */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-[#2563A8] px-3 py-1.5 shadow-sm">
            <Sparkles className="h-3 w-3 text-white" />
            <span className="text-[11px] font-semibold text-white">Care:Glow</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 backdrop-blur-md">
            <Shield className="h-3 w-3 text-white" />
            <span className="text-[10px] font-semibold text-white">Verified</span>
          </div>
        </div>

        {/* Bottom content */}
        <div>
          <h3 className="text-xl font-bold text-white lg:text-2xl text-balance">
            Klinik Kecantikan Premium
          </h3>
          <p className="mt-1 text-sm text-white/65">
            Top-rated dermatology clinics in Gangnam
          </p>

          {/* Treatment list */}
          <div className="mt-4 flex flex-col gap-2">
            {treatments.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur-md transition-all hover:bg-white/15"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-white/80 font-medium">{t.price}</span>
                    <span className="text-[10px] text-white/50">{t.priceIdr}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[#D4930D]/25 px-2 py-0.5">
                  <Star className="h-3 w-3 fill-[#F0C85A] text-[#F0C85A]" />
                  <span className="text-xs font-semibold text-[#F0C85A]">{t.rating}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563A8] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98]">
            Lihat Semua Klinik
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
