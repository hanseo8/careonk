"use client"

import { MedicalBeautyCard } from "./cards/medical-beauty-card"
import { HelperCard } from "./cards/helper-card"
import { HairSalonCard } from "./cards/hair-salon-card"

export function BentoGrid() {
  return (
    <section className="bg-secondary py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <p className="text-[12px] font-semibold tracking-widest uppercase text-[#D4930D]">
            Pilihan Layanan
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
            Layanan Unggulan Kami
          </h2>
        </div>

        {/* Main Bento: Left = Medical & Beauty (large), Right = Care:Mate (top) + Hair Salon (bottom) */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:auto-rows-[220px]">
          {/* Medical & Beauty - Large 2x2 */}
          <div className="lg:row-span-2">
            <MedicalBeautyCard />
          </div>

          {/* Care:Mate (Helper) - right top */}
          <div className="lg:row-span-1">
            <HelperCard />
          </div>

          {/* Hair Salon - right bottom */}
          <div className="lg:row-span-1">
            <HairSalonCard />
          </div>
        </div>
      </div>
    </section>
  )
}
