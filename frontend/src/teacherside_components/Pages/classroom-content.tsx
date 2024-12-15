import React from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import { ClassHeader } from "../Components/class-header";
import { ClassCode } from "../Components/class-code";
import { AnnouncementInput } from "../Components/announcement-input";
import { ClassFeed } from "../Components/class-feed";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

const App: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handlePeopleClick = () => {
    // Navigate to the "People" page
    navigate("/teacher/people"); // Adjust the path based on your routing setup
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBar />
        <main className="relative flex-1 p-6 bg-gray-50 flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            <ClassHeader />
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-4">
                <ClassCode code="M4jdS69" />
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 bg-white w-full h-full rounded"
                  onClick={handlePeopleClick} // Use the onClick handler to route
                >
                  <Users className="h-28 w-10 md:h-12 md:w-12" />
                  <span className="text-sm md:text-base">People</span>
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <AnnouncementInput />
                <ClassFeed posts={samplePosts} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
