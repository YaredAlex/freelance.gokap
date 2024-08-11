import { ButtonPrimary } from "../../../../components/button/button";
import DefaultModal from "../../../../components/popup/modal";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import {
  AppliedAgentType,
  useAssignProjectType,
} from "../../hook/use_assign_project";

export const AssignModal = ({
  assignProject,
  freelancer,
}: {
  assignProject: useAssignProjectType;
  freelancer: AppliedAgentType | undefined;
}) => {
  return (
    <DefaultModal
      loading={false}
      showModal={assignProject.showModal}
      setShowModal={assignProject.setShowModal}
      modalId="assign_modal"
    >
      <div className="text-black-variant-1">
        <h6 className="mb-2">Freelancer</h6>
        <div className="mb-4">
          <p>
            {typeof freelancer?.frelancer_id.user === "object"
              ? `${freelancer.frelancer_id.user.firstname} ${freelancer.frelancer_id.user.lastname}`
              : ""}
          </p>
          <p>Intermediate</p>
        </div>

        <div className="mb-4">
          <p className="mb-2">Bio</p>
          <p>{freelancer?.frelancer_id.bio}</p>
        </div>
        <div className="mb-4">
          <p className="mb-2">skill</p>
          <div className="d-flex gap-4 flex-wrap">
            {freelancer?.frelancer_id?.skills.map((skill, index) => (
              <RoundedText text={skill} key={index} />
            ))}
          </div>
        </div>
        <div className="ms-auto" style={{ maxWidth: "200px" }}>
          <ButtonPrimary
            title="Assign"
            onClick={() => {
              assignProject.setShowModal(false);
            }}
            type="button"
            className="py-2"
          />
        </div>
      </div>
    </DefaultModal>
  );
};
