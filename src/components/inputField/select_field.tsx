import { useState } from "react";
import "./select_field.css";
type optionsProp = {
  name: string;
  value?: string;
};

type SelectProps = {
  options: optionsProp[];
  errorMessage: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  selectedItem: string;
  name: string;
  placeholder: string;
};

const Select = ({
  options,
  errorMessage,
  onChange,
  selectedItem,
  name,
  placeholder,
}: SelectProps) => {
  const [, setIsActive] = useState(false);

  return (
    <div className="select-wrapper-out">
      <div className="select-wrapper">
        <select
          className={`select ${!selectedItem ? "empty" : ""} ${
            errorMessage ? "red-border" : ""
          }`}
          name={name}
          onChange={onChange}
          value={selectedItem}
          onBlur={() => setIsActive(true)}
        >
          <option value="">{placeholder}</option>
          {options.map((item) => (
            <option key={item.name} value={item.value ? item.value : item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && (
        <span className="error text-error text-xsm">{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;
