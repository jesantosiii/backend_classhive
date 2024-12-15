import React from "react"
import Sidebar from "@/components/ui/sidebarupdated"
import { TopBar } from "@/components/ui/topbar"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { GradeCard } from "../Components/grade-card"

const sampleScores = [
  {
    quizName: "Introduction to Programming",
    totalItems: 100,
    totalScore: 98,
  },
  {
    quizName: "English for you and me",
    totalItems: 50,
    totalScore: 37,
  },
  {
    quizName: "Trigonometry",
    totalItems: 50,
    totalScore: 37,
  },
  {
    quizName: "History of the Philippines",
    totalItems: 50,
    totalScore: 37,
  },
  {
    quizName: "Sample Quiz",
    totalItems: 50,
    totalScore: 37,
  },
  {
    quizName: "Sample Quiz",
    totalItems: 50,
    totalScore: 37,
  },
  {
    quizName: "Sample Quiz",
    totalItems: 50,
    totalScore: 37,
  },
  {
    quizName: "Sample Quiz",
    totalItems: 50,
    totalScore: 37,
  },
  {
    quizName: "Sample Quiz",
    totalItems: 50,
    totalScore: 37,
  },
]

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBar />
        <main className="relative flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-white rounded hover:rounded"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          
          <GradeCard
            studentName="Mark June D. Santiago"
            className="4D-G1"
            scores={sampleScores}
          />
        </main>
      </div>
    </div>
  )
}

export default App

