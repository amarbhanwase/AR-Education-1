import React, { useState, useEffect } from 'react';
import { User, Test, Question, View } from '../../types.ts';
import { CLASS_11_BIOLOGY_CHAPTERS, CLASS_12_BIOLOGY_CHAPTERS, MOCK_QUESTIONS, MOCK_TESTS } from '../../constants.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import AdBanner from '../ui/AdBanner.tsx';
import ProfileDropdown from '../common/ProfileDropdown.tsx';

interface StudentDashboardProps {
  user: User;
  onStartQuiz: (questions: Question[], test?: Test) => void;
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onStartQuiz, onLogout, onNavigate }) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedClass, setSelectedClass] = useState<11 | 12 | null>(null);
  
  useEffect(() => {
      // In a real app, this would be a fetch call.
      // We simulate it to show how tests "created by admin" would appear.
      setTests(MOCK_TESTS);
  }, []);

  const handleStartPractice = (chapter: string) => {
    const chapterQuestions = MOCK_QUESTIONS.filter(q => q.chapter === chapter);
    onStartQuiz(chapterQuestions);
  };

  const handleStartTest = (test: Test) => {
    const testQuestions = MOCK_QUESTIONS.filter(q => test.questionIds.includes(q.id));
    onStartQuiz(testQuestions, test);
  };

  const ChapterSelectionView = () => (
    <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Choose Your Class</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="text-center p-8 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedClass(11)}>
                <h3 className="text-2xl font-bold text-sky-700">Class 11 Biology</h3>
                <p className="text-gray-500 mt-2">Start practicing chapters from the Class 11 syllabus.</p>
            </Card>
            <Card className="text-center p-8 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedClass(12)}>
                <h3 className="text-2xl font-bold text-sky-700">Class 12 Biology</h3>
                <p className="text-gray-500 mt-2">Start practicing chapters from the Class 12 syllabus.</p>
            </Card>
        </div>
    </section>
  );

  const ChapterListView = () => {
      const chapters = selectedClass === 11 ? CLASS_11_BIOLOGY_CHAPTERS : CLASS_12_BIOLOGY_CHAPTERS;
      return (
        <section>
            <div className="flex items-center mb-4">
              <Button onClick={() => setSelectedClass(null)} variant="ghost" className="mr-4">
                &larr; Back to Classes
              </Button>
              <h2 className="text-2xl font-bold text-gray-700">Class {selectedClass} Biology Chapters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapters.map(chapter => (
                <Card key={chapter} className="flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-sky-700 mb-4">{chapter}</h3>
                  <Button onClick={() => handleStartPractice(chapter)} className="w-full">Start Practice</Button>
                </Card>
              ))}
            </div>
        </section>
      );
  }

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-sky-800">Welcome, {user.name.split(' ')[0]}!</h1>
            <p className="text-gray-600">Ready to ace your Biology prep?</p>
        </div>
        <ProfileDropdown user={user} onLogout={onLogout} onNavigate={onNavigate} />
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {selectedClass === null ? <ChapterSelectionView /> : <ChapterListView />}
        </div>

        <aside>
            <section>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Timed Tests</h2>
                 {tests.length > 0 ? (
                    <div className="space-y-4">
                        {tests.map(test => (
                            <Card key={test.id}>
                                <h3 className="text-lg font-bold text-sky-700">{test.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{test.timeLimit} minutes</p>
                                <Button onClick={() => handleStartTest(test)} variant="secondary" className="w-full">
                                    Start Test
                                </Button>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <p className="text-gray-500 text-center">No timed tests available right now. Check back later!</p>
                    </Card>
                )}
            </section>
            <AdBanner />
        </aside>
      </main>
    </div>
  );
};

export default StudentDashboard;