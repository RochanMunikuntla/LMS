import Link from "next/link"
import { Heart } from "lucide-react"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  tags: string[]
  status: "open" | "in-review" | "closed"
  date: string
  likes: number
  isLiked?: boolean
}

const statusConfig = {
  open: { label: "open", color: "text-emerald-600", dot: "bg-emerald-500" },
  "in-review": { label: "in-review", color: "text-amber-600", dot: "bg-amber-500" },
  closed: { label: "closed", color: "text-gray-500", dot: "bg-gray-400" },
}

export function ProjectCard({ id, title, description, tags, status, date, likes, isLiked }: ProjectCardProps) {
  const statusInfo = statusConfig[status]

  return (
    <Link href={`/projecthub/${id}`}>
      <div className="rounded-[20px] border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className={isLiked ? "text-red-500" : ""}>{likes}</span>
          </div>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className={`flex items-center gap-1.5 ${statusInfo.color}`}>
              <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`}></span>
              {statusInfo.label}
            </span>
            <span className="text-gray-400">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
