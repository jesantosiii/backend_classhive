import React from "react"
import SidebarStudent from "@/components/ui/studentsidebar"
import { TopBarStudent } from "@/components/ui/topbar-student"
import { ClassHeaderStudent } from "@/studentside_components/Components/class-header-student"
import { QuizCard } from "@/studentside_components/Components/classwork-card"
import {ClassHeader} from "@/teacherside_components/Components/class-header.tsx";

const classData = {
  className: "IT 102 - Introduction to Programming",
  section: "BSIT-4D01",
}

const quizData = {
  name: "Quiz Name",
  subject: "Math",
  duration: "45mins",
}

const App: React.FC = () => {
  const handleStartQuiz = () => {
    console.log("Starting quiz...")
  }

  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6 bg-gray-50">
          <div className="w-full max-w-4xl mx-auto space-y-6">
            <ClassHeader/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuizCard 
                name={quizData.name}
                subject={quizData.subject}
                duration={quizData.duration}
                onStart={handleStartQuiz}
              />
              {/* Add more QuizCard components as needed */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

