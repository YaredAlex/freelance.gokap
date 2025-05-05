import DefaultModal from "../../../components/popup/modal";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import TextField from "../../../components/inputField/text_field";
import { AgentProfileProp } from "../hooks/agent/use_agent_profile";
import { useChangeEducation } from "../hooks/usechangeeducation";

const ChangeEducation = ({ profile }: { profile: AgentProfileProp }) => {
  const changeEducation = useChangeEducation();
  return (
    <DefaultModal
      loading={changeEducation.loading}
      showModal={profile.showEditEducation}
      setShowModal={profile.setShowEditEducation}
      modalId="_education"
    >
      <div className={``}>
        <form
          onSubmit={changeEducation.handleSubmit(
            changeEducation.changeUserEducation
          )}
        >
          <h5>Add Education detail</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={changeEducation.errors.level?.message}
              register={changeEducation.register("level", {
                required: "Education level is required",
              })}
              type="text"
              placeholder="Higher Education (e.g B.Sc, High School, Diploma"
            />
            <TextField
              error={changeEducation.errors.year?.message}
              register={changeEducation.register("year", {
                required: "Completion year is required",
              })}
              type="date"
              placeholder="Year of completion"
            />
            <TextField
              error={changeEducation.errors.year?.message}
              register={changeEducation.register("college", {
                required: "Name of institution is required",
              })}
              type="text"
              placeholder="Name of institution"
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  profile.setShowEditEducation(false);
                  changeEducation.reset();
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

export default ChangeEducation;
