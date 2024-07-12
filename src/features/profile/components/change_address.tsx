import DefaultModal from "../../../components/popup/modal";
import {
  UseClientProfileType,
  useChangeAddress,
} from "../hooks/client/use_client_profile";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import TextField from "../../../components/inputField/text_field";

const ChangeAddress = ({ profile }: { profile: UseClientProfileType }) => {
  const changeAddress = useChangeAddress();
  return (
    <DefaultModal
      loading={changeAddress.loading}
      showModal={profile.showEditAddress}
      setShowModal={profile.setShowEditAddress}
      modalId="address"
    >
      <div className={``}>
        <form
          onSubmit={changeAddress.handleSubmit(changeAddress.changeAddress)}
        >
          <h5>Update Your Address</h5>
          <div
            className={`d-flex flex-column justify-content-between p-2 gap-2`}
          >
            <TextField
              error={changeAddress.errors.country?.message}
              register={changeAddress.register("country", {
                required: "Please select country",
              })}
              type="text"
              placeholder="Country"
              name="Country"
            />
            <TextField
              error={changeAddress.errors.state?.message}
              register={changeAddress.register("state", {
                required: "State is required",
              })}
              type="text"
              placeholder="State"
              name="State"
            />
            <TextField
              error={changeAddress.errors.city?.message}
              register={changeAddress.register("city", {
                required: "City is required",
              })}
              type="text"
              placeholder="City"
              name="City"
            />
            <TextField
              error={changeAddress.errors.zipcode?.message}
              register={changeAddress.register("zipcode", {
                required: "Zipcode is required",
              })}
              type="number"
              placeholder="Zipcode"
              name="Zip/code"
            />

            <div
              className="d-flex gap-4 ms-auto mt-4"
              style={{ maxWidth: "300px", width: "100%" }}
            >
              <ButtonPrimaryOutline
                title="Cancel"
                type="button"
                onClick={() => {
                  profile.setShowEditAddress(false);
                  changeAddress.reset();
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

export default ChangeAddress;
