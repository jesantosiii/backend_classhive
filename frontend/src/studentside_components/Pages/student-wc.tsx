import React, { useState } from "react"
import SidebarStudent from "@/components/ui/studentsidebar"
import { TopBarStudent } from "@/components/ui/topbar-student"
import { ClassCard } from "../Components/class-card"


const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  const closeForm = () => setShowForm(false)

  const handleOpenClass = () => {
    console.log("Opening class...")
  }

  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6">

          {/* Class Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            <ClassCard
              className="Mathematics"
              section="4D-G1"
              subject="Math"
              onOpen={handleOpenClass}
            />
            <ClassCard
              className="English"
              section="1H-G1"
              subject="English"
              onOpen={handleOpenClass}
            />
            <ClassCard
              className="PE"
              section="3D-G2"
              subject="Physical Education"
              onOpen={handleOpenClass}
            />
          </div>
        </main>

        {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeForm} 
        >
          <div
            className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden"
            style={{
              marginLeft: "calc(var(--sidebar-width) + 50px)", 
            }}
            onClick={(e) => e.stopPropagation()}
          >
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default App
