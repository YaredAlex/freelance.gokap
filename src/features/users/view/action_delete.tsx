import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../components/button/button";
import DefaultModal from "../../../components/popup/modal";
import { useDeleteClient } from "../hooks/use_delete_client";
import { UseManageUserProps } from "../hooks/use_manage_user";

const DeleteUserModal = ({
  manageUser,
}: {
  manageUser: UseManageUserProps;
}) => {
  const deleteUser = useDeleteClient();
  return (
    <DefaultModal
      loading={deleteUser.loading}
      showModal={manageUser.showDeleteUser}
      setShowModal={manageUser.setShowDeleteUser}
      modalId="_delete"
    >
      <div className={``}>
        <h5>Delete User</h5>
        <div className={`d-flex flex-column justify-content-between p-2 gap-2`}>
          <p className="mb-4">
            This action cannot be undone. Please confirm to proceed.
          </p>
          <div
            className="d-flex gap-4 ms-auto mt-4"
            style={{ maxWidth: "300px", width: "100%" }}
          >
            <ButtonPrimaryOutline
              title="Cancel"
              type="button"
              onClick={() => {
                manageUser.setShowDeleteUser(false);
              }}
              className="py-2 col"
            />
            <ButtonPrimary
              title="Delete"
              type="submit"
              className="py-2 col button-danger"
              onClick={() => deleteUser.deleteUser(manageUser.user.id)}
            />
          </div>
        </div>
      </div>
    </DefaultModal>
  );
};

export default DeleteUserModal;
