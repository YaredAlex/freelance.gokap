import { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import { TextEditArea } from "../../../../components/inputField/text_field";
import { minSummaryLength } from "../../../../util/constant/constant";
import { summaryRequired } from "../../../../util/string_constants";

const UserBio = ({
  setUserInfo,
  userInfo,
  setOnNextValidator,
}: BoardingPropTypes) => {
  const [summary, setSummary] = useState(userInfo.bio);
  const [errors, setErrors] = useState({
    bio: "",
  });
  useEffect(() => {
    setOnNextValidator(onNextValidator);
    if (summary.split(" ").length >= 50) {
      setErrors((prev) => {
        return { ...prev, bio: "" };
      });
      setUserInfo((info) => {
        return { ...info, bio: summary };
      });
    }
  }, [summary]);
  const onNextValidator = () => {
    let isValid = true;
    if (summary.split(" ").length < minSummaryLength) {
      setErrors((prev) => {
        return { ...prev, bio: summaryRequired };
      });
      isValid = false;
    } else setErrors((prev) => ({ ...prev, bio: "" }));

    return isValid;
  };
  return (
    <div
      className={`mt-4 
      max-width-400-center text-black-variant-1
      `}
      style={{
        maxWidth: "600px",
      }}
    >
      <p className={`text-center p-2`}>
        About You
        <span className={`text-gray text-xsm`}> min (50 words)</span>
      </p>
      <div className={`overflow-hidden p-1`}>
        <TextEditArea
          error={errors.bio}
          name="bio"
          onChange={(e) => {
            setSummary(e.target.value);
          }}
          placeholder={`eg. With expertise in web designing and development using React.js and Node, I am well-equipped to deliver innovative and robust solutions. My commitment to clear and proactive communication ensures a smooth collaboration, making me the ideal candidate for your project`}
          type="text"
          value={summary}
          rows={10}
        />
        <span className={`text-xsm p-1 text-black-variant-1`}>
          {summary.split(" ").length - 1}
        </span>
      </div>
    </div>
  );
};

export default UserBio;
