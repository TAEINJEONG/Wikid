import React, { useState, useRef, useEffect } from 'react';
import { ArrowIcon } from '@/components/common/Icons';
import clsx from 'clsx';

interface DropdownProps {
  options: string[];
  selected?: string;
  onSelect: (option: string) => void;
  placeholder?: string;
  width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = '선택하세요',
  width = '200px',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative" style={{ width }}>
      <button
        onClick={toggleDropdown}
        className={clsx(
          'flex justify-between items-center px-3 py-2 rounded-md border bg-gray-100 text-gray-500 text-xs font-medium leading-[18px]',
          'hover:cursor-pointer'
        )}
        style={{ height: '45px' }}
      >
        <span>{selected || placeholder}</span>
        <ArrowIcon
          className={clsx(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          size={22}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
