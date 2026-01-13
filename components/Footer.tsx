
import React from 'react';
import { BUSINESS_NAME } from '../constants';

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
        <div className="border-t border-gray-50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-[10px] font-black uppercase text-slate-300 hover:text-slate-900 transition-colors tracking-widest">Privacy</a>
            <a href="#" className="text-[10px] font-black uppercase text-slate-300 hover:text-slate-900 transition-colors tracking-widest">Terms</a>
            <button 
              onClick={onToggleAdmin}
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${isAdmin ? 'bg-slate-900 text-white border-slate-900' : 'text-slate-300 hover:text-slate-900 border-slate-200'}`}
            >
              {isAdmin ? 'Admin: ON' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
