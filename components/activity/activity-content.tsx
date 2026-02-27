"use client"

import { ServiceListingLayout } from "@/components/service-listing-layout"
import type { ServiceItem } from "@/components/service-listing-layout"

const categories = [
  "New",
  "Photo & Outfit",
  "Attractions & Tickets",
  "Live & Learn",
  "K-Pop & Concerts",
  "Classes & Workshops",
  "Fortune & Destiny",
  "Spas & Wellness",
]

const items: ServiceItem[] = [
  {
    id: 1,
    name: "Gyeongbokgung Hanbok Experience at YES Hanbok Rental",
    location: "Seoul Gyeongbokgung",
    image: "/images/activity-hanbok.jpg",
    price: "From 17.5 USD",
    originalPrice: "21",
    rating: 5.0,
    reviews: 3464,
    visitors: "1.1M+",
    tags: ["Photo & Outfit", "Hanbok"],
    badge: "AD",
    instantBook: true,
    englishAvailable: true,
  },
  {
    id: 2,
    name: "Lotte World Full Day Pass | Special Discounted Price",
    location: "Seoul Jamsil",
    image: "/images/activity-lotte-world.jpg",
    price: "From 27.65 USD",
    originalPrice: "43.41",
    rating: 4.3,
    reviews: 44337,
    visitors: "623K+",
    tags: ["Attractions & Tickets", "Theme Park"],
    badge: "Trending",
    instantBook: false,
    englishAvailable: false,
  },
  {
    id: 3,
    name: "Modelro Studio | Hongdae Photo Studio with Hair & Makeup Styling",
    location: "Seoul Hongdae",
    image: "/images/photo-studio-profile.jpg",
    price: "From 24.5 USD",
    rating: 4.8,
    reviews: 170,
    visitors: "94K+",
    tags: ["Photo & Outfit", "Studio"],
    badge: "Trending",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 4,
    name: "Make Your Own Skincare in Seongsu | WHIPPED HOUSE Workshop",
    location: "Seoul Seongsudong",
    image: "/images/kbeauty-products.jpg",
    price: "From 17.5 USD",
    rating: 4.9,
    reviews: 672,
    visitors: "160K+",
    tags: ["Classes & Workshops", "Skincare"],
    badge: "Only",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 5,
    name: "Women-only Private Bath & Body Scrub | ONA Spa Myeongdong",
    location: "Seoul Myeongdong",
    image: "/images/hero-bright-clinic.jpg",
    price: "35.01 USD",
    rating: 5.0,
    reviews: 157,
    visitors: "26K+",
    tags: ["Spas & Wellness", "Bath"],
    badge: "Only",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 6,
    name: "Gyeongbokgung Palace Hanbok Rental at Ohnetharu Hanbok",
    location: "Seoul Gyeongbokgung",
    image: "/images/activity-hanbok.jpg",
    price: "From 9.45 USD",
    originalPrice: "10.5",
    rating: 4.9,
    reviews: 246,
    visitors: "766K+",
    tags: ["Photo & Outfit", "Hanbok"],
    badge: "AD",
    instantBook: true,
    englishAvailable: true,
  },
  {
    id: 7,
    name: "K-FOOD Cooking Class | Make Popular Korean Dishes Yourself",
    location: "Seoul Gangnam",
    image: "/images/activity-cooking-class.jpg",
    price: "From 70.01 USD",
    rating: 5.0,
    reviews: 9,
    visitors: "19K+",
    tags: ["Classes & Workshops", "Cooking"],
    badge: undefined,
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 8,
    name: "Nami Island Day Tour with Shuttle Bus | Beautiful Nature Escape",
    location: "Gapyeong",
    image: "/images/nami-island.jpg",
    price: "From 32 USD",
    rating: 4.7,
    reviews: 580,
    visitors: "340K+",
    tags: ["Attractions & Tickets", "Day Tour"],
    badge: "Trending",
    instantBook: true,
    englishAvailable: true,
  },
]

export function ActivityContent() {
  return (
    <ServiceListingLayout
      breadcrumb="Activities"
      pageTitle="On-K Activity"
      categories={categories}
      items={items}
    />
  )
}
