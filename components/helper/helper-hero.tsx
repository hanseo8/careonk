import Image from "next/image"
import { Heart, ShieldCheck, Users } from "lucide-react"

export function HelperHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[380px] w-full lg:h-[460px]">
        <Image
          src="/images/onk-mate-companion.jpg"
          alt="CareOnK On-K Helper team - personal drivers, babysitters, and translators in Seoul"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-white/20" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <div className="mb-5 flex items-center gap-2 rounded-full border border-[#D4930D]/15 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-md">
          <Users className="h-3.5 w-3.5 text-[#D4930D]" />
          <span className="text-[12px] font-semibold tracking-wide text-[#D4930D] uppercase">
            On-K Helper Services
          </span>
        </div>

        <h1 className="max-w-2xl font-serif text-3xl font-bold leading-tight tracking-tight text-[#1A1F36] text-balance sm:text-4xl lg:text-5xl">
          Your Personal Companion in Korea
        </h1>

        <p className="mt-2 text-[14px] font-medium text-[#D4930D]/70 italic">
          Pendamping Pribadi Anda di Korea
        </p>

        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#1A1F36]/60 text-pretty lg:text-base">
          Most clinics don{"'"}t provide local coordinators. CareOnK offers{" "}
          <span className="font-semibold text-[#D4930D]">trusted, verified helpers</span>{" "}
          who speak your language -- drivers, babysitters, and translators for your entire journey.
        </p>

        <div className="mt-7 flex items-center gap-6 lg:gap-10">
          {[
            { value: "200+", label: "Verified Helpers" },
            { value: "24/7", label: "Available" },
            { value: "100%", label: "Background Checked" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-bold text-[#D4930D] lg:text-2xl">{stat.value}</span>
              <span className="text-[11px] font-medium tracking-wide text-[#1A1F36]/50">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <ShieldCheck className="h-3.5 w-3.5 text-[#25D366]" />
          <span className="text-[11px] font-medium text-[#1A1F36]/55">All helpers verified with criminal background check</span>
        </div>
      </div>
    </section>
  )
}
