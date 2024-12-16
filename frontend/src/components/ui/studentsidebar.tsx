import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, School2Icon, NotebookPen, User, LogOut } from "lucide-react";
import StudentLogo from "../../assets/Logo/Student Classhive.png";
import { JoinClassForm } from "@/studentside_components/Components/join-class";
import LogoutConfirmation from "./Logout-Confirmation";

interface SidebarProps {
  onClassJoined: (classData: { className: string; section: string; subject: string }) => void;
}

const SidebarStudent: React.FC<SidebarProps> = ({ onClassJoined }) => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (buttonName: string, route: string) => {
    setActiveButton(buttonName);
    navigate(route);
  };

  const handleLogoutClick = () => {
    setIsLogoutConfirmationOpen(true);
  };

  const handleLogoutConfirm = () => {
    console.log("Student logging out...");
    setIsLogoutConfirmationOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutConfirmationOpen(false);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col p-4 rounded-2xl z-50 mt-5 ml-3",
        "bg-[#0F172A] text-white w-[250px] h-[calc(100vh-4rem)] max-h-screen overflow-y-auto"
      )}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center mt-4 pb-8">
        <img src={StudentLogo} alt="Logo" className="w-32 h-auto" />
      </div>

      {/* Join Class Form */}
      <div className="flex justify-center mb-5">
        <JoinClassForm onClassJoined={onClassJoined} />
      </div>

      {/* Menu Section */}
      <div className="space-y-4 flex-grow">
        {/* Dashboard */}
        <button
          className={cn(
            "flex items-center p-2 rounded-lg",
            activeButton === "dashboard"
              ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
              : "text-white",
            "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
          )}
          onClick={() => handleButtonClick("dashboard", "/dashboard")}
        >
          <LayoutDashboardIcon className="mr-3 h-5 w-5" />
          Dashboard
        </button>

        {/* Classroom */}
        <button
          className={cn(
            "flex items-center p-2 rounded-lg",
            activeButton === "classroom"
              ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
              : "text-white",
            "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
          )}
          onClick={() => handleButtonClick("classroom", "/classroom")}
        >
          <School2Icon className="mr-3 h-5 w-5" />
          Classroom
        </button>

        {/* Quizzes */}
        <button
          className={cn(
            "flex items-center p-2 rounded-lg",
            activeButton === "quizzes"
              ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
              : "text-white",
            "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
          )}
          onClick={() => handleButtonClick("quizzes", "/quizzes")}
        >
          <NotebookPen className="mr-3 h-5 w-5" />
          Quizzes
        </button>

        {/* Profile */}
        <button
          className={cn(
            "flex items-center p-2 rounded-lg",
            activeButton === "profile"
              ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
              : "text-white",
            "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
          )}
          onClick={() => handleButtonClick("profile", "/profile")}
        >
          <User className="mr-3 h-5 w-5" />
          Profile
        </button>
      </div>

      {/* Logout Section */}
      <div className="mt-8">
        <hr className="mb-5" />
        <div className="flex justify-center">
          <button
            className="flex items-center p-2 rounded-full bg-transparent transition-all duration-300 ease-in-out hover:bg-white hover:text-sky-900 group"
            onClick={handleLogoutClick}
          >
            <LogOut className="mr-3 h-5 w-5 text-white transition-colors duration-300 ease-in-out group-hover:text-sky-900" />
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmation
        isOpen={isLogoutConfirmationOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </aside>
  );
};

export default SidebarStudent;
