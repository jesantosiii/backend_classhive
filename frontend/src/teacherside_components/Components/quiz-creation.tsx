"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, CheckCircle2, CircleDot, Type, Trash2 } from "lucide-react";
import { AnswerChoices } from "../../teacherside_components/Components/answers-choices";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Logo from "../../assets/Logo/Classhive L.png";
import ClassHive from "../../assets/ClasshiveLP.png";
import { Switch } from "@/components/ui/switch"; // Import Switch
import { getTokens, getUser } from "../../../config.ts";
import { useNavigate } from 'react-router-dom';


interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  type: "multiple" | "truefalse" | "identification";
  points: number;
  content: string;
  description: string; // Added description for the question
  answers: Answer[];
}

const QuizCreator: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isActive, setIsActive] = useState<boolean>(true); // For 'is_active' toggle
  const [classrooms, setClassrooms] = useState<string[]>([]); // State to store classrooms
  const [classroom, setClassroom] = useState<string>(""); // Selected classroom
const navigate = useNavigate();
  useEffect(() => {
    // Fetch classrooms from API when component mounts
    const fetchClassrooms = async () => {
      try {
        const tokens = JSON.parse(localStorage.getItem("authTokens") || "{}");
        const response = await axios.get("http://127.0.0.1:8000/teachers/classrooms/", {
          headers: {
            Authorization: `Bearer ${tokens.access}`, // Use access token
          },
        });
        setClassrooms(response.data); // Assume response contains a list of classes
      } catch (error: any) {
        console.error("Error fetching classrooms:", error.response?.data);
        alert("Failed to fetch classrooms. Please try again.");
      }
    };

    fetchClassrooms();
  }, []);

  const handlePublish = async () => {
  const user = getUser (); // Use config.ts to get user details
  if (!user) {
    alert("User  details not found. Please log in again.");
    return;
  }

  const tokens = getTokens(); // Use config.ts to get tokens
  if (!tokens) {
    alert("Authentication tokens not found. Please log in again.");
    return;
  }

  // Validate required fields
  if (!quizName || !classroom || questions.length === 0) {
    alert("Please fill in all required fields: Quiz Name, Classroom, and at least one question.");
    return;
  }

  const quizData = {
    name: quizName,
    description: description,
    start_date: dateFrom ? format(dateFrom, "yyyy-MM-dd") : null,
    end_date: dateTo ? format(dateTo, "yyyy-MM-dd") : null,
    timer_duration: timeLimit,
    created_by: user.id,
    classroom: classroom,
    is_active: isActive,
    questions: questions.map((q) => ({
      question_type: q.type === "multiple" ? "MC" : q.type === "truefalse" ? "TF" : "ID",
      content: q.content,
      description: q.description, // Added description here
      answers: q.answers.map((a) => ({ text: a.text, is_correct: a.isCorrect })),
    })),
  };

  try {
    const response = await axios.post("http://127.0.0.1:8000/quizzes/api/quizzes/", quizData, {
      headers: {
        Authorization: `Bearer ${tokens.access}`, // Use access token from config.ts
      },
    });
    alert("Quiz published successfully!");
    navigate('/teacher/Wc');
  } catch (error) {
    console.error("Error publishing quiz:", error);
    alert("Failed to publish quiz. Please check the console for more details.");
  }
};



  const addQuestion = () => {
    const newQuestion: Question = {
      type: "multiple",
      points: 0,
      content: "",
      description: "", // Initialize description for each question
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
                  <div className="relative">
                    <Input
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                      className="w-24 pr-12"
                      min={0}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Mins</span>
                  </div>
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex items-center space-x-3">
                  <Button className="bg-[#F6F6F6] shadow-black">Preview</Button>
                  <Button className="bg-[#031C30] text-white" onClick={() => setModalOpen(true)}>
                    Publish
                  </Button>
                </div>
              </div>
            </div>

            {questions.map((question, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Select
                          value={question.type}
                          onValueChange={(type) => updateQuestion(index, {type: type as Question["type"]})}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select question type"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple">
                            <span className="flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-2"/>
                              Multiple Choice
                            </span>
                          </SelectItem>
                          <SelectItem value="truefalse">
                            <span className="flex items-center">
                              <CircleDot className="w-4 h-4 mr-2"/>
                              True or False
                            </span>
                          </SelectItem>
                          <SelectItem value="identification">
                            <span className="flex items-center">
                              <Type className="w-4 h-4 mr-2"/>
                              Identification
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex items-center space-x-2">
                        <Input
                            type="number"
                            value={question.points}
                            onChange={(e) => updateQuestion(index, {points: Number(e.target.value)})}
                            className="w-20"
                            min={0}
                        />
                        <span className="text-sm text-gray-500">Points</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="icon" onClick={() => deleteQuestion(index)}>
                        <Trash2 className="w-4 h-4 text-red-500"/>
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    {/* Toggle switch to show/hide the text area */}
                    <div className="flex items-center mb-2">
                      <Switch
                          checked={showInstructions}
                          onCheckedChange={setShowInstructions}
                          className="mr-2"
                      />
                      <span className="text-gray-700">Add Instructions</span>
                    </div>

                    {/* Conditionally render the text area */}
                    {showInstructions && (
                        <textarea
                            value={description} // Bind to the description state
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter quiz instructions here..."
                        />
                    )}
                  </div>

                  <div className="mb-4">
                    <textarea
                        value={question.content}
                        onChange={(e) => updateQuestion(index, {content: e.target.value})}
                        className="w-full min-h-[120px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your question here..."
                    />
                  </div>

                  <AnswerChoices
                      multipleAnswers={question.multipleAnswers}
                      questionType={question.type}
                      answers={question.answers}
                      setAnswers={(newAnswers) => updateQuestion(index, {answers: newAnswers})}
                  />
                </div>
              </div>
            ))}

            <Button onClick={addQuestion} className="bg-[#031C30] text-white w-full mt-4">
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
                      <img src={Logo} alt="Logo" className="object-contain w-full h-full" />
                  </div>
                  <div className="w-auto h-5">
                    <img src={ClassHive} alt="ClassHive Logo" className="object-contain w-full h-full" />
                  </div>
                </h2>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Quiz Name</label>
                  <Input value={quizName} onChange={(e) => setQuizName(e.target.value)} placeholder="Enter quiz name"/>
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
                  <div className="text-right text-xs text-gray-500 mt-1">{description.length}/500 characters</div>
                </div>


                <div className="mb-4">
                  <label className="text-sm text-gray-500">Classroom</label>
                  <Select value={classroom} onValueChange={(value) => setClassroom(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select classroom"/>
                    </SelectTrigger>
                    <SelectContent>
                      {classrooms.map((classroom, index) => (
                        <SelectItem key={classroom.id} value={classroom.id}>
                          {classroom.class_name} {/* Replace `class_name` with the appropriate property to display */}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Start Date</label>
                  <Input
                      type="date"
                      className="w-full"
                      value={dateFrom ? format(dateFrom, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDateFrom(e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-500">End Date</label>
                  <Input
                      type="date"
                      className="w-full"
                      value={dateTo ? format(dateTo, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDateTo(e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <Button onClick={() => setModalOpen(false)} className="bg-[#031C30] text-white mr-2">
                    Cancel
                  </Button>
                  <Button className="bg-[#031C30] text-white" onClick={handlePublish}>
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
