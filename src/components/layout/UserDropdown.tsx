import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-sm font-medium focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
          <User size={16} />
        </div>
        <span className="hidden md:block text-sm lg:text-slate-200">Citizen User</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} lg:text-slate-200`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
          <a
            href="#profile"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              Your Profile
            </div>
          </a>
          <a
            href="#settings"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <div className="flex items-center">
              <Settings size={16} className="mr-2" />
              Settings
            </div>
          </a>
          <div className="border-t border-slate-200 my-1"></div>
          <a
            href="#logout"
            className="block px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
          >
            <div className="flex items-center">
              <LogOut size={16} className="mr-2" />
              Sign Out
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;