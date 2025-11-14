import React from 'react';
import { Question, Test } from '../../types.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';

interface TestPreviewProps {
  test: Test;
  questions: Question[];
  onConfirm: () => void;
  onEdit: () => void;
  isEditing: boolean;
  onRemoveQuestion: (questionId: string) => void;
}

const TestPreview: React.FC<TestPreviewProps> = ({ test, questions, onConfirm, onEdit, isEditing, onRemoveQuestion }) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-sky-800 mb-1">Test Preview</h2>
      <p className="text-gray-500 mb-6">Review the details below. You can remove questions from this screen before finalizing.</p>
      
      <div className="mb-6 p-4 border rounded-md bg-sky-50">
        <h3 className="text-xl font-bold text-gray-800">{test.title}</h3>
        <p className="text-sm text-gray-600">
            <strong>Chapter:</strong> {test.chapter} | <strong>Time Limit:</strong> {test.timeLimit} minutes | <strong>Questions:</strong> {test.questionIds.length}
        </p>
      </div>
      
      <div>
        <h4 className="font-bold text-lg mb-2">Selected Questions:</h4>
        <div className="space-y-3 max-h-80 overflow-y-auto border border-sky-200 p-4 rounded-md">
            {questions.map((q, index) => (
                <div key={q.id} className="p-3 bg-white rounded-md border flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-gray-700">{index + 1}. {q.text}</p>
                        <p className="text-sm text-green-600 mt-1">Correct Answer: {q.correctAnswer}</p>
                    </div>
                    <button 
                        onClick={() => onRemoveQuestion(q.id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm ml-4 px-2 py-1 rounded hover:bg-red-50"
                        title="Remove question"
                    >
                        Remove
                    </button>
                </div>
            ))}
             {questions.length === 0 && (
                <p className="text-center text-gray-500 py-4">No questions selected. Go back to edit and add some questions.</p>
            )}
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="ghost" onClick={onEdit}>Back to Edit</Button>
        <Button variant="secondary" onClick={onConfirm} disabled={questions.length === 0}>
          {isEditing ? 'Save Changes' : 'Publish Test'}
        </Button>
      </div>
    </Card>
  );
};

export default TestPreview;