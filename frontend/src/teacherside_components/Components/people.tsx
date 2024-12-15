import React from "react"
import { Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Person {
  id: string
  name: string
  avatarUrl: string
  role: "teacher" | "student"
}

interface PeopleListProps {
  teacher: Person
  students: Person[]
}

export function PeopleList({ teacher, students }: PeopleListProps) {
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-[#0B1829] p-6">
        <h1 className="text-2xl font-semibold text-white">People</h1>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <img
              src={teacher.avatarUrl || "/placeholder.svg?height=64&width=64"}
              alt={`${teacher.name}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
              <p className="text-sm text-gray-600">Teacher</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 py-3 border-b border-gray-300 text-sm font-semibold text-gray-700">
            <div className="text-left px-4">Student Name</div>
            <div className="text-right px-4">Actions</div>
          </div>

          <div
            className={`space-y-2 ${
              students.length > 6
                ? "max-h-[384px] overflow-y-auto your-scrollable-container"
                : ""
            }`}
          >
            {students.map((student, index) => (
              <div
                key={student.id}
                className={`grid grid-cols-2 items-center py-4 rounded-md ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
                style={{ height: "64px" }}
              >
                <div className="flex items-center gap-3 px-4">
                  <img
                    src={student.avatarUrl || "/placeholder.svg?height=48&width=48"}
                    alt={`${student.name}'s avatar`}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-800">{student.name}</span>
                </div>
                <div className="text-right px-4">
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

