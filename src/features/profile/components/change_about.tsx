import DefaultModal from "../../../components/popup/modal";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import { TextEditArea } from "../../../components/inputField/text_field";
import { useEffect, useState } from "react";
import { AgentProfileProp } from "../hooks/agent/use_agent_profile";
import { minSummaryLength } from "../../../util/constant/constant";
import { summaryRequired } from "../../../util/string_constants";

const ChangeAbout = ({ profile }: { profile: AgentProfileProp }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [summary, setSummary] = useState(profile.about || "");
  useEffect(() => {
    setSummary(profile.about || "");
  }, [profile.about]);
  useEffect(() => {
    isValid();
  }, [summary]);

  const isValid = () => {
    if (summary.split(" ").length > minSummaryLength) {
      setErrors("");
      return true;
    } else {
      setErrors(summaryRequired);
    }
    return false;
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) return;
    if (summary === profile.about) return;
    setLoading(true);
    //updating data
    profile.singleUpdate({ bio: summary });
    profile.setShowEditAbout(false);
    setLoading(false);
  };

  const onCancel = () => {
    setSummary(profile.about || "");
    profile.setShowEditAbout(false);
  };
  return (
    <DefaultModal
      loading={loading}
      showModal={profile.showEditAbout}
      setShowModal={profile.setShowEditAbout}
      modalId="about"
    >
      <div className={``}>
        <form onSubmit={onSubmit}>
          <h5>Update Your About</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextEditArea
              error={errors}
              name="bio"
              onChange={(e) => {
                setSummary(e.target.value);
              }}
              placeholder={`eg. With expertise in web designing and development using React.js and Node, I am well-equipped to deliver innovative and robust solutions. My commitment to clear and proactive communication ensures a smooth collaboration, making me the ideal candidate for your project`}
              type="text"
              value={summary || ""}
              rows={10}
            />
            <span className={`text-xsm p-1 text-black-variant-1`}>
              {summary ? summary.split(" ").length - 1 : 0}
            </span>
            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={onCancel}
                className="py-2 col"
              />
              <ButtonPrimary
                title="Change"
                type="submit"
                className="py-2 col"
              />
            </div>
          </div>
        </form>
      </div>
    </DefaultModal>
  );
};

export default ChangeAbout;
