import Image from "next/image"
import { Heart, ShieldCheck } from "lucide-react"

export function MedicalHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero image */}
      <div className="relative h-[420px] w-full lg:h-[500px]">
        <Image
          src="/images/medical-hero-hospital.png"
          alt="Premium Korean hospital interior with professional medical staff"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
      </div>

      {/* Centered copy overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        {/* Top badge */}
        <div className="mb-5 flex items-center gap-2 rounded-full border border-[#2563A8]/15 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
          <Heart className="h-3.5 w-3.5 text-[#2563A8]" />
          <span className="text-[12px] font-semibold tracking-wide text-[#2563A8] uppercase">
            On-K Medical Concierge
          </span>
        </div>

        {/* Main title - English first */}
        <h1 className="max-w-2xl font-serif text-3xl font-bold leading-tight tracking-tight text-[#1A1F36] text-balance sm:text-4xl lg:text-5xl">
          We Are More Than Just a Hospital
        </h1>

        {/* Indonesian subtitle */}
        <p className="mt-2 text-[14px] font-medium text-[#2563A8]/60 italic">
          Kami Lebih dari Sekedar Rumah Sakit
        </p>

        {/* Sub copy */}
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#1A1F36]/65 text-pretty lg:text-base">
          Most hospitals don{"'"}t provide drivers, babysitters, or translators.{" "}
          <span className="font-semibold text-[#2563A8]">CareOnK provides your Personal Mate</span>{" "}
          for the entire medical journey.
        </p>

        {/* Trust stats */}
        <div className="mt-7 flex items-center gap-6 lg:gap-10">
          {[
            { value: "50+", label: "Partner Clinics" },
            { value: "24/7", label: "Concierge" },
            { value: "100%", label: "Bahasa Support" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-bold text-[#2563A8] lg:text-2xl">{stat.value}</span>
              <span className="text-[11px] font-medium tracking-wide text-[#1A1F36]/50">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <ShieldCheck className="h-3.5 w-3.5 text-[#25D366]" />
          <span className="text-[11px] font-medium text-[#1A1F36]/55">All partners verified & officially registered</span>
        </div>
      </div>
    </section>
  )
}
