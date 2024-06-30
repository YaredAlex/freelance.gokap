import { AddCircle, CloseCircle } from "iconsax-react";
import { ButtonPrimaryOutline } from "../button/button";
import { Languages } from "../../util/constant/language_constant";

const SelectLanguage = ({
  userLanguage,
  setUserLanguage,
  setLang,
  lang,
  error,
}: {
  userLanguage: string[];
  setUserLanguage: React.Dispatch<React.SetStateAction<string[]>>;
  setLang: (
    value: React.SetStateAction<
      {
        name: string;
        isSelected: boolean;
      }[]
    >
  ) => void;
  lang: {
    name: string;
    isSelected: boolean;
  }[];
  error?: string;
}) => {
  return (
    <>
      <div className={`${error ? "red-border" : ""}`}>
        {userLanguage
          ? userLanguage.map((selectedLanguage, index) => (
              <div
                className={`d-flex align-items-center justify-content-between gap-2 mb-2 border-card px-2 py-1 rounded`}
                key={index}
              >
                <div
                  className={`rounded border-green-variant-3 text-black-variant-2 position-relative col`}
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
                      {selectedLanguage}
                    </div>

                    <span
                      className={`cursor-pointer p-1`}
                      onClick={() => {
                        setUserLanguage((lan) =>
                          lan.filter((l) => l != selectedLanguage)
                        );
                      }}
                    >
                      <ButtonPrimaryOutline
                        title="remove"
                        type="button"
                        className="py-0"
                      />
                    </span>
                  </div>
                  <ul
                    id={`lang-ul-${index}`}
                    className={`language-list bg-white-v-4 border-card`}
                  >
                    <div className="d-flex bg-white-smoke border rounded text-black-variant-1 p-1 mx-1">
                      <input
                        type="text"
                        className="transparent text-black-variant-1 col"
                        style={{ maxWidth: "100%" }}
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
                      <CloseCircle
                        size={20}
                        className="cursor-pointer"
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
                                updatedUserLanguage[index] = lan.name;
                                // {
                                //   ...updatedUserLanguage[index],
                                //   language: lan.name,
                                // };
                                // Return the updated userLanguage array
                                return updatedUserLanguage;
                              });
                              selectedLanguage = lan.name;
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

                {/* <div>
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
                </div> */}
              </div>
            ))
          : ""}
        <div
          className="border-card mt-3 p-1 rounded"
          style={{ maxWidth: "200px" }}
          onClick={() => {
            setUserLanguage([...userLanguage, lang[0].name]);
          }}
        >
          add language <AddCircle />{" "}
        </div>
        {error && (
          <span className="text-error text-xsm d-block ps-3">{error}</span>
        )}
      </div>
    </>
  );
};

export default SelectLanguage;
