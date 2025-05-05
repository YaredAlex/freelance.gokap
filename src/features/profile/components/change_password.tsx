import DefaultModal from "../../../components/popup/modal";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import TextField from "../../../components/inputField/text_field";
import { useAdminProfileType } from "../hooks/admin/use_admin_profile";
import { useChangePassword } from "../hooks/admin/usechangepassword";

const ChangePassword = ({
  adminProfile,
}: {
  adminProfile: useAdminProfileType;
}) => {
  const changePassword = useChangePassword();
  return (
    <DefaultModal
      loading={changePassword.loading}
      showModal={adminProfile.showEditPass}
      setShowModal={adminProfile.setShowEditPass}
      modalId="password"
    >
      <div className={``}>
        <form
          onSubmit={changePassword.handleSubmit(changePassword.changePassword)}
        >
          <h5>Change password</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={changePassword.errors.currentPassword?.message}
              register={changePassword.register("currentPassword", {
                required: "current password required",
              })}
              type="password"
              placeholder="Current password"
              name=""
            />
            <TextField
              error={changePassword.errors.password?.message}
              register={changePassword.register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "minimum length should be 6",
                },
              })}
              type="password"
              placeholder="New password"
              name=""
            />
            <TextField
              error={changePassword.errors.cnfpassword?.message}
              register={changePassword.register("cnfpassword", {
                required: "confirm password is required",
                minLength: {
                  value: 6,
                  message: "minimum length should be 6",
                },
              })}
              type="password"
              placeholder="Confirm password"
              name=""
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  adminProfile.setShowEditPass(false);
                  changePassword.reset();
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

export default ChangePassword;
