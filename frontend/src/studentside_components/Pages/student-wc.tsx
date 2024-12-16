import React, { useState } from 'react';
import SidebarStudent from '@/components/ui/studentsidebar';
import { TopBarStudent } from '@/components/ui/topbar-student';
import { ClassCard } from '../Components/class-card';

const App: React.FC = () => {
  const [classes, setClasses] = useState<
    { className: string; section: string; subject: string }[]
  >([]);

  const handleClassJoined = (classData: { className: string; section: string; subject: string }) => {
    // Assuming classData contains the correct structure from the backend
    setClasses((prevClasses) => [...prevClasses, classData]);
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      {/* SidebarStudent will receive the callback */}
      <SidebarStudent onClassJoined={handleClassJoined} />
      <div className="flex flex-col flex-1 ml-[270px]">
        <TopBarStudent />
        <main className="relative flex-1 p-6">
          {/* Display Class Cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {classes.map((classData, index) => (
              <ClassCard
                key={index}
                className={classData.className}
                section={classData.section}
                subject={classData.subject}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;