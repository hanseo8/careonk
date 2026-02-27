"use client"

import { useState } from "react"
import { usePathname, useRouter } from "@/i18n/routing"
import { Globe, ChevronDown } from "lucide-react"
import { useLocale } from "next-intl"

const languages = [
    { code: "en", label: "English" },
    { code: "id", label: "Indonesia" },
    { code: "ko", label: "한국어" },
    { code: "ja", label: "日本語" },
]

interface LanguageSwitcherProps {
    className?: string
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
    const [langOpen, setLangOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const currentLocale = useLocale()

    const currentLangLabel = languages.find(l => l.code === currentLocale)?.code.toUpperCase() || "EN"

    const switchLanguage = (newLocale: string) => {
        router.replace(pathname as any, { locale: newLocale })
        setLangOpen(false)
    }

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-[#F6F8FC] px-3 py-1.5 text-[12px] font-semibold text-[#6B7A99] transition-colors hover:border-[#2563A8]/30 hover:text-foreground"
                aria-label="Change language"
            >
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLangLabel}</span>
                <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setLangOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-xl border border-border bg-card shadow-xl z-20">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => switchLanguage(lang.code)}
                                className={`flex w-full items-center gap-3 px-4 py-2 text-[13px] font-medium transition-colors ${currentLocale === lang.code
                                    ? "bg-[#2563A8]/8 text-[#2563A8] font-semibold"
                                    : "text-[#6B7A99] hover:bg-[#F6F8FC] hover:text-foreground"
                                    }`}
                            >
                                <span className="w-5 font-bold text-[11px] uppercase">{lang.code}</span>
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
