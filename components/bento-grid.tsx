"use client"

import { MedicalBeautyCard } from "./cards/medical-beauty-card"
import { HelperCard } from "./cards/helper-card"
import { HairSalonCard } from "./cards/hair-salon-card"

export function BentoGrid() {
  return (
    <section className="bg-secondary py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">


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
