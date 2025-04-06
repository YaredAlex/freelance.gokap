import React, { useState } from "react";
import { skillsList } from "../../util/constant/skill_constant";
import CustomDropdownSelect, {
  DropdownOption,
} from "../dropdown/custom_dropdown";
import "./select_skill.css";

type SelectSkillProps = {
  error: string;
  setSelectedSkill: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSkill: string[];
  showTitle?: boolean;
  maxWidth?: string;
  minSkills?: number;
  row?: boolean;
};

const SelectSkill: React.FC<SelectSkillProps> = ({
  selectedSkill,
  setSelectedSkill,
  showTitle = true,
  error,
  maxWidth = "400px",
  row = false,
  // minSkills = 2,
}) => {
  const [skills, setSkills] = useState<DropdownOption[]>(() => {
    // Initialize with selected skills marked
    return skillsList.map((skill) => ({
      ...skill,
      isSelected: selectedSkill.includes(skill.name),
    }));
  });

  // Display error if minimum skills requirement not met
  // const [validationError, setValidationError] = useState<string>("");

  // useEffect(() => {
  //   if (selectedSkill.length < minSkills) {
  //     setValidationError(`At least ${minSkills} skills are required`);
  //   } else {
  //     setValidationError("");
  //   }
  // }, [selectedSkill, minSkills]);

  return (
    <div
      className={`skill-select-container d-flex gap-4 ${
        row ? "flex-md-row flex-column" : "flex-column"
      }`}
      style={{
        maxWidth: row ? "100%" : maxWidth,
      }}
    >
      {showTitle && (
        <div className={`skill-header ${row ? "col-3" : "col"}`}>
          <p className="skill-title mb-0">Skills</p>
          {!row && (
            <p className="skill-subtitle">Skills required for the project</p>
          )}
        </div>
      )}

      <div className={`${row ? "col" : ""}`}>
        <CustomDropdownSelect
          options={skills}
          setOptions={setSkills}
          selectedItems={selectedSkill}
          setSelectedItems={setSelectedSkill}
          placeholder="Your skills"
          error={error}
          showSelectedItemsInline={true}
          className="skill-dropdown"
        />
        {row && (
          <p className="skill-subtitle mb-0 text-sm text-black-variant-2">
            Skills required for the project
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectSkill;
