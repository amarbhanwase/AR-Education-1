
import React from 'react';

// Fix: Extended CardProps with React.HTMLAttributes<HTMLDivElement> to allow passing standard HTML attributes like onClick.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    // Fix: Spread the rest of the props (...props) onto the div element.
    <div className={`border border-sky-100/20 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
