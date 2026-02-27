"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2.5 lg:right-8">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-[13px] font-medium text-foreground">
            Chat di <span className="font-bold text-[#25D366]">Bahasa</span>
          </p>
          <button
            onClick={() => setShowTooltip(false)}
            className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close tooltip"
          >
            <X className="h-3 w-3" />
          </button>
          <div className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 border-b border-r border-border bg-card" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href="https://wa.me/821012345678?text=Halo%20CareOnK!"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all hover:bg-[#1EBE57] hover:shadow-[0_6px_28px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95"
        aria-label="Chat via WhatsApp in Bahasa Indonesia"
      >
        <MessageCircle className="h-7 w-7 text-white" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/25" />
      </a>
    </div>
  )
}
