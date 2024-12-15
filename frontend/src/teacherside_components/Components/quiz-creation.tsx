"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, CheckCircle2, CircleDot, Type, Trash2 } from "lucide-react";
import { AnswerChoices } from "../../teacherside_components/Components/answers-choices";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../../assets/Logo/Classhive L.png"
import ClassHive from "../../assets/ClasshiveLP.png"

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  type: "multiple" | "truefalse" | "identification";
  points: number;
  required: boolean;
  multipleAnswers: boolean;
  content: string;
  answers: Answer[];
}

const QuizCreator: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [randomizeOrder, setRandomizeOrder] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [quizName, setQuizName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("am");
  const [showInstructions, setShowInstructions] = useState<boolean>(false); // New State
  const [instructions, setInstructions] = useState<string>(""); // Instructions Field State
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const handlePublish = () => {
    const quizData = {
      name: quizName,
      subject,
      dateFrom: dateFrom ? format(dateFrom, "yyyy-MM-dd") : null,
      dateTo: dateTo ? format(dateTo, "yyyy-MM-dd") : null,
      time: `${time} ${timePeriod.toUpperCase()}`,
    };

    if (!quizName || !subject || !date || !time) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("Publishing quiz:", quizData);
    // Add API logic to save or publish the quiz
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      type: "multiple",
      points: 0,
      required: false,
      multipleAnswers: false,
      content: "",
      answers: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, updatedQuestion: Partial<Question>) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, ...updatedQuestion } : question
    );
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    if (confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      <div className="flex flex-col flex-1">
        <main className="relative flex-1 p-6 bg-[#f8fafc]">
          <div className="max-w-[900px] mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Select
                    value={randomizeOrder ? "random" : "current"}
                    onValueChange={(value) =>
                      setRandomizeOrder(value === "random")
                    }
                  >
                    <SelectTrigger className="w-[240px]">
                      <SelectValue placeholder="Keep Choices in current order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">
                        Keep Choices in current order
                      </SelectItem>
                      <SelectItem value="random">Randomize Choices</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Input
                        type="number"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Number(e.target.value))}
                        className="w-24 pr-12"
                        min={0}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        Mins
                      </span>
                    </div>
                    <Clock className="w-5 h-5 text-gray-500" />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button className="bg-[#F6F6F6] shadow-black">Preview</Button>
                  <Button
                    className="bg-[#031C30] text-white"
                    onClick={() => setModalOpen(true)}
                  >
                    Publish
                  </Button>
                </div>
              </div>
              
            </div>

            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Select
                        value={question.type}
                        onValueChange={(type) =>
                          updateQuestion(index, { type: type as Question["type"] })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple">
                            <span className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Multiple Choice
                            </span>
                          </SelectItem>
                          <SelectItem value="truefalse">
                            <span className="flex items-center">
                              <CircleDot className="w-4 h-4 mr-2" />
                              True or False
                            </span>
                          </SelectItem>
                          <SelectItem value="identification">
                            <span className="flex items-center">
                              <Type className="w-4 h-4 mr-2" />
                              Identification
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                        
              
                      <div className="flex items-center space-x-2">.
                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) =>
                            updateQuestion(index, {
                              points: Number(e.target.value),
                            })
                          }
                          className="w-20"
                          min={0}
                        />
                        <span className="text-sm text-gray-500">Points</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Required</span>
                        <Switch
                          checked={question.required}
                          onCheckedChange={(checked) =>
                            updateQuestion(index, { required: checked })
                          }
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteQuestion(index)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm text-gray-500">Multiple Answers</span>
                    <Switch
                      checked={question.multipleAnswers}
                      onCheckedChange={(checked) =>
                        updateQuestion(index, { multipleAnswers: checked })
                      }
                    />
                  </div>
                  <div className="mb-4 space-x-4 flex">
                  <h1 className="text-sm text-gray-500">Add Instructions</h1>
                  <Switch
                    checked={showInstructions}
                    onCheckedChange={setShowInstructions}
                  />
                </div>
                  {showInstructions && (
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Instructions</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Enter quiz instructions (optional)"
                    maxLength={1000}
                    className="w-full h-24 p-2 border border-gray-200 rounded-md text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {instructions.length}/1000 characters
                  </div>
                </div>
              )}
                  

                  <div className="mb-4">
                    <textarea
                      value={question.content}
                      onChange={(e) =>
                        updateQuestion(index, { content: e.target.value })
                      }
                      className="w-full min-h-[120px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your question here..."
                    />
                  </div>

                  <AnswerChoices
                    multipleAnswers={question.multipleAnswers}
                    questionType={question.type}
                    answers={question.answers}
                    setAnswers={(newAnswers) =>
                      updateQuestion(index, { answers: newAnswers })
                    }
                  />

                </div>
              </div>
            ))}

            <Button
              onClick={addQuestion}
              className="bg-[#031C30] text-white w-full mt-4"
            >
              Add Question
            </Button>
          </div>
        </main>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-[500px] bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="bg-[#031C30] p-4">
                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                <div className="w-auto h-16">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="w-auto h-5">
                      <img
                        src={ClassHive}
                        alt="ClassHive Logo"
                        className="object-contain w-full h-full"
                      />
                    </div>
                </h2>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Quiz Name</label>
                  <Input
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder="Enter quiz name"
                  />
                </div>
                <div className="mb-4">
                <label className="text-sm text-gray-500">Quiz Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter quiz description (max 500 characters)"
                    maxLength={500}
                    className="w-full h-24 p-2 border border-black rounded-md text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {description.length}/500 characters
                  </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Subject</label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                  />
                </div>
                
                </div>
                <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">To</span>
                <Input
                  type="date"
                  className="w-[150px]"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
                <span className="text-sm text-gray-500">From</span>
                <Input
                  type="date"
                  className="w-[150px]"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
            </div>

                <div className="flex items-center space-x-2 mb-4">
                  <label className="text-sm text-gray-500">Time</label>
                  <Input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="HH:MM"
                  />
                  <Select
                    value={timePeriod}
                    onValueChange={setTimePeriod}
                    defaultValue="am"
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="AM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="am">AM</SelectItem>
                      <SelectItem value="pm">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    onClick={() => setModalOpen(false)}
                    className="bg-[#031C30] text-white mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#031C30] text-white"
                    onClick={handlePublish}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      
      </div>
    </div>
  );
};

export default QuizCreator;
