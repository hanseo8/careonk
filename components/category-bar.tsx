"use client"

import { useState } from "react"
import {
  Stethoscope,
  Scissors,
  Mountain,
  UtensilsCrossed,
  Car,
  Baby,
  Wifi,
} from "lucide-react"

const categories = [
  { icon: Stethoscope, label: "Medical", sub: "On-K Medical", id: "medical", badge: "HOT", badgeColor: "bg-red-500" },
  { icon: Scissors, label: "Hair", sub: "K-Style", id: "hair", badge: null, badgeColor: "" },
  { icon: Mountain, label: "Activity", sub: "Tour", id: "activity", badge: null, badgeColor: "" },
  { icon: UtensilsCrossed, label: "Dining", sub: "Food & Cafe", id: "dining", badge: "NEW", badgeColor: "bg-[#D4930D]" },
  { icon: Car, label: "Transport", sub: "On-K Driver", id: "transport", badge: null, badgeColor: "" },
  { icon: Baby, label: "Helper", sub: "On-K Sitter", id: "helper", badge: "BEST", badgeColor: "bg-[#2563A8]" },
  { icon: Wifi, label: "Wifi & Sim", sub: "On-K Connect", id: "wifi", badge: null, badgeColor: "" },
]

export function CategoryGrid() {
  const [active, setActive] = useState("medical")

  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-3xl px-5">
        <p className="mb-8 text-center text-[12px] font-semibold tracking-widest uppercase text-muted-foreground">
          Our Services
        </p>

        {/* Centered grid - 7 items */}
        <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="group flex w-[72px] flex-col items-center gap-2.5 transition-all active:scale-95"
                aria-label={cat.label}
              >
                {/* Icon container with 3D depth */}
                <div className="relative">
                  {/* Badge */}
                  {cat.badge && (
                    <span className={`absolute -right-2 -top-2 z-10 rounded-full ${cat.badgeColor} px-1.5 py-0.5 text-[8px] font-bold text-white shadow-sm`}>
                      {cat.badge}
                    </span>
                  )}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all shadow-sm ${
                      isActive
                        ? "border-primary/30 bg-primary shadow-[0_4px_16px_rgba(37,99,168,0.15)] scale-105"
                        : "border-border bg-card group-hover:border-primary/15 group-hover:shadow-md"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors ${
                        isActive ? "text-white" : "text-primary"
                      }`}
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {cat.label}
                  </span>
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">
                    {cat.sub}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
