import React, { useEffect, useState } from "react";
import CustomDropdownSelect, {
  DropdownOption,
} from "../dropdown/custom_dropdown";
import "./select_option.css";

type SelectDropdownSearchProps = {
  error: string;
  setSelectOption: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOption: string[];
  showTitle?: boolean;
  maxWidth?: string;
  minSkills?: number;
  row?: boolean;
  optionList: DropdownOption[];
  onSelectItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
  onBlur?: () => void;
  placeholder?: string;
};

const SelectSearchOptions: React.FC<SelectDropdownSearchProps> = ({
  selectedOption,
  setSelectOption,
  showTitle = true,
  error,
  maxWidth = "400px",
  row = false,
  optionList,
  onSelectItem,
  onRemoveItem,
  onBlur,
  placeholder,
  // minSkills = 2,
}) => {
  const [options, setOption] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const updatedOptions = optionList.filter(
      (op) => !selectedOption.includes(op.name)
    );
    setOption(updatedOptions);
  }, [optionList, selectedOption]);

  return (
    <div
      className={`select-option-container d-flex gap-4 ${
        row ? "flex-md-row flex-column" : "flex-column"
      }`}
      style={{
        maxWidth: row ? "100%" : maxWidth,
      }}
    >
      {!row && showTitle && (
        <div className={` ${row ? "col-3" : "col"}`}>
          <p className=" mb-0">Skills</p>
          {<p className="">Skills required for the project</p>}
        </div>
      )}

      <div className={`${row ? "col" : ""}`}>
        <CustomDropdownSelect
          options={options}
          setOptions={setOption}
          selectedItems={selectedOption}
          setSelectedItems={setSelectOption}
          placeholder={placeholder || "Your skills"}
          error={error}
          showSelectedItemsInline={true}
          className=""
          onSelectItem={onSelectItem}
          onRemoveItem={onRemoveItem}
          onBlur={onBlur}
        />
        {row && (
          <p className=" mb-0 text-sm text-black-variant-2">
            Skills required for the project
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectSearchOptions;
