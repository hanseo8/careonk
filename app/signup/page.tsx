import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign Up - CareOnK",
  description: "Create your CareOnK account for premium Korean concierge services.",
}

export default function SignUpPage() {
  return <AuthForm mode="signup" />
}
