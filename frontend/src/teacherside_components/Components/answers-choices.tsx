"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface AnswerChoicesProps {
  multipleAnswers: boolean;
  questionType: "multiple" | "truefalse" | "identification";
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

export function AnswerChoices({
  multipleAnswers,
  questionType,
  answers,
  setAnswers,
}: AnswerChoicesProps) {
  const [currentType, setCurrentType] = useState(questionType);

  useEffect(() => {
    if (questionType !== currentType) {
      // Reset answers only if the question type has changed
      if (questionType === "truefalse") {
        setAnswers([
          { id: "true", text: "True", isCorrect: false },
          { id: "false", text: "False", isCorrect: false },
        ]);
      } else if (questionType === "identification") {
        setAnswers([{ id: "answer", text: "", isCorrect: true }]);
      } else {
        setAnswers([]); // Clear answers for other question types
      }
      setCurrentType(questionType); // Update the current type after reset
    }
  }, [questionType, currentType, setAnswers]);

  const addAnswer = () => {
    const newAnswer: Answer = {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      isCorrect: false,
    };
    setAnswers([...answers, newAnswer]);
  };

  const updateAnswer = (id: string, text: string) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === id ? { ...answer, text } : answer
      )
    );
  };

  const toggleCorrect = (id: string) => {
    setAnswers(
      answers.map((answer) => {
        if (multipleAnswers) {
          return answer.id === id
            ? { ...answer, isCorrect: !answer.isCorrect }
            : answer;
        } else {
          return { ...answer, isCorrect: answer.id === id }; // Only one correct answer for MC
        }
      })
    );
  };

  const deleteAnswer = (id: string) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  if (questionType === "truefalse") {
    return (
      <RadioGroup
        value={answers.find((a) => a.isCorrect)?.id || ""}
        onValueChange={(id) =>
          setAnswers(
            answers.map((answer) => ({
              ...answer,
              isCorrect: answer.id === id,
            }))
          )
        }
        className="space-y-2"
      >
        {answers.map((answer) => (
          <div key={answer.id} className="flex items-center gap-2">
            <RadioGroupItem value={answer.id} id={answer.id} />
            <label htmlFor={answer.id}>{answer.text}</label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  if (questionType === "identification") {
    return (
      <div className="space-y-2">
        <Input
          placeholder="Enter the correct answer"
          value={answers[0]?.text || ""}
          onChange={(e) =>
            setAnswers([{ id: "answer", text: e.target.value, isCorrect: true }])
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {answers.map((answer) => (
        <div key={answer.id} className="flex items-center gap-2">
          {/* For single answer questions, use RadioGroup instead of Checkbox */}
          {!multipleAnswers && (
            <RadioGroup
              value={answers.find((a) => a.isCorrect)?.id || ""}
              onValueChange={(id) =>
                setAnswers(
                  answers.map((answer) => ({
                    ...answer,
                    isCorrect: answer.id === id,
                  }))
                )
              }
            >
              <RadioGroupItem value={answer.id} />
            </RadioGroup>
          )}

          {/* For multiple answer questions, use Checkbox */}
          {multipleAnswers && (
            <Checkbox
              checked={answer.isCorrect}
              onCheckedChange={() => toggleCorrect(answer.id)}
              className="h-5 w-5"
            />
          )}

          <Input
            value={answer.text}
            onChange={(e) => updateAnswer(answer.id, e.target.value)}
            placeholder="Enter answer text..."
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteAnswer(answer.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button onClick={addAnswer} className="bg-[#031C30] text-white mt-4">
        Add Answer
      </Button>
    </div>
  );
}
