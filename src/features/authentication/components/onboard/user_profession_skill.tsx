import { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import SelectSkill from "../../../../components/select_skill/select_skill";

const UserProfessionAndSkill = ({
  setGotoNext,
  setUserInfo,
  userInfo,
}: BoardingPropTypes) => {
  const [personalSkills, setPersonalSkills] = useState<string[]>(
    userInfo.skills
  );
  // const [skills, setSkills] = useState(skillsList);
  const [profession, setProfession] = useState(userInfo.profession);
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
    if (personalSkills.length >= 2) {
      setUserInfo((info) => {
        return { ...info, skills: personalSkills };
      });
    }
    // Checking if all requirement are met
    if (profession && personalSkills.length >= 2) setGotoNext(true);
    else setGotoNext(false);
  }, [personalSkills, profession]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value)
      setUserInfo((info) => {
        return { ...info, [name]: value };
      });
    console.log(value);
    setProfession(value);
  };

  return (
    <div className="text-black-variant-1 ">
      {/* What is your profession */}
      <div
        className="d-flex 
          mt-3
        flex-column 
        align-items-center
        max-width-400-center
        "
      >
        <p className="text-center py-2">What is your profession?</p>
        <select
          className={`
        p-2
        rounded
        text-black-variant-1
        bg-white-smoke
        border-card
        w-100
        `}
          name="profession"
          onChange={handleChange}
          value={profession}
        >
          <option value="">Select</option>
          {professionList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {/* skills you have */}
      <div
        className={`d-flex 
          mt-3
        flex-column 
        align-items-center
        
        `}
      >
        What skill do you have?
        <span className="text-xsm">(at least 2 skill is required)</span>
        <SelectSkill
          error=""
          selectedSkill={personalSkills}
          setSelectedSkill={setPersonalSkills}
          showTitle={false}
        />
      </div>
    </div>
  );
};

export default UserProfessionAndSkill;
