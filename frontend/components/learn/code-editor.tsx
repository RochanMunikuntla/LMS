"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { ChevronDown } from "lucide-react"

interface CodeEditorProps {
  starterCode: {
    python: string
    javascript: string
    cpp: string
    java: string
  }
}

const languageOptions = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
]

export function CodeEditor({ starterCode }: CodeEditorProps) {
  const [language, setLanguage] = useState<"python" | "javascript" | "cpp" | "java">("python")
  const [code, setCode] = useState(starterCode.python)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLanguageChange = (newLang: "python" | "javascript" | "cpp" | "java") => {
    setLanguage(newLang)
    setCode(starterCode[newLang])
    setIsDropdownOpen(false)
  }

  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case "cpp":
        return "cpp"
      case "javascript":
        return "javascript"
      case "java":
        return "java"
      default:
        return "python"
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Language selector */}
      <div className="flex items-center justify-between border-b border-gray-700 bg-[#1e1e1e] px-4 py-2">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-[4px] bg-gray-700 px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-600"
          >
            {languageOptions.find((l) => l.value === language)?.label}
            <ChevronDown className="h-3 w-3" />
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 rounded-[4px] border border-gray-600 bg-[#2d2d2d] py-1 shadow-lg">
              {languageOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleLanguageChange(opt.value as "python" | "javascript" | "cpp" | "java")}
                  className={`block w-full px-4 py-1.5 text-left text-sm hover:bg-gray-600 ${
                    language === opt.value ? "text-blue-400" : "text-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setCode(starterCode[language])} className="text-xs text-gray-400 hover:text-gray-200">
          Reset Code
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono, Menlo, Monaco, Courier New, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            tabSize: 4,
            automaticLayout: true,
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  )
}
