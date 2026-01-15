
import React, { useState } from 'react';
import { BUSINESS_NAME } from '../constants.js';

const Navbar = ({ onNavigate, onOpenAddModal, currentView, isAdmin }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Success: Local catalog changes have been synced to the GitHub repository.');
    }, 2000);
  };

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
            <button onClick={() => onNavigate('Home')} className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'Home' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>Catalog</button>
            <button onClick={() => onNavigate('About')} className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'About' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>Mission</button>
            <button onClick={() => onNavigate('Contact')} className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'Contact' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>Contact</button>
            
            {isAdmin && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                <button onClick={handleSync} disabled={isSyncing} className="bg-slate-50 text-slate-500 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center gap-2 disabled:opacity-50 border border-slate-100">
                  <svg className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {isSyncing ? 'Pushing...' : 'Sync GitHub'}
                </button>
                <button onClick={onOpenAddModal} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Add Product</button>
              </div>
            )}
          </div>
          
          <div className="sm:hidden flex items-center space-x-4">
            {isAdmin && (
              <button onClick={onOpenAddModal} className="p-2 bg-slate-100 rounded-lg">
                <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
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
