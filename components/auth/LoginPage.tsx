import React from 'react';
import { MOCK_USERS } from '../../constants.ts';
import { User } from '../../types.ts';
import Button from '../ui/Button.tsx';
import Card from '../ui/Card.tsx';
import Input from '../ui/Input.tsx';
import BookOpenCheckIcon from '../icons/BookOpenCheckIcon.tsx';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToRegister }) => {
  const [email, setEmail] = React.useState('amarbhanavase111@gmail.com');
  const [password, setPassword] = React.useState('Amar@123');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.email === email);
    // In a real app, you would also check the password. For this demo, we assume any password is valid for the mock users.
    if (user && (user.email === 'amarbhanavase111@gmail.com' && password === 'Amar@123' || user.email !== 'amarbhanavase111@gmail.com')) {
      onLogin(user);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-50/90 to-gray-200/90 backdrop-blur-sm p-4">
        <div className="text-center w-full max-w-md mx-auto mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
                Welcome to AR Education
            </h1>
            <p className="text-slate-600 mt-4 text-lg font-medium">Your one-stop solution for CET exam preparation.</p>
        </div>

        <Card className="w-full max-w-md">
          <BookOpenCheckIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Login to Your Account</h2>
          <p className="text-center text-slate-500 mb-8">Enter your credentials to access your dashboard.</p>
          
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center text-sm">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              id="email" 
              label="Email" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@example.com" 
              required 
            />
            <Input 
              id="password" 
              label="Password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
            />
            <Button type="submit" className="w-full !mt-6 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-base font-bold">
              Log In
            </Button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <button onClick={onNavigateToRegister} className="font-semibold text-blue-600 hover:underline">
              Sign up
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;