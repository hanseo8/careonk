"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Power, Search, ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    src: "/images/hero-slide-1.jpg",
    alt: "Gyeongbokgung Palace during cherry blossom season",
  },
  {
    src: "/images/hero-slide-2.jpg",
    alt: "Gangnam district at golden sunset",
  },
  {
    src: "/images/hero-slide-3.jpg",
    alt: "Bukchon Hanok Village traditional streets",
  },
  {
    src: "/images/hero-slide-4.jpg",
    alt: "Han River Banpo Bridge rainbow fountain",
  },
  {
    src: "/images/hero-slide-5.jpg",
    alt: "Premium Seoul medical clinic interior",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Sliding images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/25 to-white/80" />
      </div>

      {/* Slide navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1A1F36] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1A1F36] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Content */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pb-16 pt-20 text-center lg:pb-24 lg:pt-28">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4930D]/20 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#D4930D] animate-pulse" />
          <span className="text-[12px] font-semibold tracking-wide uppercase text-[#D4930D]">
            Premium Concierge Service
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#1A1F36] sm:text-5xl lg:text-6xl text-balance">
          Turn{" "}
          <span className="text-[#D4930D]">ON</span>{" "}
          Your
          <br />Korea Life
        </h1>





        {/* Power button CTA */}
        <Link href="/get-started" className="group mt-8 flex flex-col items-center gap-3">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D4930D] bg-[#D4930D] text-white shadow-[0_8px_32px_rgba(212,147,13,0.3)] transition-all hover:shadow-[0_12px_48px_rgba(212,147,13,0.45)] hover:scale-105 active:scale-95">
            <Power className="h-8 w-8 text-white" strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-full border-2 border-[#D4930D]/0 transition-all group-hover:border-[#D4930D]/25 group-hover:scale-125" />
          </div>
          <span className="text-[13px] font-semibold tracking-wide uppercase text-[#D4930D]">
            Get Started
          </span>
        </Link>

        {/* Search bar */}
        <div className="mt-10 flex w-full max-w-lg items-center gap-2 rounded-full border border-border bg-white px-5 py-3 shadow-md">
          <Search className="h-4 w-4 text-[#6B7A99]" />
          <input
            type="text"
            placeholder={'Search "Dermatology" or "Helper"'}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-[#6B7A99]/60"
          />
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563A8] text-white transition-colors hover:bg-[#1E5090]">
            <Search className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current
                ? "w-8 bg-[#D4930D]"
                : "w-2 bg-white/60 hover:bg-white/90"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
