import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Input from '@/components/common/Input';
import { SearchIcon } from '@/components/common/Icons';

export interface SearchBarRef {
  search: () => void;
  getSearchTerm: () => string;
}

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  width?: string;
  height?: string;
}

const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  (
    {
      onSearch,
      placeholder = 'props에서 placeholder,width,height 설정',
      width = '100%',
      height = '45px',
    },
    ref
  ) => {
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
      <div className="relative" style={{ width }}>
        <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none z-10">
          <SearchIcon size={22} />
        </div>

        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          height={height}
          className="pl-10"
        />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
