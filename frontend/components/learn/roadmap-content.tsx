"use client"

import { useState } from "react"
import { RoadmapHeader } from "@/components/learn/roadmap-header"
import { ModuleAccordion } from "@/components/learn/module-accordion"
import { DeenrollModal } from "@/components/learn/deenroll-modal"
import type { Roadmap } from "@/lib/roadmap-data"

interface RoadmapContentProps {
  roadmap: Roadmap
}

export function RoadmapContent({ roadmap }: RoadmapContentProps) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [showDeenrollModal, setShowDeenrollModal] = useState(false)

  const handleEnroll = () => {
    setIsEnrolled(true)
  }

  const handleDeenrollClick = () => {
    setShowDeenrollModal(true)
  }

  const handleConfirmDeenroll = () => {
    setIsEnrolled(false)
    setShowDeenrollModal(false)
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-6">
      <RoadmapHeader
        title={roadmap.title}
        description={roadmap.description}
        level={roadmap.level}
        domain={roadmap.domain}
        icon={roadmap.icon}
        isEnrolled={isEnrolled}
        onEnroll={handleEnroll}
        onDeenroll={handleDeenrollClick}
      />

      <hr className="my-6 border-gray-200" />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Modules</h2>
        <ModuleAccordion modules={roadmap.modules} roadmapId={roadmap.id} isLocked={!isEnrolled} />
      </section>

      <DeenrollModal
        isOpen={showDeenrollModal}
        onClose={() => setShowDeenrollModal(false)}
        onConfirm={handleConfirmDeenroll}
        roadmapTitle={roadmap.title}
      />
    </main>
  )
}
