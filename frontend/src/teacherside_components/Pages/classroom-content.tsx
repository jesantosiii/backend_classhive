import React, { useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import { ClassHeader } from "../Components/class-header";
import { ClassCode } from "../Components/class-code";
import { AnnouncementInput } from "../Components/announcement-input";
import { ClassFeed } from "../Components/class-feed";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import { getTokens } from "../../../config.ts"; // Use getTokens to get the authentication token

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
  const [classInfo, setClassInfo] = useState<any>(null); // State for class information
  const [classes, setClasses] = useState<any[]>([]); // State for list of classes
  const [loading, setLoading] = useState(true); // Loading state for class info
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get the location object

  // Fetch the list of classes when the component is mounted
  const fetchClasses = async () => {
    setLoading(true);
    setErrorMessage(null); // Clear any previous errors
    try {
      const tokens = getTokens(); // Fetch tokens using config.ts
      if (!tokens || !tokens.access) {
        throw new Error("Authentication token is missing. Please log in again.");
      }

      const response = await axios.get("http://127.0.0.1:8000/teachers/classrooms/", {
        headers: {
          Authorization: `Bearer ${tokens.access}`, // Use access token
        },
      });
      setClasses(response.data); // Set the class data from the backend

      // Automatically select the most recent class or choose based on specific criteria
      const latestClass = response.data[0]; // You can change this logic if necessary
      setClassInfo(latestClass); // Update the selected class info

    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.detail || "Failed to fetch classes. Please try again."
      );
      console.error("Error fetching classes:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Triggered when a new class is created

  // Fetch the class info for the selected class
  useEffect(() => {
    // Check if classInfo is passed via location state
    if (location.state && location.state.classInfo) {
      setClassInfo(location.state.classInfo);
    } else {
      fetchClasses(); // Fetch classes when the component loads
    }
  }, [location.state]);

  const handlePeopleClick = () => {
    navigate(`/teacher/classroomcontent/${classInfo.class_code}/people`);
  };


  if (loading) {
    return <div>Loading class details...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!classInfo) {
    return <div>Class not found.</div>;
  }

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
                <ClassCode code={classInfo.class_code || "Unknown"} />
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 bg-white w-full h-full rounded"
                  onClick={handlePeopleClick}
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