import React from 'react';
import { User, View } from '../../types.ts';
import TestCreator from './TestCreator.tsx';
import ProfileDropdown from '../common/ProfileDropdown.tsx';
import QuestionBank from './QuestionBank.tsx';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = React.useState('tests');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <div className="p-4 bg-white rounded-lg shadow"><p>User management interface goes here.</p></div>;
      case 'progress':
        return <div className="p-4 bg-white rounded-lg shadow"><p>Student progress tracking interface goes here.</p></div>;
      case 'questions':
        return <QuestionBank />;
      case 'tests':
        return <TestCreator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-sky-800">Admin Dashboard</h1>
            <p className="text-gray-600">Logged in as {user.name} ({user.email})</p>
        </div>
        <ProfileDropdown user={user} onLogout={onLogout} onNavigate={onNavigate} />
      </header>
      
      <div className="flex border-b border-sky-200 mb-6">
        <TabButton name="Manage Tests" id="tests" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name="Question Bank" id="questions" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name="Manage Users" id="users" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton name="Student Progress" id="progress" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

interface TabButtonProps {
    name: string;
    id: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ name, id, activeTab, setActiveTab }) => {
    const isActive = activeTab === id;
    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 font-semibold text-sm -mb-px border-b-2 transition-colors duration-200 ${
                isActive 
                ? 'border-sky-600 text-sky-700' 
                : 'border-transparent text-gray-500 hover:text-sky-600 hover:border-sky-300'
            }`}
        >
            {name}
        </button>
    );
}

export default AdminDashboard;