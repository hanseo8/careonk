"use client"

import { useState } from "react"
import Link from "next/link"
import { Power, Eye, EyeOff, Mail, Phone, Lock, ArrowRight, Globe, Shield } from "lucide-react"

type AuthMode = "signup" | "login"
type InputMethod = "email" | "phone"

interface AuthFormProps {
  mode: AuthMode
}

export function AuthForm({ mode }: AuthFormProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>("email")
  const [showPassword, setShowPassword] = useState(false)
  const [currentLang, setCurrentLang] = useState<"EN" | "ID">("EN")

  const isSignUp = mode === "signup"

  const t = {
    EN: {
      title: isSignUp ? "Create Your Account" : "Welcome Back",
      subtitle: isSignUp
        ? "Start your premium Korean concierge experience"
        : "Log in to manage your bookings & services",
      emailTab: "Email",
      phoneTab: "WhatsApp / Phone",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "+62 812 3456 7890",
      namePlaceholder: "Full Name",
      passwordPlaceholder: "Password",
      confirmPlaceholder: "Confirm Password",
      ctaPrimary: isSignUp ? "Sign Up" : "Log In",
      ctaSecondary: isSignUp ? "Already have an account?" : "Don't have an account?",
      ctaLink: isSignUp ? "Log In" : "Sign Up",
      forgotPassword: "Forgot password?",
      orContinue: "or continue with",
      terms: "By continuing, you agree to our Terms of Service and Privacy Policy.",
      trust: "Your data is securely encrypted and protected by CareOnK.",
    },
    ID: {
      title: isSignUp ? "Buat Akun Anda" : "Selamat Datang Kembali",
      subtitle: isSignUp
        ? "Mulai pengalaman concierge premium Korea Anda"
        : "Masuk untuk mengelola pemesanan & layanan Anda",
      emailTab: "Email",
      phoneTab: "WhatsApp / Telepon",
      emailPlaceholder: "email@anda.com",
      phonePlaceholder: "+62 812 3456 7890",
      namePlaceholder: "Nama Lengkap",
      passwordPlaceholder: "Kata Sandi",
      confirmPlaceholder: "Konfirmasi Kata Sandi",
      ctaPrimary: isSignUp ? "Daftar" : "Masuk",
      ctaSecondary: isSignUp ? "Sudah punya akun?" : "Belum punya akun?",
      ctaLink: isSignUp ? "Masuk" : "Daftar",
      forgotPassword: "Lupa kata sandi?",
      orContinue: "atau lanjutkan dengan",
      terms: "Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.",
      trust: "Data Anda dienkripsi dan dilindungi secara aman oleh CareOnK.",
    },
  }

  const text = t[currentLang]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Subtle decorative gold lines */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#D4930D]/[0.03]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#2563A8]/[0.03]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-12">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-0" aria-label="CareOnK Home">
          <span className="font-serif text-[26px] font-normal uppercase tracking-[0.08em] text-foreground">CARE</span>
          <span className="relative mx-[1px] inline-flex h-[26px] w-[26px] items-center justify-center">
            <span className="absolute inset-0 rounded-full border-[2.5px] border-[#D4930D]" />
            <Power className="h-[13px] w-[13px] text-[#D4930D]" strokeWidth={2.5} />
          </span>
          <span className="text-[26px] font-black uppercase tracking-[0.02em] text-foreground">NK</span>
        </Link>

        {/* Card */}
        <div className="w-full max-w-[420px] rounded-2xl border border-border bg-card px-7 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-balance font-serif text-[26px] font-semibold leading-tight text-foreground">
              {text.title}
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{text.subtitle}</p>
          </div>

          {/* Input method tabs */}
          <div className="mb-6 flex overflow-hidden rounded-xl border border-border bg-secondary">
            <button
              onClick={() => setInputMethod("email")}
              className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-[13px] font-semibold transition-all ${
                inputMethod === "email"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              {text.emailTab}
            </button>
            <button
              onClick={() => setInputMethod("phone")}
              className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-[13px] font-semibold transition-all ${
                inputMethod === "phone"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              {text.phoneTab}
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name field (sign up only) */}
            {isSignUp && (
              <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={text.namePlaceholder}
                  className="h-12 w-full rounded-xl border border-border bg-secondary/50 pl-11 pr-4 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[#2563A8] focus:ring-2 focus:ring-[#2563A8]/10"
                />
              </div>
            )}

            {/* Email or Phone field */}
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                {inputMethod === "email" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
              </div>
              <input
                type={inputMethod === "email" ? "email" : "tel"}
                placeholder={inputMethod === "email" ? text.emailPlaceholder : text.phonePlaceholder}
                className="h-12 w-full rounded-xl border border-border bg-secondary/50 pl-11 pr-4 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[#2563A8] focus:ring-2 focus:ring-[#2563A8]/10"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={text.passwordPlaceholder}
                className="h-12 w-full rounded-xl border border-border bg-secondary/50 pl-11 pr-11 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[#2563A8] focus:ring-2 focus:ring-[#2563A8]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Confirm Password (sign up only) */}
            {isSignUp && (
              <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={text.confirmPlaceholder}
                  className="h-12 w-full rounded-xl border border-border bg-secondary/50 pl-11 pr-4 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[#2563A8] focus:ring-2 focus:ring-[#2563A8]/10"
                />
              </div>
            )}

            {/* Forgot password (login only) */}
            {!isSignUp && (
              <div className="flex justify-end">
                <a href="#" className="text-[13px] font-medium text-[#2563A8] transition-colors hover:text-[#1A4F8B]">
                  {text.forgotPassword}
                </a>
              </div>
            )}

            {/* Primary CTA */}
            <button
              type="submit"
              className="group mt-1 flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#2563A8] text-[15px] font-bold text-white shadow-[0_2px_12px_rgba(37,99,168,0.25)] transition-all hover:bg-[#1A4F8B] hover:shadow-[0_4px_20px_rgba(37,99,168,0.3)] active:scale-[0.98]"
            >
              <Power className="h-4 w-4 text-[#D4930D]" strokeWidth={3} />
              {text.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[12px] font-medium text-muted-foreground">{text.orContinue}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social login buttons */}
          <div className="flex items-center justify-center gap-3">
            {/* Google */}
            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-[#2563A8]/30 hover:shadow-md"
              aria-label="Continue with Google"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>

            {/* Facebook */}
            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-[#2563A8]/30 hover:shadow-md"
              aria-label="Continue with Facebook"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            {/* Apple */}
            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-[#2563A8]/30 hover:shadow-md"
              aria-label="Continue with Apple"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#000000">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>

            {/* WhatsApp */}
            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-[#25D366]/40 hover:shadow-md"
              aria-label="Continue with WhatsApp"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </button>

            {/* LINE */}
            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-[#00B900]/40 hover:shadow-md"
              aria-label="Continue with LINE"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#00B900">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </button>
          </div>

          {/* Switch auth mode */}
          <div className="mt-6 text-center">
            <p className="text-[13px] text-muted-foreground">
              {text.ctaSecondary}{" "}
              <Link
                href={isSignUp ? "/login" : "/signup"}
                className="font-semibold text-[#2563A8] transition-colors hover:text-[#1A4F8B]"
              >
                {text.ctaLink}
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="mt-5 max-w-[380px] text-center text-[11px] leading-relaxed text-muted-foreground/70">
          {text.terms}
        </p>

        {/* Trust + Language */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-[#2563A8]" />
            <p className="text-[11px] font-medium text-muted-foreground">{text.trust}</p>
          </div>

          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-card p-0.5">
            {(["EN", "ID"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all ${
                  currentLang === lang
                    ? "bg-[#2563A8] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="h-3 w-3" />
                {lang === "EN" ? "English" : "Indonesia"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
