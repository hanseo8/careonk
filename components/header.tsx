"use client"

import { useState } from "react"
import { usePathname, useRouter, Link } from "@/i18n/routing"
import { Globe, ChevronDown, Power, X } from "lucide-react"
import { useLocale } from "next-intl"

const navItems = [
  { label: "On-K Medical", href: "/medical", emoji: "🏥" },
  { label: "On-K Helper", href: "/helper", emoji: "🤝" },
  { label: "On-K Dining", href: "/dining", emoji: "🍽️" },
  { label: "On-K Activity", href: "/activity", emoji: "🎭" },
  { label: "On-K Photo", href: "/photo", emoji: "📸" },
  { label: "On-K Day Tour", href: "/daytour", emoji: "🗺️" },
  { label: "On-K Pharmacy", href: "/pharmacy", emoji: "💊" },
  { label: "On-K Exchange", href: "/exchange", emoji: "💱" },
  { label: "On-K K-Pop", href: "/kpop", emoji: "🎤" },
]

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesia" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
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
    <header className="sticky top-0 z-50 w-full bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      {/* Main header bar */}
      <div className="mx-auto relative flex h-14 max-w-6xl items-center px-5 lg:px-8">

        {/* Left: CAREONK SERVICE dropdown button */}
        <div className="relative">
          <button
            onClick={() => { setServiceOpen(!serviceOpen); setLangOpen(false) }}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-[12px] font-bold uppercase tracking-wide transition-all ${serviceOpen
              ? "border-[#2563A8]/30 bg-[#2563A8]/5 text-[#2563A8]"
              : "border-border bg-[#F6F8FC] text-[#6B7A99] hover:border-[#2563A8]/20 hover:text-foreground"
              }`}
            aria-label="CareOnK Services"
            aria-expanded={serviceOpen}
          >
            <span className="text-base leading-none">⛩️</span>
            <span className="hidden sm:inline">SERVICE</span>
            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Service dropdown */}
          {serviceOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setServiceOpen(false)}
              />
              <div className="absolute left-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7A99]">Our Services</p>
                </div>
                <div className="p-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.label}
                        href={item.href as any}
                        onClick={() => setServiceOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors ${isActive
                          ? "bg-[#2563A8]/8 text-[#2563A8]"
                          : "text-foreground hover:bg-[#F6F8FC] hover:text-[#2563A8]"
                          }`}
                      >
                        <span className="text-base">{item.emoji}</span>
                        {item.label}
                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#2563A8]" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Logo — absolutely centered */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/home" className="flex items-center gap-0" aria-label="CareOnK Home">
            <span className="font-serif text-[21px] font-normal uppercase tracking-[0.08em] text-foreground">CARE</span>
            <span className="text-[21px] font-black uppercase text-[#D4930D]">ON</span>
            <span className="text-[21px] font-black uppercase tracking-[0.02em] text-foreground">K</span>
          </Link>
        </div>


        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2.5">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen(!langOpen); setServiceOpen(false) }}
              className="flex items-center gap-1.5 rounded-full border border-border bg-[#F6F8FC] px-3 py-1.5 text-[12px] font-semibold text-[#6B7A99] transition-colors hover:border-[#2563A8]/30 hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{currentLangLabel}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
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
            )}
          </div>


          {/* Auth buttons (desktop) */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              {...{ href: "/login" } as any}
              className="rounded-lg border border-[#2563A8]/20 px-3.5 py-1.5 text-[12px] font-semibold text-[#2563A8] transition-all hover:border-[#2563A8]/40 hover:bg-[#2563A8]/5"
            >
              Log In
            </Link>
            <Link
              {...{ href: "/signup" } as any}
              className="rounded-lg bg-[#2563A8] px-3.5 py-1.5 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-[#1A4F8B]"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto max-w-6xl px-5 py-3">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href as any}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${pathname === item.href
                    ? "bg-[#2563A8]/8 text-[#2563A8] font-semibold"
                    : "text-[#6B7A99] hover:bg-[#F6F8FC] hover:text-foreground"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex gap-2 border-t border-border pt-3">
                <Link
                  {...{ href: "/login" } as any}
                  className="flex-1 rounded-lg border border-[#2563A8]/20 py-2.5 text-center text-[13px] font-semibold text-[#2563A8] transition-all hover:bg-[#2563A8]/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  {...{ href: "/signup" } as any}
                  className="flex-1 rounded-lg bg-[#2563A8] py-2.5 text-center text-[13px] font-bold text-white shadow-sm transition-all hover:bg-[#1A4F8B]"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
