"use client"

import { ServiceListingLayout } from "@/components/service-listing-layout"
import type { ServiceItem } from "@/components/service-listing-layout"

const categories = [
  "New",
  "Delivery",
  "Restaurants",
  "Cafes",
  "Voucher",
  "Workshops",
  "Group Reservation",
]

const items: ServiceItem[] = [
  {
    id: 1,
    name: "Easy Korean Fried Chicken Delivery for Foreigners | BHC Chicken",
    location: "Korea",
    image: "/images/dining-chicken-delivery.jpg",
    price: "From 18.52 USD",
    originalPrice: "20.37",
    rating: 4.9,
    reviews: 133,
    visitors: "883K+",
    tags: ["Delivery", "Chicken"],
    badge: undefined,
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 2,
    name: "Cafe Highwaist Cake Reservation Service (Pickup) | Ikseon Branch",
    location: "Seoul Ikseondong",
    image: "/images/dining-cafe-cake.jpg",
    price: "From 46.7 USD",
    originalPrice: "51.37",
    rating: 4.3,
    reviews: 235,
    visitors: "189K+",
    tags: ["Cafes", "Cake"],
    badge: "Trending",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 3,
    name: "Jinmi Sikdang | Reservation Service - Premium Korean BBQ",
    location: "Seoul Mapo",
    image: "/images/dining-korean-bbq.jpg",
    price: "From 7 USD",
    originalPrice: "7.7",
    rating: 4.5,
    reviews: 1061,
    visitors: "1.1M+",
    tags: ["Restaurants", "BBQ"],
    badge: "Trending",
    instantBook: false,
    englishAvailable: false,
  },
  {
    id: 4,
    name: "A Twosome Place Cake Delivery Service | Nationwide Korea",
    location: "Korea",
    image: "/images/dining-cafe-cake.jpg",
    price: "From 29.79 USD",
    originalPrice: "32.77",
    rating: 4.9,
    reviews: 77,
    visitors: "285K+",
    tags: ["Delivery", "Cake"],
    badge: undefined,
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 5,
    name: "Seoul Bukchon Tea Therapy | Traditional Korean Tea Experience",
    location: "Seoul Bukchon",
    image: "/images/hanok-village.jpg",
    price: "12.6 USD",
    rating: 4.9,
    reviews: 25,
    visitors: "283K+",
    tags: ["Cafes", "Tea"],
    badge: undefined,
    instantBook: false,
    englishAvailable: false,
  },
  {
    id: 6,
    name: "Myeongdong Restaurant | Bbandak Bbandak Dakgalbi",
    location: "Seoul Myeongdong",
    image: "/images/korean-bbq.jpg",
    price: "Deposit 21 USD",
    rating: 4.8,
    reviews: 1158,
    visitors: "2K+",
    tags: ["Restaurants", "New"],
    badge: "New",
    instantBook: false,
    englishAvailable: false,
  },
  {
    id: 7,
    name: "Kyochon Chicken Delivery | Korea's Best Fried Chicken",
    location: "Korea",
    image: "/images/dining-chicken-delivery.jpg",
    price: "From 16.91 USD",
    originalPrice: "18.6",
    rating: 4.9,
    reviews: 494,
    visitors: "2.5M+",
    tags: ["Delivery", "Chicken"],
    badge: "Trending",
    instantBook: false,
    englishAvailable: true,
  },
  {
    id: 8,
    name: "K-FOOD Cooking Class (OKitchen Studio) | Make Popular Korean Dishes",
    location: "Seoul Gangnam",
    image: "/images/activity-cooking-class.jpg",
    price: "From 70.01 USD",
    rating: 5.0,
    reviews: 9,
    visitors: "19K+",
    tags: ["Workshops", "Cooking"],
    badge: undefined,
    instantBook: false,
    englishAvailable: true,
  },
]

export function DiningContent() {
  return (
    <ServiceListingLayout
      breadcrumb="Dining & Food"
      pageTitle="On-K Dining"
      categories={categories}
      items={items}
    />
  )
}
