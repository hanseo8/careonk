import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ActivityContent } from "@/components/activity/activity-content"

export const metadata: Metadata = {
  title: "On-K Activity - CareOnK",
  description: "Explore exciting Korean activities. Hanbok experiences, K-Pop concerts, theme parks, spa & wellness, cooking classes, and more.",
}

export default function ActivityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ActivityContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
