"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Task {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Review DSA concepts", completed: false },
    { id: 2, text: "Complete React project", completed: true },
    { id: 3, text: "Prepare for interview", completed: false },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
      setNewTask("")
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <section className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="font-semibold text-foreground">To-Do List</h2>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-600">
          {completedCount}/{tasks.length}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-4 flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-full border-gray-200 bg-gray-50 px-4 text-sm focus:bg-white"
          />
          <Button onClick={addTask} size="icon" className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700">
            <Plus className="h-5 w-5 text-white" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    task.completed ? "border-blue-600 bg-blue-600" : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {task.completed && <Check className="h-3 w-3 text-white" />}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    task.completed ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-full p-1 opacity-0 transition-all hover:bg-red-50 group-hover:opacity-100"
                >
                  <X className="h-4 w-4 text-red-400 hover:text-red-600" />
                  <span className="sr-only">Delete task</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
