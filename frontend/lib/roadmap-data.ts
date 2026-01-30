export interface Problem {
  id: number
  name: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "completed" | "attempted" | "not-attempted"
}

export interface Module {
  id: number
  number: number
  title: string
  description: string
  problems: Problem[]
}

export interface Roadmap {
  id: number
  title: string
  description: string
  domain: string
  level: "Beginner" | "Intermediate" | "Advanced"
  icon: string
  modules: Module[]
}

export const roadmapsData: Roadmap[] = [
  {
    id: 1,
    title: "Python",
    description: "Master the art of writing clean Python code and implementing core data structures and algorithms.",
    domain: "Programming",
    level: "Beginner",
    icon: "python",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Output & Basic Math Operators",
        description: "Learn to print output and perform basic arithmetic operations in Python.",
        problems: [
          { id: 1, name: "Hello World", difficulty: "Easy", status: "completed" },
          { id: 2, name: "Sum of Two Numbers", difficulty: "Easy", status: "completed" },
          { id: 3, name: "Area of Rectangle", difficulty: "Easy", status: "attempted" },
          { id: 4, name: "Celsius to Fahrenheit", difficulty: "Easy", status: "not-attempted" },
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Variables & Data Types",
        description: "Understand different data types and how to work with variables.",
        problems: [
          { id: 5, name: "Variable Assignment", difficulty: "Easy", status: "completed" },
          { id: 6, name: "Type Conversion", difficulty: "Easy", status: "not-attempted" },
          { id: 7, name: "String Formatting", difficulty: "Medium", status: "not-attempted" },
        ],
      },
      {
        id: 3,
        number: 3,
        title: "Conditional Statements",
        description: "Master if-else statements and conditional logic.",
        problems: [
          { id: 8, name: "Even or Odd", difficulty: "Easy", status: "not-attempted" },
          { id: 9, name: "Grade Calculator", difficulty: "Medium", status: "not-attempted" },
          { id: 10, name: "Leap Year Checker", difficulty: "Medium", status: "not-attempted" },
          { id: 11, name: "Triangle Validity", difficulty: "Medium", status: "not-attempted" },
        ],
      },
      {
        id: 4,
        number: 4,
        title: "Loops & Iteration",
        description: "Learn for and while loops for repetitive tasks.",
        problems: [
          { id: 12, name: "Print 1 to N", difficulty: "Easy", status: "not-attempted" },
          { id: 13, name: "Factorial", difficulty: "Easy", status: "not-attempted" },
          { id: 14, name: "Fibonacci Sequence", difficulty: "Medium", status: "not-attempted" },
          { id: 15, name: "Prime Number Check", difficulty: "Medium", status: "not-attempted" },
          { id: 16, name: "Pattern Printing", difficulty: "Hard", status: "not-attempted" },
        ],
      },
      {
        id: 5,
        number: 5,
        title: "Functions",
        description: "Create reusable code blocks with functions and parameters.",
        problems: [
          { id: 17, name: "Simple Function", difficulty: "Easy", status: "not-attempted" },
          { id: 18, name: "Function with Return", difficulty: "Easy", status: "not-attempted" },
          { id: 19, name: "Default Parameters", difficulty: "Medium", status: "not-attempted" },
          { id: 20, name: "Recursive Functions", difficulty: "Hard", status: "not-attempted" },
        ],
      },
      {
        id: 6,
        number: 6,
        title: "Lists & Arrays",
        description: "Work with collections of data using Python lists.",
        problems: [
          { id: 21, name: "List Operations", difficulty: "Easy", status: "not-attempted" },
          { id: 22, name: "Find Maximum", difficulty: "Easy", status: "not-attempted" },
          { id: 23, name: "List Reversal", difficulty: "Medium", status: "not-attempted" },
          { id: 24, name: "Two Sum", difficulty: "Medium", status: "not-attempted" },
          { id: 25, name: "Merge Sorted Lists", difficulty: "Hard", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Learn the building blocks of web development with modern JavaScript ES6+ syntax and patterns.",
    domain: "Web Development",
    level: "Beginner",
    icon: "javascript",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Variables & Console",
        description: "Introduction to JavaScript variables and console output.",
        problems: [
          { id: 1, name: "Hello JavaScript", difficulty: "Easy", status: "not-attempted" },
          { id: 2, name: "Let vs Const", difficulty: "Easy", status: "not-attempted" },
          { id: 3, name: "Template Literals", difficulty: "Easy", status: "not-attempted" },
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Functions & Scope",
        description: "Understand functions, arrow functions, and variable scope.",
        problems: [
          { id: 4, name: "Arrow Functions", difficulty: "Easy", status: "not-attempted" },
          { id: 5, name: "Closure Example", difficulty: "Medium", status: "not-attempted" },
          { id: 6, name: "Higher Order Functions", difficulty: "Medium", status: "not-attempted" },
        ],
      },
      {
        id: 3,
        number: 3,
        title: "Arrays & Objects",
        description: "Work with arrays and objects in JavaScript.",
        problems: [
          { id: 7, name: "Array Methods", difficulty: "Easy", status: "not-attempted" },
          { id: 8, name: "Object Destructuring", difficulty: "Medium", status: "not-attempted" },
          { id: 9, name: "Spread Operator", difficulty: "Medium", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description: "Build a strong foundation in DSA concepts essential for technical interviews and problem solving.",
    domain: "Computer Science",
    level: "Intermediate",
    icon: "default",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Time & Space Complexity",
        description: "Understand Big O notation and algorithm analysis.",
        problems: [
          { id: 1, name: "Analyze Loop", difficulty: "Easy", status: "not-attempted" },
          { id: 2, name: "Nested Loop Analysis", difficulty: "Medium", status: "not-attempted" },
        ],
      },
      {
        id: 2,
        number: 2,
        title: "Arrays & Strings",
        description: "Master array and string manipulation techniques.",
        problems: [
          { id: 3, name: "Reverse String", difficulty: "Easy", status: "not-attempted" },
          { id: 4, name: "Two Pointers", difficulty: "Medium", status: "not-attempted" },
          { id: 5, name: "Sliding Window", difficulty: "Hard", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "SQL & Database Design",
    description: "Design efficient database schemas and write optimized queries for real-world applications.",
    domain: "Databases",
    level: "Beginner",
    icon: "database",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Basic SELECT Queries",
        description: "Learn to retrieve data from tables.",
        problems: [
          { id: 1, name: "Select All Columns", difficulty: "Easy", status: "not-attempted" },
          { id: 2, name: "WHERE Clause", difficulty: "Easy", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    description: "Deploy and manage scalable applications using Amazon Web Services core infrastructure.",
    domain: "Cloud",
    level: "Intermediate",
    icon: "cloud",
    modules: [
      {
        id: 1,
        number: 1,
        title: "AWS Fundamentals",
        description: "Introduction to AWS services and console.",
        problems: [
          { id: 1, name: "Create S3 Bucket", difficulty: "Easy", status: "not-attempted" },
          { id: 2, name: "Launch EC2 Instance", difficulty: "Medium", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Machine Learning Basics",
    description: "Understand fundamental ML concepts, algorithms, and practical implementation with Python.",
    domain: "AI / ML",
    level: "Intermediate",
    icon: "ai",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Introduction to ML",
        description: "Learn basic ML concepts and terminology.",
        problems: [
          { id: 1, name: "Data Preprocessing", difficulty: "Easy", status: "not-attempted" },
          { id: 2, name: "Train Test Split", difficulty: "Easy", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "System Design",
    description: "Learn to design large-scale distributed systems and prepare for senior engineering interviews.",
    domain: "Architecture",
    level: "Advanced",
    icon: "default",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Scalability Basics",
        description: "Understand horizontal vs vertical scaling.",
        problems: [
          { id: 1, name: "Design URL Shortener", difficulty: "Medium", status: "not-attempted" },
          { id: 2, name: "Design Rate Limiter", difficulty: "Hard", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "UI/UX Design Principles",
    description: "Create user-centered designs with accessibility and usability best practices in mind.",
    domain: "Design",
    level: "Beginner",
    icon: "design",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Design Fundamentals",
        description: "Learn color theory, typography, and layout.",
        problems: [
          { id: 1, name: "Create Color Palette", difficulty: "Easy", status: "not-attempted" },
          { id: 2, name: "Typography Hierarchy", difficulty: "Medium", status: "not-attempted" },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Cybersecurity Fundamentals",
    description: "Understand security principles, common vulnerabilities, and how to build secure applications.",
    domain: "Security",
    level: "Intermediate",
    icon: "security",
    modules: [
      {
        id: 1,
        number: 1,
        title: "Security Basics",
        description: "Introduction to cybersecurity concepts.",
        problems: [
          { id: 1, name: "Identify Vulnerabilities", difficulty: "Easy", status: "not-attempted" },
          { id: 2, name: "SQL Injection Prevention", difficulty: "Medium", status: "not-attempted" },
        ],
      },
    ],
  },
]

export function getRoadmapById(id: number): Roadmap | undefined {
  return roadmapsData.find((r) => r.id === id)
}

export function getModuleById(roadmapId: number, moduleId: number): Module | undefined {
  const roadmap = getRoadmapById(roadmapId)
  return roadmap?.modules.find((m) => m.id === moduleId)
}

export function getProblemById(roadmapId: number, moduleId: number, problemId: number): Problem | undefined {
  const module = getModuleById(roadmapId, moduleId)
  return module?.problems.find((p) => p.id === problemId)
}

export interface ProblemDetail {
  id: number
  title: string
  description: string
  problemStatement: string
  inputFormat: string
  outputFormat: string
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  constraints: string[]
  starterCode: {
    python: string
    javascript: string
    cpp: string
    java: string
  }
}

export const problemDetails: Record<string, ProblemDetail> = {
  "1-1-1": {
    id: 1,
    title: "Hello World",
    description:
      "This is your first programming challenge. The classic 'Hello World' program is traditionally used to introduce beginners to a new programming language. Your task is to write a program that outputs a greeting message.",
    problemStatement: "Write a program that prints the string 'Hello, World!' to the standard output.",
    inputFormat: "There is no input for this problem.",
    outputFormat: "Output a single line containing the text: Hello, World!",
    examples: [
      {
        input: "No input",
        output: "Hello, World!",
        explanation: "Simply print the greeting message exactly as shown.",
      },
    ],
    constraints: ["Output must match exactly, including punctuation and capitalization"],
    starterCode: {
      python: '# Write your solution here\nprint("Hello, World!")',
      javascript: '// Write your solution here\nconsole.log("Hello, World!");',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      java: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n        System.out.println("Hello, World!");\n    }\n}',
    },
  },
  "1-1-2": {
    id: 2,
    title: "Sum of Two Numbers",
    description:
      "Basic arithmetic operations are fundamental to programming. In this problem, you will practice reading input and performing addition.",
    problemStatement: "Given two integers A and B, compute and print their sum.",
    inputFormat: "Two space-separated integers A and B on a single line.",
    outputFormat: "A single integer representing the sum of A and B.",
    examples: [
      {
        input: "3 5",
        output: "8",
        explanation: "3 + 5 = 8",
      },
      {
        input: "-2 7",
        output: "5",
        explanation: "-2 + 7 = 5",
      },
    ],
    constraints: ["-10^9 ≤ A, B ≤ 10^9"],
    starterCode: {
      python: "# Read two integers and print their sum\na, b = map(int, input().split())\nprint(a + b)",
      javascript:
        '// Read input from stdin\nconst readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (line) => {\n    const [a, b] = line.split(" ").map(Number);\n    console.log(a + b);\n});',
      cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}",
      java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(a + b);\n    }\n}",
    },
  },
  "1-1-3": {
    id: 3,
    title: "Area of Rectangle",
    description:
      "Calculate the area of a rectangle given its length and width. This problem helps you practice basic multiplication and input handling.",
    problemStatement: "Given the length and width of a rectangle, calculate and print its area.",
    inputFormat: "Two space-separated integers L (length) and W (width) on a single line.",
    outputFormat: "A single integer representing the area of the rectangle.",
    examples: [
      {
        input: "5 3",
        output: "15",
        explanation: "Area = length × width = 5 × 3 = 15",
      },
    ],
    constraints: ["1 ≤ L, W ≤ 10^4"],
    starterCode: {
      python: "# Calculate area of rectangle\nl, w = map(int, input().split())\n# Write your solution here",
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (line) => {\n    const [l, w] = line.split(" ").map(Number);\n    // Write your solution here\n});',
      cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int l, w;\n    cin >> l >> w;\n    // Write your solution here\n    return 0;\n}",
      java: "import java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int l = sc.nextInt();\n        int w = sc.nextInt();\n        // Write your solution here\n    }\n}",
    },
  },
}

export function getProblemDetail(roadmapId: number, moduleId: number, problemId: number): ProblemDetail | undefined {
  const key = `${roadmapId}-${moduleId}-${problemId}`
  return problemDetails[key]
}
