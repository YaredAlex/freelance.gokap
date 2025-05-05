import DefaultModal from "../../../components/popup/modal";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import TextField from "../../../components/inputField/text_field";
import { AgentProfileProp } from "../hooks/agent/use_agent_profile";
import { useChangeService } from "../hooks/usechangeservcies";

const ChangeService = ({ profile }: { profile: AgentProfileProp }) => {
  const changeService = useChangeService();
  return (
    <DefaultModal
      loading={changeService.loading}
      showModal={profile.showEditEducation}
      setShowModal={profile.setShowEditEducation}
      modalId="_service"
    >
      <div className={``}>
        <form
          onSubmit={changeService.handleSubmit(changeService.changeService)}
        >
          <h5>Add Service information</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={changeService.errors.service?.message}
              register={changeService.register("service", {
                required: "Service is required",
              })}
              type="text"
              placeholder="Service you provide"
            />
            <TextField
              error={changeService.errors.hourly_rate?.message}
              register={changeService.register("hourly_rate", {
                required: "Hourly rate is required",
              })}
              type="number"
              placeholder="Hourly rate"
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  profile.setShowEditServices(false);
                  changeService.reset();
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

export default ChangeService;
