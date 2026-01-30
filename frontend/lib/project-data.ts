export interface Collaborator {
  id: number
  name: string
  avatar: string
}

export interface ProjectDetail {
  id: number
  title: string
  description: string
  tags: string[]
  status: "open" | "in-review" | "closed"
  date: string
  likes: number
  isLiked: boolean
  ownerId: number // Added ownerId field
  author: {
    name: string
    avatar: string
  }
  collaborators: Collaborator[]
}

export const currentUserId = 1

export const projectsData: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: "Student-centric LMS",
    description:
      "Build a comprehensive learning management system focused on accessibility and peer-to-peer collaboration modules. Includes real-time chat and grade tracking features. The platform aims to create an inclusive learning environment where students can interact, share resources, and track their academic progress seamlessly.",
    tags: ["React", "Node.js", "MongoDB"],
    status: "open",
    date: "Dec 14, 2025",
    likes: 0,
    isLiked: false,
    ownerId: 1, // Owned by current user
    author: {
      name: "Alex Johnson",
      avatar: "/student-avatar-alex.jpg",
    },
    collaborators: [
      { id: 1, name: "Sarah Chen", avatar: "/student-avatar-sarah.jpg" },
      { id: 2, name: "Mike Peters", avatar: "/student-avatar-mike.jpg" },
    ],
  },
  2: {
    id: 2,
    title: "AI-Driven Plagiarism Checker",
    description:
      "Develop a tool that uses machine learning to detect semantic similarities in student essays beyond just keyword matching. This project leverages natural language processing and deep learning models to analyze text structure, writing patterns, and contextual meaning to identify potential plagiarism with high accuracy.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    status: "in-review",
    date: "Dec 10, 2025",
    likes: 12,
    isLiked: true,
    ownerId: 2, // Not owned by current user
    author: {
      name: "Emily Davis",
      avatar: "/student-avatar-emily.jpg",
    },
    collaborators: [
      { id: 1, name: "Alex Johnson", avatar: "/student-avatar-alex.jpg" }, // Current user is collaborator
      { id: 4, name: "Lisa Park", avatar: "/student-avatar-lisa.jpg" },
      { id: 5, name: "Tom Brown", avatar: "/student-avatar-tom.jpg" },
    ],
  },
  3: {
    id: 3,
    title: "Blockchain Voting System",
    description:
      "An immutable voting platform for student union elections designed to ensure transparency and prevent double-voting. Built on Ethereum smart contracts, this system provides a secure, verifiable, and tamper-proof method for conducting campus elections while maintaining voter privacy.",
    tags: ["Solidity", "Ethereum", "Next.js"],
    status: "open",
    date: "Nov 28, 2025",
    likes: 4,
    isLiked: false,
    ownerId: 1, // Owned by current user
    author: {
      name: "Alex Johnson",
      avatar: "/student-avatar-alex.jpg",
    },
    collaborators: [{ id: 6, name: "Anna Lee", avatar: "/student-avatar-anna.jpg" }],
  },
  4: {
    id: 4,
    title: "Campus Event Tracker",
    description:
      "A mobile-first web app to aggregate all campus events, workshops, and seminars with calendar synchronization features. Students can discover events, RSVP, receive reminders, and sync important dates directly to their personal calendars.",
    tags: ["TypeScript", "PostgreSQL"],
    status: "closed",
    date: "Nov 15, 2025",
    likes: 21,
    isLiked: false,
    ownerId: 3,
    author: {
      name: "Jessica Taylor",
      avatar: "/student-avatar-jessica.jpg",
    },
    collaborators: [
      { id: 1, name: "Alex Johnson", avatar: "/student-avatar-alex.jpg" }, // Current user is collaborator
      { id: 8, name: "Rachel Green", avatar: "/student-avatar-rachel.jpg" },
    ],
  },
  5: {
    id: 5,
    title: "Marketplace for Textbooks",
    description:
      "Peer-to-peer marketplace specifically for used academic resources. Includes escrow payments and local pickup scheduling. The platform connects students looking to buy and sell textbooks within the same campus, reducing costs and promoting sustainability.",
    tags: ["Vue.js", "Supabase"],
    status: "open",
    date: "Nov 02, 2025",
    likes: 56,
    isLiked: true,
    ownerId: 1, // Owned by current user
    author: {
      name: "Alex Johnson",
      avatar: "/student-avatar-alex.jpg",
    },
    collaborators: [
      { id: 9, name: "Megan White", avatar: "/student-avatar-megan.jpg" },
      { id: 10, name: "Kevin Liu", avatar: "/student-avatar-kevin.jpg" },
      { id: 11, name: "Sophie Turner", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 12, name: "Brian Cox", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
}

export function getProjectById(id: number): ProjectDetail | undefined {
  return projectsData[id]
}

export function getUserProjects(): ProjectDetail[] {
  return Object.values(projectsData).filter((p) => p.ownerId === currentUserId)
}

export function getUserCollaborations(): ProjectDetail[] {
  return Object.values(projectsData).filter(
    (p) => p.ownerId !== currentUserId && p.collaborators.some((c) => c.id === currentUserId),
  )
}

export function isProjectOwner(projectId: number): boolean {
  const project = projectsData[projectId]
  return project?.ownerId === currentUserId
}
