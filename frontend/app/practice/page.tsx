import { Navbar } from "@/components/dashboard/navbar"
import { PracticePage } from "@/components/practice/practice-page"

export default function Practice() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PracticePage />
    </div>
  )
}
