import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoFL from "../../assets/Logo/Classhive FL.png";
import axios from "axios";
import { getTokens, getUser } from "../../../config.ts"; // Import functions from config.ts

interface Props {
  onClassCreated: () => void; // Callback to notify parent component
}

export default function CreateClassForm({ onClassCreated }: Props) {
  const [className, setClassName] = useState("");
  const [yearLevel, setYearLevel] = useState<number | "">(""); // Year Level
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // Retrieve tokens and user role from config functions
    const tokens = getTokens();
    const user = getUser();

    // Check if tokens and user are available
    if (!tokens || !tokens.access) {
      setErrorMessage("Authentication token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    if (!user || user.role !== "Teacher") {
      setErrorMessage("Only teachers can create classes.");
      setLoading(false);
      return;
    }

    try {
      // Send POST request to create class
      await axios.post(
        "http://127.0.0.1:8000/teachers/classrooms/",
        {
          class_name: className,
          year_level: yearLevel,
          section,
          subject,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );

      onClassCreated(); // Notify parent component about successful creation
    } catch (error) {
      console.error("Error creating class:", error.response?.data);
      setErrorMessage(
        error.response?.data?.error || "Failed to create class. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl overflow-hidden">
      <div className="grid grid-cols-2">
        {/* Form Section */}
        <div
          className="p-6 bg-white bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${LogoFL})`,
            backgroundSize: "contain",
          }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-sky-950 mb-6">Create Class</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="text-red-500 text-sm">{errorMessage}</div>
                )}
                <div className="space-y-2">
                  <Label className="text-black" htmlFor="className">
                    Class Name
                  </Label>
                  <Input
                    id="className"
                    placeholder="Enter class name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-black" htmlFor="yearLevel">
                    Year Level
                  </Label>
                  <Input
                    id="yearLevel"
                    type="number"
                    placeholder="Enter year level"
                    value={yearLevel}
                    onChange={(e) => setYearLevel(Number(e.target.value) || "")}
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-black" htmlFor="section">
                    Section
                  </Label>
                  <Input
                    id="section"
                    placeholder="Enter section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-black" htmlFor="subject">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="text-white bg-[#2C4B6E] w-[100px] rounded-xl hover:bg-[#1d3248]"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
