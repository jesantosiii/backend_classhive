import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { CirclePlus } from 'lucide-react';
import axios from 'axios'; // For API requests
import { getTokens } from "../../../config.ts";

interface JoinClassFormProps {
  onClassJoined: (classData: { className: string;}) => void;
}

export function JoinClassForm({ onClassJoined }: JoinClassFormProps) {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tokens = getTokens(); // Retrieve tokens using config
    if (!tokens?.access) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/students/join/",
        { class_code: classCode },
        { headers: { Authorization: `Bearer ${tokens.access}` } }
      );

      setError(null); // Clear any previous errors
      const classData = {
        className: response.data.classroom_name, // Adjust based on your API response
      };
      onClassJoined(classData); // Pass the class data to the parent
    } catch (err: any) {
      console.error("Error:", err.response || err);
      setError(err.response?.data?.class_code || "Unable to join class. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-32 h-11 bg-sky-950 rounded-xl text-white hover:bg-white hover:text-[#202c3c]">
          <CirclePlus className="mr-2" /> Join Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white p-0">
        <DialogClose asChild>
          <button className="absolute top-2 right-2 text-white bg-[#202c3c] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#3a4d6d] transition">
            ✕
          </button>
        </DialogClose>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-black text-2xl font-semibold">
              Enter Code To Join Class
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter Class Code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full text-center text-lg text-black border border-gray-300"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-32 bg-blue-500 rounded-xl hover:bg-blue-600 text-white"
              >
                JOIN
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}