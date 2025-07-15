import { HeroSection } from "@/components/hero-section"
import { DaoDashboard } from "@/components/dao-dashboard"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <DaoDashboard />
    </div>
  )
}
