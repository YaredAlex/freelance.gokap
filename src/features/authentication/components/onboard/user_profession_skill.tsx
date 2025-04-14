import React, { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import "./user_profession_skill.css";
import { categoryList } from "../../../../util/constant/categories";
import { DropdownOption } from "../../../../components/dropdown/custom_dropdown";
import SelectOptions from "../../../../components/select_options/select_option";
import Select from "../../../../components/inputField/select_field";
import { maxSkill, minSkill } from "../../../../util/constant/constant";

const UserProfessionAndSkill: React.FC<BoardingPropTypes> = ({
  setUserInfo,
  userInfo,
  setOnNextValidator,
}) => {
  const [personalSkills, setPersonalSkills] = useState<string[]>(
    userInfo.skills || []
  );
  const [profession, setProfession] = useState(userInfo.profession || "");

  const professionList = categoryList.map((cat) => cat.category);
  const [errors, setErrors] = useState({
    profession: "",
    skills: "",
  });
  const errorMessages = {
    proffession: "Please select your profession",
    skills: "At least 2 skills are required",
  };
  useEffect(() => {
    // Validate profession and skills
    setOnNextValidator(onNextValidator);
    if (profession) {
      setErrors((prev) => ({ ...prev, profession: "" }));
    }

    if (personalSkills.length >= minSkill) {
      setErrors((prev) => ({ ...prev, skills: "" }));
    }
    if (profession && personalSkills.length >= minSkill) {
      setUserInfo((info) => ({
        ...info,
        profession,
        skills: personalSkills,
      }));
    }
  }, [personalSkills, profession]);

  useEffect(() => {}, []);
  const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfession(e.target.value);
    setPersonalSkills([]);
  };
  const onSelectItem = (item: string) => {
    if (maxSkill && personalSkills.length >= maxSkill) {
      return;
    }

    setPersonalSkills([...personalSkills, item]);
  };
  const onRemoveItem = (item: string) => {
    setPersonalSkills(personalSkills.filter((i) => i !== item));
  };
  const onNextValidator = () => {
    let isValid = true;
    if (!profession) {
      setErrors((prev) => ({ ...prev, profession: errorMessages.proffession }));
      isValid = false;
    } else setErrors((prev) => ({ ...prev, profession: "" }));
    if (personalSkills.length < minSkill) {
      setErrors((prev) => ({ ...prev, skills: errorMessages.skills }));
      isValid = false;
    } else setErrors((prev) => ({ ...prev, skills: "" }));
    console.log(errors);

    return isValid;
  };

  return (
    <div className="profession-skill-container">
      {/* Profession Selection */}
      <div className="profession-section">
        <h3 className="section-title">Select Your profession category?</h3>
        <Select
          errorMessage={errors.profession}
          name="profession"
          onChange={handleProfessionChange}
          options={professionList.map((item) => ({ name: item }))}
          placeholder="Select profession"
          selectedItem={profession}
        />
      </div>

      {/* Skills Selection */}
      <div className="skills-section">
        <h3 className="section-title">
          What skills do you have?
          <span className="required-hint">(at least 2 skills required)</span>
        </h3>
        <SelectOptions
          error={errors.skills}
          selectedOption={personalSkills}
          setSelectOption={setPersonalSkills}
          showTitle={false}
          minSkills={2}
          optionList={
            categoryList
              .find((item) => item.category === profession)
              ?.subcategory.map((sub) => {
                return { name: sub };
              }) || ([] as DropdownOption[])
          }
          onSelectItem={onSelectItem}
          onRemoveItem={onRemoveItem}
        />
      </div>
    </div>
  );
};

export default UserProfessionAndSkill;
