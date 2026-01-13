
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface FilterBarProps {
  activeFilter: Category;
  onFilterChange: (category: Category) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="bg-white border-b border-gray-100 py-4 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 min-w-max pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === category
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-slate-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
