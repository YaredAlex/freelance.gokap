import "./profile.css";
import { useAuthContext } from "../../../context/auth/auth_context";
import ProfileClient from "./client/client_profile";
import AgentProfile from "./agent/tmp_profile";
const Profile = () => {
  const authContext = useAuthContext();
  if (authContext.user?.role === "client")
    return (
      <div>
        <ProfileClient />
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
