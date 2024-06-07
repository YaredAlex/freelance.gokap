import { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";

const WhyAndWhere = ({ setGotoNext, setUserInfo }: BoardingPropTypes) => {
  const [whyFreelance, setWhyFreelance] = useState("");
  const [hearedAboutUs, setHeardAboutUs] = useState("");
  useEffect(() => {
    if (whyFreelance && whyFreelance.length > 3 && hearedAboutUs) {
      // setUserInfo(info=>{ return {...info,reason:whyFreelance,heared:hearedAboutUs}})
      setGotoNext(true);
    } else setGotoNext(false);
  }, [whyFreelance, hearedAboutUs]);
  const updateUserInfo = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((info) => {
      return { ...info, [name]: value };
    });
  };
  return (
    <div className="text-black-variant-1">
      <div>
        <div
          className={`
         
          mt-3
        flex-column 
        max-width-400-center
       
          `}
        >
          <p className={`text-center`}>Why do you want start freelancing</p>
          <input
            placeholder="why"
            name="reason"
            className={`
        w-100
        p-2
        rounded
        border-green-variant-3
        transparent
        text-black-variant-2
            `}
            onChange={(e) => {
              setWhyFreelance(e.target.value);
              updateUserInfo(e);
            }}
          />
        </div>
        <div
          className="d-flex 
          mt-3
        flex-column 
        align-items-center
        max-width-400-center
        "
        >
          <p className="text-center">Where did you heard about us?</p>
          <select
            className={`
        p-2
        rounded
        border-green-variant-3
        text-black-variant-1
        bg-white-variant-2
        w-100
        `}
            name="where"
            onChange={(e) => {
              setHeardAboutUs(e.target.value);
              updateUserInfo(e);
            }}
          >
            <option value="">Select</option>
            <option value="Instagram">Instagram</option>
            <option value="Youtube">Youtube</option>
            <option value="Friends">Friends</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default WhyAndWhere;
