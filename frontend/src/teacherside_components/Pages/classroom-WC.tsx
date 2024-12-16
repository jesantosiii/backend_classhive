import React, { useState } from "react"
import Sidebar from "@/components/ui/sidebarupdated"
import { TopBar } from "@/components/ui/topbar"
import { ClassCard } from "../Components/class-card"
import CreateClassForm from "../Components/create-class"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  const closeForm = () => setShowForm(false)

  const handleOpenClass = () => {
    console.log("Opening class...")
  }

  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBar />
        <main className="relative flex-1 p-6 ml-[270px]">
          <div className="absolute top-4 right-6">
            <Button
              variant="ghost"
              className="w-32 h-10 bg-[#496089] text-white rounded"
              onClick={() => setShowForm(true)} 
            >
              <CirclePlus className="mr-2" /> Create Class
            </Button>
          </div>

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
            <CreateClassForm />
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default App
