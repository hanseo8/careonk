"use client"

import { Shield, CheckCircle, Award, Star } from "lucide-react"

const partners = [
  { name: "Gangnam Clinic", tag: "Medical" },
  { name: "Seoul Derma", tag: "Beauty" },
  { name: "K-Beauty Lab", tag: "Skincare" },
  { name: "Apgujeong Salon", tag: "Hair" },
  { name: "JK Plastic", tag: "Medical" },
  { name: "Shinsegae", tag: "Dining" },
]

const stats = [
  { value: "100%", label: "Mitra Terverifikasi" },
  { value: "24/7", label: "Customer Support" },
  { value: "0%", label: "Hidden Fees" },
]

export function TrustSection() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Centered header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <p className="text-[12px] font-semibold tracking-widest uppercase text-[#D4930D]">
            Kepercayaan & Keamanan
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
            Semua Mitra Terverifikasi
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
            Setiap klinik, salon, dan layanan di CareOnK telah melalui proses verifikasi ketat
            untuk menjamin kualitas dan keamanan perjalanan Anda.
          </p>
        </div>

        {/* Stats row */}
        <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-[12px] font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Partner clinic logos */}
        <div className="mx-auto mt-14 max-w-3xl">
          <p className="mb-6 text-center text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            Mitra Partner Resmi
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-5 py-3 shadow-sm transition-all hover:border-primary/15 hover:shadow-md"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground">{partner.name}</p>
                  <p className="text-[10px] text-muted-foreground">{partner.tag}</p>
                </div>
                <CheckCircle className="ml-1 h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Trust statement */}
        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-primary/10 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#D4930D] text-[#D4930D]" />
            ))}
          </div>
          <blockquote className="font-serif text-lg font-normal text-foreground leading-relaxed italic">
            {'"CareOnK membuat perjalanan medis saya di Korea terasa sangat aman dan nyaman. Semua klinik dan pendamping benar-benar profesional."'}
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-foreground">Sari Wulandari</p>
          <p className="text-[12px] text-muted-foreground">Jakarta, Indonesia</p>
        </div>
      </div>
    </section>
  )
}
