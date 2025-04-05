import { useEffect } from "react";
import DashBoard from "../../features/dashboard/view/dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth_context";

const ClientDashboardRoute = () => {
  const authContext = useAuthContext();
  const navigator = useNavigate();
  useEffect(() => {
    console.log("client checker", authContext.user);
    console.log("authContext.loading ", authContext.loading);
    console.log("authContext.initialized ", authContext.isInitialized);
    if (!authContext.isInitialized && !authContext.loading) {
      authContext.initializeAuth(() => {
        navigator("/signin");
      });
    }
    if (authContext.isInitialized && authContext.user?.role != "client")
      navigator("/signin?error=no-preference");
  }, [authContext.isInitialized]);
  return (
    <DashBoard
      role="client"
      initialized={!authContext.isInitialized || authContext.loading}
    >
      <Outlet />
    </DashBoard>
  );
};

export default ClientDashboardRoute;
