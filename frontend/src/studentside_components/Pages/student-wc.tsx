import React, { useEffect, useState } from 'react';
import SidebarStudent from '@/components/ui/studentsidebar';
import { TopBarStudent } from '@/components/ui/topbar-student';
import { ClassCard } from '../Components/class-card';
import axios from 'axios'; // Import axios for making API calls
import { getTokens } from "../../../config.ts"; // Import the getTokens function
import { StudentDashboard } from "../Components/student-dashboard-component";

// Create an Axios instance with default headers
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/students/', // Adjust the base URL as needed
});

// Set the Authorization header dynamically based on the token retrieved
const setAuthorizationHeader = () => {
  const tokens = getTokens();
  if (tokens && tokens.access) {
    api.defaults.headers['Authorization'] = `Bearer ${tokens.access}`;
  }
};

const App: React.FC = () => {
  const [classes, setClasses] = useState<
    { className: string; classroomId: string; subject: string }[]
  >([]);

  const handleClassJoined = (classData: { className: string; section: string; subject: string }) => {
    // Assuming classData contains the correct structure from the backend
    setClasses((prevClasses) => [...prevClasses, classData]);
  };

  // Fetch classes when the component mounts
  useEffect(() => {
    // Set the Authorization header before making the request
    setAuthorizationHeader();

    const fetchClasses = async () => {
      try {
        const response = await api.get('classes/'); // Use the axios instance
        console.log('Response:', response.data); // Log the response to check its structure
        const fetchedClasses = response.data.map((studentClass: any) => ({
          className: studentClass.classroom.class_name, // Adjust based on your backend response structure
          classroomId: studentClass.classroom.id, // Get the classroom ID
          subject: studentClass.classroom.subject, // Get the subject if needed
        }));
        setClasses(fetchedClasses);
      } catch (error) {
        console.error('Error fetching classes:', error.response ? error.response.data : error.message);
      }
    };

    fetchClasses();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen flex bg-white relative">
      {/* SidebarStudent will receive the callback */}
      <SidebarStudent onClassJoined={handleClassJoined} />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6">
          <StudentDashboard/>
          {/* Display Class Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {classes.map((classData, index) => (
              <ClassCard
                key={index}
                className={classData.className}
                classroomId={classData.classroomId} // Pass the classroom ID to ClassCard
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;