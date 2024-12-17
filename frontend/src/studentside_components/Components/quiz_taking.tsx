"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompletionModal } from "./completion-modal";
import { cn } from "@/lib/utils";

// Interface Definitions
interface Answer {
  id: number;
  text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  content: string;
  question_type: "MC" | "TF" | "ID";
  answers: Answer[];
  selectedAnswer?: string | number;
}

interface Quiz {
  id: number;
  name: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
  timer_duration: number | null;
  created_by: number;
  classroom: number;
  is_active: boolean;
  questions: Question[];
}

const QuizInterface = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [viewAnswersImmediately, setViewAnswersImmediately] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch Quiz Data
  useEffect(() => {
    const fetchQuizDetails = async () => {
      const tokens = JSON.parse(localStorage.getItem("authTokens") || "{}");
      if (!tokens?.access) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/quizzes/quizzes/1/`, {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        const fetchedQuiz = response.data;
        setQuiz({
          ...fetchedQuiz,
          questions: fetchedQuiz.questions.map((q: Question) => ({
            ...q,
            selectedAnswer: null,
          })),
        });
        setTimeLeft(fetchedQuiz.timer_duration || 45 * 60);
      } catch (err: any) {
        console.error("Error fetching quiz details:", err.response?.data || err.message);
        setError("Failed to load quiz details.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, []);

  // Timer Countdown
  useEffect(() => {
    if (!timeLeft || isQuizEnded) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          setIsQuizEnded(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isQuizEnded]);

  // Handle Answer Selection
  const handleAnswerSelect = (questionId: number, answerId: number) => {
    if (!isSubmitted && quiz) {
      setQuiz((prevQuiz) => {
        if (!prevQuiz) return null;
        const updatedQuestions = prevQuiz.questions.map((q) =>
          q.id === questionId ? { ...q, selectedAnswer: answerId } : q
        );
        return { ...prevQuiz, questions: updatedQuestions };
      });
    }
  };

  // Handle Identification Input
  const handleIdentificationInput = (questionId: number, value: string) => {
    if (!isSubmitted && quiz) {
      setQuiz((prevQuiz) => {
        if (!prevQuiz) return null;
        const updatedQuestions = prevQuiz.questions.map((q) =>
          q.id === questionId ? { ...q, selectedAnswer: value } : q
        );
        return { ...prevQuiz, questions: updatedQuestions };
      });
    }
  };

  // Submit Answers to Backend
  const submitAnswers = async () => {
    if (!quiz) return;

    const tokens = JSON.parse(localStorage.getItem("authTokens") || "{}");
    if (!tokens?.access) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    const responses = quiz.questions.map((q) => ({
      question: q.id,
      selected_option: typeof q.selectedAnswer === "number" ? q.selectedAnswer : null,
      text_response:
        typeof q.selectedAnswer === "string" && q.selectedAnswer?.trim()
          ? q.selectedAnswer.trim()
          : null,
    }));

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/quizzes/api/quizzes/1/submit-answers/`,
        { responses },
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      alert(`Quiz submitted successfully! Your score: ${data.score}/${data.total_score}`);
      setShowAnswers(true);
    } catch (err: any) {
      console.error("Error submitting answers:", err.response?.data || err.message);
      alert("Failed to submit answers. Please try again.");
    }
  };

  // Handle Quiz Submission
  const handleSubmit = () => {
    if (!quiz) return;

    const allQuestionsAnswered = quiz.questions.every((q) => {
      if (q.question_type === "ID") {
        return (
          typeof q.selectedAnswer === "string" &&
          q.selectedAnswer?.trim() &&
          q.selectedAnswer.trim().length > 0
        );
      } else {
        return q.selectedAnswer !== undefined;
      }
    });

    if (!allQuestionsAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitted(true);
    setIsQuizEnded(true);
    setIsCompletionModalOpen(true);
    submitAnswers();
  };

  // Render Timer
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timerPercentage = (timeLeft / (quiz?.timer_duration || 45 * 60)) * 100;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-full bg-[#031C30] p-6 text-white overflow-x-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">{quiz?.name}</h1>
          <p className="text-gray-400">{quiz?.description}</p>

          {quiz?.questions.map((q, idx) => (
            <div key={q.id} className="mb-6">
              <h3>
                Question {idx + 1}: {q.content}
              </h3>
              {q.question_type === "ID" ? (
                <Input
                  type="text"
                  value={q.selectedAnswer || ""}
                  onChange={(e) => handleIdentificationInput(q.id, e.target.value)}
                />
              ) : (
                q.answers.map((a) => (
                  <label key={a.id} className="block">
                    <input
                      type="radio"
                      checked={a.id === q.selectedAnswer}
                      onChange={() => handleAnswerSelect(q.id, a.id)}
                    />
                    {a.text}
                  </label>
                ))
              )}
            </div>
          ))}

          <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700">
            Submit
          </Button>
        </div>

        <div>
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#2d3748" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#38a169"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={(282.6 * (100 - timerPercentage)) / 100}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        setViewAnswersImmediately={setViewAnswersImmediately}
      />
    </div>
  );
};

export default QuizInterface;
