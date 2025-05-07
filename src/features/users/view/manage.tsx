import useManageUser from "../hooks/use_manage_user";
import { ButtonFlexOutline } from "../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";
import { UserActionType } from "../components/action_dropdown";
import DeleteUserModal from "./action_delete";
import SendEmailModal from "./action_send_email";
import SuspendUserModal from "./action_suspend";
import ManageClient from "./users/manage_user";
import ManageFreelancer from "./freelancers/manage_freelancer";

const ManageUser = ({ role }: { role: "client" | "freelancer" }) => {
  const manageUser = useManageUser();
  const navigate = useNavigate();
  const handleActionClick = (action: string) => {
    switch (action) {
      case UserActionType.DELETE_USER:
        manageUser.setShowDeleteUser(true);
        break;
      case UserActionType.SEND_EMAIL:
        manageUser.setShowSendEmail(true);
        break;
      case UserActionType.SUSPEND:
        manageUser.setShowSuspend(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="text-black-variant-1 pt-1 max-w-1100 mx-auto p-2 mt-2">
      <DeleteUserModal manageUser={manageUser} />
      <SendEmailModal manageUser={manageUser} />
      <SuspendUserModal manageUser={manageUser} />
      <div
        style={{ maxWidth: "max-content" }}
        className="d-flex gap-4 align-items-center mb-2"
      >
        <ButtonFlexOutline
          className="p-1 bg-white-v-4 text-black-variant-1 m-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </ButtonFlexOutline>
        <p>{role === "client" ? "Client" : "Freelancer"}</p>
      </div>
      {role === "client" ? (
        <ManageClient handleActionClick={handleActionClick} />
      ) : (
        <ManageFreelancer handleActionClick={handleActionClick} />
      )}
    </div>
  );
};

export default ManageUser;
