"use client"

import { ServiceListingLayout } from "@/components/service-listing-layout"
import type { ServiceItem } from "@/components/service-listing-layout"

const categories = [
    "New",
    "City Tour",
    "Nature & Scenic",
    "DMZ & History",
    "K-Drama Spots",
    "Theme Park",
    "Night Tour",
    "Busan Day Trip",
]

const items: ServiceItem[] = [
    {
        id: 1,
        name: "Nami Island & Petite France Full-Day Tour from Seoul",
        location: "Gapyeong, Gyeonggi-do",
        image: "/images/nami-island.jpg",
        price: "From 45 USD",
        originalPrice: "60",
        rating: 4.9,
        reviews: 3842,
        visitors: "1.2M+",
        tags: ["Nature & Scenic", "Day Tour"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 2,
        name: "DMZ Tour with JSA (Joint Security Area) Visit | Official Licensed Guide",
        location: "DMZ, Paju",
        image: "/images/activity-hanbok.jpg",
        price: "From 60 USD",
        originalPrice: "75",
        rating: 4.8,
        reviews: 1254,
        visitors: "430K+",
        tags: ["DMZ & History", "Special"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 3,
        name: "Seoul City Highlights Bus Tour | Gyeongbok Palace & Bukchon Hanok",
        location: "Seoul City",
        image: "/images/hero-bright-clinic.jpg",
        price: "From 29 USD",
        rating: 4.7,
        reviews: 2106,
        visitors: "780K+",
        tags: ["City Tour", "History"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 4,
        name: "\"Crash Landing on You\" K-Drama Filming Locations Tour",
        location: "Seoul & Gyeonggi",
        image: "/images/activity-lotte-world.jpg",
        price: "From 55 USD",
        rating: 4.9,
        reviews: 918,
        visitors: "290K+",
        tags: ["K-Drama Spots", "Special"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 5,
        name: "Everland Theme Park Full Day Pass with Transport from Seoul",
        location: "Yongin, Gyeonggi-do",
        image: "/images/kbeauty-products.jpg",
        price: "From 52 USD",
        originalPrice: "68",
        rating: 4.6,
        reviews: 5673,
        visitors: "890K+",
        tags: ["Theme Park", "Family"],
        badge: "AD",
        instantBook: true,
        englishAvailable: false,
    },
    {
        id: 6,
        name: "Seoul Night Panorama Tour | Han River Cruise + Namsan Tower",
        location: "Seoul City",
        image: "/images/activity-cooking-class.jpg",
        price: "From 38 USD",
        rating: 4.8,
        reviews: 1392,
        visitors: "410K+",
        tags: ["Night Tour", "Scenic"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 7,
        name: "Busan One-Day Trip by KTX | Gamcheon Village + Haeundae",
        location: "Busan",
        image: "/images/photo-studio-concept.jpg",
        price: "From 85 USD",
        originalPrice: "99",
        rating: 4.7,
        reviews: 762,
        visitors: "220K+",
        tags: ["Busan Day Trip", "Culture"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 8,
        name: "Jeonju Hanok Village Full-Day Cultural Tour from Seoul",
        location: "Jeonju, Jeollabuk-do",
        image: "/images/photo-studio-profile.jpg",
        price: "From 75 USD",
        rating: 4.9,
        reviews: 487,
        visitors: "140K+",
        tags: ["Nature & Scenic", "Culture"],
        badge: "New",
        instantBook: false,
        englishAvailable: true,
    },
]

export function DayTourContent() {
    return (
        <ServiceListingLayout
            breadcrumb="Day Tour"
            pageTitle="On-K Day Tour"
            categories={categories}
            items={items}
        />
    )
}
