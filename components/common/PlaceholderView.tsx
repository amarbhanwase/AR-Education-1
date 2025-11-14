import React from 'react';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';

interface PlaceholderViewProps {
  title: string;
  message: string;
  onBack: () => void;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, message, onBack }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-sky-100">
      <Card className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-sky-800 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <Button onClick={onBack} variant="secondary">
          &larr; Back to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default PlaceholderView;