import React, { useState, useEffect, useRef } from "react";
import { CloseCircle } from "iconsax-react";
import "./custom_dropdown_select.css";

export interface DropdownOption {
  name: string;
}

interface CustomDropdownSelectProps {
  options: DropdownOption[];
  setOptions: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
  error?: string;
  maxItems?: number;
  showSelectedItemsInline?: boolean;
  className?: string;
  onSelectItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  onBlur?: () => void;
}

const CustomDropdownSelect: React.FC<CustomDropdownSelectProps> = ({
  options,
  setOptions,
  selectedItems,
  placeholder = "Select item",
  error,
  maxItems,
  showSelectedItemsInline = true,
  className = "",
  onSelectItem,
  onRemoveItem,
  onBlur,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] =
    useState<DropdownOption[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Filter options based on search term
    const filtered = options.filter(
      (option) =>
        !selectedItems.includes(option.name) &&
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectItem = (item: string) => {
    if (maxItems && selectedItems.length >= maxItems) {
      return;
    }

    onSelectItem(item);
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.name !== item)
    );
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleRemoveItem = (item: string) => {
    onRemoveItem(item);
    setOptions((prevOptions) => [...prevOptions, { name: item }]);
  };

  return (
    <div className={`custom-dropdown-select ${className}`} ref={dropdownRef}>
      {/* Selected items */}
      {showSelectedItemsInline && selectedItems.length > 0 && (
        <div className="selected-items-container">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              <span className="selected-item-text">{item}</span>
              <CloseCircle
                className="remove-item-icon"
                onClick={() => handleRemoveItem(item)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className={`search-input-container ${error ? "error" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          className="search-input"
          onBlur={() => {
            if (onBlur) onBlur();
          }}
        />
        {showDropdown && (
          <CloseCircle
            className="close-icon"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>

      {/* Dropdown list */}
      {showDropdown && (
        <ul className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectItem(option.name)}
                className="dropdown-item"
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="no-results">No matching items found</li>
          )}
        </ul>
      )}

      {/* Error message */}
      {error && <span className="error-message">{error}</span>}

      {/* Not inline selected items */}
      {!showSelectedItemsInline && selectedItems.length > 0 && (
        <div className="selected-items-vertical">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              <span className="selected-item-text">{item}</span>
              <CloseCircle
                className="remove-item-icon"
                onClick={() => handleRemoveItem(item)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdownSelect;
