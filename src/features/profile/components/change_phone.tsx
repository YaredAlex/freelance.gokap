import DefaultModal from "../../../components/popup/modal";

import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import TextField from "../../../components/inputField/text_field";
import {
  UseAdminProfileType,
  useChangeAdminPhone,
} from "../hooks/admin/use_admin_profile";

const ChangeClientPhone = ({
  clientProfile,
}: {
  clientProfile: UseAdminProfileType;
}) => {
  const changePhone = useChangeAdminPhone();
  return (
    <DefaultModal
      loading={changePhone.loading}
      showModal={clientProfile.showEditPhone}
      setShowModal={clientProfile.setShowEditPhone}
      modalId="phone"
    >
      <div className={``}>
        <form onSubmit={changePhone.handleSubmit(changePhone.changeUserPhone)}>
          <h5>Update Your Phone</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={changePhone.errors.phone?.message}
              register={changePhone.register("phone", {
                required: "phone is required",
                minLength: {
                  value: 10,
                  message: "minimum length should be 10",
                },
              })}
              type="tel"
              placeholder="Phone"
              name="Phone"
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  clientProfile.setShowEditPhone(false);
                  changePhone.reset();
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

export default ChangeClientPhone;
