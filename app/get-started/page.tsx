import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Get Started - CareOnK",
    description: "Tell us about your Korea trip and we'll match you with the perfect CareOnK services.",
}

export default function GetStartedPage() {
    return <OnboardingFlow />
}
