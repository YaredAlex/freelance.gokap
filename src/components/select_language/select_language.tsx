import { CloseCircle } from "iconsax-react";
import { Languages } from "../../util/constant/language_constant";
import { useEffect } from "react";

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
  const langListContainer = document.getElementById("lang-ul-add");
  useEffect(() => {
    //check langauge selected for existing language
    userLanguage.forEach((selected) => {
      lang.map((child) => {
        if (child.name.toLocaleLowerCase() === selected.toLocaleLowerCase())
          child.isSelected = true;
        return child;
      });
    });
  }, []);
  return (
    <>
      <div className={`${error ? "red-border" : ""}`}>
        <div
          className={`d-flex flex-wrap align-items-center gap-2  mb-2 border-card px-2 py-1 rounded`}
        >
          {userLanguage
            ? userLanguage.map((selectedLanguage, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between gap-2 mb-1 border-card px-2 py-1 rounded"
                >
                  {/*signle user language,remove language and list of langauge container*/}
                  <div
                    className={`rounded border-green-variant-3 text-black-variant-2 position-relative col`}
                  >
                    {/* single user langauge  */}
                    <div className="d-flex" style={{ width: "max-content" }}>
                      <div
                        id="0"
                        className={`p-1 rounded  bg-white-variant-2 text-black-variant-2 cursor-pointer `}
                      >
                        {selectedLanguage}
                      </div>

                      <span
                        className={`cursor-pointer p-1`}
                        onClick={() => {
                          setUserLanguage((lan) =>
                            lan.filter((l) => l != selectedLanguage)
                          );
                          const unselect = lang.find(
                            (l) =>
                              l.name.toLowerCase() ===
                              selectedLanguage.toLowerCase()
                          );
                          if (unselect) unselect.isSelected = false;
                        }}
                      >
                        <CloseCircle />
                      </span>
                    </div>
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
          {/* Add language button/ change to input */}
          <div
            className="border-card  rounded position-relative"
            style={{ maxWidth: "max-content" }}
          >
            <div className="d-flex bg-white-smoke rounded text-black-variant-1 p-2">
              <input
                type="text"
                className="transparent text-black-variant-1"
                style={{ maxWidth: "100%" }}
                onClick={() => {
                  if (!langListContainer?.classList.contains("active"))
                    langListContainer?.classList.add("active");
                }}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value != "") {
                    setLang((lang) =>
                      lang.filter((x) => x.name.toLowerCase().includes(value))
                    );
                  } else setLang(Languages);
                }}
                placeholder="Select language"
              />
              <div className="col">
                <CloseCircle
                  className="col d-block"
                  width={24}
                  height={24}
                  onClick={() => {
                    if (langListContainer?.classList.contains("active"))
                      langListContainer.classList.toggle("active");
                  }}
                />{" "}
              </div>
            </div>

            <LanguageListView
              index={"add"}
              lang={lang}
              setLang={setLang}
              setUserLanguage={setUserLanguage}
            />
          </div>
          {/* Error texts */}
          {error && (
            <span className="text-error text-xsm d-block ps-3">{error}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLanguage;

const LanguageListView = ({
  index,
  setUserLanguage,
  lang,
}: {
  setUserLanguage: React.Dispatch<React.SetStateAction<string[]>>;
  index: number | string;
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
}) => {
  return (
    <ul
      id={`lang-ul-${index}`}
      className={`language-list bg-white-v-4 border-card`}
    >
      {lang.map(
        (lan, i) =>
          !lan.isSelected && (
            <li
              key={i}
              onClick={(e) => {
                setUserLanguage((prevUserLanguage) => {
                  const updatedUserLanguage = [...prevUserLanguage];
                  // Update the language at the specified index
                  updatedUserLanguage.push(lan.name);

                  return updatedUserLanguage;
                });
                lan.isSelected = true;
                e.currentTarget.parentElement?.classList.toggle("active");
              }}
            >
              {lan.name}
            </li>
          )
      )}
    </ul>
  );
};
