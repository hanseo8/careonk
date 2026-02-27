import Image from "next/image"
import { Baby, Heart, Shield, Clock, Star, ArrowRight, CheckCircle2, BadgeCheck, Languages } from "lucide-react"

const plans = [
  {
    name: "Half Day Care",
    description: "4 hours of childcare during your clinic visit",
    priceKRW: "180,000",
    priceIDR: "2,120,000",
    features: ["4 hours care", "At hotel or clinic", "Indonesian speaking", "Snacks provided"],
    popular: false,
  },
  {
    name: "Full Day Care",
    description: "8-hour professional childcare for your medical day",
    priceKRW: "320,000",
    priceIDR: "3,770,000",
    features: ["8 hours care", "Meals included", "Activities & play", "Photo updates to parents"],
    popular: true,
  },
  {
    name: "Multi-Day Package",
    description: "3-day care package for extended medical trips",
    priceKRW: "850,000",
    priceIDR: "10,020,000",
    features: ["3 full days (8h/day)", "Same sitter guaranteed", "All meals included", "Emergency hotline"],
    popular: false,
  },
]

export function SitterSection() {
  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {/* Info split layout - reversed */}
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Indonesian Babysitter
            </h3>
            <p className="mt-1 text-[13px] font-medium text-[#D4930D] italic">
              Pengasuh Anak Berbahasa Indonesia
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              Trusted, CPR-trained Indonesian-speaking babysitters who care for your children while you
              focus on your medical treatments. Every sitter is background-checked and verified.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Languages, text: "Bahasa Indonesia fluent" },
                { icon: Shield, text: "Background checked" },
                { icon: Heart, text: "CPR trained" },
                { icon: Star, text: "4.8 avg rating" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 rounded-xl bg-[#FFF8EB] px-3 py-2.5">
                  <item.icon className="h-4 w-4 shrink-0 text-[#D4930D]" />
                  <span className="text-[12px] font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-[#D4930D]/20 bg-[#FFF8EB] px-3 py-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-[#D4930D]" />
                <span className="text-[11px] font-bold text-[#D4930D]">Bahasa Indonesia</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#25D366]/20 bg-[#EDFFF3] px-3 py-1.5">
                <Shield className="h-3.5 w-3.5 text-[#25D366]" />
                <span className="text-[11px] font-bold text-[#25D366]">Verified Staff</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/concierge-babysitter.jpg"
              alt="On-K Sitter - Indonesian-speaking babysitter caring for a child"
              width={600}
              height={400}
              className="h-[320px] w-full rounded-2xl object-cover"
            />
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#D4930D] px-3 py-1.5 shadow-sm">
              <Baby className="h-3.5 w-3.5 text-white" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wide">On-K Sitter</span>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 flex flex-col items-center">
          <h4 className="text-lg font-bold text-foreground">Babysitter Packages</h4>
          <p className="mt-1 text-[13px] text-muted-foreground">Professional childcare while you focus on treatment</p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-5 transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-[#D4930D]/30 bg-[#FFF8EB]/40 shadow-md"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4930D] px-4 py-1">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide">Most Popular</span>
                </div>
              )}
              <h5 className="text-[15px] font-bold text-foreground">{plan.name}</h5>
              <p className="mt-1 text-[12px] text-muted-foreground">{plan.description}</p>

              <div className="mt-4">
                <span className="text-2xl font-bold text-foreground">KRW {plan.priceKRW}</span>
                <p className="mt-0.5 text-[12px] font-semibold text-[#D4930D]">= IDR {plan.priceIDR}</p>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4930D]" />
                    <span className="text-[12px] text-muted-foreground">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold transition-all hover:brightness-110 active:scale-[0.98] ${
                  plan.popular
                    ? "bg-[#D4930D] text-white shadow-sm"
                    : "border border-border bg-card text-foreground hover:border-[#D4930D]/30"
                }`}
              >
                Book Now
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
