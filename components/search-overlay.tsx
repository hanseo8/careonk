"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Plane, Bus, Smartphone, Briefcase, Wifi, Car, Sun, ChevronUp, ChevronDown, Minus } from "lucide-react"

interface SearchOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("Seoul")

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

    const quickLinks = [
        { id: 1, title: "Incheon\nAirport Guide", icon: <Plane className="h-8 w-8 text-[#0047AB]" />, href: "/service/airport" },
        { id: 2, title: "Public\nTransportation", icon: <Bus className="h-8 w-8 text-[#0047AB]" />, href: "/service/transportation" },
        { id: 3, title: "Phone Rental", icon: <Smartphone className="h-8 w-8 text-[#0047AB]" />, href: "/service/rental/phone" },
        { id: 4, title: "Luggage Delivery\n& Storage", icon: <Briefcase className="h-8 w-8 text-[#0047AB]" />, href: "/service/luggage" },
        { id: 5, title: "SIM & Wi-Fi", icon: <Wifi className="h-8 w-8 text-[#0047AB]" />, href: "/service/rental/sim" },
        { id: 6, title: "Taxi & Pickup", icon: <Car className="h-8 w-8 text-[#0047AB]" />, href: "/service/taxi" },
    ]

    const popularWordsLeft = [
        { rank: 1, word: "Massage", status: "same" },
        { rank: 2, word: "Teeth whitening", status: "same" },
        { rank: 3, word: "Busan", status: "up" },
        { rank: 4, word: "Head spa", status: "up" },
        { rank: 5, word: "hanbok makeup", status: "same" },
    ]

    const popularWordsRight = [
        { rank: 6, word: "Nails busan", status: "up" },
        { rank: 7, word: "nails", status: "down" },
        { rank: 8, word: "Body scrub", status: "down" },
        { rank: 9, word: "Color analysis", status: "down" },
        { rank: 10, word: "Galaxy rental", status: "same" },
    ]

    const tabs = ["Seoul", "Busan", "Jeju", "Hongdae", "Myeongdong", "Incheon", "Gangnam", "Itaewon", "Dongdaemun", "Namdaemun"]

    const nearbyResults: Record<string, string[]> = {
        Seoul: [
            "Seoul 6 Days 5 Nights",
            "Seoul 4 Days",
            "Seoul 4 Days Itinerary 2024",
            "Seoul 2 Days",
            "Seoul 2 Days 1 Nights",
            "Seoul Snap Photoshoot",
            "Seoul 3 Days",
            "Seoul 5 Days",
        ],
        Busan: ["Busan 2 Days", "Haeundae Tour", "Busan Snap"],
        Jeju: ["Jeju 3 Days", "Hallasan Hike", "Jeju Car Rental"],
    }

    const handleSearch = (q: string) => {
        if (!q.trim()) return
        router.push(`/search?q=${encodeURIComponent(q)}`)
        onClose()
    }

    const handleLink = (href: string) => {
        router.push(href)
        onClose()
    }

    const renderStatusIcon = (status: string) => {
        if (status === "up") return <ChevronUp className="h-3 w-3 text-[#FF8C00]" strokeWidth={3} />
        if (status === "down") return <ChevronDown className="h-3 w-3 text-[#2563A8]" strokeWidth={3} />
        return <Minus className="h-3 w-3 text-gray-300" strokeWidth={3} />
    }

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white overflow-y-auto animate-in fade-in duration-200">
            <div className="mx-auto w-full max-w-5xl px-6 py-8">

                {/* Header / Search Bar */}
                <div className="flex items-center justify-between gap-4 border-b border-[#0047AB]/20 pb-4">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }}
                        className="flex flex-1 items-center gap-4"
                    >
                        <Search className="h-7 w-7 text-gray-400" />
                        <input
                            type="text"
                            placeholder='Search "Seoul Tour" or "Helper"'
                            className="flex-1 bg-transparent text-xl text-gray-800 outline-none placeholder:text-gray-300 focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </form>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => handleSearch(searchQuery)}
                            className="rounded-lg bg-[#0047AB] px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#1A4F8B] hover:shadow-lg active:scale-95"
                        >
                            SEARCH
                        </button>
                        <button onClick={onClose} className="flex items-center gap-1 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-800">
                            CLOSE <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {quickLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleLink(link.href)}
                            className="group flex flex-col items-center gap-3 text-center transition-transform hover:-translate-y-1"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all group-hover:bg-[#0047AB]/5 group-hover:border-[#0047AB]/20">
                                {link.icon}
                            </div>
                            <span className="whitespace-pre-line text-sm font-medium text-gray-500 group-hover:text-[#0047AB] leading-snug transition-colors">
                                {link.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Info Banners */}
                <div className="mt-12 flex flex-col gap-4 md:flex-row">
                    {/* Weather Banner */}
                    <div className="relative flex flex-1 overflow-hidden rounded-xl bg-[#F0FAFF] p-6">
                        <div className="relative z-10 flex flex-col justify-center">
                            <p className="text-xl font-bold">
                                <span className="text-[#3B82F6]">5C</span> <span className="text-[#F59E0B]">/ 15C</span>
                            </p>
                            <p className="mt-1 text-sm text-[#3B82F6]/70">2026.02.27, Seoul</p>
                        </div>
                        <Sun className="absolute -right-4 top-1/2 h-24 w-24 -translate-y-1/2 text-[#FBBF24] opacity-90" />
                    </div>

                    {/* Exchange Rate Banner */}
                    <div className="relative flex flex-1 overflow-hidden rounded-xl bg-[#F0FDF4] p-6">
                        <div className="relative z-10 flex flex-col justify-center">
                            <p className="text-xl font-bold text-[#10B981]">KRW1428.3</p>
                            <p className="mt-1 text-sm text-[#10B981]/70">2026.02.27, USD 1</p>
                        </div>
                        <div className="absolute right-6 top-1/2 flex h-12 w-16 -translate-y-1/2 items-center justify-center rounded-md bg-[#22C55E]">
                            <span className="text-2xl font-black text-white">₩</span>
                        </div>
                    </div>
                </div>

                {/* Most-searched words */}
                <div className="mt-16">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-gray-800">Most-searched words</h3>
                        <span className="text-sm text-gray-400">Latest update 02.27 15:00</span>
                    </div>

                    <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-20">
                        {/* Left Column */}
                        <div className="flex flex-1 flex-col gap-4">
                            {popularWordsLeft.map((item) => (
                                <div
                                    key={item.rank}
                                    onClick={() => handleSearch(item.word)}
                                    className="flex items-center gap-6 border-b border-transparent hover:border-[#0047AB]/10 pb-2 transition-colors cursor-pointer group"
                                >
                                    <span className="w-4 text-base font-bold text-[#0047AB]">{item.rank}</span>
                                    <span className="flex w-4 justify-center">{renderStatusIcon(item.status)}</span>
                                    <span className="text-gray-600 transition-colors group-hover:text-[#0047AB] group-hover:font-semibold">{item.word}</span>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-1 flex-col gap-4">
                            {popularWordsRight.map((item) => (
                                <div
                                    key={item.rank}
                                    onClick={() => handleSearch(item.word)}
                                    className="flex items-center gap-6 border-b border-white hover:border-[#0047AB]/10 pb-2 transition-colors cursor-pointer group"
                                >
                                    <span className="w-4 text-base font-bold text-gray-500 group-hover:text-[#0047AB]">{item.rank}</span>
                                    <span className="flex w-4 justify-center">{renderStatusIcon(item.status)}</span>
                                    <span className="text-gray-600 transition-colors group-hover:text-[#0047AB] group-hover:font-semibold">{item.word}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Popular searches nearby */}
                <div className="mt-16 pb-20">
                    <h3 className="text-lg font-bold text-gray-800">Popular searches nearby</h3>

                    {/* Tabs */}
                    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-b border-gray-100 pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative pb-2 text-base font-medium transition-colors ${activeTab === tab ? "text-[#0047AB] font-bold" : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0047AB]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tag Results */}
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {(nearbyResults[activeTab] || ["Coming soon..."]).map((result, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSearch(result)}
                                className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4 text-left shadow-sm transition-all hover:border-[#0047AB] hover:text-[#0047AB] hover:shadow-md hover:-translate-y-0.5"
                            >
                                <span className="text-[15px] font-semibold text-gray-700 transition-colors">{result}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
