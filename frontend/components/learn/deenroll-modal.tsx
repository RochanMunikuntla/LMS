"use client"

import { X, AlertTriangle } from "lucide-react"

interface DeenrollModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  roadmapTitle: string
}

export function DeenrollModal({ isOpen, onClose, onConfirm, roadmapTitle }: DeenrollModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-[20px] bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Confirm De-enrollment</h3>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to de-enroll from <span className="font-medium text-gray-900">{roadmapTitle}</span>?
            You will lose access to all modules and your progress will not be saved.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-[6px] border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-[6px] bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700"
          >
            Yes, De-enroll
          </button>
        </div>
      </div>
    </div>
  )
}
