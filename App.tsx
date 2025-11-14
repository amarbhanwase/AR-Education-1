import React, { useState, useEffect, useCallback } from 'react';
import { User, Test, QuizResult, View, Role, Question } from './types.ts';
import LoginPage from './components/auth/LoginPage.tsx';
import StudentDashboard from './components/student/StudentDashboard.tsx';
import AdminDashboard from './components/admin/AdminDashboard.tsx';
import QuizView from './components/student/QuizView.tsx';
import ResultsPage from './components/student/ResultsPage.tsx';
import PlaceholderView from './components/common/PlaceholderView.tsx';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.Login);
  const [activeQuiz, setActiveQuiz] = useState<{ questions: Question[]; test?: Test } | null>(null);
  const [lastQuizResult, setLastQuizResult] = useState<QuizResult | null>(null);

  const navigate = (view: View) => setCurrentView(view);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === Role.Admin) {
      navigate(View.AdminDashboard);
    } else {
      navigate(View.StudentDashboard);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveQuiz(null);
    setLastQuizResult(null);
    navigate(View.Login);
  };

  const startQuiz = (questions: Question[], test?: Test) => {
    setActiveQuiz({ questions, test });
    navigate(View.Quiz);
  };

  const finishQuiz = (result: QuizResult) => {
    setLastQuizResult(result);
    setActiveQuiz(null);
    navigate(View.Results);
  };

  const renderView = () => {
    const backToDashboardView = currentUser?.role === Role.Admin ? View.AdminDashboard : View.StudentDashboard;

    switch (currentView) {
      case View.Login:
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => {}} />;
      case View.StudentDashboard:
        return currentUser && <StudentDashboard user={currentUser} onStartQuiz={startQuiz} onLogout={handleLogout} onNavigate={navigate} />;
      case View.AdminDashboard:
        return currentUser && <AdminDashboard user={currentUser} onLogout={handleLogout} onNavigate={navigate} />;
      case View.Quiz:
        return activeQuiz && <QuizView quiz={activeQuiz} onFinishQuiz={finishQuiz} />;
      case View.Results:
        return lastQuizResult && <ResultsPage result={lastQuizResult} onDone={() => navigate(View.StudentDashboard)} />;
      case View.MyPerformance:
        return <PlaceholderView title="My Performance" message="This page will show your detailed performance statistics across all quizzes and tests." onBack={() => navigate(backToDashboardView)} />;
      case View.Help:
        return <PlaceholderView title="Get Help" message="Find answers to frequently asked questions or contact our support team here." onBack={() => navigate(backToDashboardView)} />;
      case View.About:
        return <PlaceholderView title="About Us" message="AR Education is dedicated to providing the best preparation tools for students." onBack={() => navigate(backToDashboardView)} />;
      case View.Upgrade:
        return <PlaceholderView title="Upgrade App" message="Unlock premium features like unlimited tests, advanced analytics, and more by upgrading your plan." onBack={() => navigate(backToDashboardView)} />;
      default:
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 font-sans text-gray-800">
      {renderView()}
    </div>
  );
};

export default App;