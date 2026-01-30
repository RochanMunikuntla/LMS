import { notFound } from "next/navigation"
import { getRoadmapById, getModuleById, getProblemById, getProblemDetail } from "@/lib/roadmap-data"
import { SplitPane } from "@/components/learn/split-pane"

interface PageProps {
  params: Promise<{
    roadmapId: string
    moduleId: string
    topicId: string
  }>
}

export default async function TopicDetailPage({ params }: PageProps) {
  const { roadmapId, moduleId, topicId } = await params
  const rId = Number(roadmapId)
  const mId = Number(moduleId)
  const tId = Number(topicId)

  const roadmap = getRoadmapById(rId)
  const module = getModuleById(rId, mId)
  const problem = getProblemById(rId, mId, tId)
  const problemDetail = getProblemDetail(rId, mId, tId)

  if (!roadmap || !module || !problem) {
    notFound()
  }

  // Use default problem detail if not found
  const detail = problemDetail || {
    id: problem.id,
    title: problem.name,
    description: `Practice problem: ${problem.name}`,
    problemStatement: `Solve the ${problem.name} problem.`,
    inputFormat: "See problem description",
    outputFormat: "See problem description",
    examples: [{ input: "Sample input", output: "Sample output" }],
    constraints: [],
    starterCode: {
      python: "# Write your solution here\n",
      javascript: "// Write your solution here\n",
      cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}",
      java: "public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}",
    },
  }

  return (
    <SplitPane
      roadmapId={roadmapId}
      roadmapTitle={roadmap.title}
      moduleTitle={module.title}
      problemName={problem.name}
      problem={detail}
      difficulty={problem.difficulty}
    />
  )
}
