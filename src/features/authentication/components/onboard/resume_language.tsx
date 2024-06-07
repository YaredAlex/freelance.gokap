import { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import { AddCircle, CloseSquare } from "iconsax-react";
import { Languages } from "../../../../util/constant/language_constant";
import customToast from "../../../../components/custom_toast/custom_toast";
import { FaFile } from "react-icons/fa6";

const ResumeAndLanguage = ({ setGotoNext, setUserInfo }: BoardingPropTypes) => {
  const [resume, setResume] = useState<File | null>();
  const [lang, setLang] = useState(Languages);
  const [userLanguage, setUserLanguage] = useState([
    {
      language: "English",
      level: "good",
    },
  ]);

  useEffect(() => {
    const size = resume!.size / 1000_000 ?? null;
    if (size && size > 2)
      customToast({
        message: `Resume size ${size}MB greater than 2MB`,
        type: "error",
      });
    if (size && size <= 2 && userLanguage.length >= 1) {
      const lang = userLanguage.map((lang) => lang.language);
      setUserInfo((info) => {
        return { ...info, language: lang, resume: resume };
      });
      setGotoNext(true);
    }
    if (userLanguage.length < 1) {
      setGotoNext(false);
      customToast({
        message: `at lease one language is required`,
        type: "error",
      });
    }
    console.log(userLanguage);
  }, [resume, userLanguage]);

  return (
    <div>
      <div className={`max-width-400-center mt-4`}>
        <p className={`text-center  text-black-variant-1`}>
          Upload Your Resume
        </p>
        <div
          className={`
          border-green-variant-3
          p-1
          rounded
          d-flex
          align-items-center
          justify-content-between
          `}
        >
          <input
            type="file"
            id="resume"
            placeholder="max(2 mb)"
            accept=".pdf,.doc,.docx"
            className={`d-none border`}
            onChange={(e) => setResume(e.target.files![0])}
          />
          <label htmlFor="resume" className={`text-gray cursor-pointer`}>
            {resume ? resume.name : "Resume max(2 Mb)"}
          </label>

          <label htmlFor="resume" className="cursor-pointer p-1 ">
            <FaFile color="green" />
          </label>
        </div>
      </div>
      {/*Language  */}
      <div className={`max-width-400-center mt-3 text-black-variant-1 `}>
        <p className={`text-center`}>Language</p>

        {userLanguage
          ? userLanguage.map((selectedLanguage, index) => (
              <div
                className={`d-flex align-items-center justify-content-between gap-2 mb-2`}
                key={index}
              >
                <div
                  className={`rounded border-green-variant-3 text-black-variant-2 position-relative col`}
                  style={{ maxWidth: "200px" }}
                >
                  <div className="d-flex">
                    <div
                      id="0"
                      className={`p-1 rounded  bg-white-variant-2 text-black-variant-2 cursor-pointer `}
                      style={{ width: "100%" }}
                      onClick={() => {
                        const langlist = document.getElementById(
                          `lang-ul-${index}`
                        );
                        langlist?.classList.toggle("active");
                      }}
                    >
                      {selectedLanguage.language}
                    </div>

                    <span
                      className={`cursor-pointer p-1`}
                      onClick={() => {
                        setUserLanguage((lan) =>
                          lan.filter(
                            (l) => l.language != selectedLanguage.language
                          )
                        );
                      }}
                    >
                      X
                    </span>
                  </div>
                  <ul id={`lang-ul-${index}`} className={`language-list `}>
                    <div className="d-flex bg-light-green border rounded text-black-variant-1 p-1 mx-1">
                      <input
                        type="text"
                        className="transparent text-black-variant-1 "
                        style={{ maxWidth: "85%" }}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (value != "") {
                            setLang((lang) =>
                              lang.filter((x) =>
                                x.name.toLowerCase().includes(value)
                              )
                            );
                          } else setLang(Languages);
                        }}
                        placeholder="seach"
                      />
                      <CloseSquare
                        size={20}
                        className="col cursor-pointer"
                        onClick={() => {
                          const langlist = document.getElementById(
                            `lang-ul-${index}`
                          );
                          langlist?.classList.toggle("active");
                        }}
                      />
                    </div>

                    {lang.map(
                      (lan, i) =>
                        !lan.isSelected && (
                          <li
                            key={i}
                            onClick={(e) => {
                              setUserLanguage((prevUserLanguage) => {
                                // Create a copy of the userLanguage array
                                const updatedUserLanguage = [
                                  ...prevUserLanguage,
                                ];
                                // Update the language at the specified index
                                updatedUserLanguage[index] = {
                                  ...updatedUserLanguage[index],
                                  language: lan.name,
                                };
                                // Return the updated userLanguage array
                                return updatedUserLanguage;
                              });
                              selectedLanguage.language = lan.name;
                              lan.isSelected = true;
                              e.currentTarget.parentElement?.classList.toggle(
                                "active"
                              );
                            }}
                          >
                            {lan.name}
                          </li>
                        )
                    )}
                  </ul>
                </div>

                <div>
                  <select
                    className={`
      p-1
      rounded
      border-green-variant-3
      text-black-variant-1
      bg-white-variant-2
      
      `}
                    name="level"
                    onChange={(e) => {
                      selectedLanguage.level = e.target.value;
                    }}
                    defaultValue={selectedLanguage.level}
                  >
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                    <option value="native">Native</option>
                  </select>
                </div>
              </div>
            ))
          : ""}
        <div
          className="border-green-variant-3 mt-3 p-1 rounded"
          style={{ maxWidth: "200px" }}
          onClick={() => {
            setUserLanguage([
              ...userLanguage,
              { language: "English", level: "good" },
            ]);
          }}
        >
          add language <AddCircle />{" "}
        </div>
      </div>
    </div>
  );
};

export default ResumeAndLanguage;
