
import React from 'react';
import { User, UserRole } from '../types';
import { LayoutDashboard, FilePlus, Settings, Moon, Sun, BookOpen } from 'lucide-react';

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
      {/* 1. Primary Header - Custom Brand Color #283C50 */}
      <header className="bg-[#283C50] text-white px-6 py-3 flex items-center justify-between border-b border-[#1f3041] shrink-0 z-50 shadow-sm">
        
        {/* Logo / Header Image */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onChangeView('dashboard')}>
          <img 
            src="https://www.trident-energy.com/app/themes/trident-energy/dist/images/favicon.png?id=2e0b14e50770eab630923c46b052a708" 
            alt="Trident Energy Contract Guard" 
            className="h-12 w-auto object-contain" 
          />
          <div className="h-8 w-px bg-white/20"></div>
          <h1 className="text-xl font-semibold tracking-tight text-white/90">High Risk Contracts Review</h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
           {/* Dark Mode Toggle */}
           <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

           <div className="h-8 w-px bg-white/20"></div>

           {/* User Profile */}
           <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-white tracking-wide">{user.name}</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-[#4ade80]' : 'bg-red-500'}`}></span>
                  <select 
                    className="bg-transparent text-[11px] text-slate-300 border-none p-0 cursor-pointer focus:ring-0 text-right appearance-none hover:text-white uppercase font-medium"
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
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-base font-bold shadow-inner border border-white/10">
                {user.name.charAt(0)}
             </div>
          </div>
        </div>
      </header>

      {/* 2. Secondary Navigation - Same Brand Color #283C50 */}
      <nav className="bg-[#283C50] border-b border-[#1f3041] px-6 py-0 shrink-0 shadow-md z-40">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => onChangeView('dashboard')} 
          />
          {user.role === UserRole.SCM && (
             <NavItem 
               icon={<FilePlus size={18} />} 
               label="New Submission" 
               active={currentView === 'new'} 
               onClick={() => onChangeView('new')} 
             />
          )}
          {user.role === UserRole.ADMIN && (
             <NavItem 
               icon={<Settings size={18} />} 
               label="Admin Settings" 
               active={currentView === 'admin'} 
               onClick={() => onChangeView('admin')} 
             />
          )}
          <NavItem 
            icon={<BookOpen size={18} />} 
            label="User Guide" 
            active={currentView === 'guide'} 
            onClick={() => onChangeView('guide')} 
          />
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

// NavItem updated for dark background context
const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-4 border-b-4 transition-all duration-200 text-sm font-semibold whitespace-nowrap ${
      active 
        ? 'border-[#4ade80] text-white bg-white/10' 
        : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
