import "./profile.css";
import { useAuthContext } from "../../../context/auth/auth_context";
import ProfileClient from "./client/client_profile";
import ProfileAgent from "./agent/agent_profile";
const Profile = () => {
  const authContext = useAuthContext();
  if (authContext.user.type === "client")
    return (
      <div>
        <ProfileClient />
      </div>
    );
  else
    return (
      <div>
        <ProfileAgent />
      </div>
    );
};

export default Profile;
