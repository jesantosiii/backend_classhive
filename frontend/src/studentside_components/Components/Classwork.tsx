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

export function ClassWork({ teacher, students }: PeopleListProps) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-[#0B1829] p-6 rounded-t-xl">
          <h1 className="text-2xl font-semibold text-white">People</h1>
        </div>

        <div className="bg-[#c6dcf5] p-6 rounded-b-xl">
          <div className="mb-8">
            <div className="flex flex-col items-center gap-3 p-4">
              <img
                src="/placeholder.svg?height=48&width=48"
                alt="Teacher Avatar"
                className="w-16 h-16 rounded-full"
              />
              <h2 className="text-lg font-semibold">{teacher.name}</h2>
            </div>
          </div>
  
          <div
            className={`space-y-2 ${
              students.length > 3 ? "max-h-60 overflow-y-auto pr-4 your-scrollable-container" : ""
            }`}
          >
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 hover:bg-white rounded transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-medium">{student.name}</span>
                </div>
  
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="bg-[#4A5D7B] text-white rounded hover:bg-[#3A4B69]"
                  >
                    Grade
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:rounded-full"
                  >
                    <Trash className="h-4 w-4 text-red-600" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
