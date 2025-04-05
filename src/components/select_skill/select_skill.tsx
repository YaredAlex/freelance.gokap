import React, { useState, useEffect } from "react";
import { skillsList } from "../../util/constant/skill_constant";
import CustomDropdownSelect, {
  DropdownOption,
} from "../dropdown/custom_dropdown";

type SelectSkillProps = {
  error: string;
  setSelectedSkill: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSkill: string[];
  showTitle?: boolean;
  maxWidth?: string;
  minSkills?: number;
};

const SelectSkill: React.FC<SelectSkillProps> = ({
  selectedSkill,
  setSelectedSkill,
  showTitle = true,
  error,
  maxWidth = "400px",
  minSkills = 2,
}) => {
  const [skills, setSkills] = useState<DropdownOption[]>(() => {
    // Initialize with selected skills marked
    return skillsList.map((skill) => ({
      ...skill,
      isSelected: selectedSkill.includes(skill.name),
    }));
  });

  // Display error if minimum skills requirement not met
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (selectedSkill.length < minSkills) {
      setValidationError(`At least ${minSkills} skills are required`);
    } else {
      setValidationError("");
    }
  }, [selectedSkill, minSkills]);

  return (
    <div
      className="skill-select-container"
      style={{
        minHeight: "100px",
        maxWidth: maxWidth,
        width: "100%",
        padding: "0.5rem",
      }}
    >
      {showTitle && (
        <div className="skill-header">
          <h6 className="skill-title">Skills</h6>
          <p className="skill-subtitle">Skills required for the project</p>
        </div>
      )}

      <CustomDropdownSelect
        options={skills}
        setOptions={setSkills}
        selectedItems={selectedSkill}
        setSelectedItems={setSelectedSkill}
        placeholder="Your skills"
        error={error || validationError}
        showSelectedItemsInline={true}
        className="skill-dropdown"
      />
    </div>
  );
};

export default SelectSkill;
