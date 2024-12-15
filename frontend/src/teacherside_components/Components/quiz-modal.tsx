"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../../assets/Logo/Classhive FL.png"

export function QuizForm() {
  const [date, setDate] = useState<Date>();
  const [quizName, setQuizName] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("am");

  const handlePublish = () => {
    const quizData = {
      name: quizName,
      subject,
      date: date ? format(date, "yyyy-MM-dd") : null,
      time: `${time} ${timePeriod.toUpperCase()}`,
    };

    if (!quizName || !subject || !date || !time) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("Publishing quiz:", quizData);
    // Here you can add API logic to save or publish the quiz
  };

  return (
    <div className="w-full max-w-[500px] bg-white rounded-lg overflow-hidden shadow-lg">
  <div className="bg-[#031C30] p-4">
    <h2 className="flex items-center gap-2">
      <div className="w-10 h-10">
      <img src={Logo} alt="Logo" />
      </div>
      <span className="text-white text-lg font-semibold">QuizHive</span>
    </h2>
  </div>
      <div className="p-6 grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="quizName" className="text-sm font-medium">
            Quiz Name
          </label>
          <Input
            id="quizName"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="border-gray-300"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <Select
            onValueChange={(value) => setSubject(value)}
            value={subject}
          >
            <SelectTrigger id="subject" className="border-gray-300">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-300",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MM/dd/yy") : "MM/DD/YY"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Time</label>
          <div className="flex gap-2">
            <Select onValueChange={(value) => setTime(value)} value={time}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 1;
                  return (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select
              value={timePeriod}
              onValueChange={(value) => setTimePeriod(value)}
            >
              <SelectTrigger className="w-[80px] border-gray-300">
                <SelectValue placeholder="AM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="am">AM</SelectItem>
                <SelectItem value="pm">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="outline" className="bg-gray-100">
            Drafts
          </Button>
          <Button
            className="bg-[#031C30] text-white hover:bg-[#042a47]"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
