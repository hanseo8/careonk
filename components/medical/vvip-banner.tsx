import { Crown, Car, Baby, Languages, ArrowRight, Shield } from "lucide-react"

export function VVIPBanner() {
  return (
    <section className="bg-background py-6 lg:py-10">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#2563A8]/12 bg-gradient-to-br from-[#EBF2FF] via-[#F0F6FF] to-[#E8F1FD]">
          {/* Background decoration */}
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#2563A8]/5" />
          <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#D4930D]/5" />

          <div className="relative px-6 py-8 lg:px-10 lg:py-10">
            <div className="flex flex-col items-center text-center">
              {/* Crown badge */}
              <div className="flex items-center gap-2 rounded-full border border-[#D4930D]/20 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm">
                <Crown className="h-4 w-4 text-[#D4930D]" />
                <span className="text-[12px] font-bold tracking-widest uppercase text-[#D4930D]">
                  VVIP Concierge
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-5 font-serif text-2xl font-bold text-[#1A1F36] text-balance sm:text-3xl">
                VVIP Concierge Membership
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#1A1F36]/60 text-pretty">
                One complete package: Private driver, babysitter, and translator for every clinic visit.{" "}
                <span className="italic text-[#1A1F36]/40">Satu paket lengkap untuk setiap kunjungan klinik Anda.</span>
              </p>

              {/* Included services */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                {[
                  { icon: Car, label: "On-K Driver", color: "#2563A8" },
                  { icon: Baby, label: "On-K Sitter", color: "#D4930D" },
                  { icon: Languages, label: "On-K Connect", color: "#2563A8" },
                  { icon: Shield, label: "Insurance", color: "#D4930D" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm"
                  >
                    <item.icon className="h-4 w-4" style={{ color: item.color }} />
                    <span className="text-[12px] font-semibold text-[#1A1F36]">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mt-8 flex items-end gap-2">
                <span className="text-[14px] text-muted-foreground line-through">KRW 2,500,000</span>
                <span className="text-3xl font-bold text-[#2563A8]">KRW 1,890,000</span>
              </div>
              <p className="mt-1 text-[13px] font-medium text-[#D4930D]">
                {"= IDR 22,280,000 (Save 24%)"}
              </p>

              {/* CTA */}
              <button className="mt-6 flex items-center gap-2 rounded-2xl bg-[#2563A8] px-8 py-3.5 text-[14px] font-bold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg active:scale-[0.98]">
                Register VVIP Now
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-[11px] text-[#1A1F36]/40">
                Valid for 1 complete medical visit (up to 5 days)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
