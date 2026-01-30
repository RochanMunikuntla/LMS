export interface CourseItem {
  id: string
  title: string
  dueDate?: string
  dueTime?: string
  description?: string
  marks?: number
  fileType?: "pdf" | "ppt" | "doc" | "xls"
  fileUrl?: string
  duration?: string
  durationSeconds?: number | null // null means indefinite, number is seconds
}

export interface QuizQuestion {
  id: string
  type: "mcq" | "truefalse" | "numerical"
  question: string
  options?: string[]
  correctAnswer?: string | number | boolean
}

export interface CourseData {
  id: number
  title: string
  code: string
  semester: string
  instructor: string
  progress: number
  color: string
  icon: string
  assignments: CourseItem[]
  studyMaterials: CourseItem[]
  quizzes: (CourseItem & { questions?: QuizQuestion[] })[]
}

export const coursesData: CourseData[] = [
  {
    id: 1,
    title: "Advanced Data Structures",
    code: "CS301",
    semester: "B.Tech - IV Semester",
    instructor: "Dr. Rajesh Kumar",
    progress: 83,
    color: "bg-gray-400",
    icon: "database",
    assignments: [
      {
        id: "a1",
        title: "Binary Search Tree Implementation",
        dueDate: "Jan 25, 2026",
        dueTime: "11:59 PM",
        marks: 50,
        description:
          "Implement a Binary Search Tree (BST) with the following operations: insert, delete, search, and traversal (inorder, preorder, postorder). Your implementation should handle edge cases such as duplicate values and empty trees. Submit your code along with a brief report explaining your approach and time complexity analysis.",
      },
      {
        id: "a2",
        title: "AVL Tree Balancing Assignment",
        dueDate: "Feb 1, 2026",
        dueTime: "11:59 PM",
        marks: 60,
        description:
          "Extend your BST implementation to create an AVL tree that maintains balance after each insertion and deletion. Implement all four rotation types (LL, RR, LR, RL) and demonstrate their usage with test cases.",
      },
      {
        id: "a3",
        title: "Graph Traversal Algorithms",
        dueDate: "Feb 10, 2026",
        dueTime: "11:59 PM",
        marks: 70,
        description:
          "Implement BFS and DFS algorithms for graph traversal. Apply these algorithms to solve practical problems such as finding shortest paths and detecting cycles in directed and undirected graphs.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "Lecture Notes - Trees and Binary Trees", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Video: Understanding AVL Rotations", fileType: "ppt", fileUrl: "/sample.pptx" },
      { id: "m3", title: "Reference: Graph Theory Basics", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m4", title: "Practice Problems - Heaps", fileType: "doc", fileUrl: "/sample.docx" },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Quiz 1: Tree Structures",
        dueDate: "Jan 22, 2026",
        dueTime: "10:00 AM",
        duration: "30 minutes",
        durationSeconds: 1800, // 30 minutes in seconds
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "What is the time complexity of searching in a balanced BST?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: "O(log n)",
          },
          {
            id: "q1-2",
            type: "truefalse",
            question: "In a BST, the left child is always greater than the parent node.",
            correctAnswer: false,
          },
          {
            id: "q1-3",
            type: "mcq",
            question: "Which traversal of a BST gives nodes in sorted order?",
            options: ["Preorder", "Postorder", "Inorder", "Level order"],
            correctAnswer: "Inorder",
          },
          {
            id: "q1-4",
            type: "numerical",
            question: "What is the maximum number of nodes at level 3 of a binary tree? (Root is level 0)",
            correctAnswer: 8,
          },
          {
            id: "q1-5",
            type: "mcq",
            question: "What is the height of a complete binary tree with 15 nodes?",
            options: ["2", "3", "4", "5"],
            correctAnswer: "3",
          },
        ],
      },
      {
        id: "q2",
        title: "Quiz 2: Graph Algorithms",
        dueDate: "Feb 5, 2026",
        dueTime: "10:00 AM",
        duration: "45 minutes",
        durationSeconds: 2700, // 45 minutes in seconds
        questions: [
          {
            id: "q2-1",
            type: "mcq",
            question: "Which data structure is used in BFS?",
            options: ["Stack", "Queue", "Heap", "Tree"],
            correctAnswer: "Queue",
          },
          {
            id: "q2-2",
            type: "truefalse",
            question: "DFS uses a queue data structure for traversal.",
            correctAnswer: false,
          },
          {
            id: "q2-3",
            type: "numerical",
            question: "In a complete graph with 5 vertices, how many edges are there?",
            correctAnswer: 10,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "C++ for CodeChef",
    code: "TR101",
    semester: "Training",
    instructor: "Prof. Anita Sharma",
    progress: 0,
    color: "bg-amber-300",
    icon: "code",
    assignments: [
      {
        id: "a1",
        title: "Basic I/O Problems Set",
        dueDate: "Jan 28, 2026",
        dueTime: "11:59 PM",
        marks: 30,
        description:
          "Solve the following 10 basic input/output problems from CodeChef. Focus on understanding cin/cout operations, handling multiple test cases, and proper formatting of output.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "C++ STL Quick Reference Guide", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Video: Competitive Programming Basics", fileType: "ppt", fileUrl: "/sample.pptx" },
    ],
    quizzes: [],
  },
  {
    id: 3,
    title: "Cloud Infrastructure and Services",
    code: "CS405",
    semester: "B.Tech - IV Semester",
    instructor: "Dr. Priya Menon",
    progress: 0,
    color: "bg-emerald-400",
    icon: "cloud",
    assignments: [
      {
        id: "a1",
        title: "AWS EC2 Setup Report",
        dueDate: "Jan 30, 2026",
        dueTime: "11:59 PM",
        marks: 40,
        description:
          "Set up an AWS EC2 instance and document the process. Include screenshots of each step and explain the configuration choices you made for instance type, security groups, and storage.",
      },
      {
        id: "a2",
        title: "Docker Container Deployment",
        dueDate: "Feb 8, 2026",
        dueTime: "11:59 PM",
        marks: 50,
        description:
          "Create a Dockerfile for a simple web application and deploy it to a container. Document the containerization process and explain the benefits of using Docker for deployment.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "Introduction to Cloud Computing", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "AWS Services Overview", fileType: "ppt", fileUrl: "/sample.pptx" },
      { id: "m3", title: "Kubernetes Fundamentals", fileType: "pdf", fileUrl: "/sample.pdf" },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Quiz: Cloud Basics",
        dueDate: "Jan 26, 2026",
        dueTime: "2:00 PM",
        duration: "20 minutes",
        durationSeconds: 1200, // 20 minutes in seconds
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "Which of the following is NOT a cloud service model?",
            options: ["IaaS", "PaaS", "SaaS", "DaaS"],
            correctAnswer: "DaaS",
          },
          {
            id: "q1-2",
            type: "truefalse",
            question: "AWS EC2 is an example of Platform as a Service (PaaS).",
            correctAnswer: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Communication Skills for Engineers",
    code: "HS201",
    semester: "B.Tech - II Semester",
    instructor: "Prof. Meera Nair",
    progress: 16,
    color: "bg-gray-300",
    icon: "message",
    assignments: [
      {
        id: "a1",
        title: "Technical Report Writing",
        dueDate: "Jan 24, 2026",
        dueTime: "5:00 PM",
        marks: 25,
        description:
          "Write a technical report on a recent technology of your choice. The report should be 1500-2000 words and follow the standard technical report format including abstract, introduction, methodology, findings, and conclusion.",
      },
      {
        id: "a2",
        title: "Presentation Skills Assessment",
        dueDate: "Feb 3, 2026",
        dueTime: "11:59 PM",
        marks: 35,
        description:
          "Prepare and deliver a 10-minute presentation on your technical report topic. You will be assessed on clarity, organization, visual aids, and delivery.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "Guide to Professional Email Writing", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Video: Effective Presentation Techniques", fileType: "ppt", fileUrl: "/sample.pptx" },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Grammar and Vocabulary Test",
        dueDate: "Jan 20, 2026",
        dueTime: "11:00 AM",
        duration: "25 minutes",
        durationSeconds: 1500, // 25 minutes in seconds
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "Choose the correct sentence:",
            options: [
              "Their going to the meeting.",
              "They're going to the meeting.",
              "There going to the meeting.",
              "Theyre going to the meeting.",
            ],
            correctAnswer: "They're going to the meeting.",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Computer Networks",
    code: "CS302",
    semester: "B.Tech - IV Semester",
    instructor: "Dr. Arun Patel",
    progress: 28,
    color: "bg-gray-400",
    icon: "network",
    assignments: [
      {
        id: "a1",
        title: "TCP/IP Protocol Analysis",
        dueDate: "Jan 27, 2026",
        dueTime: "11:59 PM",
        marks: 45,
        description:
          "Use Wireshark to capture and analyze TCP/IP packets. Document the three-way handshake process and explain the role of each field in the TCP header.",
      },
      {
        id: "a2",
        title: "Network Simulation using Packet Tracer",
        dueDate: "Feb 6, 2026",
        dueTime: "11:59 PM",
        marks: 55,
        description:
          "Design and simulate a network topology using Cisco Packet Tracer. Your network should include at least 3 subnets with proper routing configuration.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "OSI Model Reference Guide", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Lecture: Routing Protocols", fileType: "ppt", fileUrl: "/sample.pptx" },
      { id: "m3", title: "Lab Manual: Wireshark Basics", fileType: "doc", fileUrl: "/sample.docx" },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Quiz: Network Layers",
        dueDate: "Jan 23, 2026",
        dueTime: "9:00 AM",
        duration: "30 minutes",
        durationSeconds: 1800, // 30 minutes in seconds
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "Which layer of the OSI model is responsible for routing?",
            options: ["Data Link", "Network", "Transport", "Session"],
            correctAnswer: "Network",
          },
          {
            id: "q1-2",
            type: "numerical",
            question: "How many layers are there in the OSI model?",
            correctAnswer: 7,
          },
        ],
      },
      {
        id: "q2",
        title: "Quiz: IP Addressing",
        dueDate: "Feb 2, 2026",
        dueTime: "9:00 AM",
        duration: "30 minutes",
        durationSeconds: 1800, // 30 minutes in seconds
        questions: [
          {
            id: "q2-1",
            type: "mcq",
            question: "Which class of IP address has the first octet range of 128-191?",
            options: ["Class A", "Class B", "Class C", "Class D"],
            correctAnswer: "Class B",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Design and Analysis of Algorithms",
    code: "CS303",
    semester: "B.Tech - IV Semester",
    instructor: "Dr. Vikram Singh",
    progress: 0,
    color: "bg-violet-400",
    icon: "git",
    assignments: [],
    studyMaterials: [
      { id: "m1", title: "Algorithm Complexity Analysis", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Divide and Conquer Strategies", fileType: "ppt", fileUrl: "/sample.pptx" },
    ],
    quizzes: [],
  },
  {
    id: 7,
    title: "Full Stack Application Development",
    code: "CS401",
    semester: "B.Tech - IV Semester",
    instructor: "Prof. Sanjay Gupta",
    progress: 45,
    color: "bg-amber-400",
    icon: "layers",
    assignments: [
      {
        id: "a1",
        title: "React Component Library",
        dueDate: "Jan 29, 2026",
        dueTime: "11:59 PM",
        marks: 40,
        description:
          "Create a reusable React component library with at least 5 components (Button, Input, Card, Modal, Dropdown). Each component should be well-documented with props and usage examples.",
      },
      {
        id: "a2",
        title: "REST API Development",
        dueDate: "Feb 7, 2026",
        dueTime: "11:59 PM",
        marks: 50,
        description:
          "Build a RESTful API using Node.js and Express. Implement CRUD operations for a resource of your choice with proper error handling and validation.",
      },
      {
        id: "a3",
        title: "Full Stack Project Submission",
        dueDate: "Feb 20, 2026",
        dueTime: "11:59 PM",
        marks: 100,
        description:
          "Submit your complete full stack project integrating React frontend with Node.js backend. Include database integration, authentication, and deployment instructions.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "React.js Documentation", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Node.js Best Practices", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m3", title: "MongoDB Schema Design", fileType: "doc", fileUrl: "/sample.docx" },
      { id: "m4", title: "Video: Building REST APIs", fileType: "ppt", fileUrl: "/sample.pptx" },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Frontend Fundamentals Quiz",
        dueDate: "Jan 21, 2026",
        dueTime: "3:00 PM",
        duration: "35 minutes",
        durationSeconds: 2100, // 35 minutes in seconds
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "What hook is used for side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: "useEffect",
          },
          {
            id: "q1-2",
            type: "truefalse",
            question: "React components must always return a single root element.",
            correctAnswer: true,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Global Logic Building Contest Practicum",
    code: "CS199",
    semester: "B.Tech",
    instructor: "Prof. Deepak Joshi",
    progress: 12,
    color: "bg-cyan-300",
    icon: "globe",
    assignments: [
      {
        id: "a1",
        title: "Logic Puzzle Set A",
        dueDate: "Jan 26, 2026",
        dueTime: "6:00 PM",
        marks: 20,
        description:
          "Solve the 10 logic puzzles provided in the problem set. Show your working and explain your reasoning for each solution.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "Problem Solving Strategies", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Past Contest Problems", fileType: "pdf", fileUrl: "/sample.pdf" },
    ],
    quizzes: [],
  },
  {
    id: 9,
    title: "Mathematical Optimization",
    code: "MA301",
    semester: "B.Tech - IV Semester",
    instructor: "Dr. Lakshmi Rao",
    progress: 0,
    color: "bg-pink-400",
    icon: "calculator",
    assignments: [
      {
        id: "a1",
        title: "Linear Programming Problems",
        dueDate: "Feb 1, 2026",
        dueTime: "11:59 PM",
        marks: 50,
        description:
          "Solve the given set of linear programming problems using the graphical method and the simplex method. Compare your results and discuss the advantages of each approach.",
      },
    ],
    studyMaterials: [
      { id: "m1", title: "Introduction to Optimization", fileType: "pdf", fileUrl: "/sample.pdf" },
      { id: "m2", title: "Simplex Method Tutorial", fileType: "xls", fileUrl: "/sample.xlsx" },
    ],
    quizzes: [
      {
        id: "q1",
        title: "Optimization Basics Quiz",
        dueDate: "Jan 28, 2026",
        dueTime: "10:00 AM",
        duration: "25 minutes",
        durationSeconds: 1500, // 25 minutes in seconds
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "What is the objective of linear programming?",
            options: [
              "Maximize or minimize a linear function",
              "Solve quadratic equations",
              "Find the roots of polynomials",
              "Integrate functions",
            ],
            correctAnswer: "Maximize or minimize a linear function",
          },
        ],
      },
    ],
  },
]

export function getCourseById(id: number): CourseData | undefined {
  return coursesData.find((course) => course.id === id)
}

export function getAssignmentById(courseId: number, assignmentId: string): CourseItem | undefined {
  const course = getCourseById(courseId)
  return course?.assignments.find((a) => a.id === assignmentId)
}

export function getMaterialById(courseId: number, materialId: string): CourseItem | undefined {
  const course = getCourseById(courseId)
  return course?.studyMaterials.find((m) => m.id === materialId)
}

export function getQuizById(
  courseId: number,
  quizId: string,
): (CourseItem & { questions?: QuizQuestion[] }) | undefined {
  const course = getCourseById(courseId)
  return course?.quizzes.find((q) => q.id === quizId)
}
