"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CompletionModal } from "./completion-modal"

interface Question {
  id: number
  question: string
  type: "multiple" | "truefalse" | "identification" | "multipleCorrect"
  options: string[]
  selectedAnswer?: number | string | number[]
  correctAnswer: string | string[]
}

const QuizInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "What is Python?",
      type: "multiple",
      options: [
        "Python is a high-level programming language",
        "Python is a database software",
        "Python is only used for web development",
        "Python is a low-level programming language",
      ],
      selectedAnswer: undefined,
      correctAnswer: "Python is a high-level programming language",
    },
    {
      id: 2,
      question: "Is JavaScript a compiled language?",
      type: "truefalse",
      options: ["True", "False"],
      selectedAnswer: undefined,
      correctAnswer: "False",
    },
    {
      id: 3,
      question: "What does HTML stand for?",
      type: "identification",
      options: [],
      selectedAnswer: "",
      correctAnswer: "Hypertext Markup Language",
    },
    {
      id: 4,
      question: "Which of the following are valid JavaScript data types? (Select all that apply)",
      type: "multipleCorrect",
      options: ["String", "Number", "Boolean", "Array", "Undefined"],
      selectedAnswer: [],
      correctAnswer: ["String", "Number", "Boolean", "Undefined"],
    },
  ])
  

  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds
  const [isQuizEnded, setIsQuizEnded] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false)
  const [viewAnswersImmediately, setViewAnswersImmediately] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !isQuizEnded) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    } else if (timeLeft === 0) {
      endQuiz()
    }
  }, [timeLeft, isQuizEnded])

  const handleAnswerSelect = (index: number) => {
    if (!isSubmitted) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          if (q.id === currentQuestion) {
            if (q.type === "multipleCorrect") {
              const selectedAnswers = Array.isArray(q.selectedAnswer) ? q.selectedAnswer : [];
              const updatedAnswers = selectedAnswers.includes(index)
                ? selectedAnswers.filter((i) => i !== index)
                : [...selectedAnswers, index];
              return { ...q, selectedAnswer: updatedAnswers };
            } else {
              return { ...q, selectedAnswer: index };
            }
          }
          return q;
        })
      )
    }
  }

  const handleIdentificationInput = (value: string) => {
    if (!isSubmitted) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === currentQuestion ? { ...q, selectedAnswer: value } : q
        )
      )
    }
  }

  const handleSubmit = () => {
    const allQuestionsAnswered = questions.every((q) => {
      if (q.type === "identification") {
        return typeof q.selectedAnswer === "string" && q.selectedAnswer.trim().length > 0;
      } else if (q.type === "multipleCorrect") {
        return Array.isArray(q.selectedAnswer) && q.selectedAnswer.length > 0;
      } else {
        return q.selectedAnswer !== undefined;
      }
    });
  
    if (!allQuestionsAnswered) {
      alert("Please answer all questions before submitting, including identification questions.");
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
    if (viewAnswersImmediately) {
      setShowAnswers(true);
    }
  };

  const handleViewAnswers = () => {
    setShowAnswers(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`
  }

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
      } 
      else if (question.type === "multipleCorrect") {
        const selectedAnswers = Array.isArray(question.selectedAnswer) ? question.selectedAnswer : [];
        const correctAnswers = question.correctAnswer;
        const selectedOptions = selectedAnswers.map((index) => question.options[index]);
        return (
          selectedOptions.length === correctAnswers.length &&
          selectedOptions.every((option) => correctAnswers.includes(option))
        )
          ? score + 1
          : score;
      } 
      else {
        const selectedAnswer = question.selectedAnswer;
        if (typeof selectedAnswer === "number") {
          return question.options[selectedAnswer] === question.correctAnswer
            ? score + 1
            : score;
        }
        return score;
      }
    }, 0);
  };
  

  const timerPercentage = (timeLeft / (45 * 60)) * 100

  return (
    <div className="min-h-screen bg-[#031C30] p-6 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Introduction to Python</h1>
            <p className="text-gray-400">Subject: Programming</p>
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
                <div
                  key={index}
                  className="mb-6 border-b border-gray-600 pb-4 last:border-none"
                >
                  <h3 className="text-lg mb-2">
                    Question {index + 1}: {question.question}
                  </h3>
                  {question.type === "multipleCorrect" ? (
                    <div className="bg-[#031C30] p-2 rounded-lg">
                      <p><strong>Your Answers:</strong></p>
                      <ul>
                        {(question.selectedAnswer as number[])?.map((index) => (
                          <li key={index} className={cn(
                            (question.correctAnswer as string[]).includes(question.options[index])
                              ? "text-green-500"
                              : "text-red-500"
                          )}>
                            {question.options[index]}
                          </li>
                        ))}
                      </ul>
                      <p><strong>Correct Answers:</strong></p>
                      <ul>
                        {(question.correctAnswer as string[]).map((answer, index) => (
                          <li key={index} className="text-green-500">{answer}</li>
                        ))}
                      </ul>
                    </div>
                  ) : question.type === "identification" ? (
                    <div className="bg-[#031C30] p-2 rounded-lg">
                      <p>
                        <strong>Your Answer:</strong>{" "}
                        <span
                          className={cn(
                            (question.selectedAnswer as string)?.toLowerCase() ===
                              question.correctAnswer.toLowerCase()
                              ? "text-green-500"
                              : "text-red-500"
                          )}
                        >
                          {question.selectedAnswer || "No Answer"}
                        </span>
                      </p>
                      <p>
                        <strong>Correct Answer:</strong> {question.correctAnswer}
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {question.options.map((option, idx) => {
                        const isCorrect = option === question.correctAnswer
                        const isSelected = idx === question.selectedAnswer

                        return (
                          <li
                            key={idx}
                            className={cn(
                              "rounded-lg p-2",
                              "bg-[#031C30]",
                              isCorrect && "bg-green-500 text-white",
                              isSelected && !isCorrect && "bg-red-500 text-white"
                            )}
                          >
                            {option}{" "}
                            {isCorrect && <span>(Correct Answer)</span>}
                            {isSelected && !isCorrect && <span>(Your Answer)</span>}
                          </li>
                        )
                      })}
                    </ul>
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
                ) : questions[currentQuestion - 1]?.type === "multipleCorrect" ? (
                  <div className="space-y-2">
                    {questions[currentQuestion - 1]?.options.map((option, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center space-x-2 rounded-lg p-4",
                          "bg-[#031C30] hover:bg-[#052442]",
                          (questions[currentQuestion - 1]?.selectedAnswer as number[])?.includes(index) &&
                            "ring-2 ring-blue-500"
                        )}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <input
                          type="checkbox"
                          id={`option-${index}`}
                          checked={(questions[currentQuestion - 1]?.selectedAnswer as number[])?.includes(index)}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-grow cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <RadioGroup
                    value={
                      questions[currentQuestion - 1]?.selectedAnswer?.toString() || ""
                    }
                    className="space-y-2"
                  >
                    {questions[currentQuestion - 1]?.options.map((option, index) => (
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
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-grow cursor-pointer"
                        >
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

        {/* Right-hand Column */}
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
                  const isAnswered = question.selectedAnswer !== undefined
                  const buttonClass = cn(
                    "w-10 h-10 p-0",
                    i + 1 === currentQuestion
                      ? "ring-2 ring-blue-500"
                      : "bg-[#031C30] hover:bg-[#052442]",
                    isSubmitted &&
                      isAnswered &&
                      (question.type === "multipleCorrect"
                        ? (question.correctAnswer as string[]).every(correct => (question.selectedAnswer as number[]).map(index => question.options[index]).includes(correct))
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        : question.options[question.selectedAnswer as number] ===
                          question.correctAnswer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white")
                  )

                  return (
                    <Button
                      key={i}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => setCurrentQuestion(i + 1)}
                      disabled={isSubmitted}
                    >
                      {i + 1}
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={handleCompletionModalClose}
        setViewAnswersImmediately={setViewAnswersImmediately}
      />
    </div>
  )
}

export default QuizInterface

