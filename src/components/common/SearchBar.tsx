import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Input from '@/components/common/Input';
import { SearchIcon } from '@/components/common/Icons';
import clsx from 'clsx';

export interface SearchBarRef {
  search: () => void;
  getSearchTerm: () => string;
}

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  height?: string;
  className?: string;
}

const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  (
    {
      onSearch,
      placeholder = 'props에서 placeholder,height 설정',
      height = '45px',
      className = '',
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
      <div
        className={clsx('relative bg-gray-100 rounded-md', className)}
        style={{ height }}
      >
        <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none z-10 ">
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
