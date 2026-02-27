import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Log In - CareOnK",
  description: "Log in to your CareOnK account to manage bookings and services.",
}

export default function LoginPage() {
  return <AuthForm mode="login" />
}
