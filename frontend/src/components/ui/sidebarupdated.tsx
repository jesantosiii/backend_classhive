import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileStack, User, FileText, NotebookPen, CirclePlus, LogOut } from 'lucide-react';
import Logo from "../../assets/Logo/Logo.png";
import LogoutConfirmation from "./Logout-Confirmation";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleButtonClick = (buttonName: string, path: string) => {
    setActiveButton(buttonName);
    navigate(path); // Use navigate to change route
  };

  const handleLogoutClick = () => {
    setIsLogoutConfirmationOpen(true);
  };

  const handleLogoutConfirm = () => {
    console.log("User logging out...");
    setIsLogoutConfirmationOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutConfirmationOpen(false);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col p-4 rounded-2xl z-50 mt-5 ml-3",
        "bg-[#0F172A] text-white w-[250px]",
        "h-[calc(100vh-4rem)] max-h-screen overflow-y-auto"
      )}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-5">
        <img src={Logo} alt="Logo" className="mb-2" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#4A618A] via-[#DFF2EC] to-[#B9E5E8] text-transparent bg-clip-text">
          CLASSHIVE
        </h1>
      </div>

      {/* Menu Section */}
      <div className="space-y-4 flex-grow">
        <div className="flex justify-center">
        <Button
            variant="ghost"
            className="w-32 h-11 bg-[#496089] rounded-xl"
            onClick={() => handleButtonClick("teacher","/teacher/quiz")} 
          >
            <CirclePlus /> Create Quiz
          </Button>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Classroom Button */}
          <button
            className={cn(
              "flex items-center p-2 rounded-lg",
              activeButton === "classroom"
                ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
                : "text-white",
              "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
            )}
            onClick={() => handleButtonClick("classroom", "/teacher/WC")}
          >
            <NotebookPen className="mr-3 h-5 w-5" />
            Classroom
          </button>

          {/* My Library Button */}
          <button
            className={cn(
              "flex items-center p-2 rounded-lg",
              activeButton === "library"
                ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
                : "text-white",
              "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
            )}
            onClick={() => handleButtonClick("library", "/teacher/library")}
          >
            <FileStack className="mr-3 h-5 w-5" />
            My Library
          </button>

          {/* Profile Button */}
          <button
            className={cn(
              "flex items-center p-2 rounded-lg",
              activeButton === "profile"
                ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
                : "text-white",
              "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
            )}
            onClick={() => handleButtonClick("profile", "/teacher/profile")}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </button>

          {/* Report Button */}
          <button
            className={cn(
              "flex items-center p-2",
              activeButton === "report"
                ? "bg-[#f4f5f7] text-[#0F172A] rounded-full"
                : "text-white",
              "hover:bg-[#f4f5f7] hover:text-[#0F172A] hover:rounded-full"
            )}
            onClick={() => handleButtonClick("report", "/teacher/quiz-report")}
          >
            <FileText className="mr-3 h-5 w-5" />
            Report
          </button>
        </div>
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

export default Sidebar;
