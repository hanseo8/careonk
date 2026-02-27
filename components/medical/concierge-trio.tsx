import Image from "next/image"
import { Car, Baby, Languages, ArrowRight, ShieldCheck } from "lucide-react"

const conciergeServices = [
  {
    icon: Car,
    title: "On-K Driver",
    subtitle: "Private Driver",
    description: "Safe transport from Incheon Airport directly to your clinic. Premium vehicle, professional driver, no taxi queues.",
    descId: "Jemput dari bandara Incheon langsung ke klinik Anda.",
    image: "/images/concierge-driver.jpg",
    features: ["Airport Pickup", "Clinic Transfer", "City Tour"],
    color: "#2563A8",
    bgColor: "#EBF2FF",
  },
  {
    icon: Baby,
    title: "On-K Sitter",
    subtitle: "Indonesian Babysitter",
    description: "Indonesian-speaking, CPR-trained childcare during your medical treatments. Safe, verified, and trustworthy.",
    descId: "Pengasuh anak berbahasa Indonesia selama perawatan Anda.",
    image: "/images/concierge-babysitter.jpg",
    features: ["Bahasa Indonesia", "CPR Trained", "Background Check"],
    color: "#D4930D",
    bgColor: "#FFF8EB",
  },
  {
    icon: Languages,
    title: "On-K Connect",
    subtitle: "Personal Translator",
    description: "1:1 medical and lifestyle interpretation. Nothing gets lost in translation during consultations.",
    descId: "Penerjemah 1:1 untuk konsultasi medis dan kehidupan sehari-hari.",
    image: "/images/concierge-translator.jpg",
    features: ["Medical Terms", "Real-time 1:1", "Lifestyle Support"],
    color: "#2563A8",
    bgColor: "#EBF2FF",
  },
]

export function ConciergeTrio() {
  return (
    <section className="bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {/* Service Highlight banner */}
        <div className="mb-12 mx-auto max-w-3xl rounded-2xl border border-[#D4930D]/15 bg-gradient-to-r from-[#FFF8EB] via-[#FFFAF0] to-[#FFF8EB] p-6 text-center lg:p-8">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4930D]/10">
            <ShieldCheck className="h-5 w-5 text-[#D4930D]" />
          </div>
          <h3 className="text-lg font-bold text-foreground lg:text-xl">
            Why You Need a Personal Mate
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
            Because most clinics lack local coordinators, we provide a{" "}
            <span className="font-bold text-[#D4930D]">Personal Mate</span>{" "}
            (Driver, Sitter, Translator) for your entire medical journey
            - from airport to clinic to recovery.
          </p>
        </div>

        {/* Section title */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[12px] font-semibold tracking-widest uppercase text-[#D4930D]">
            Our Advantage
          </span>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground text-balance sm:text-3xl">
            Your Personal Concierge Trio
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground text-pretty">
            Korean hospitals only provide medical services. We provide{" "}
            <span className="font-semibold text-foreground">your entire medical travel experience.</span>
          </p>
        </div>

        {/* Three cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {conciergeServices.map((service) => (
            <article
              key={service.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Badge */}
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
                  <span className="text-[10px] font-bold tracking-wide uppercase" style={{ color: service.color }}>
                    {service.title}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: service.bgColor }}
                  >
                    <service.icon className="h-4.5 w-4.5" style={{ color: service.color }} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-foreground">{service.subtitle}</h3>
                    <p className="text-[11px] font-medium" style={{ color: service.color }}>{service.title}</p>
                  </div>
                </div>

                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-1 text-[11px] italic text-muted-foreground/60">
                  {service.descId}
                </p>

                {/* Feature tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide"
                      style={{
                        borderColor: `${service.color}20`,
                        color: service.color,
                        backgroundColor: service.bgColor,
                      }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <button
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{ backgroundColor: service.color }}
                >
                  Book Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
