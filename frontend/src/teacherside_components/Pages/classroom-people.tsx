import React from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import { ChevronLeft } from "lucide-react";
import { PeopleList } from "../Components/people";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

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
};

const App: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleBackClick = () => {
    // Navigate back to the ClassroomContent route
    navigate("/teacher/classroomcontent"); // Adjust the path based on your route structure
  };

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
              onClick={handleBackClick} // Call handleBackClick on button click
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
  );
};

export default App;
