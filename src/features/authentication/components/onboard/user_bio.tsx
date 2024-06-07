import { useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";

const UserSummary = ({ setGotoNext, setUserInfo }: BoardingPropTypes) => {
  const [summary, setSummary] = useState("");
  return (
    <div
      className={`mt-4 
      max-width-400-center
      `}
    >
      <p className={`text-center`}>
        About You
        <span className={`text-gray text-xsm`}> min (50 words)</span>
      </p>
      <div
        className={`border-green-variant-3 rounded overflow-hidden
        p-1
        `}
      >
        <textarea
          className={`w-100 
          textarea-about
          border-0
          transparent
          p-2 text-black-variant-2`}
          placeholder={`eg. With expertise in web designing and development using React.js and Node, I am well-equipped to deliver innovative and robust solutions. My commitment to clear and proactive communication ensures a smooth collaboration, making me the ideal candidate for your project
          `}
          rows={4}
          style={{
            textAlign: "justify",
          }}
          name="bio"
          onChange={(e) => {
            const { value, name } = e.target;
            setSummary(e.target.value);
            if (value.split(" ").length > 50) {
              setGotoNext(true);
              setUserInfo((info) => {
                return { ...info, [name]: value };
              });
            }
          }}
        />
        <span className={`text-xsm p-1 text-black-variant-1`}>
          {summary.split(" ").length - 1}
        </span>
      </div>
    </div>
  );
};

export default UserSummary;
