export enum Role {
  Student = 'student',
  Admin = 'admin',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Question {
  id: string;
  chapter: string;
  topic: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Test {
  id: string;
  title: string;
  chapter: string;
  timeLimit: number; // in minutes
  questionIds: string[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: { [questionId: string]: string };
  questions: Question[];
  test?: Test;
}

export interface PerformanceData {
  topic: string;
  correct: number;
  total: number;
}

export enum View {
  Login,
  Register,
  StudentDashboard,
  AdminDashboard,
  Quiz,
  Results,
  MyPerformance,
  Help,
  About,
  Upgrade,
}

export interface Ad {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}
