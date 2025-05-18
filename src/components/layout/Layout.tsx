import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  BarChart3, Users, Sprout, AlertTriangle, 
  FileText, MessageSquareText, LineChart, Menu, X, Home 
} from 'lucide-react';
import Logo from './Logo';
import UserDropdown from './UserDropdown';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/spending', label: 'Government Spending', icon: <BarChart3 size={20} /> },
    { path: '/leaders', label: 'Leader Performance', icon: <Users size={20} /> },
    { path: '/agriculture', label: 'Agriculture Prices', icon: <Sprout size={20} /> },
    { path: '/report', label: 'Report Issues', icon: <AlertTriangle size={20} /> },
    { path: '/schemes', label: 'Scheme Details', icon: <FileText size={20} /> },
    { path: '/community', label: 'Community Feedback', icon: <MessageSquareText size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-white">
        <div className="p-4 border-b border-slate-700">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <UserDropdown />
        </div>
      </aside>

      {/* Mobile Header & Navigation */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10 lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="mr-2 text-slate-600 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Logo />
            </div>
            <UserDropdown />
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-20 bg-slate-800 bg-opacity-95 lg:hidden overflow-y-auto">
            <div className="p-4">
              <button 
                onClick={toggleMobileMenu}
                className="mb-4 text-white focus:outline-none"
              >
                <X size={24} />
              </button>
              <nav>
                <ul className="space-y-3">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={toggleMobileMenu}
                        className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;