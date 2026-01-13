
import React from 'react';
import { BUSINESS_NAME } from '../constants';

interface NavbarProps {
  onNavigate: (view: 'Home' | 'About' | 'Contact') => void;
  onOpenAddModal: () => void;
  currentView: string;
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenAddModal, currentView, isAdmin }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('Home')}>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900">
              {BUSINESS_NAME.toUpperCase()}
            </h1>
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('Home')}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'Home' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
            >
              Catalog
            </button>
            <button 
              onClick={() => onNavigate('About')}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'About' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
            >
              Mission
            </button>
            <button 
              onClick={() => onNavigate('Contact')}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'Contact' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
            >
              Contact
            </button>
            
            {isAdmin && (
              <button 
                onClick={onOpenAddModal}
                className="ml-4 px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                Post New
              </button>
            )}
          </div>
          
          <div className="sm:hidden flex items-center gap-4">
            {isAdmin && (
              <button 
                onClick={onOpenAddModal}
                className="p-2 bg-slate-900 text-white rounded-full"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
            <button className="text-slate-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
