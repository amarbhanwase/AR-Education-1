import React, { useEffect, useState, useMemo } from 'react';
import { QuizResult, PerformanceData } from '../../types.ts';
import { getStudyRecommendation } from '../../services/geminiService.ts';
import Card from '../ui/Card.tsx';
import Button from '../ui/Button.tsx';
import Spinner from '../ui/Spinner.tsx';
import AdBanner from '../ui/AdBanner.tsx';

interface ResultsPageProps {
  result: QuizResult;
  onDone: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onDone }) => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // @ts-ignore - Recharts is loaded from a script tag in index.html
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = window.Recharts || {};

  const performanceByTopic = useMemo(() => {
    const topicData: { [topic: string]: { correct: number; total: number } } = {};

    result.questions.forEach(q => {
      if (!topicData[q.topic]) {
        topicData[q.topic] = { correct: 0, total: 0 };
      }
      topicData[q.topic].total++;
      if (result.answers[q.id] === q.correctAnswer) {
        topicData[q.topic].correct++;
      }
    });

    return Object.entries(topicData).map(([topic, data]) => ({
      topic,
      ...data,
      accuracy: Math.round((data.correct / data.total) * 100),
    }));
  }, [result]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      setIsLoading(true);
      const dataForAI: PerformanceData[] = performanceByTopic.map(({topic, correct, total}) => ({ topic, correct, total}));
      const rec = await getStudyRecommendation(dataForAI, 'Student');
      setRecommendation(rec);
      setIsLoading(false);
    };

    fetchRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-sky-800">Quiz Results</h1>
        <p className="text-gray-600 mt-2">{result.test?.title || 'Practice Quiz'}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Score</h2>
            <div className="text-center">
              <p className="text-6xl font-bold text-green-600">{scorePercentage}%</p>
              <p className="text-xl text-gray-600 mt-2">
                You answered {result.score} out of {result.totalQuestions} questions correctly.
              </p>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Topic-wise Performance</h2>
            <div style={{ width: '100%', height: 300 }}>
                {BarChart && ResponsiveContainer ? (
                    <ResponsiveContainer>
                        <BarChart data={performanceByTopic} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="topic" />
                            <YAxis unit="%" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="accuracy" fill="#16a34a" name="Accuracy (%)" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Loading chart...</p>
                    </div>
                )}
            </div>
          </Card>
        </div>
        
        <aside className="space-y-8">
          <Card>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              <span role="img" aria-label="lightbulb">💡</span> AI Recommendation
            </h2>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-40">
                  <Spinner />
                  <p className="text-gray-500 mt-2">Generating your personalized feedback...</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: recommendation }} />
            )}
          </Card>
          <AdBanner/>
        </aside>
      </div>

      <div className="mt-12 text-center">
          <Button onClick={onDone} variant="secondary" className="px-8 py-3 text-lg">
            Back to Dashboard
          </Button>
      </div>
    </div>
  );
};

export default ResultsPage;