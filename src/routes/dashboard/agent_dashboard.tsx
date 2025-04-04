import { useAuthContext } from "../../context/auth/auth_context";
import DashBoard from "../../features/dashboard/view/dashboard";
import { Navigate, Outlet } from "react-router-dom";

const AgentDashboardRoute = () => {
  //allow only freelancer to access freelancer route
  const { user } = useAuthContext();
  if (user.id && user.role === "freelancer")
    return (
      <DashBoard>
        <Outlet />
      </DashBoard>
    );
  else return <Navigate to="/signin" />;
};

export default AgentDashboardRoute;
