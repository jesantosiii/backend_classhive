import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SidebarStudent from "@/components/ui/studentsidebar";
import { TopBarStudent } from "@/components/ui/topbar-student";
import { ClassHeaderStudent } from "../Components/class-header-student";
import { ClassFeedStudent } from "../Components/class-feed-student";
import { Button } from "@/components/ui/button";
import { Users, Notebook } from 'lucide-react';

const samplePosts = [
  {
    id: "1",
    author: {
      name: "Teacher",
      avatar: "/placeholder.png",
    },
    content: "Sample Announcement",
    timestamp: "2:07 PM",
  },
];
const handleClassJoined = (classData: { className: string; section: string; subject: string }) => {
    // Assuming classData contains the correct structure from the backend
    setClasses((prevClasses) => [...prevClasses, classData]);
  };

// Assuming you get this data from your API
const classData = {
  className: "IT 102 - Introduction to Programming"
};

const App: React.FC = () => {
  const location = useLocation();
  const className = location.state?.className || "Default Class Name"; // Fallback if no className is passed

  const navigate = useNavigate();

  const handleClassworkNavigation = () => {
    navigate("/classroomclasswork");
  };

  const handleClassPeopleNavigation = () => {
    navigate("/classroompeople");
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent onClassJoined={handleClassJoined} />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6 bg-gray-50 flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            {/* Pass the className to the ClassHeaderStudent */}
            <ClassHeaderStudent className={className} />
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  onClick={handleClassworkNavigation}
                  className="flex flex-col items-center justify-center gap-2 bg-white w-full h-full rounded"
                >
                  <Notebook className="h-28 w-10 md:h-12 md:w-12" />
                  <span className="text-sm md:text-base">Classwork</span>
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <ClassFeedStudent posts={samplePosts} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;