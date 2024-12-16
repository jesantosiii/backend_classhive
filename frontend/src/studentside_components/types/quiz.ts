export interface Quiz {
  quizName: string;
  subject: string;
  date: string;
  totalItems: number;
  score: number;
}

export interface User {
  name: string;
  year: string;
  avatar?: string;
}

