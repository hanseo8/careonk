"use client"

import Link from "next/link"
import { Crown, Gift, ArrowRight, Sparkles, Power } from "lucide-react"

interface PromoBannerProps {
  variant: "membership" | "voucher"
}

export function PromoBanner({ variant }: PromoBannerProps) {
  if (variant === "membership") {
    return (
      <section className="bg-background py-4 lg:py-6">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#2563A8]/10 bg-gradient-to-r from-[#EBF2FF] via-[#F0F4FA] to-[#E8F4FD] px-6 py-5 lg:px-8 lg:py-6">
            {/* Left content */}
            <div className="flex flex-1 items-center gap-4">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563A8]/10">
                <Crown className="h-6 w-6 text-[#2563A8]" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#2563A8]">Join CareOnK VVIP Membership</p>
                <p className="mt-0.5 text-[13px] text-[#1A1F36]/55">
                  Get Exclusive Access to Top 15 Clinics & Private Helpers.
                </p>
              </div>
            </div>
            {/* Right graphic */}
            <div className="flex items-center gap-3">
              <Link href="/signup" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#2563A8] px-4 py-2 text-[12px] font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-95">
                Join Now
                <ArrowRight className="h-3 w-3" />
              </Link>
              {/* Decorative circles */}
              <div className="relative h-14 w-14 shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#2563A8]/8 animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-[#2563A8]/12" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-[#2563A8]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background py-4 lg:py-6">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#D4930D]/10 bg-gradient-to-r from-[#FFF8EB] via-[#FFFAF0] to-[#FFF5E0] px-6 py-5 lg:px-8 lg:py-6">
          {/* Left content */}
          <div className="flex flex-1 items-center gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4930D]/10">
              <Gift className="h-6 w-6 text-[#D4930D]" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#D4930D]">50% Discount Voucher for New Members</p>
              <p className="mt-0.5 text-[13px] text-[#1A1F36]/55">
                Up to KRW 50,000 off all clinic & helper services.
              </p>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#D4930D] px-4 py-2 text-[12px] font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-95">
              Claim
              <ArrowRight className="h-3 w-3" />
            </button>
            <div className="relative h-14 w-14 shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#D4930D]/8" />
              <div className="absolute inset-2 rounded-full bg-[#D4930D]/12" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Power className="h-5 w-5 text-[#D4930D]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
