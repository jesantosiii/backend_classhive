"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CompletionModal } from "./completion-modal";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Assuming Axios is used for API calls

interface Question {
  id: number;
  question: string;
  type: "multiple" | "identification";
  options?: string[]; // Optional for identification questions
  selectedAnswer?: number | string;
  correctAnswer: string;
}

const QuizInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
  const quizId = 1; // Replace with actual quizId
  const fetchQuizData = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem('authTokens') || '{}');
      if (!tokens.access) {
        console.error("No access token found");
        return;
      }
      const response = await axios.get(`http://127.0.0.1:8000/quizzes/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      const { title, description, questions } = response.data;
      setQuizTitle(title);
      setQuizDescription(description);
      setQuestions(questions);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access: Check if the token is valid.");
      } else {
        console.error("Error fetching quiz data:", error);
      }
    }
  };

  fetchQuizData();
}, []);

  const handleAnswerSelect = (index: number) => {
    if (!isSubmitted) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          if (q.id === currentQuestion) {
            return { ...q, selectedAnswer: index };
          }
          return q;
        })
      );
    }
  };

  const handleIdentificationInput = (value: string) => {
    if (!isSubmitted) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === currentQuestion ? { ...q, selectedAnswer: value } : q
        )
      );
    }
  };

  const handleSubmit = () => {
    const allQuestionsAnswered = questions.every((q) => {
      if (q.type === "identification") {
        return typeof q.selectedAnswer === "string" && q.selectedAnswer.trim().length > 0;
      } else {
        return q.selectedAnswer !== undefined;
      }
    });

    if (!allQuestionsAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const confirmation = confirm("Are you sure you want to submit the quiz?");
    if (confirmation) {
      setIsSubmitted(true);
      setIsQuizEnded(true);
      setIsCompletionModalOpen(true);
    }
  };

  const handleCompletionModalClose = () => {
    setIsCompletionModalOpen(false);
    if (showAnswers) {
      setShowAnswers(true);
    }
  };

  const handleViewAnswers = () => {
    setShowAnswers(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      if (question.type === "identification") {
        const selectedAnswer = question.selectedAnswer;
        if (typeof selectedAnswer === "string") {
          return selectedAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
            ? score + 1
            : score;
        }
        return score;
      } else {
        const selectedAnswer = question.selectedAnswer;
        if (selectedAnswer !== undefined) {
          return question.options![selectedAnswer] === question.correctAnswer
            ? score + 1
            : score;
        }
        return score;
      }
    }, 0);
  };

  const timerPercentage = (timeLeft / (45 * 60)) * 100;

  return (
    <div className="min-h-screen bg-[#031C30] p-6 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">{quizTitle}</h1>
            <p className="text-gray-400">{quizDescription}</p>
          </div>

          {isSubmitted && !showAnswers ? (
            <div className="bg-[#0a2540] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quiz Submitted</h2>
              <p>Do you want to view the answers?</p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={handleViewAnswers}
              >
                View Answers
              </Button>
            </div>
          ) : showAnswers ? (
            <div className="bg-[#0a2540] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quiz Answers</h2>
              <div className="mb-4 p-4 bg-[#031C30] rounded-lg">
                <h3 className="text-lg font-semibold">
                  Your Score: {calculateScore()} / {questions.length}
                </h3>
              </div>
              {questions.map((question, index) => (
                <div key={index} className="mb-6 border-b border-gray-600 pb-4 last:border-none">
                  <h3 className="text-lg mb-2">
                    Question {index + 1}: {question.question}
                  </h3>
                  {question.type === "identification" ? (
                    <div className="bg-[#031C30] p-2 rounded-lg">
                      <p>
                        <strong>Your Answer:</strong>
                        <span
                          className={cn(
                            question.selectedAnswer?.toLowerCase() === question.correctAnswer.toLowerCase()
                              ? "text-green-500"
                              : "text-red-500"
                          )}>
                          {question.selectedAnswer || "No Answer"}
                        </span>
                      </p>
                      <p>
                        <strong>Correct Answer:</strong> {question.correctAnswer}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#031C30] p-2 rounded-lg">
                      <p>
                        <strong>Your Answer:</strong> {question.options![question.selectedAnswer as number]}
                      </p>
                      <p>
                        <strong>Correct Answer:</strong> {question.correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0a2540] rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-lg mb-4">
                  Question {currentQuestion}/{questions.length}
                </h2>
                <div className="bg-[#031C30] p-4 rounded-lg mb-4">
                  <p>{questions[currentQuestion - 1]?.question}</p>
                </div>

                {questions[currentQuestion - 1]?.type === "identification" ? (
                  <Input
                    type="text"
                    className="w-full p-2 rounded-lg bg-[#1a365d] text-white"
                    value={questions[currentQuestion - 1]?.selectedAnswer as string || ""}
                    onChange={(e) => handleIdentificationInput(e.target.value)}
                    placeholder="Type your answer here"
                  />
                ) : (
                  <RadioGroup
                    value={questions[currentQuestion - 1]?.selectedAnswer?.toString() || ""}
                    className="space-y-2"
                  >
                    {questions[currentQuestion - 1]?.options?.map((option, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center space-x-2 rounded-lg p-4",
                          "bg-[#031C30] hover:bg-[#052442]",
                          questions[currentQuestion - 1]?.selectedAnswer === index &&
                            "ring-2 ring-blue-500"
                        )}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          className="border-white"
                        />
                        <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  className="bg-[#1a365d] hover:bg-[#234781]"
                  disabled={currentQuestion === 1}
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                >
                  Previous
                </Button>
                {currentQuestion === questions.length ? (
                  <Button
                    variant="secondary"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="bg-[#1a365d] hover:bg-[#234781]"
                    onClick={() => setCurrentQuestion((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right-hand Column (Timer and Question Navigation) */}
        {!showAnswers && (
          <div className="space-y-6">
            <div className="bg-[#0a2540] p-6 rounded-lg">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#2d3748"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#38a169"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="282.6"
                    strokeDashoffset={(282.6 * (100 - timerPercentage)) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-medium">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0a2540] p-6 rounded-lg">
              <h3 className="text-sm mb-4">
                Question {currentQuestion}/{questions.length}
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, i) => {
                  const isAnswered = question.selectedAnswer !== undefined;
                  const buttonClass = cn(
                    "w-10 h-10 p-0",
                    i + 1 === currentQuestion
                      ? "ring-2 ring-blue-500"
                      : "bg-[#031C30] hover:bg-[#052442]",
                    isSubmitted &&
                      isAnswered &&
                      (question.correctAnswer === question.options![question.selectedAnswer as number]
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white")
                  );

                  return (
                    <Button
                      key={i}
                      className={buttonClass}
                      onClick={() => setCurrentQuestion(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={handleCompletionModalClose}
      />
    </div>
  );
};

export default QuizInterface;
