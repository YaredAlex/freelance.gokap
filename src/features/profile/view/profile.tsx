import { useAuthContext } from "../../../context/auth/auth_context";
import AgentProfile from "./agent/tmp_profile";
import ClientProfile from "./client/client_profile";
import "./tmp_profile.css";
const Profile = () => {
  const authContext = useAuthContext();
  if (authContext.user?.role === "client")
    return (
      <div>
        <ClientProfile />
      </div>
    );
  else
    return (
      <div>
        <AgentProfile />
        {/* <ProfileAgent /> */}
      </div>
    );
};

export default Profile;
