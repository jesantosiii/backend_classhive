"use client"

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from 'lucide-react';
import { AnswerChoices } from "../Components/answers-choices";

interface Question {
  id: string;
  content: string;
  type: 'multiple' | 'truefalse' | 'identification';
}

const QuestionsSidebar = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', content: 'None', type: 'multiple' }
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      content: `Question ${questions.length + 1}`,
      type: 'multiple'
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion.id);
  };

  return (
    <aside className="w-64 h-screen bg-[#0a1929] flex flex-col p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-sm font-medium">Questions ({questions.length})</h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-white h-8 w-8"
          onClick={addQuestion}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 flex-grow overflow-y-auto">
        {questions.map((question) => (
          <Card 
            key={question.id} 
            className={`bg-[#1a2937] border-0 cursor-pointer ${selectedQuestion === question.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedQuestion(question.id)}
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 flex items-center justify-center rounded bg-gray-700 text-xs text-white">
                  {question.id}
                </span>
                <span className="text-gray-300">{question.content}</span>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </aside>
  );
};

export default QuestionsSidebar;

