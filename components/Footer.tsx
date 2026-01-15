import React from 'react';
import { BUSINESS_NAME, GITHUB_REPO } from '../constants.ts';

interface FooterProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ isAdmin, onToggleAdmin }) => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{BUSINESS_NAME}</h2>
            <p className="text-slate-500 max-w-sm mb-4 leading-relaxed font-medium">
              Smart alternatives to buying new. We meticulously test and restore premium goods to ensure quality, value, and reliability for our customers.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a 
                href={GITHUB_REPO} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all"
                title="Follow us on GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-widest">Source Code</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-slate-500 font-bold tracking-tight">Phone: +267 78037530</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Location</h3>
            <p className="text-sm text-slate-500 font-bold leading-relaxed tracking-tight">
              Ntloedibe ward, Molepolole<br />
              Botswana
            </p>
          </div>
        </div>
        <div className="border-t border-gray-50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>
          <button 
            onClick={onToggleAdmin}
            className={`mt-4 md:mt-0 text-[10px] font-black uppercase tracking-widest transition-colors ${isAdmin ? 'text-emerald-500' : 'text-slate-300 hover:text-slate-900'}`}
          >
            {isAdmin ? 'Admin: Active (Logout)' : 'Admin Access'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;