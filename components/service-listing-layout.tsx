"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Star, Heart, MapPin, ChevronDown, SlidersHorizontal, ArrowUpDown } from "lucide-react"

export interface ServiceItem {
  id: number
  name: string
  location: string
  image: string
  price: string
  originalPrice?: string
  rating: number
  reviews: number
  visitors: string
  tags: string[]
  badge?: "Trending" | "New" | "AD" | "Only"
  instantBook?: boolean
  englishAvailable?: boolean
}

interface ServiceListingLayoutProps {
  breadcrumb: string
  pageTitle: string
  categories: string[]
  filterOptions?: { label: string; values: string[] }[]
  items: ServiceItem[]
}

export function ServiceListingLayout({
  breadcrumb,
  pageTitle,
  categories,
  filterOptions = [],
  items,
}: ServiceListingLayoutProps) {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState("Monthly Best")
  const [regionFilter, setRegionFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [engOnly, setEngOnly] = useState(false)
  const [availableOnly, setAvailableOnly] = useState(false)

  const filteredItems = useMemo(() => {
    let result = items
    if (activeCategory !== "ALL") {
      result = result.filter((item) =>
        item.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase())) ||
        item.name.toLowerCase().includes(activeCategory.toLowerCase())
      )
    }
    if (engOnly) {
      result = result.filter((item) => item.englishAvailable)
    }
    return result
  }, [items, activeCategory, engOnly])

  const badgeStyles: Record<string, string> = {
    Trending: "bg-[#FF6B6B] text-white",
    New: "bg-[#2563A8] text-white",
    AD: "bg-muted-foreground/20 text-muted-foreground",
    Only: "bg-[#2563A8] text-white",
  }

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-5 py-3 lg:px-8">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span>Services</span>
            <span className="text-border">{">"}</span>
            <span className="font-semibold text-[#2563A8]">{breadcrumb}</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["ALL", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[14px] font-medium transition-colors ${
                  activeCategory === cat
                    ? "font-bold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-5 py-3 lg:px-8">
          {/* Region dropdown */}
          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="appearance-none rounded-full border border-border bg-card py-1.5 pl-3 pr-8 text-[13px] font-medium text-foreground outline-none transition-colors hover:border-primary/40 focus:border-primary"
              aria-label="Region filter"
            >
              <option value="">Region</option>
              <option value="gangnam">Seoul Gangnam</option>
              <option value="hongdae">Seoul Hongdae</option>
              <option value="myeongdong">Seoul Myeongdong</option>
              <option value="apgujeong">Seoul Apgujeong</option>
              <option value="jamsil">Seoul Jamsil</option>
              <option value="busan">Busan</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Date dropdown */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none rounded-full border border-border bg-card py-1.5 pl-3 pr-8 text-[13px] font-medium text-foreground outline-none transition-colors hover:border-primary/40 focus:border-primary"
              aria-label="Date filter"
            >
              <option value="">Date</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* English Available toggle */}
          <button
            onClick={() => setEngOnly(!engOnly)}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              engOnly
                ? "border-[#2563A8] bg-[#2563A8]/8 text-[#2563A8]"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            English Available
          </button>

          {/* Except sold out toggle */}
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              availableOnly
                ? "border-[#2563A8] bg-[#2563A8]/8 text-[#2563A8]"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            Except sold out
          </button>

          {/* More filters */}
          <button className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
            <span>Filter</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {/* Extra filter options from page config */}
          {filterOptions.map((opt) => (
            <div key={opt.label} className="relative">
              <select
                className="appearance-none rounded-full border border-border bg-card py-1.5 pl-3 pr-8 text-[13px] font-medium text-foreground outline-none transition-colors hover:border-primary/40 focus:border-primary"
                aria-label={opt.label}
              >
                <option value="">{opt.label}</option>
                {opt.values.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Count + Sort */}
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <p className="text-[14px] font-bold text-foreground">
            Total {filteredItems.length}
          </p>
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>{sortBy}</span>
          </button>
        </div>
      </div>

      {/* Listing Grid -- 2 column like Creatrip reference */}
      <div className="mx-auto max-w-5xl px-5 pb-12 lg:px-8">
        <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group flex gap-3.5 sm:gap-4"
            >
              {/* Image */}
              <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-xl sm:h-[160px] sm:w-[160px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                {item.badge && (
                  <div className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold ${badgeStyles[item.badge]}`}>
                    {item.badge === "Only" ? "CareOnK" : item.badge}
                  </div>
                )}

                {/* Heart */}
                <button
                  className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-muted-foreground/60 backdrop-blur-sm transition-colors hover:text-red-400"
                  aria-label={`Save ${item.name}`}
                >
                  <Heart className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                {/* Location */}
                <p className="text-[12px] text-muted-foreground">{item.location}</p>

                {/* Name */}
                <h3 className="mt-0.5 text-[14px] font-bold leading-snug text-foreground line-clamp-2 group-hover:text-[#2563A8] transition-colors cursor-pointer">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[15px] font-bold text-[#2563A8]">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-[12px] text-muted-foreground line-through">{item.originalPrice}</span>
                  )}
                </div>

                {/* Rating + reviews + visitors */}
                <div className="mt-1 flex items-center gap-1.5">
                  <Star className="h-3 w-3 fill-[#D4930D] text-[#D4930D]" />
                  <span className="text-[12px] font-semibold text-foreground">{item.rating}</span>
                  <span className="text-[12px] text-muted-foreground">({item.reviews.toLocaleString()})</span>
                  <span className="text-[12px] text-muted-foreground">{item.visitors}</span>
                </div>

                {/* Tags */}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.instantBook && (
                    <span className="rounded-sm bg-[#2563A8]/8 px-1.5 py-0.5 text-[11px] font-medium text-[#2563A8]">
                      Instant Book
                    </span>
                  )}
                  {item.englishAvailable && (
                    <span className="rounded-sm border border-border px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      English Available
                    </span>
                  )}
                  {item.badge === "New" && (
                    <span className="rounded-sm bg-[#D4930D]/10 px-1.5 py-0.5 text-[11px] font-medium text-[#D4930D]">
                      New
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3 text-[13px] font-bold text-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.98]">
            View More
          </button>
        </div>
      </div>
    </div>
  )
}
