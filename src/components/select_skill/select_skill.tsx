import { CloseCircle } from "iconsax-react";
import { skillsList } from "../../util/constant/skill_constant";
import { useState } from "react";

type SelectSkillProp = {
  error: string;
  setSelectedSkill: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSkill: string[];
};
const SelectSkill = ({
  selectedSkill,
  setSelectedSkill,
  error,
}: SelectSkillProp) => {
  const [showSkillList, setShowSkillList] = useState(false);
  const [skills, setSkills] = useState(skillsList);
  return (
    <div className={`p-2 `} style={{ minHeight: "100px", maxWidth: "400px" }}>
      <div>
        <h6 className={"font-weight-400 text-black-variant-1"}>Skill</h6>
        <p className="text-black-variant-2">Skill required for the project</p>
      </div>
      <div
        className={`
            mt-3
            rounded
            w-100
            p-2
            d-flex flex-column
            gap-2
            ${error ? "red-border" : "border-card"}
            `}
        style={{
          maxWidth: "400px",
          minHeight: "100px",
        }}
      >
        {/*Skills list view  */}
        <div
          className={"d-flex flex-wrap  gap-2 pb-2"}
          style={{
            maxWidth: "400px",
          }}
        >
          {selectedSkill &&
            selectedSkill.map((skill, index) => (
              <div
                key={index}
                className={`
                    border-card p-1
                    d-flex
                    justify-content-between
                    align-items-center
                    gap-2
                    px-2
                    text-sm
                    `}
                style={{
                  whiteSpace: "nowrap",
                  borderRadius: "20px",
                }}
              >
                {skill}
                <CloseCircle
                  onClick={() => {
                    const filtered = selectedSkill.filter((sk) => sk != skill);
                    const pos = skillsList.findIndex((sk) => sk.name === skill);
                    skillsList[pos].isSelected = false;
                    setSelectedSkill(filtered);
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
              border-green-variant-1
                rounded
                  p-1 `}
          style={{
            maxWidth: "300px",
            zIndex: "50",
          }}
        >
          <div
            className={`
              d-flex border-card rounded bg-white-smoke align-items-center px-3`}
          >
            <input
              type="text"
              placeholder="your skills"
              name="skills_required"
              className={`
                custom-input 
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
            className={`bg-white-v-4 rounded
              long-list-wrapper
              ${showSkillList ? "active" : ""}
              `}
          >
            {skills.map(
              (skill, index) =>
                !skill.isSelected && (
                  <li
                    className="cursor-pointer"
                    key={index}
                    onClick={() => {
                      setSelectedSkill([...selectedSkill, skill.name]);
                      skills[index].isSelected = true;
                      // setSkills(skillsList);
                      // const skillWrapper =
                      //   document.getElementById("skill-wrapper");
                      // if (skillWrapper)
                      //   skillWrapper.scrollLeft = skillWrapper.scrollWidth;
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
      {error && (
        <span className="text-error text-xsm d-block ps-3">{error}</span>
      )}
    </div>
  );
};

export default SelectSkill;
