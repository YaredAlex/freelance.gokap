import { useEffect } from "react";
import DashBoard from "../../features/dashboard/view/dashboard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth_context";

const AdminDashboardRoute = () => {
  const authContext = useAuthContext();
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    if (!authContext.isInitialized && !authContext.loading) {
      authContext.initializeAuth(() => {
        navigator(`/signin?redirect=${encodeURIComponent(currentPath)}`);
      });
    }

    if (authContext.isInitialized && authContext.user?.role !== "superuser") {
      navigator(
        `/signin?error=no-preference&redirect=${encodeURIComponent(
          currentPath
        )}`
      );
    }
  }, [authContext.isInitialized]);

  return (
    <DashBoard
      role="superuser"
      initialized={!authContext.isInitialized || authContext.loading}
    >
      <Outlet />
    </DashBoard>
  );
};

export default AdminDashboardRoute;
