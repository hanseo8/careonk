"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface ScrollItem {
  title: string
  subtitle: string
  image: string
  priceKrw: string
  priceIdr: string
  rating: number
  tag: string
}

const scrollItems: ScrollItem[] = [
  {
    title: "Korean BBQ Premium",
    subtitle: "Gangnam-gu, Seoul",
    image: "/images/korean-bbq.jpg",
    priceKrw: "KRW 55,000",
    priceIdr: "Rp 649.000",
    rating: 4.9,
    tag: "Dining",
  },
  {
    title: "KTX Express Pass",
    subtitle: "Seoul - Busan",
    image: "/images/ktx-transport.jpg",
    priceKrw: "KRW 59,800",
    priceIdr: "Rp 705.000",
    rating: 4.7,
    tag: "Care:Move",
  },
  {
    title: "Nami Island Tour",
    subtitle: "Gapyeong, Gyeonggi",
    image: "/images/nami-island.jpg",
    priceKrw: "KRW 45,000",
    priceIdr: "Rp 531.000",
    rating: 4.8,
    tag: "Activity",
  },
  {
    title: "Unlimited Wifi Egg",
    subtitle: "Incheon Airport Pickup",
    image: "/images/wifi-sim.jpg",
    priceKrw: "KRW 5,500",
    priceIdr: "Rp 65.000",
    rating: 4.6,
    tag: "Care:Link",
  },
  {
    title: "Bukchon Hanok Walk",
    subtitle: "Jongno-gu, Seoul",
    image: "/images/hanok-village.jpg",
    priceKrw: "KRW 25,000",
    priceIdr: "Rp 295.000",
    rating: 4.9,
    tag: "Activity",
  },
  {
    title: "Myeongdong Food Tour",
    subtitle: "Jung-gu, Seoul",
    image: "/images/myeongdong-shopping.jpg",
    priceKrw: "KRW 39,000",
    priceIdr: "Rp 460.000",
    rating: 4.8,
    tag: "Dining",
  },
]

export function HorizontalScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = direction === "left" ? -300 : 300
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="text-[12px] font-semibold tracking-widest uppercase text-muted-foreground">
            Jelajahi Lainnya
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
            Dining, Transport & Lainnya
          </h2>
        </div>

        {/* Scroll arrows */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:text-foreground hover:border-primary/20 hover:shadow-sm active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:text-foreground hover:border-primary/20 hover:shadow-sm active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
        >
          {scrollItems.map((item) => (
            <div
              key={item.title}
              className="group relative shrink-0 w-56 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/15 hover:shadow-lg"
            >
              {/* Portrait image */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="224px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/70 via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 shadow-md">
                  <span className="text-[10px] font-bold text-foreground">{item.tag}</span>
                </div>

                {/* Rating */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 shadow-md">
                  <Star className="h-3 w-3 fill-[#D4930D] text-[#D4930D]" />
                  <span className="text-[10px] font-bold text-foreground">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-sm font-bold text-foreground line-clamp-1">{item.title}</h4>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{item.subtitle}</p>

                {/* Dual price badges */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-lg bg-primary px-2.5 py-1 text-[10px] font-bold text-white">
                    {item.priceKrw}
                  </span>
                  <span className="inline-flex rounded-lg bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    {item.priceIdr}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
