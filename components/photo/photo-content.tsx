"use client"

import { ServiceListingLayout } from "@/components/service-listing-layout"
import type { ServiceItem } from "@/components/service-listing-layout"

const categories = [
  "New",
  "ID & Profile",
  "Concept",
  "Hanbok",
  "Candid Photos",
  "Wedding",
  "Self",
  "Body Profile",
]

const items: ServiceItem[] = [
  {
    id: 1,
    name: "WHIPPED HOUSE Seongsu | Class & Modeling Experience",
    location: "Seoul Seongsudong",
    image: "/images/photo-studio-concept.jpg",
    price: "From 40.61 USD",
    originalPrice: "56.01",
    rating: 4.8,
    reviews: 5,
    visitors: "2K+",
    tags: ["Concept", "Modeling"],
    badge: "AD",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 2,
    name: "Eyes U Studio | ID Photo & Profile Photography in Seongsudong",
    location: "Seoul Seongsudong",
    image: "/images/photo-studio-profile.jpg",
    price: "From 35.01 USD",
    rating: 5.0,
    reviews: 57,
    visitors: "9K+",
    tags: ["ID & Profile", "Portrait"],
    badge: undefined,
    instantBook: false,
    englishAvailable: true,
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
    tags: ["Concept", "Hair & Makeup"],
    badge: "Trending",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 4,
    name: "Sihyunhada Photo Studio | Seongsu Flagship Store",
    location: "Seoul Seongsudong",
    image: "/images/photo-studio-concept.jpg",
    price: "From 37.81 USD",
    rating: 4.8,
    reviews: 76,
    visitors: "100K+",
    tags: ["Concept", "K-Beauty"],
    badge: "Only",
    instantBook: false,
    englishAvailable: false,
  },
  {
    id: 5,
    name: "Sihyunhada Photo Studio | Gangnam Location",
    location: "Seoul Gangnam",
    image: "/images/photo-studio-profile.jpg",
    price: "From 37.81 USD",
    rating: 4.7,
    reviews: 138,
    visitors: "106K+",
    tags: ["Concept", "Studio"],
    badge: "Only",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 6,
    name: "Dreamy-concept Photoshoot in Jongno | Studio Fiene",
    location: "Seoul Jongro",
    image: "/images/photo-studio-concept.jpg",
    price: "From 41.31 USD",
    rating: 5.0,
    reviews: 10,
    visitors: "18K+",
    tags: ["Concept", "Dreamy"],
    badge: "Only",
    instantBook: false,
    englishAvailable: false,
  },
  {
    id: 7,
    name: "Time On Me Studio | Hongdae Photo Studio with Professional Lighting",
    location: "Seoul Hongdae",
    image: "/images/photo-studio-profile.jpg",
    price: "From 24.5 USD",
    rating: 4.9,
    reviews: 311,
    visitors: "527K+",
    tags: ["Self", "Portrait"],
    badge: "Trending",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 8,
    name: "K-Beauty Style Profile Photos in Sinsa | OCTOBEE STUDIO",
    location: "Seoul Sinsa",
    image: "/images/photo-studio-concept.jpg",
    price: "From 203.04 USD",
    rating: 5.0,
    reviews: 728,
    visitors: "24K+",
    tags: ["Body Profile", "K-Beauty"],
    badge: undefined,
    instantBook: false,
    englishAvailable: true,
  },
]

export function PhotoContent() {
  return (
    <ServiceListingLayout
      breadcrumb="Photos"
      pageTitle="On-K Photo"
      categories={categories}
      items={items}
    />
  )
}
