"use client"

import { useState, useEffect } from "react"
import { Shield, CheckCircle, Award, Star, ChevronLeft, ChevronRight } from "lucide-react"

const partners = [
  { name: "Gangnam Clinic", tag: "Medical" },
  { name: "Seoul Derma", tag: "Beauty" },
  { name: "K-Beauty Lab", tag: "Skincare" },
  { name: "Apgujeong Salon", tag: "Hair" },
  { name: "JK Plastic", tag: "Medical" },
  { name: "Shinsegae", tag: "Dining" },
]

const stats = [
  { value: "100%", label: "Verified Partners" },
  { value: "24/7", label: "Customer Support" },
  { value: "0%", label: "Hidden Fees" },
]

const testimonials = [
  {
    quote: "CareOnK made my medical trip in Korea feel incredibly safe and comfortable. Every clinic and companion was truly professional.",
    name: "Sari Wulandari",
    location: "Jakarta, Indonesia",
    service: "On-K Medical",
  },
  {
    quote: "Saya sangat terbantu dengan layanan Day Tour! Guide-nya ramah, speaking English dengan baik, dan itinerary-nya sangat well-organized.",
    name: "Rizky Pratama",
    location: "Surabaya, Indonesia",
    service: "On-K Day Tour",
  },
  {
    quote: "The photo studio booking was seamless. CareOnK found me an amazing Seongsu studio and even helped with translation during the session!",
    name: "Amanda Lestari",
    location: "Bandung, Indonesia",
    service: "On-K Photo",
  },
  {
    quote: "Exchange rate di Myeongdong yang direkomendasiin CareOnK beneran terbaik. Hemat banyak dibanding tukar di bandara!",
    name: "Budi Santoso",
    location: "Medan, Indonesia",
    service: "On-K Exchange",
  },
  {
    quote: "The pharmacy assistance was a lifesaver. They helped me find the right Korean skincare prescription and even delivered to my hotel.",
    name: "Dewi Rahayu",
    location: "Bali, Indonesia",
    service: "On-K Pharmacy",
  },
  {
    quote: "Dining recommendations were spot on! CareOnK booked us a Korean BBQ spot in Gangnam — best meal of our entire trip.",
    name: "Fajar Kurniawan",
    location: "Yogyakarta, Indonesia",
    service: "On-K Dining",
  },
]

export function TrustSection() {
  const [current, setCurrent] = useState(0)

  // 4초 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Centered header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <p className="text-[12px] font-semibold tracking-widest uppercase text-[#D4930D]">
            Trust & Safety
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
            All Partners Verified
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
            Every clinic, salon, and service on CareOnK has passed a rigorous
            verification process to guarantee quality and safety for your journey.
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
            Official Verified Partners
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

        {/* Testimonial carousel */}
        <div className="mx-auto mt-14 max-w-2xl">
          <p className="mb-6 text-center text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            What Our Customers Say
          </p>

          <div className="relative rounded-2xl border border-primary/10 bg-card p-8 shadow-sm text-center">
            {/* Stars */}
            <div className="mx-auto mb-4 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#D4930D] text-[#D4930D]" />
              ))}
            </div>

            {/* Service badge */}
            <span className="mb-4 inline-block rounded-full bg-primary/8 px-3 py-1 text-[11px] font-bold text-primary">
              {t.service}
            </span>

            {/* Quote — animate on change */}
            <blockquote
              key={current}
              className="mt-2 font-serif text-lg font-normal text-foreground leading-relaxed italic animate-fade-in"
            >
              {`"${t.quote}"`}
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-foreground">{t.name}</p>
            <p className="text-[12px] text-muted-foreground">{t.location}</p>

            {/* Prev / Next */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Dots */}
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-primary" : "w-1.5 bg-border"
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next review"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
