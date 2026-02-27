"use client"

import { useState } from "react"
import { Car, Baby, Languages } from "lucide-react"

const tabs = [
  { id: "driver", label: "On-K Driver", sublabel: "Private Driver", icon: Car },
  { id: "sitter", label: "On-K Sitter", sublabel: "Indonesian Babysitter", icon: Baby },
  { id: "connect", label: "On-K Connect", sublabel: "Personal Translator", icon: Languages },
]

export function HelperTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (id: string) => void }) {
  return (
    <section className="bg-background py-8 lg:py-10">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Choose Your Helper Service
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Select the companion service you need for your Korea trip
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-sm">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#D4930D] text-white shadow-md"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-3 flex flex-col items-center gap-0.5">
          <p className="text-[14px] font-bold text-[#D4930D]">
            {tabs.find((t) => t.id === activeTab)?.label}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {tabs.find((t) => t.id === activeTab)?.sublabel}
          </p>
        </div>
      </div>
    </section>
  )
}
