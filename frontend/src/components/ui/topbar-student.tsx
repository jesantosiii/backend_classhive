import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopBarStudent() {
  const [username, setUsername] = useState<string>("");

  // Fetch user details from backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const tokens = JSON.parse(localStorage.getItem("authTokens") || "{}");
        const { data } = await axios.get("http://127.0.0.1:8000/accounts/get-user-details/", {
          headers: {
            Authorization: `Bearer ${tokens?.access}`,
          },
        });
        setUsername(data.username); // Map the username from the backend response
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#0a192f] to-[#1a3a4a] mt-4 ml-4 mr-4 rounded-xl">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-white ml-5">My ClassHive</h1>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student profile" />
            <AvatarFallback>{username?.slice(0, 2).toUpperCase() || "?"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none text-white mr-5">
              {username || "Loading..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
