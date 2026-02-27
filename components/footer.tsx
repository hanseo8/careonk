import { Power, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-0" aria-label="CareOnK Home">
            <span className="font-serif text-lg font-normal uppercase tracking-[0.08em] text-foreground">CARE</span>
            <span className="relative mx-[1px] inline-flex h-[19px] w-[19px] items-center justify-center">
              <span className="absolute inset-0 rounded-full border-[2px] border-[#D4930D]" />
              <Power className="h-[10px] w-[10px] text-[#D4930D]" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-black uppercase tracking-[0.02em] text-foreground">NK</span>
          </a>

          {/* Trust statement */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
            <Shield className="h-4 w-4 text-primary" />
            <p className="text-[12px] font-medium text-muted-foreground">
              All partners verified & officially registered in South Korea
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
            {["About Us", "Services", "Partners", "Careers", "Privacy Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="h-px w-full max-w-sm bg-border" />

          <p className="text-[12px] text-muted-foreground">
            {"2026 CareOnK. All rights reserved. PT CareOnK Indonesia."}
          </p>
        </div>
      </div>
    </footer>
  )
}
