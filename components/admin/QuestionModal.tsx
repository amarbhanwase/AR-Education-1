import React, { useState, useEffect } from 'react';
import { Question } from '../../types.ts';
import Button from '../ui/Button.tsx';
import Input from '../ui/Input.tsx';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  question: Question | null;
  chapter: string;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, onSave, question, chapter }) => {
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    if (question) {
      setText(question.text);
      setTopic(question.topic);
      setOptions(question.options);
      setCorrectAnswer(question.correctAnswer);
    } else {
      // Reset form for new question
      setText('');
      setTopic('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    }
  }, [question, isOpen]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const handleSubmit = () => {
    if (!text || !topic || options.some(o => !o) || !correctAnswer) {
      alert("Please fill out all fields.");
      return;
    }
    if (!options.includes(correctAnswer)) {
      alert("The correct answer must be one of the provided options.");
      return;
    }

    onSave({
      id: question?.id || '',
      text,
      topic,
      options,
      correctAnswer,
      chapter,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
            <h2 className="text-xl font-bold text-sky-800 mb-6">{question ? 'Edit Question' : 'Add New Question'}</h2>
            <div className="space-y-4">
                <Input id="question-text" label="Question Text" value={text} onChange={e => setText(e.target.value)} />
                <Input id="question-topic" label="Topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Organelles" />
                
                <h3 className="font-semibold pt-2">Options</h3>
                {options.map((opt, i) => (
                    <Input key={i} id={`option-${i}`} label={`Option ${i + 1}`} value={opt} onChange={e => handleOptionChange(i, e.target.value)} />
                ))}

                <div>
                    <label htmlFor="correct-answer" className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
                    <select
                        id="correct-answer"
                        value={correctAnswer}
                        onChange={e => setCorrectAnswer(e.target.value)}
                        className="w-full px-3 py-2 border border-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        <option value="" disabled>-- Select the correct option --</option>
                        {options.filter(o => o).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="secondary" onClick={handleSubmit}>Save Question</Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;