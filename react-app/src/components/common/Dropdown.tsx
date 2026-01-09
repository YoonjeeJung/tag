import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  searchable?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = '선택',
  onChange,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;
  const isPlaceholder = !selectedOption;

  const filteredOptions = searchTerm
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`} ref={dropdownRef}>
      <button type="button" className={styles.toggle} onClick={handleToggle}>
        <span className={`${styles.label} ${isPlaceholder ? styles.placeholder : ''}`}>
          {displayText}
        </span>
        <span className={styles.arrow}>▼</span>
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {searchable && (
            <input
              ref={searchInputRef}
              type="text"
              className={styles.search}
              placeholder="검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <div
            className={`${styles.item} ${styles.placeholderItem}`}
            onClick={() => handleSelect('')}
          >
            {placeholder}
          </div>
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={styles.item}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
