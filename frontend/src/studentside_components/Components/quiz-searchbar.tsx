import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSort: (sortOption: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Newest');

  const sortOptions = ['Newest', 'Oldest', 'Name', 'Subject'];

  const handleSort = (option: string) => {
    setSelectedSort(option);
    setIsOpen(false);
    onSort(option);
  };

  return (
    <div className="flex justify-between items-center mb-8 space-x-4">
      <input
        type="text"
        placeholder="Search"
        className="p-3 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="relative">
        <button
          className="bg-[#E5F0F9] text-[#0A192F] px-6 py-3 rounded-md hover:bg-[#D0E3F7] transition flex items-center justify-between w-48"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>Sort by: {selectedSort}</span>
          <ChevronDown className="w-5 h-5" />
        </button>
        {isOpen && (
          <ul
            className="absolute z-10 w-48 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
            role="listbox"
          >
            {sortOptions.map((option) => (
              <li
                key={option}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedSort === option ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleSort(option)}
                role="option"
                aria-selected={selectedSort === option}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

