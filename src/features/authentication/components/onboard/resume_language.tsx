import React, { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import { Languages } from "../../../../util/constant/language_constant";
import customToast from "../../../../components/custom_toast/custom_toast";
import { FaFile } from "react-icons/fa6";
import SelectLanguage from "../../../../components/select_language/select_language";
import "./resume_language.css";

const ResumeAndLanguage: React.FC<BoardingPropTypes> = ({
  setGotoNext,
  setUserInfo,
  userInfo,
}) => {
  const [resume, setResume] = useState<File | null>(userInfo.resume || null);
  const [lang, setLang] = useState(Languages);
  const [userLanguage, setUserLanguage] = useState<string[]>(
    userInfo.language || []
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Validate resume size
    if (resume) {
      const size = resume.size / 1000000;
      if (size > 2) {
        setError(`Resume size ${size.toFixed(2)}MB exceeds the 2MB limit`);
        customToast({
          message: `Resume size ${size.toFixed(2)}MB exceeds the 2MB limit`,
          type: "error",
        });
        return;
      }
    }

    // Validate language selection
    if (userLanguage.length < 1) {
      setError("At least one language is required");
      setGotoNext(false);
      return;
    }
    setError("");

    if ((resume || userInfo.resume) && userLanguage.length >= 1) {
      setUserInfo((info) => ({
        ...info,
        language: userLanguage,
        resume: resume || info.resume,
      }));
      setGotoNext(true);
    } else {
      setGotoNext(false);
    }
  }, [resume, userLanguage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setResume(files[0]);
    }
  };

  return (
    <div className="resume-language-container">
      {/* Resume Upload Section */}
      <div className="upload-section">
        <h3 className="section-title">Upload Your Resume</h3>
        <div className="file-upload-container">
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            className="file-input"
            onChange={handleFileChange}
          />
          <label htmlFor="resume" className="file-label">
            <span className="file-name">
              {resume ? resume.name : "Resume (max 2MB)"}
            </span>
            <span className="file-icon">
              <FaFile color="green" />
            </span>
          </label>
        </div>
      </div>

      {/* Language Selection Section */}
      <div className="language-section">
        <h3 className="section-title">Language</h3>
        <div className="language-select-wrapper">
          <SelectLanguage
            lang={lang}
            setLang={setLang}
            setUserLanguage={setUserLanguage}
            userLanguage={userLanguage}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeAndLanguage;
