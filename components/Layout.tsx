import React from 'react';
import { User, UserRole } from '../types';
import { LayoutDashboard, FilePlus, Settings, Building2, Moon, Sun } from 'lucide-react';

interface LayoutProps {
  user: User;
  currentView: string;
  onChangeView: (view: string) => void;
  onChangeUser: (userId: string) => void;
  children: React.ReactNode;
  allUsers: User[];
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  user, 
  currentView, 
  onChangeView, 
  onChangeUser, 
  children, 
  allUsers,
  darkMode,
  toggleDarkMode
}) => {
  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex flex-col`}>
      {/* 1. Primary Header - Dark Brand Color */}
      <header className="bg-slate-900 dark:bg-black text-white px-6 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 z-50">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChangeView('dashboard')}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-900/50">
            <Building2 size={22} className="text-white"/>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">TRIDENT</h1>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Contract Guard</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
           {/* Dark Mode Toggle */}
           <button 
            onClick={toggleDarkMode}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

           <div className="h-6 w-px bg-slate-800"></div>

           {/* User Profile */}
           <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-medium text-slate-200">{user.name}</p>
                <div className="flex items-center justify-end gap-1">
                  <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <select 
                    className="bg-transparent text-[10px] text-slate-400 border-none p-0 cursor-pointer focus:ring-0 text-right appearance-none hover:text-white uppercase tracking-wider"
                    value={user.id}
                    onChange={(e) => onChangeUser(e.target.value)}
                    title="Switch User Role (Demo)"
                  >
                    {allUsers.map(u => (
                      <option key={u.id} value={u.id} className="bg-slate-800 text-slate-200">
                        {u.role} - {u.entity}
                      </option>
                    ))}
                  </select>
                </div>
             </div>
             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-bold shadow-md border-2 border-slate-700">
                {user.name.charAt(0)}
             </div>
          </div>
        </div>
      </header>

      {/* 2. Secondary Navigation - Below Header */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-1 shrink-0 shadow-sm z-40">
        <div className="flex items-center space-x-1 overflow-x-auto">
          <NavItem 
            icon={<LayoutDashboard size={16} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => onChangeView('dashboard')} 
          />
          {user.role === UserRole.SCM && (
             <NavItem 
               icon={<FilePlus size={16} />} 
               label="New Submission" 
               active={currentView === 'new'} 
               onClick={() => onChangeView('new')} 
             />
          )}
          {user.role === UserRole.ADMIN && (
             <NavItem 
               icon={<Settings size={16} />} 
               label="Admin Settings" 
               active={currentView === 'admin'} 
               onClick={() => onChangeView('admin')} 
             />
          )}
        </div>
      </nav>

      {/* 3. Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="max-w-[1920px] mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 text-sm font-medium whitespace-nowrap ${
      active 
        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10' 
        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);