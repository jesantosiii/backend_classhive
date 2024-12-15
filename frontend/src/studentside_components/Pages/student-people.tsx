import React from "react";
import { useNavigate } from "react-router-dom"; 
import SidebarStudent from "@/components/ui/studentsidebar";
import { TopBarStudent } from "@/components/ui/topbar-student";
import { ChevronLeft } from 'lucide-react';
import { PeopleList } from "../Components/people";
import { Button } from "@/components/ui/button";

const sampleData = {
  teacher: {
    id: "1",
    name: "Teacher Name",
    avatarUrl: "/placeholder.svg",
    role: "teacher" as const,
  },
  students: [
    {
      id: "2",
      name: "Mark June Santiago",
      avatarUrl: "/placeholder.svg",
      role: "student" as const,
    },
    {
      id: "3",
      name: "Ivan Paul Santiago",
      avatarUrl: "/placeholder.svg",
      role: "student" as const,
    },
    {
      id: "4",
      name: "Robin Miranda",
      avatarUrl: "/placeholder.svg",
      role: "student" as const,
    },
    {
      id: "5",
      name: "Jun Adriann Bulaon",
      avatarUrl: "/placeholder.svg",
      role: "student" as const,
    },
    {
      id: "6",
      name: "Juanito Santos",
      avatarUrl: "/placeholder.svg",
      role: "student" as const,
    },
    {
      id: "7",
      name: "Elliot Dela Cruz",
      avatarUrl: "/placeholder.svg",
      role: "student" as const,
    },
  ],
}

const App: React.FC = () => {
  const navigate = useNavigate(); 

  const handleClassFeedNavigation = () => {
    navigate("/classroomcontent"); 
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-white rounded hover:rounded"
              onClick={handleClassFeedNavigation} 
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <PeopleList
            teacher={sampleData.teacher}
            students={sampleData.students}
          />
        </main>
      </div>
    </div>
  )
}

export default App