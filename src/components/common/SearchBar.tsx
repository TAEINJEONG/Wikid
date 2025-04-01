import React, { forwardRef } from 'react';
import { SearchIcon } from '@/components/common/Icons';
import clsx from 'clsx';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  height?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  className?: string;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      placeholder = 'props에 value, placeholder, height, onChange, onKeyDown, className',
      height = '45px',
      onChange,
      onKeyDown,
      className = '',
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          'relative flex items-center  bg-gray-100 rounded-md border border-transparent focus-within:border-gray-300',
          className
        )}
        style={{ height }}
      >
        <div className="absolute left-3 pointer-events-none">
          <SearchIcon size={22} />
        </div>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full h-full  pl-[40px] pr-3 bg-transparent  outline-none placeholder:text-gray-400 focus:placeholder-transparent"
        />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
