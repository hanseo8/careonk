import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PhotoContent } from "@/components/photo/photo-content"

export const metadata: Metadata = {
  title: "On-K Photo - CareOnK",
  description: "Discover the best Korean photo studios. ID portraits, concept shoots, Hanbok photos, wedding photography, candid shots, and more.",
}

export default function PhotoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <PhotoContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
