import Image from "next/image"
import { Star, MapPin, Package, Heart, Car, Baby, Languages } from "lucide-react"

const clinics = [
  {
    id: 1,
    name: "Gangnam Beauty Clinic",
    category: "Skin Care & Anti-Aging",
    image: "/images/clinic-gangnam-beauty.jpg",
    rating: 4.9,
    reviews: 328,
    location: "Gangnam, Seoul",
    priceKRW: "890,000",
    priceIDR: "10,500,000",
    hasConcierge: true,
    companions: ["driver", "translator"],
    tags: ["Botox", "Filler", "Laser"],
  },
  {
    id: 2,
    name: "Seoul Health Checkup Center",
    category: "Comprehensive Health Checkup",
    image: "/images/clinic-checkup-center.jpg",
    rating: 4.8,
    reviews: 512,
    location: "Apgujeong, Seoul",
    priceKRW: "1,200,000",
    priceIDR: "14,150,000",
    hasConcierge: true,
    companions: ["driver", "translator", "sitter"],
    tags: ["Full Body", "MRI", "Blood Test"],
  },
  {
    id: 3,
    name: "K-Oriental Medical Center",
    category: "K-Oriental Medicine",
    image: "/images/clinic-oriental-medicine.jpg",
    rating: 4.7,
    reviews: 187,
    location: "Sinsa, Seoul",
    priceKRW: "650,000",
    priceIDR: "7,660,000",
    hasConcierge: true,
    companions: ["driver", "translator"],
    tags: ["Acupuncture", "Herbal", "Detox"],
  },
  {
    id: 4,
    name: "Prestige Plastic Surgery",
    category: "Plastic Surgery",
    image: "/images/clinic-luxury.jpg",
    rating: 4.9,
    reviews: 245,
    location: "Gangnam, Seoul",
    priceKRW: "3,500,000",
    priceIDR: "41,250,000",
    hasConcierge: true,
    companions: ["driver", "translator", "sitter"],
    tags: ["Rhinoplasty", "Eye Surgery", "Lift"],
  },
  {
    id: 5,
    name: "Myeongdong Derma Lab",
    category: "Skin Care",
    image: "/images/derma-treatment.jpg",
    rating: 4.6,
    reviews: 421,
    location: "Myeongdong, Seoul",
    priceKRW: "450,000",
    priceIDR: "5,300,000",
    hasConcierge: true,
    companions: ["translator"],
    tags: ["Peel", "Pore Care", "Glow"],
  },
  {
    id: 6,
    name: "Apgujeong Star Clinic",
    category: "Anti-Aging & Lifting",
    image: "/images/hero-bright-clinic.jpg",
    rating: 4.8,
    reviews: 293,
    location: "Apgujeong, Seoul",
    priceKRW: "1,850,000",
    priceIDR: "21,800,000",
    hasConcierge: true,
    companions: ["driver", "translator", "sitter"],
    tags: ["HIFU", "Thread Lift", "Stem Cell"],
  },
]

const companionIcons: Record<string, { icon: typeof Car; label: string; color: string }> = {
  driver: { icon: Car, label: "On-K Driver", color: "#2563A8" },
  sitter: { icon: Baby, label: "On-K Sitter", color: "#D4930D" },
  translator: { icon: Languages, label: "On-K Connect", color: "#2563A8" },
}

export function ClinicListing() {
  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Recommended Clinics
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            {clinics.length} verified partner clinics with concierge packages
          </p>
        </div>

        {/* 3-column grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic) => (
            <article
              key={clinic.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={clinic.image}
                  alt={clinic.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />

                {/* Heart bookmark */}
                <button
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-red-500"
                  aria-label={`Save ${clinic.name}`}
                >
                  <Heart className="h-4 w-4" />
                </button>

                {/* Concierge badge */}
                {clinic.hasConcierge && (
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#2563A8] px-2.5 py-1 shadow-sm">
                    <Package className="h-3 w-3 text-white" />
                    <span className="text-[10px] font-bold text-white">Concierge Package</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                {/* Category + rating */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wide uppercase text-[#2563A8]">
                    {clinic.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#D4930D] text-[#D4930D]" />
                    <span className="text-[12px] font-bold text-foreground">{clinic.rating}</span>
                    <span className="text-[11px] text-muted-foreground">({clinic.reviews})</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="mt-2 text-[15px] font-bold text-foreground leading-snug">
                  {clinic.name}
                </h3>

                {/* Location */}
                <div className="mt-1.5 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[12px] text-muted-foreground">{clinic.location}</span>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {clinic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Companion Services Available */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Mates:
                  </span>
                  <div className="flex items-center gap-1">
                    {clinic.companions.map((comp) => {
                      const info = companionIcons[comp]
                      if (!info) return null
                      const Icon = info.icon
                      return (
                        <div
                          key={comp}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-secondary"
                          title={info.label}
                        >
                          <Icon className="h-3 w-3" style={{ color: info.color }} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Price */}
                <div className="mt-auto pt-4">
                  <div className="flex items-end justify-between border-t border-border pt-3">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        Starting from
                      </p>
                      <p className="text-[17px] font-bold text-foreground">
                        {"KRW " + clinic.priceKRW}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="rounded-md bg-[#D4930D]/10 px-2 py-0.5 text-[12px] font-bold text-[#D4930D]">
                        {"IDR " + clinic.priceIDR}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.98]">
            View All Clinics
          </button>
        </div>
      </div>
    </section>
  )
}
