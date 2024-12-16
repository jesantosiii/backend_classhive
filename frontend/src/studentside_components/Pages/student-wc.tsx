import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarStudent from "@/components/ui/studentsidebar";
import { TopBarStudent } from "@/components/ui/topbar-student";
import { ClassCard } from "../Components/class-card";
import { getTokens } from "../../../config"; // Importing token retrieval function

const App: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);

  const fetchClasses = async () => {
    const tokens = getTokens(); // Retrieve tokens using config
    if (!tokens?.access) {
      console.error("No access token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/students/classes/", {
        headers: { Authorization: `Bearer ${tokens.access}` }, // Use the access token
      });
      setClasses(response.data.results); // Assuming paginated response
    } catch (err: any) {
      console.error(
        "Error fetching classes:",
        err.response?.data || "Unable to connect to the server."
      );
    }
  };

  const handleJoinClass = (newClass: any) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen flex bg-white relative">
      <SidebarStudent onJoinClass={handleJoinClass} />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6">
          {/* Class Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {classes.map((classData) => (
              <ClassCard
                key={classData.id}
                className={classData.classroom.class_name}
                classroomId={classData.classroom.id} // Pass the classroomId to the ClassCard
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
