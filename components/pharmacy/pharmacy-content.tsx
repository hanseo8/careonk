"use client"

import { ServiceListingLayout } from "@/components/service-listing-layout"
import type { ServiceItem } from "@/components/service-listing-layout"

const categories = [
    "New",
    "General Pharmacy",
    "Prescription",
    "Vitamins & Supplements",
    "K-Beauty Skincare",
    "Traditional Medicine",
    "Baby & Kids",
    "Medical Devices",
]

const items: ServiceItem[] = [
    {
        id: 1,
        name: "Olive Young Myeongdong Flagship | Premium K-Beauty & Health",
        location: "Seoul Myeongdong",
        image: "/images/kbeauty-products.jpg",
        price: "Delivery from 3 USD",
        rating: 4.9,
        reviews: 8421,
        visitors: "2.5M+",
        tags: ["K-Beauty Skincare", "Supplements"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 2,
        name: "CareOnK Prescription Assist | Hospital prescription pickup & delivery",
        location: "Nationwide",
        image: "/images/hero-bright-clinic.jpg",
        price: "From 10 USD",
        rating: 5.0,
        reviews: 312,
        visitors: "45K+",
        tags: ["Prescription", "Concierge"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 3,
        name: "Korean Health Supplements Pack | Red Ginseng, Vitamin C, Collagen",
        location: "Seoul Gangnam",
        image: "/images/kbeauty-products.jpg",
        price: "From 25 USD",
        originalPrice: "35",
        rating: 4.8,
        reviews: 1093,
        visitors: "310K+",
        tags: ["Vitamins & Supplements", "Health"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 4,
        name: "Gangnam Pharmacy 24H | English-Speaking Pharmacist Available",
        location: "Seoul Gangnam",
        image: "/images/photo-studio-profile.jpg",
        price: "Consultation Free",
        rating: 4.9,
        reviews: 583,
        visitors: "88K+",
        tags: ["General Pharmacy", "English"],
        badge: "Only",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 5,
        name: "Dongui Medical Herb | Traditional Korean Herbal Medicine Consultation",
        location: "Seoul Insadong",
        image: "/images/activity-hanbok.jpg",
        price: "From 30 USD",
        rating: 4.7,
        reviews: 228,
        visitors: "62K+",
        tags: ["Traditional Medicine", "Consultation"],
        badge: "New",
        instantBook: false,
        englishAvailable: true,
    },
    {
        id: 6,
        name: "Baby Supplies & Kids Pharmacy | Imported & Korean Brands",
        location: "Seoul Hongdae",
        image: "/images/activity-lotte-world.jpg",
        price: "Delivery from 5 USD",
        rating: 4.8,
        reviews: 394,
        visitors: "75K+",
        tags: ["Baby & Kids", "Delivery"],
        badge: undefined,
        instantBook: true,
        englishAvailable: true,
    },
    {
        id: 7,
        name: "LAIKA Health Device Shop | Blood Pressure, Glucose Monitors",
        location: "Seoul Jongno",
        image: "/images/photo-studio-concept.jpg",
        price: "From 20 USD",
        rating: 4.6,
        reviews: 146,
        visitors: "32K+",
        tags: ["Medical Devices", "Health"],
        badge: undefined,
        instantBook: false,
        englishAvailable: false,
    },
    {
        id: 8,
        name: "K-Skincare Prescription Cream | Dermatologist Recommended",
        location: "Seoul Apgujeong",
        image: "/images/kbeauty-products.jpg",
        price: "From 18 USD",
        rating: 5.0,
        reviews: 721,
        visitors: "195K+",
        tags: ["K-Beauty Skincare", "Prescription"],
        badge: "Trending",
        instantBook: true,
        englishAvailable: true,
    },
]

export function PharmacyContent() {
    return (
        <ServiceListingLayout
            breadcrumb="Pharmacy"
            pageTitle="On-K Pharmacy"
            categories={categories}
            items={items}
        />
    )
}
