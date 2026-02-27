"use client"

import { useRouter } from "next/navigation"
import { GateIntro } from "@/components/gate-intro"

export default function RootPage() {
  const router = useRouter()

  return (
    <GateIntro
      onEnter={() => router.push("/home")}
    />
  )
}
