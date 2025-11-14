import React, { useState } from 'react';
import { MOCK_QUESTIONS, CLASS_11_BIOLOGY_CHAPTERS, CLASS_12_BIOLOGY_CHAPTERS } from '../../constants.ts';
import { Question } from '../../types.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import QuestionModal from './QuestionModal.tsx';

const QuestionBank: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
    const [selectedChapter, setSelectedChapter] = useState<string>(CLASS_11_BIOLOGY_CHAPTERS[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    const handleOpenModal = (question: Question | null = null) => {
        setEditingQuestion(question);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingQuestion(null);
    };

    const handleSaveQuestion = (questionToSave: Question) => {
        if (editingQuestion) {
            // Edit existing
            setQuestions(prev => prev.map(q => q.id === questionToSave.id ? questionToSave : q));
        } else {
            // Add new
            const newQuestion = { ...questionToSave, id: `q${Date.now()}` };
            setQuestions(prev => [...prev, newQuestion]);
        }
        handleCloseModal();
    };
    
    const handleDeleteQuestion = (questionId: string) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            setQuestions(prev => prev.filter(q => q.id !== questionId));
        }
    };

    const chapterQuestions = questions.filter(q => q.chapter === selectedChapter);

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Question Bank</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <h3 className="font-bold mb-2">Select Chapter</h3>
                    <select
                        value={selectedChapter}
                        onChange={e => setSelectedChapter(e.target.value)}
                        className="w-full p-2 border border-sky-200 rounded-md"
                        size={10}
                    >
                        <optgroup label="Class 11 Biology">
                            {CLASS_11_BIOLOGY_CHAPTERS.map(ch => <option key={ch} value={ch}>{ch}</option>)}
                        </optgroup>
                        <optgroup label="Class 12 Biology">
                            {CLASS_12_BIOLOGY_CHAPTERS.map(ch => <option key={ch} value={ch}>{ch}</option>)}
                        </optgroup>
                    </select>
                </div>
                <div className="md:col-span-3">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-xl">{selectedChapter}</h3>
                        <Button onClick={() => handleOpenModal()}>Add New Question</Button>
                    </div>
                    <Card className="p-4 bg-sky-50 min-h-[400px]">
                        <div className="space-y-4">
                            {chapterQuestions.length > 0 ? (
                                chapterQuestions.map(q => (
                                    <div key={q.id} className="bg-white p-3 rounded-md shadow-sm border border-sky-100 flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-800">{q.text}</p>
                                            <p className="text-sm text-gray-500 mt-1">Topic: {q.topic} | Answer: <span className="text-green-600 font-medium">{q.correctAnswer}</span></p>
                                        </div>
                                        <div className="flex-shrink-0 ml-4">
                                            <Button variant="ghost" size="sm" onClick={() => handleOpenModal(q)}>Edit</Button>
                                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDeleteQuestion(q.id)}>Delete</Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">No questions found for this chapter.</p>
                                    <Button className="mt-4" onClick={() => handleOpenModal()}>Add the First Question</Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            {isModalOpen && (
                <QuestionModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveQuestion}
                    question={editingQuestion}
                    chapter={selectedChapter}
                />
            )}
        </div>
    );
};

export default QuestionBank;