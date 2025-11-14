import React, { useState, useEffect, useRef } from 'react';
import { User, View } from '../../types.ts';
import UserCircleIcon from '../icons/UserCircleIcon.tsx';
import ChartBarIcon from '../icons/ChartBarIcon.tsx';
import QuestionMarkIcon from '../icons/QuestionMarkIcon.tsx';
import InfoIcon from '../icons/InfoIcon.tsx';
import StarIcon from '../icons/StarIcon.tsx';
import LogoutIcon from '../icons/LogoutIcon.tsx';

interface ProfileDropdownProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleNavigation = (view: View) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sky-700 hover:text-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 rounded-full p-1"
      >
        <UserCircleIcon className="h-8 w-8 text-gray-500" />
        <span className="hidden sm:inline font-semibold">{user.name.split(' ')[0]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <div className="px-4 py-2 border-b mb-1">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <MenuItem icon={<ChartBarIcon className="h-5 w-5"/>} text="My Performance" onClick={() => handleNavigation(View.MyPerformance)} />
            <MenuItem icon={<QuestionMarkIcon className="h-5 w-5"/>} text="Get Help" onClick={() => handleNavigation(View.Help)} />
            <MenuItem icon={<InfoIcon className="h-5 w-5"/>} text="About Us" onClick={() => handleNavigation(View.About)} />
            <MenuItem icon={<StarIcon className="h-5 w-5"/>} text="Upgrade App" onClick={() => handleNavigation(View.Upgrade)} />
            <div className="border-t my-1"></div>
            <MenuItem icon={<LogoutIcon className="h-5 w-5"/>} text="Log Out" onClick={onLogout} />
          </div>
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => (
    <button onClick={onClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-800 transition-colors">
        <span className="text-gray-400 group-hover:text-sky-700">{icon}</span>
        {text}
    </button>
)

export default ProfileDropdown;