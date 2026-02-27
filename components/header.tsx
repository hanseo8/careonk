"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X, Globe, Bell, Power, ChevronDown } from "lucide-react"

const navItems = [
  { label: "On-K Medical", href: "/medical" },
  { label: "On-K Helper", href: "/helper" },
  { label: "On-K Dining", href: "/dining" },
  { label: "On-K Activity", href: "/activity" },
  { label: "On-K Photo", href: "/photo" },
]

const languages = [
  { code: "EN", label: "English" },
  { code: "ID", label: "Indonesia" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("EN")
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      {/* Unified top service nav */}
      <div className="border-b border-border/50 bg-[#F6F8FC]">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-center px-5 lg:px-8">
          <nav className="flex items-center gap-1" aria-label="Service navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all ${
                    isActive
                      ? "bg-[#2563A8] text-white shadow-sm"
                      : "text-[#6B7A99] hover:bg-[#E8EDF5] hover:text-[#1A1F36]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main header bar */}
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0" aria-label="CareOnK Home">
          <span className="font-serif text-[21px] font-normal uppercase tracking-[0.08em] text-foreground">CARE</span>
          <span className="relative mx-[1px] inline-flex h-[22px] w-[22px] items-center justify-center">
            <span className="absolute inset-0 rounded-full border-[2px] border-[#D4930D]" />
            <Power className="h-[11px] w-[11px] text-[#D4930D]" strokeWidth={2.5} />
          </span>
          <span className="text-[21px] font-black uppercase tracking-[0.02em] text-foreground">NK</span>
        </Link>

        {/* Center search on desktop */}
        <div className="hidden max-w-sm flex-1 px-8 lg:block">
          <div className="flex items-center gap-2 rounded-full border border-border bg-[#F6F8FC] px-4 py-2">
            <svg className="h-3.5 w-3.5 text-[#6B7A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search services..."
              className="flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-[#6B7A99]/60"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-[#F6F8FC] px-3 py-1.5 text-[12px] font-semibold text-[#6B7A99] transition-colors hover:border-[#2563A8]/30 hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{currentLang}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code)
                      setLangOpen(false)
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      currentLang === lang.code
                        ? "bg-[#2563A8]/8 text-[#2563A8] font-semibold"
                        : "text-[#6B7A99] hover:bg-[#F6F8FC] hover:text-foreground"
                    }`}
                  >
                    <span className="w-5 font-bold text-[11px]">{lang.code}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[#F6F8FC] text-[#6B7A99] transition-colors hover:border-[#2563A8]/30 hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D4930D]" />
          </button>

          {/* Auth buttons (desktop) */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className="rounded-lg border border-[#2563A8]/20 px-3.5 py-1.5 text-[12px] font-semibold text-[#2563A8] transition-all hover:border-[#2563A8]/40 hover:bg-[#2563A8]/5"
            >
              Log In
            </Link>
            <Link
              href="/signup"
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
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                  href={item.href}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-[#2563A8]/8 text-[#2563A8] font-semibold"
                      : "text-[#6B7A99] hover:bg-[#F6F8FC] hover:text-foreground"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex gap-2 border-t border-border pt-3">
                <Link
                  href="/login"
                  className="flex-1 rounded-lg border border-[#2563A8]/20 py-2.5 text-center text-[13px] font-semibold text-[#2563A8] transition-all hover:bg-[#2563A8]/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
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
