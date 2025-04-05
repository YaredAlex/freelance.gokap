import React, { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import SelectSkill from "../../../../components/select_skill/select_skill";
import "./user_profession_skill.css";

const UserProfessionAndSkill: React.FC<BoardingPropTypes> = ({
  setGotoNext,
  setUserInfo,
  userInfo,
}) => {
  const [personalSkills, setPersonalSkills] = useState<string[]>(
    userInfo.skills || []
  );
  const [profession, setProfession] = useState(userInfo.profession || "");
  const [error, setError] = useState<string>("");

  const professionList = [
    "Designer/Artist",
    "Engineer",
    "Educator",
    "Student",
    "Product Manager",
    "Sales/Marketing",
    "Other",
  ];

  useEffect(() => {
    // Validate profession and skills
    if (!profession) {
      setError("Please select your profession");
      setGotoNext(false);
      return;
    }

    if (personalSkills.length < 2) {
      setError("At least 2 skills are required");
      setGotoNext(false);
      return;
    }

    // Clear error and proceed if validation passes
    setError("");
    setGotoNext(true);
    setUserInfo((info) => ({
      ...info,
      profession,
      skills: personalSkills,
    }));
  }, [personalSkills, profession]);

  const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfession(e.target.value);
  };

  return (
    <div className="profession-skill-container">
      {/* Profession Selection */}
      <div className="profession-section">
        <h3 className="section-title">What is your profession?</h3>
        <div className="profession-select-wrapper">
          <select
            className={`profession-select ${!profession ? "empty" : ""}`}
            name="profession"
            onChange={handleProfessionChange}
            value={profession}
          >
            <option value="">Select profession</option>
            {professionList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {!profession && (
            <span className="profession-error">
              Please select your profession
            </span>
          )}
        </div>
      </div>

      {/* Skills Selection */}
      <div className="skills-section">
        <h3 className="section-title">
          What skills do you have?
          <span className="required-hint">(at least 2 skills required)</span>
        </h3>
        <SelectSkill
          error={error}
          selectedSkill={personalSkills}
          setSelectedSkill={setPersonalSkills}
          showTitle={false}
          minSkills={2}
        />
      </div>
    </div>
  );
};

export default UserProfessionAndSkill;
