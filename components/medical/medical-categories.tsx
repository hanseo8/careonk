"use client"

import { useState } from "react"
import { Stethoscope, Leaf, Sparkles, Scissors } from "lucide-react"

const categories = [
  { id: "checkup", label: "On-K Health", sublabel: "Health Checkup", icon: Stethoscope },
  { id: "oriental", label: "On-K Wellness", sublabel: "K-Oriental Medicine", icon: Leaf },
  { id: "skincare", label: "On-K Skin", sublabel: "Skin Care", icon: Sparkles },
  { id: "surgery", label: "On-K Aesthetic", sublabel: "Plastic Surgery", icon: Scissors },
]

export function MedicalCategories() {
  const [active, setActive] = useState("checkup")

  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {/* Section title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Medical Service Categories
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Choose the treatment category you need
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-sm">
            {categories.map((cat) => {
              const isActive = active === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#2563A8] text-white shadow-md"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active label with sublabel */}
        <div className="mt-3 flex flex-col items-center gap-0.5">
          <p className="text-[14px] font-bold text-[#2563A8]">
            {categories.find((c) => c.id === active)?.label}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {categories.find((c) => c.id === active)?.sublabel}
          </p>
        </div>
      </div>
    </section>
  )
}
