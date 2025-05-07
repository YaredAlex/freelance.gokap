import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import DefaultModal from "../../../components/popup/modal";
import { UseManageUserProps } from "../hooks/use_manage_user";
import { useSuspendUser } from "../hooks/use_suspend_user";

const SuspendUserModal = ({
  manageUser,
}: {
  manageUser: UseManageUserProps;
}) => {
  const suspendUser = useSuspendUser();
  return (
    <DefaultModal
      loading={suspendUser.loading}
      showModal={manageUser.showSuspend}
      setShowModal={manageUser.setShowSuspend}
      modalId="_delete"
    >
      <div className={``}>
        <h5>Suspend User</h5>
        <div className={`d-flex flex-column justify-content-between p-2 gap-2`}>
          <p className="mb-4">Are you sure?.</p>
          <div
            className="d-flex gap-4 ms-auto mt-4"
            style={{ maxWidth: "300px", width: "100%" }}
          >
            <ButtonPrimaryOutline
              title="Cancel"
              type="button"
              onClick={() => {
                manageUser.setShowSuspend(false);
              }}
              className="py-2 col"
            />
            <ButtonPrimary
              title="Suspend"
              type="submit"
              className="py-2 col button-danger"
              onClick={() => suspendUser.suspendUser(manageUser.user.id)}
            />
          </div>
        </div>
      </div>
    </DefaultModal>
  );
};

export default SuspendUserModal;
