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
      loading={assignProject.loading}
      showModal={assignProject.showModal}
      setShowModal={assignProject.setShowModal}
      modalId="assign_modal"
    >
      <div className="text-black-variant-1">
        <h6 className="mb-2">Freelancer</h6>
        <div className="mb-4">
          <p>
            {typeof freelancer?.details.frelancer_id.user === "object"
              ? `${freelancer.details.frelancer_id.user.firstname} ${freelancer.details.frelancer_id.user.lastname}`
              : ""}
          </p>
          <p>Intermediate</p>
        </div>

        <div className="mb-4">
          <p className="mb-2">Bio</p>
          <p>{freelancer?.details.frelancer_id.bio}</p>
        </div>
        <div className="mb-4">
          <p className="mb-2">skill</p>
          <div className="d-flex gap-4 flex-wrap">
            {freelancer?.details.frelancer_id?.skills.map((skill, index) => (
              <RoundedText text={skill} key={index} />
            ))}
          </div>
        </div>
        <div className="ms-auto" style={{ maxWidth: "200px" }}>
          <ButtonPrimary
            title="Assign"
            onClick={() => {
              assignProject.setShowModal(false);
              const fid =
                typeof freelancer?.details.frelancer_id.user === "object"
                  ? freelancer?.details.frelancer_id.user.id
                  : -1;
              assignProject.assignProject(fid);
            }}
            type="button"
            className="py-2"
          />
        </div>
      </div>
    </DefaultModal>
  );
};
