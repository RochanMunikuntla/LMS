import { getProblemById, practiceProblems } from "@/lib/practice-data"
import { PracticeSplitPane } from "@/components/practice/practice-split-pane"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return practiceProblems.map((problem) => ({
    problemId: problem.id,
  }))
}

export default async function PracticeProblemPage({
  params,
}: {
  params: Promise<{ problemId: string }>
}) {
  const { problemId } = await params
  const problem = getProblemById(problemId)

  if (!problem) {
    notFound()
  }

  return <PracticeSplitPane problem={problem} />
}
