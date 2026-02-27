import Image from "next/image"
import { Languages, Stethoscope, MessageSquare, Clock, Star, ArrowRight, CheckCircle2 } from "lucide-react"

const plans = [
  {
    name: "Clinic Visit",
    description: "3-hour translation for a single clinic consultation",
    priceKRW: "150,000",
    priceIDR: "1,770,000",
    features: ["3 hours on-site", "Medical terminology", "Pre-visit briefing", "Written summary"],
    popular: false,
  },
  {
    name: "Full Day Companion",
    description: "8-hour translator for clinic visits + lifestyle support",
    priceKRW: "380,000",
    priceIDR: "4,480,000",
    features: ["8 hours availability", "Medical + lifestyle", "Restaurant ordering", "Shopping assistance"],
    popular: true,
  },
  {
    name: "Surgery Package",
    description: "3-day translator for surgery prep, day, and recovery",
    priceKRW: "980,000",
    priceIDR: "11,550,000",
    features: ["3 days full support", "Pre-op consultation", "Surgery day presence", "Post-op follow-up"],
    popular: false,
  },
]

export function TranslatorSection() {
  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {/* Info split layout */}
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/concierge-translator.jpg"
              alt="On-K Connect - Personal medical translator during consultation"
              width={600}
              height={400}
              className="h-[320px] w-full rounded-2xl object-cover"
            />
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#1A1F36] px-3 py-1.5 shadow-sm">
              <Languages className="h-3.5 w-3.5 text-white" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wide">On-K Connect</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Personal Translator
            </h3>
            <p className="mt-1 text-[13px] font-medium text-[#2563A8] italic">
              Penerjemah Pribadi 1:1
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              1:1 medical and lifestyle interpretation so nothing gets lost in translation.
              Our translators are trained in medical terminology and understand both Korean
              healthcare protocols and Indonesian patient needs.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Stethoscope, text: "Medical terminology" },
                { icon: MessageSquare, text: "Real-time 1:1" },
                { icon: Clock, text: "Flexible hours" },
                { icon: Star, text: "4.9 avg rating" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
                  <item.icon className="h-4 w-4 shrink-0 text-[#2563A8]" />
                  <span className="text-[12px] font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 flex flex-col items-center">
          <h4 className="text-lg font-bold text-foreground">Translator Packages</h4>
          <p className="mt-1 text-[13px] text-muted-foreground">Never lose anything in translation again</p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-5 transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-[#1A1F36]/20 bg-[#F0F4FA] shadow-md"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1A1F36] px-4 py-1">
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
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#2563A8]" />
                    <span className="text-[12px] text-muted-foreground">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold transition-all hover:brightness-110 active:scale-[0.98] ${
                  plan.popular
                    ? "bg-[#1A1F36] text-white shadow-sm"
                    : "border border-border bg-card text-foreground hover:border-[#1A1F36]/30"
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
