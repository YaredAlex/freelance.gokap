import { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import { skillsList } from "../../../../util/constant/skill_constant";
import { CloseCircle } from "iconsax-react";

const UserProfessionAndSkill = ({
  setGotoNext,
  setUserInfo,
}: BoardingPropTypes) => {
  const [showSkillList, setShowSkillList] = useState(false);
  const [personalSkills, setPersonalSkills] = useState<string[]>([]);
  const [skills, setSkills] = useState(skillsList);
  const [profession, setProfession] = useState("");
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

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
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
        <p className="text-center">What is your profession?</p>
        <select
          className={`
        p-2
        rounded
        border-green-variant-3
        text-black-variant-1
        bg-white-variant-2
        w-100
        `}
          name="profession"
          onChange={handleChange}
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
        <div
          className={`
          mt-3
          border-black-variant-1
          border-green-variant-3
          rounded
          w-100
          p-2
          d-flex flex-column
          gap-2
          `}
          style={{
            maxWidth: "400px",
            height: "200px",
          }}
        >
          {/*Skills list view  */}
          <div
            className={"d-flex skill-wrapper gap-2 pb-2"}
            style={{
              maxWidth: "400px",
              overflowX: "scroll",
            }}
            id="skill-wrapper"
          >
            {personalSkills &&
              personalSkills.map((skill, index) => (
                <div
                  key={index}
                  className={`
                  border-green-variant-1
                  p-1
                  bg-green-variant-4
                  d-flex
                  justify-content-between
                  align-items-center
                  gap-2
                  text-sm
                  `}
                  style={{
                    whiteSpace: "nowrap",
                    borderRadius: "20px",
                  }}
                >
                  {skill}
                  <CloseCircle
                    color="white"
                    onClick={() => {
                      const filtered = personalSkills.filter(
                        (sk) => sk != skill
                      );
                      const pos = skillsList.findIndex(
                        (sk) => sk.name === skill
                      );
                      skillsList[pos].isSelected = false;
                      setPersonalSkills(filtered);
                    }}
                    className={`cursor-pointer`}
                  />
                </div>
              ))}
          </div>
          {/* Input for skill */}
          <div
            className={`
            position-relative
            border-green-variant-3
              rounded
                p-1
            `}
            style={{
              maxWidth: "200px",
              zIndex: "100",
            }}
          >
            <div className={`d-flex `}>
              <input
                type="text"
                placeholder="your skills"
                name="skills"
                className={`
              transparent text-black-variant-2
              w-100
              `}
                onFocus={() => setShowSkillList(true)}
                onChange={(e) => {
                  const { value } = e.target;
                  let filtered;
                  if (value) {
                    filtered = skillsList.filter(
                      (skill) =>
                        !skill.isSelected &&
                        skill.name.toLowerCase().includes(value.toLowerCase())
                    );
                    setSkills(filtered);
                  } else setSkills(skillsList);
                }}
              />
              {showSkillList && (
                <span
                  className={`
              cursor-pointer
              `}
                  onClick={() => setShowSkillList(false)}
                >
                  <CloseCircle />
                </span>
              )}
            </div>
            <ul
              className={`
            skills-list
            ${showSkillList ? "active" : ""}
            `}
            >
              {skills.map(
                (skill, index) =>
                  !skill.isSelected && (
                    <li
                      key={index}
                      onClick={() => {
                        setPersonalSkills([...personalSkills, skill.name]);
                        skills[index].isSelected = true;
                        setSkills(skillsList);
                        const skillWrapper =
                          document.getElementById("skill-wrapper");
                        skillWrapper!.scrollLeft = skillWrapper!.scrollWidth;
                      }}
                    >
                      {skill.name}
                    </li>
                  )
              )}
            </ul>
          </div>
          {/*  */}

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default UserProfessionAndSkill;
