import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LogoL from '../../assets/Logo/Classhive L.png';
import React from "react";
import { useNavigate } from "react-router-dom";

interface ClassCardProps {
  className: string;
  classroomId: string; // Classroom ID for navigation
}

export function ClassCard({ className, classroomId }: ClassCardProps) {
  const navigate = useNavigate();

  const handleOpenClassroom = () => {
  if (classroomId) {
    navigate(`/classroomcontent/${classroomId}`, {
      state: { className },
    });
  } else {
    console.error("Invalid classroom ID");
  }
};


  return (
    <Card className="w-[300px] overflow-hidden bg-white shadow-lg rounded-2xl">
      <div className="h-[160px] w-full relative bg-gradient-to-r from-[#0a192f] to-[#1a3a4a]">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={LogoL} alt="Class logo" className="w-[200px] opacity-70" />
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-lg text-gray-900">{className}</h3>
        <Button
          onClick={handleOpenClassroom}
          className="w-[100px] mt-4 bg-[#0A192F] hover:bg-[#152a47] text-white rounded"
          size="sm"
          aria-label={`Open ${className} classroom`} // Accessibility improvement
        >
          Open
        </Button>
      </div>
    </Card>
  );
}