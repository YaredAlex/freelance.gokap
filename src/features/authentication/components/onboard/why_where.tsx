import { useEffect, useState } from "react";
import { BoardingPropTypes } from "../../hooks/onboard/use_onboard";
import Select from "../../../../components/inputField/select_field";
import { TextEdit } from "../../../../components/inputField/text_field";

const WhyAndWhere = ({
  setUserInfo,
  userInfo,
  setOnNextValidator,
}: BoardingPropTypes) => {
  const [whyFreelance, setWhyFreelance] = useState(userInfo.reason);
  const [hearedAboutUs, setHeardAboutUs] = useState(userInfo.where);
  const [errors, setErrors] = useState({
    why: "",
    heared: "",
  });
  useEffect(() => {
    if (whyFreelance.length > 3) {
      setErrors((prev) => ({ ...prev, why: "" }));
      setUserInfo((info) => {
        return { ...info, reason: whyFreelance };
      });
    }
    if (hearedAboutUs) {
      setErrors((prev) => ({ ...prev, heared: "" }));
      setUserInfo((info) => {
        return { ...info, where: hearedAboutUs };
      });
    }
    setOnNextValidator(onNextValidator);
  }, [whyFreelance, hearedAboutUs]);

  const onNextValidator = () => {
    let isValid = true;
    if (whyFreelance.length < 3) {
      setErrors((prev) => {
        return { ...prev, why: "This field is required" };
      });
      isValid = false;
    } else setErrors((prev) => ({ ...prev, why: "" }));
    if (!hearedAboutUs) {
      setErrors((prev) => ({ ...prev, heared: "This field is required" }));
      isValid = false;
    } else setErrors((prev) => ({ ...prev, heared: "" }));

    console.log(isValid, "is valid");
    return isValid;
  };
  return (
    <div className="text-black-variant-1">
      <div>
        <div className={` mt-3 flex-column max-width-400-center`}>
          <p className={`text-center py-2`}>
            Why do you want start freelancing
          </p>
          <TextEdit
            error={errors.why}
            name="reason"
            onChange={(e) => {
              setWhyFreelance(e.target.value);
            }}
            placeholder="(e.g. earning, training)"
            type="text"
            value={whyFreelance}
          />
        </div>
        <div className="d-flex mt-3 flex-column  align-items-center max-width-400-center ">
          <p className="text-center py-2">Where did you heard about us?</p>
          <Select
            errorMessage={errors.heared}
            name="where"
            onChange={(e) => {
              setHeardAboutUs(e.target.value);
            }}
            options={[
              { value: "F", name: "Friends" },
              { value: "TM", name: "Team Member" },
              { value: "Fa", name: "Face Book" },
              { value: "T", name: "Twitter" },
              { value: "G", name: "Google" },
              { value: "O", name: "Others" },
            ]}
            selectedItem={hearedAboutUs}
            placeholder={"Where did you heared?"}
          />
        </div>
      </div>
    </div>
  );
};
export default WhyAndWhere;
