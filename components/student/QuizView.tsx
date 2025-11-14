import React, { useState, useEffect, useRef } from 'react';
import { Question, Test, QuizResult } from '../../types.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';

interface QuizViewProps {
  quiz: {
    questions: Question[];
    test?: Test;
  };
  onFinishQuiz: (result: QuizResult) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onFinishQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(quiz.test ? quiz.test.timeLimit * 60 : null);
  // Fix: Replaced NodeJS.Timeout with number, which is the correct return type for setInterval in a browser environment.
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (quiz.test) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === null || prevTime <= 1) {
            clearInterval(timerRef.current!);
            handleFinishQuiz();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.test]);

  const handleAnswerSelect = (option: string) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handleFinishQuiz = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      let score = 0;
      quiz.questions.forEach(q => {
          if (answers[q.id] === q.correctAnswer) {
              score++;
          }
      });
      onFinishQuiz({
          score,
          totalQuestions: quiz.questions.length,
          answers,
          questions: quiz.questions,
          test: quiz.test,
      });
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-sky-100">
      <Card className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-sky-800">{quiz.test?.title || `${currentQuestion.chapter} Practice`}</h2>
          {timeLeft !== null && <div className="text-lg font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">{formatTime(timeLeft)}</div>}
        </div>
        
        <div className="w-full bg-sky-100 rounded-full h-2.5 mb-6">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            <p className="text-lg font-semibold text-gray-800">{currentQuestion.text}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            const isSelected = answers[currentQuestion.id] === option;
            return (
              <button 
                key={option} 
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 ${
                  isSelected ? 'bg-sky-100 border-sky-500 ring-2 ring-sky-300' : 'bg-white border-sky-200 hover:bg-sky-50'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-end">
            {currentQuestionIndex < quiz.questions.length - 1 ? (
                <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
                Next
                </Button>
            ) : (
                <Button onClick={handleFinishQuiz} variant="secondary" disabled={!answers[currentQuestion.id]}>
                Finish Quiz
                </Button>
            )}
        </div>
      </Card>
    </div>
  );
};

export default QuizView;