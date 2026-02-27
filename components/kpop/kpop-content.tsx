"use client"

import { ServiceListingLayout } from "@/components/service-listing-layout"
import type { ServiceItem } from "@/components/service-listing-layout"

const categories = [
    "New",
    "Concert Tickets",
    "Fan Meeting",
    "Music Show",
    "K-Pop Package",
    "Merchandise",
    "Idol Cafe",
    "Record Store",
]

const items: ServiceItem[] = [
    {
        id: 1,
        name: "BLACKPINK World Tour Seoul | VIP Floor Tickets 2025",
        location: "Seoul KSPO Dome, Bangi",
        image: "/images/activity-lotte-world.jpg",
        price: "From 250 USD",
        originalPrice: "310",
        rating: 5.0,
        reviews: 9821,
        visitors: "3.2M+",
        tags: ["Concert Tickets", "K-Pop Package"],
        badge: "Trending",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 2,
        name: "BTS Official Fan Meeting Ticket | Priority Seat Access",
        location: "Seoul Olympic Stadium",
        image: "/images/activity-hanbok.jpg",
        price: "From 180 USD",
        originalPrice: "220",
        rating: 5.0,
        reviews: 7634,
        visitors: "2.5M+",
        tags: ["Fan Meeting", "Concert Tickets"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 3,
        name: "Music Bank Live Recording | KBS TV Show Audience Ticket",
        location: "Seoul Yeouido, KBS Hall",
        image: "/images/activity-cooking-class.jpg",
        price: "From 35 USD",
        rating: 4.9,
        reviews: 2105,
        visitors: "840K+",
        tags: ["Music Show", "Experience"],
        badge: "Only",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 4,
        name: "Inkigayo SBS Live | Sunday K-Pop Music Show Ticket",
        location: "Seoul Mapo-gu, SBS Prism Tower",
        image: "/images/kbeauty-products.jpg",
        price: "From 30 USD",
        rating: 4.8,
        reviews: 1892,
        visitors: "710K+",
        tags: ["Music Show", "Experience"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 5,
        name: "K-Pop Idol Cafe Experience | Hongdae Theme Cafe Tour",
        location: "Seoul Hongdae",
        image: "/images/nami-island.jpg",
        price: "From 28 USD",
        rating: 4.7,
        reviews: 1234,
        visitors: "390K+",
        tags: ["Idol Cafe", "Experience"],
        badge: "New",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 6,
        name: "SMTOWN Official Store | Exclusive SM Merchandise + Photocards",
        location: "Seoul Coex, Samseong",
        image: "/images/photo-studio-concept.jpg",
        price: "From 15 USD",
        rating: 4.8,
        reviews: 3782,
        visitors: "1.1M+",
        tags: ["Merchandise", "Record Store"],
        badge: "Trending",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 7,
        name: "TWICE Fan Meeting | Official R1A Seat with Photocard Set",
        location: "Seoul KSPO Dome",
        image: "/images/activity-lotte-world.jpg",
        price: "From 160 USD",
        originalPrice: "195",
        rating: 4.9,
        reviews: 4521,
        visitors: "1.4M+",
        tags: ["Fan Meeting", "Concert Tickets"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 8,
        name: "K-Pop Music Tour Package | 3-Day Seoul Idol Experience",
        location: "Seoul City",
        image: "/images/hero-bright-clinic.jpg",
        price: "From 320 USD",
        originalPrice: "420",
        rating: 5.0,
        reviews: 872,
        visitors: "280K+",
        tags: ["K-Pop Package", "Experience"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
]

export function KpopContent() {
    return (
        <ServiceListingLayout
            breadcrumb="K-Pop"
            pageTitle="On-K K-Pop"
            categories={categories}
            items={items}
        />
    )
}
