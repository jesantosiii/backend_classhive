import React from 'react'
import QuestionsSidebar  from '@/teacherside_components/Components/quiz-addquestions'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      <QuestionsSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

