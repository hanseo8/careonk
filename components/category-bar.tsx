"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Stethoscope,
  Scissors,
  Mountain,
  UtensilsCrossed,
  Car,
  Baby,
  Wifi,
  Camera,
  Map,
  Pill,
  ArrowLeftRight,
} from "lucide-react"

const categories = [
  { icon: Stethoscope, label: "Medical", sub: "On-K Medical", id: "medical", href: "/medical", badge: "HOT", badgeColor: "bg-red-500" },
  { icon: Scissors, label: "Hair", sub: "K-Style", id: "hair", href: null, badge: null, badgeColor: "" },
  { icon: Mountain, label: "Activity", sub: "Tour", id: "activity", href: "/activity", badge: null, badgeColor: "" },
  { icon: UtensilsCrossed, label: "Dining", sub: "Food & Cafe", id: "dining", href: "/dining", badge: "NEW", badgeColor: "bg-[#D4930D]" },
  { icon: Car, label: "Transport", sub: "On-K Driver", id: "transport", href: null, badge: null, badgeColor: "" },
  { icon: Baby, label: "Helper", sub: "On-K Sitter", id: "helper", href: "/helper", badge: "BEST", badgeColor: "bg-[#2563A8]" },
  { icon: Wifi, label: "Wifi & Sim", sub: "On-K Connect", id: "wifi", href: null, badge: null, badgeColor: "" },
  { icon: Camera, label: "Photo", sub: "K-Studio", id: "photo", href: "/photo", badge: null, badgeColor: "" },
  { icon: Map, label: "Day Tour", sub: "Explore Korea", id: "daytour", href: "/daytour", badge: "NEW", badgeColor: "bg-[#2563A8]" },
  { icon: Pill, label: "Pharmacy", sub: "K-Health", id: "pharmacy", href: "/pharmacy", badge: null, badgeColor: "" },
  { icon: ArrowLeftRight, label: "Exchange", sub: "Best Rate", id: "exchange", href: "/exchange", badge: null, badgeColor: "" },
]

export function CategoryGrid() {
  const [active, setActive] = useState("medical")

  const renderItem = (cat: typeof categories[number]) => {
    const Icon = cat.icon
    const isActive = active === cat.id

    const inner = (
      <>
        <div className="relative">
          {cat.badge && (
            <span className={`absolute -right-2 -top-2 z-10 rounded-full ${cat.badgeColor} px-1.5 py-0.5 text-[8px] font-bold text-white shadow-sm`}>
              {cat.badge}
            </span>
          )}
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all shadow-sm ${isActive
                ? "border-primary/30 bg-primary shadow-[0_4px_16px_rgba(37,99,168,0.15)] scale-105"
                : "border-border bg-card group-hover:border-primary/15 group-hover:shadow-md"
              }`}
          >
            <Icon className={`h-6 w-6 transition-colors ${isActive ? "text-white" : "text-primary"}`} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${isActive ? "text-primary" : "text-foreground"}`}>
            {cat.label}
          </span>
          <span className="text-[9px] text-muted-foreground whitespace-nowrap">{cat.sub}</span>
        </div>
      </>
    )

    const sharedClass = "group flex w-[72px] flex-col items-center gap-2.5 transition-all active:scale-95"

    if (cat.href) {
      return (
        <Link
          key={cat.id}
          href={cat.href}
          onClick={() => setActive(cat.id)}
          className={sharedClass}
          aria-label={cat.label}
        >
          {inner}
        </Link>
      )
    }

    return (
      <button
        key={cat.id}
        onClick={() => setActive(cat.id)}
        className={sharedClass}
        aria-label={cat.label}
      >
        {inner}
      </button>
    )
  }

  const row1 = categories.slice(0, 7)
  const row2 = categories.slice(7)

  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-3xl px-5">
        <p className="mb-8 text-center text-[12px] font-semibold tracking-widest uppercase text-muted-foreground">
          Our Services
        </p>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {row1.map(renderItem)}
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8">
            {row2.map(renderItem)}
          </div>
        </div>
      </div>
    </section>
  )
}
