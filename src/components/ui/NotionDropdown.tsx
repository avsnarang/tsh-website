import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface NotionDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  searchable?: boolean;
  allowAdditions?: boolean;
  onAddOption?: (label: string) => void;
}

export default function NotionDropdown({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  searchable = true,
  allowAdditions = false,
  onAddOption
}: NotionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const addNewInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setIsAddingNew(false);
        setNewOptionLabel('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current && !isAddingNew) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable, isAddingNew]);

  useEffect(() => {
    if (isAddingNew && addNewInputRef.current) {
      addNewInputRef.current.focus();
    }
  }, [isAddingNew]);

  const handleAddNewOption = () => {
    if (newOptionLabel.trim() && onAddOption) {
      onAddOption(newOptionLabel.trim());
      setNewOptionLabel('');
      setIsAddingNew(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isAddingNew) {
      e.preventDefault();
      handleAddNewOption();
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 text-left bg-white rounded-lg border-2 border-neutral-dark/10 
          hover:border-neutral-dark/20 focus:border-green focus:ring-2 focus:ring-green/20
          transition-all duration-200 flex items-center justify-between group"
      >
        <div className="flex items-center gap-2 min-h-[24px]">
          {selectedOption?.icon}
          <span className={!selectedOption ? 'text-neutral-dark/50' : ''}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-neutral-dark/50 transition-transform duration-200 
          group-hover:text-neutral-dark/80 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 py-2 bg-white rounded-xl shadow-xl border border-neutral-dark/10
              max-h-[300px] overflow-y-auto"
          >
            {searchable && !isAddingNew && (
              <div className="px-3 pb-2">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-8 py-2 bg-neutral-dark/5 rounded-md text-sm
                      placeholder:text-neutral-dark/40 focus:outline-hidden"
                  />
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-dark/40" />
                </div>
              </div>
            )}

            <div className="px-1">
              {!isAddingNew ? (
                <>
                  {filteredOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full px-3 py-2 text-left rounded-lg flex items-center gap-2
                        ${value === option.value 
                          ? 'bg-green/10 text-green' 
                          : 'hover:bg-neutral-dark/5'
                        }
                        transition-colors duration-150`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {option.icon}
                      <span className="flex-1">{option.label}</span>
                      {value === option.value && (
                        <Check className="h-4 w-4 text-green" />
                      )}
                    </motion.button>
                  ))}

                  {allowAdditions && (
                    <motion.button
                      type="button"
                      onClick={() => setIsAddingNew(true)}
                      className="w-full px-3 py-2 text-left rounded-lg flex items-center gap-2
                        text-green hover:bg-green/5 transition-colors duration-150"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add new option</span>
                    </motion.button>
                  )}
                </>
              ) : (
                <div className="px-3">
                  <div className="flex gap-2">
                    <input
                      ref={addNewInputRef}
                      type="text"
                      value={newOptionLabel}
                      onChange={(e) => setNewOptionLabel(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter new option..."
                      className="flex-1 px-3 py-2 bg-neutral-dark/5 rounded-md text-sm
                        placeholder:text-neutral-dark/40 focus:outline-hidden"
                    />
                    <button
                      onClick={handleAddNewOption}
                      className="px-3 py-2 bg-green text-white rounded-md text-sm hover:bg-green/90
                        transition-colors duration-150"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
