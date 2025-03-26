// components/SearchBar.tsx
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Input from '@/components/common/Input';

export interface SearchBarRef {
  search: () => void;
  getSearchTerm: () => string;
}

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  width?: string;
}

const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  ({ onSearch, placeholder = '검색어를 입력하세요', width = '100%' }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
      const trimmed = searchTerm.trim();
      if (trimmed) onSearch(trimmed);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch();
    };

    useImperativeHandle(ref, () => ({
      search: handleSearch,
      getSearchTerm: () => searchTerm,
    }));

    return (
      <div className="flex items-center gap-2" style={{ width }}>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          height="45px"
        />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
