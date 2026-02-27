"use client"

import Image from "next/image"
import { ArrowRight, Shield, MessageCircle, Car, Baby, CheckCircle } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "Fluent Bahasa Indonesia",
    desc: "Companions fluent in Indonesian for your complete communication comfort.",
    badge: "Bahasa OK",
    badgeColor: "bg-[#D4930D]/10 text-[#D4930D] border-[#D4930D]/20",
  },
  {
    icon: Car,
    title: "On-K Driver",
    desc: "Airport pickup, clinic transfer, or city tours with premium vehicles and professional drivers.",
    badge: "Licensed",
    badgeColor: "bg-primary/8 text-primary border-primary/15",
  },
  {
    icon: Baby,
    title: "On-K Sitter",
    desc: "Professional and trusted childcare while you enjoy your treatments. Certified and background-checked.",
    badge: "Certified",
    badgeColor: "bg-[#D4930D]/10 text-[#D4930D] border-[#D4930D]/20",
  },
  {
    icon: Shield,
    title: "Background Verified",
    desc: "All On-K Mates pass rigorous selection and thorough background verification.",
    badge: "Verified",
    badgeColor: "bg-primary/8 text-primary border-primary/15",
  },
]

export function OnKMateSection() {
  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-[12px] font-semibold tracking-widest uppercase text-[#D4930D]">
            Trusted Companions
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
            {"Meet Your 'On-K Mate'"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            Indonesian-speaking companions ready to assist you throughout Korea
            - from airport pickup to childcare.
          </p>
        </div>

        {/* Photo + Text balanced layout */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Left - Photo */}
          <div className="relative w-full max-w-md lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/onk-mate-driver.jpg"
                alt="On-K Mate companion and driver"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Bottom overlay badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-xl border border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-foreground">Background Verified</p>
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-[11px] text-muted-foreground">All companions rigorously vetted</p>
                </div>
              </div>

              {/* Top-right badge */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#D4930D] px-3 py-1.5 shadow-lg">
                <MessageCircle className="h-3 w-3 text-white" />
                <span className="text-[10px] font-bold text-white">Bahasa Indonesia</span>
              </div>
            </div>
          </div>

          {/* Right - Feature list */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-4">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/15 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/8">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">{f.title}</h4>
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold ${f.badgeColor}`}>
                          {f.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98]">
              Find Your On-K Mate
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
