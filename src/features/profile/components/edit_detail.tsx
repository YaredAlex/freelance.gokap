import DefaultModal from "../../../components/popup/modal";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import { TextEditArea } from "../../../components/inputField/text_field";
import { UseAgentDetailType } from "../hooks/agent/use_agent_detail";
import { useChangeAgentDetail } from "../hooks/agent/use_change_detail";
import SelectSkill from "../../../components/select_skill/select_skill";
import SelectLanguage from "../../../components/select_language/select_language";

const ChangeAgentDetail = ({
  agentDetail,
}: {
  agentDetail: UseAgentDetailType;
}) => {
  const changeDetail = useChangeAgentDetail(agentDetail.setShowEdit);
  return (
    <DefaultModal
      loading={changeDetail.loading}
      showModal={agentDetail.showEdit}
      setShowModal={agentDetail.setShowEdit}
      modalId="agent_detail"
      maxWidth="700px"
    >
      <div className={``}>
        <form onSubmit={changeDetail.editDetail}>
          <h6>Update Detail</h6>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <h6>Bio</h6>
            <TextEditArea
              onChange={(e) => {
                changeDetail.setBio(e.target.value);
              }}
              name="bio"
              value={changeDetail.bio}
              error={changeDetail.errors.bio}
              placeholder="Your bio"
              title=""
              type="text"
              rows={8}
            />
            {/* skill */}
            <div className="mt-3">
              <h6>Skills</h6>
              <SelectSkill
                error={changeDetail.errors.skills}
                showTitle={false}
                selectedSkill={changeDetail.personalSkill}
                setSelectedSkill={changeDetail.setPersonalSkill}
                maxWidth="100%"
              />
            </div>
            {/* lanugage */}
            <div className={`mt-3 text-black-variant-1 `}>
              <h6 className={` p-2`}>Language</h6>

              <SelectLanguage
                lang={changeDetail.lang}
                setLang={changeDetail.setLang}
                setUserLanguage={changeDetail.setUserLanguage}
                userLanguage={changeDetail.userLanguage}
                error={changeDetail.errors.languages}
              />
            </div>
            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  agentDetail.setShowEdit(false);
                }}
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

export default ChangeAgentDetail;
