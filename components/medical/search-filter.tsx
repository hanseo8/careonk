"use client"

import { useState } from "react"
import { Search, MapPin, Building2, Users, SlidersHorizontal } from "lucide-react"

export function SearchFilter() {
  const [region, setRegion] = useState("")
  const [clinicType, setClinicType] = useState("")
  const [mateType, setMateType] = useState("")

  return (
    <section className="bg-secondary/50 py-6 lg:py-8">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center">
          {/* Search bar */}
          <div className="flex w-full max-w-3xl flex-col items-stretch gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center lg:gap-3">
            {/* Region */}
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary/70 px-3 py-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-[#2563A8]" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none"
                aria-label="Select region"
              >
                <option value="">All Regions</option>
                <option value="gangnam">Gangnam</option>
                <option value="apgujeong">Apgujeong</option>
                <option value="sinsa">Sinsa</option>
                <option value="myeongdong">Myeongdong</option>
                <option value="hongdae">Hongdae</option>
              </select>
            </div>

            {/* Divider (desktop) */}
            <div className="hidden h-8 w-px bg-border lg:block" />

            {/* Clinic Type */}
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary/70 px-3 py-2.5">
              <Building2 className="h-4 w-4 shrink-0 text-[#2563A8]" />
              <select
                value={clinicType}
                onChange={(e) => setClinicType(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none"
                aria-label="Select clinic type"
              >
                <option value="">Clinic Type</option>
                <option value="derma">Dermatology</option>
                <option value="plastic">Plastic Surgery</option>
                <option value="checkup">Health Checkup</option>
                <option value="oriental">K-Oriental</option>
                <option value="dental">Dental</option>
              </select>
            </div>

            {/* Divider (desktop) */}
            <div className="hidden h-8 w-px bg-border lg:block" />

            {/* Special Mate Required */}
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary/70 px-3 py-2.5">
              <Users className="h-4 w-4 shrink-0 text-[#D4930D]" />
              <select
                value={mateType}
                onChange={(e) => setMateType(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none"
                aria-label="Select special mate"
              >
                <option value="">Special Mate Required</option>
                <option value="translator">Translator (On-K Connect)</option>
                <option value="sitter">Babysitter (On-K Sitter)</option>
                <option value="driver">Driver (On-K Driver)</option>
                <option value="all">All Services</option>
              </select>
            </div>

            {/* Search button */}
            <button
              className="flex h-10 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#2563A8] text-white shadow-sm transition-all hover:brightness-110 active:scale-95 sm:w-10 lg:w-24"
              aria-label="Search clinics"
            >
              <Search className="h-4 w-4" />
              <span className="text-[12px] font-bold sm:hidden lg:inline">Search</span>
            </button>
          </div>

          {/* Filter badge */}
          <button
            className="hidden items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-[12px] font-semibold text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-foreground lg:flex"
            aria-label="More filters"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>
      </div>
    </section>
  )
}
