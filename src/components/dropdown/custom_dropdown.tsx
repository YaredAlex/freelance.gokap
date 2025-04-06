import React, { useState, useEffect, useRef } from "react";
import { CloseCircle } from "iconsax-react";
import "./custom_dropdown_select.css";

export interface DropdownOption {
  name: string;
  isSelected: boolean;
}
export interface DropdownOption2 {
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
}

const CustomDropdownSelect: React.FC<CustomDropdownSelectProps> = ({
  options,
  setOptions,
  selectedItems,
  setSelectedItems,
  placeholder = "Select item",
  error,
  maxItems,
  showSelectedItemsInline = true,
  className = "",
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
        !option.isSelected &&
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

    setSelectedItems([...selectedItems, item]);
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.name === item ? { ...option, isSelected: true } : option
      )
    );
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.name === item ? { ...option, isSelected: false } : option
      )
    );
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
