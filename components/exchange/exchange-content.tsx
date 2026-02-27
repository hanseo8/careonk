"use client"

import { ServiceListingLayout } from "@/components/service-listing-layout"
import type { ServiceItem } from "@/components/service-listing-layout"

const categories = [
    "New",
    "Best Rate",
    "Airport",
    "City Center",
    "IDR → KRW",
    "Online Pickup",
    "Delivery",
    "Crypto Exchange",
]

const items: ServiceItem[] = [
    {
        id: 1,
        name: "Myeongdong MoneyGuru | Best Rate IDR to KRW in Seoul",
        location: "Seoul Myeongdong",
        image: "/images/hero-bright-clinic.jpg",
        price: "Rate: 1 IDR = 0.095 KRW",
        rating: 4.9,
        reviews: 5382,
        visitors: "1.8M+",
        tags: ["Best Rate", "IDR → KRW"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 2,
        name: "CareOnK Airport Exchange | Incheon T1 & T2 Best Guaranteed Rate",
        location: "Incheon Airport",
        image: "/images/activity-lotte-world.jpg",
        price: "Rate: 1 IDR = 0.093 KRW",
        rating: 4.8,
        reviews: 2134,
        visitors: "620K+",
        tags: ["Airport", "IDR → KRW"],
        badge: "Only",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 3,
        name: "Gangnam Global Exchange | USD, EUR, IDR, JPY and More",
        location: "Seoul Gangnam",
        image: "/images/kbeauty-products.jpg",
        price: "Rate: 1 IDR = 0.094 KRW",
        rating: 4.7,
        reviews: 1876,
        visitors: "530K+",
        tags: ["Best Rate", "City Center"],
        badge: "AD",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 4,
        name: "Online Order & Hotel Pickup | Pre-order KRW at Best Rate",
        location: "Nationwide (Delivery)",
        image: "/images/photo-studio-profile.jpg",
        price: "Rate: 1 IDR = 0.096 KRW",
        rating: 4.9,
        reviews: 943,
        visitors: "270K+",
        tags: ["Online Pickup", "Delivery"],
        badge: "Only",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 5,
        name: "Hongdae Money Exchange | Open 24 Hours, Best Rate Nearby",
        location: "Seoul Hongdae",
        image: "/images/activity-hanbok.jpg",
        price: "Rate: 1 IDR = 0.094 KRW",
        rating: 4.8,
        reviews: 1247,
        visitors: "380K+",
        tags: ["Best Rate", "City Center"],
        badge: "Trending",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 6,
        name: "Dongdaemun Exchange Zone | Night Market Area, Open Till 2AM",
        location: "Seoul Dongdaemun",
        image: "/images/nami-island.jpg",
        price: "Rate: 1 IDR = 0.093 KRW",
        rating: 4.6,
        reviews: 684,
        visitors: "190K+",
        tags: ["City Center", "Night"],
        badge: undefined,
        instantBook: false,
        englishAvailable: false,
    },
    {
        id: 7,
        name: "Crypto to KRW Exchange | Secure, Fast, Low Fee",
        location: "Seoul (Online)",
        image: "/images/photo-studio-concept.jpg",
        price: "Fee from 0.5%",
        rating: 4.7,
        reviews: 218,
        visitors: "48K+",
        tags: ["Crypto Exchange", "Online Pickup"],
        badge: "New",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 8,
        name: "Itaewon Global Money Exchange | Multilingual Staff Available",
        location: "Seoul Itaewon",
        image: "/images/activity-cooking-class.jpg",
        price: "Rate: 1 IDR = 0.094 KRW",
        rating: 4.8,
        reviews: 529,
        visitors: "160K+",
        tags: ["City Center", "IDR → KRW"],
        badge: undefined,
        instantBook: false,
        englishAvailable: true,
    },
]

export function ExchangeContent() {
    return (
        <ServiceListingLayout
            breadcrumb="Currency Exchange"
            pageTitle="On-K Exchange"
            categories={categories}
            items={items}
        />
    )
}
