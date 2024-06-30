import { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import { Languages } from "../../../../util/constant/language_constant";
import customToast from "../../../../components/custom_toast/custom_toast";
import { FaFile } from "react-icons/fa6";
import SelectLanguage from "../../../../components/select_language/select_language";

const ResumeAndLanguage = ({
  setGotoNext,
  setUserInfo,
  userInfo,
}: BoardingPropTypes) => {
  const [resume, setResume] = useState<File | null>();
  const [lang, setLang] = useState(Languages);
  const [userLanguage, setUserLanguage] = useState(userInfo.language);
  // const [userLanguage, setUserLanguage] = useState([
  //   {
  //     language: "English",
  //     level: "good",
  //   },
  // ]);

  useEffect(() => {
    const size = resume?.size ? resume?.size / 1000_000 : null;
    if (size && size > 2)
      customToast({
        message: `Resume size ${size}MB greater than 2MB`,
        type: "error",
      });
    if (size && size <= 2 && userLanguage.length >= 1) {
      const lang = userLanguage.map((lang) => lang);
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
        <p className={`text-center  text-black-variant-1 p-2`}>
          Upload Your Resume
        </p>
        <div
          className={`
          border-card
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
            className={`d-none`}
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
        <p className={`text-center p-2`}>Language</p>

        <SelectLanguage
          lang={lang}
          setLang={setLang}
          setUserLanguage={setUserLanguage}
          userLanguage={userLanguage}
        />
      </div>
    </div>
  );
};

export default ResumeAndLanguage;
