import React, { useState } from 'react';
import { MOCK_QUESTIONS, MOCK_TESTS, CLASS_11_BIOLOGY_CHAPTERS, CLASS_12_BIOLOGY_CHAPTERS } from '../../constants.ts';
import { Test } from '../../types.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import Input from '../ui/Input.tsx';
import TestPreview from './TestPreview.tsx';

const TestCreator: React.FC = () => {
  const [tests, setTests] = useState<Test[]>(MOCK_TESTS);
  const [view, setView] = useState<'list' | 'form' | 'preview'>('list');
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(10);
  const [selectedChapter, setSelectedChapter] = useState(CLASS_11_BIOLOGY_CHAPTERS[0]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  
  const chapterQuestions = MOCK_QUESTIONS.filter(q => q.chapter === selectedChapter);

  const handleToggleQuestion = (id: string) => {
    setSelectedQuestionIds(prev =>
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };
  
  const resetAndShowList = () => {
    setTitle('');
    setTimeLimit(10);
    setSelectedChapter(CLASS_11_BIOLOGY_CHAPTERS[0]);
    setSelectedQuestionIds([]);
    setEditingTest(null);
    setView('list');
  };
  
  const handleCreateNew = () => {
    resetAndShowList();
    setEditingTest(null); // Explicitly clear editing state
    setView('form');
  };
  
  const handleEditTest = (test: Test) => {
    setEditingTest(test);
    setTitle(test.title);
    setTimeLimit(test.timeLimit);
    setSelectedChapter(test.chapter);
    setSelectedQuestionIds(test.questionIds);
    setView('form');
  };
  
  const handlePreview = () => {
     if (!title || selectedQuestionIds.length === 0) {
      alert("Please provide a title and select at least one question.");
      return;
    }
    setView('preview');
  };

  const handleConfirmSave = () => {
    if (editingTest) { // We are editing
      const updatedTest: Test = { ...editingTest, title, timeLimit, chapter: selectedChapter, questionIds: selectedQuestionIds };
      setTests(prev => prev.map(t => t.id === editingTest.id ? updatedTest : t));
      alert("Test updated successfully!");
    } else { // We are creating
      const newTest: Test = {
        id: `t${Date.now()}`,
        title,
        timeLimit,
        chapter: selectedChapter,
        questionIds: selectedQuestionIds,
      };
      setTests(prev => [...prev, newTest]);
       alert("Test created successfully! Students will now see it on their dashboard.");
    }
    resetAndShowList();
  };
  
  const handleRemoveQuestionFromPreview = (questionId: string) => {
    setSelectedQuestionIds(prevIds => prevIds.filter(id => id !== questionId));
  };
  
  const renderListView = () => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Manage Timed Tests</h2>
            <Button onClick={handleCreateNew}>Create New Test</Button>
        </div>
        <div className="space-y-4">
          {tests.length > 0 ? tests.map(test => (
            <Card key={test.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg text-sky-700">{test.title}</h4>
                <p className="text-sm text-gray-500">{test.chapter} | {test.timeLimit} mins | {test.questionIds.length} questions</p>
              </div>
              <div>
                <Button variant="ghost" className="mr-2" onClick={() => handleEditTest(test)}>Edit</Button>
                <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => {
                    if(window.confirm(`Are you sure you want to delete "${test.title}"?`)) {
                        setTests(prev => prev.filter(t => t.id !== test.id));
                    }
                }}>Delete</Button>
              </div>
            </Card>
          )) : <p className="text-gray-500">No tests created yet.</p>}
        </div>
    </div>
  );

  const renderFormView = () => (
    <Card className="bg-sky-50">
      <h3 className="text-xl font-bold text-sky-800 mb-4">{editingTest ? 'Edit Test' : 'New Test Form'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input id="test-title" label="Test Title" value={title} onChange={e => setTitle(e.target.value)} />
        <Input id="time-limit" label="Time Limit (minutes)" type="number" value={timeLimit} onChange={e => setTimeLimit(parseInt(e.target.value, 10))} />
      </div>
      
      <div className="mb-6">
        <label htmlFor="chapter-select" className="block text-sm font-medium text-gray-700 mb-1">Select Chapter</label>
        <select id="chapter-select" value={selectedChapter} onChange={e => {
            setSelectedChapter(e.target.value);
            setSelectedQuestionIds([]); // Reset questions when chapter changes
        }} className="w-full px-3 py-2 border border-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
          <optgroup label="Class 11 Biology">
            {CLASS_11_BIOLOGY_CHAPTERS.map(ch => <option key={ch} value={ch}>{ch}</option>)}
          </optgroup>
          <optgroup label="Class 12 Biology">
            {CLASS_12_BIOLOGY_CHAPTERS.map(ch => <option key={ch} value={ch}>{ch}</option>)}
          </optgroup>
        </select>
      </div>

      <h4 className="font-bold mb-2">Select Questions ({selectedQuestionIds.length} selected)</h4>
      <div className="space-y-2 max-h-60 overflow-y-auto border border-sky-200 p-4 rounded-md bg-white">
        {chapterQuestions.length > 0 ? chapterQuestions.map(q => (
          <div key={q.id} className="flex items-center">
            <input 
              type="checkbox" 
              id={`q-${q.id}`} 
              checked={selectedQuestionIds.includes(q.id)} 
              onChange={() => handleToggleQuestion(q.id)}
              className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor={`q-${q.id}`} className="ml-3 text-sm text-gray-700">{q.text}</label>
          </div>
        )) : <p className="text-sm text-gray-500">No questions available for this chapter.</p>}
      </div>

      <div className="flex justify-end gap-4 mt-6">
          <Button variant="ghost" onClick={resetAndShowList}>Cancel</Button>
          <Button variant="secondary" onClick={handlePreview}>
            {editingTest ? 'Preview Changes' : 'Preview Test'}
          </Button>
      </div>
    </Card>
  );
  
  const renderPreviewView = () => {
    const previewTest: Test = {
      id: editingTest?.id || 'new',
      title,
      timeLimit,
      chapter: selectedChapter,
      questionIds: selectedQuestionIds,
    };
    const questions = MOCK_QUESTIONS.filter(q => selectedQuestionIds.includes(q.id));

    return (
        <TestPreview 
            test={previewTest}
            questions={questions}
            onConfirm={handleConfirmSave}
            onEdit={() => setView('form')}
            isEditing={!!editingTest}
            onRemoveQuestion={handleRemoveQuestionFromPreview}
        />
    );
  };

  const renderContent = () => {
    switch(view) {
        case 'form': return renderFormView();
        case 'preview': return renderPreviewView();
        case 'list':
        default:
            return renderListView();
    }
  };

  return <div>{renderContent()}</div>;
};

export default TestCreator;