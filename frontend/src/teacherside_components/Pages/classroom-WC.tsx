import React, { useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import { ClassCard } from "../Components/class-card";
import CreateClassForm from "../Components/create-class";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { getTokens } from "../../../config.ts"; // Use config.ts to fetch tokens

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState([]); // State for the class list
  const [loading, setLoading] = useState(false); // State for loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const closeForm = () => setShowForm(false);

  const handleOpenClass = (className: string) => {
    console.log(`Opening class: ${className}...`);
  };

  // Fetch classes from the backend
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
      setClasses(response.data); // Assume response contains a list of classes
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
  const handleClassCreated = async () => {
    await fetchClasses(); // Refresh the class list
    closeForm(); // Close the form
  };

  // Load classes on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen flex bg-white relative">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBar />
        <main className="relative flex-1 p-6">
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
            {loading ? (
              <p>Loading classes...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : classes.length > 0 ? (
              classes.map((classItem: any) => (
                <ClassCard
                  key={classItem.id}
                  className={classItem.class_name}
                  section={classItem.section}
                  subject={classItem.subject}
                  class_code={classItem.class_code}
                  onOpen={() => handleOpenClass(classItem.class_name)}
                />
              ))
            ) : (
              <p>No classes available. Create a new class to get started.</p>
            )}
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
              <CreateClassForm onClassCreated={handleClassCreated} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
