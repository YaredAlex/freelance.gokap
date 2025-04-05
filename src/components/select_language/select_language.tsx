import React, { useEffect } from "react";
import CustomDropdownSelect, {
  DropdownOption,
} from "../dropdown/custom_dropdown";

interface SelectLanguageProps {
  userLanguage: string[];
  setUserLanguage: React.Dispatch<React.SetStateAction<string[]>>;
  setLang: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
  lang: DropdownOption[];
  error?: string;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({
  userLanguage,
  setUserLanguage,
  setLang,
  lang,
  error,
}) => {
  useEffect(() => {
    // Initialize selected languages
    userLanguage.forEach((selected) => {
      setLang((prevLang) =>
        prevLang.map((langItem) => ({
          ...langItem,
          isSelected:
            langItem.isSelected ||
            langItem.name.toLowerCase() === selected.toLowerCase(),
        }))
      );
    });
  }, []);

  return (
    <div className="language-select-container">
      <CustomDropdownSelect
        options={lang}
        setOptions={setLang}
        selectedItems={userLanguage}
        setSelectedItems={setUserLanguage}
        placeholder="Select language"
        error={error}
        showSelectedItemsInline={true}
        className="language-dropdown"
      />
    </div>
  );
};

export default SelectLanguage;
