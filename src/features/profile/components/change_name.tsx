import DefaultModal from "../../../components/popup/modal";
import {
  UseClientProfileType,
  useChangeClientName,
} from "../hooks/client/use_client_profile";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import TextField from "../../../components/inputField/text_field";

const ChangeClientName = ({
  clientProfile,
}: {
  clientProfile: UseClientProfileType;
}) => {
  const changeName = useChangeClientName();
  return (
    <DefaultModal
      loading={changeName.loading}
      showModal={clientProfile.showEditName}
      setShowModal={clientProfile.setShowEditName}
      modalId="name"
    >
      <div className={``}>
        <form onSubmit={changeName.handleSubmit(changeName.changeUserName)}>
          <h5>Update Your Name</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={changeName.errors.firstname?.message}
              register={changeName.register("firstname", {
                required: "First name required",
                minLength: {
                  value: 3,
                  message: "minimum length should be 3",
                },
              })}
              type="text"
              placeholder="First name"
              name="Frist Name"
            />
            <TextField
              error={changeName.errors.lastname?.message}
              register={changeName.register("lastname", {
                required: "last name is required",
                minLength: {
                  value: 3,
                  message: "minimum length should be 3",
                },
              })}
              type="text"
              placeholder="Last Name"
              name="Last Name"
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  clientProfile.setShowEditName(false);
                  changeName.reset();
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

export default ChangeClientName;
