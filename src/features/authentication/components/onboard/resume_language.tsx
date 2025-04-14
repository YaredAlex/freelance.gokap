import React, { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import { Languages } from "../../../../util/constant/language_constant";
import { FaFile } from "react-icons/fa6";
import "./resume_language.css";
import { TextEdit } from "../../../../components/inputField/text_field";
import SelectSearchOptions from "../../../../components/select_options/select_option";
import { maxLanguage, minLanguage } from "../../../../util/constant/constant";
import { languageRequired } from "../../../../util/string_constants";

const ResumeAndLanguage: React.FC<BoardingPropTypes> = ({
  setUserInfo,
  userInfo,
  setOnNextValidator,
}) => {
  const [resume, setResume] = useState<File | null>(userInfo.resume || null);
  const [userLanguage, setUserLanguage] = useState<string[]>(
    userInfo.language || []
  );
  const [errors, setErrors] = useState({
    resume: "",
    language: "",
  });
  const errorMessages = {
    langauge: languageRequired,
  };

  useEffect(() => {
    // Validate resume size
    setOnNextValidator(onNextValidator);
    if (resume) {
      const size = resume.size / 1000000;
      if (size > 2) {
        setErrors((prev) => ({
          ...prev,
          resume: `Resume size ${size.toFixed(2)}MB exceeds the 2MB limit`,
        }));
        setUserInfo((info) => ({
          ...info,
          resume: resume || info.resume,
        }));
      }
    }

    if (userLanguage.length >= minLanguage) {
      setErrors((prev) => ({
        ...prev,
        language: "",
      }));
      setUserInfo((info) => ({
        ...info,
        language: userLanguage,
      }));
    }
  }, [resume, userLanguage]);

  const handleFileChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      if (files && files.length > 0) {
        setResume(files[0]);
      }
    }
  };
  const onSelectItem = (item: string) => {
    if (maxLanguage && userLanguage.length >= maxLanguage) {
      return;
    }

    setUserLanguage([...userLanguage, item]);
  };
  const onRemoveItem = (item: string) => {
    setUserLanguage(() => userLanguage.filter((i) => i !== item));
  };
  const onNextValidator = () => {
    let isValid = true;
    if (userLanguage.length < minLanguage) {
      setErrors((prev) => ({ ...prev, language: errorMessages.langauge }));
      isValid = false;
    } else setErrors((prev) => ({ ...prev, language: "" }));
    if (resume) {
      const size = resume.size / 1000000;
      if (size > 2) {
        setErrors((prev) => ({
          ...prev,
          resume: `Resume size ${size.toFixed(2)}MB exceeds the 2MB limit`,
        }));
      }
    } else setErrors((prev) => ({ ...prev, resume: "" }));

    return isValid;
  };
  return (
    <div className="resume-language-container">
      {/* Resume Upload Section */}
      <div className="upload-section">
        <h3 className="section-title">Upload Your Resume</h3>
        <TextEdit
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          id="resume"
          type="file"
          surfix_icon={
            <span className="file-icon">
              <FaFile color="green" />
            </span>
          }
          error=""
          placeholder="Resume file"
          name="resume"
          value={""}
        />
      </div>

      {/* Language Selection Section */}
      <div className="language-section">
        <h3 className="section-title">
          Language
          <span className="required-hint">(at least 1 Language required)</span>
        </h3>
        <div className="language-select-wrapper">
          <SelectSearchOptions
            error={errors.language}
            showTitle={false}
            selectedOption={userLanguage}
            setSelectOption={setUserLanguage}
            onSelectItem={onSelectItem}
            onRemoveItem={onRemoveItem}
            optionList={Languages.map((lang) => ({ name: lang.name }))}
            placeholder="Select Language"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeAndLanguage;
