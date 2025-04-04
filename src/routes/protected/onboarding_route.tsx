import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth_context";

export const PreferenceProtectRoute = () => {
  const { user } = useAuthContext();
  console.log(user);
  if (!user.id) {
    // return <Navigate to={`/signin`} />;
    return <Outlet />;
  }
  if (!user.role) {
    return <Outlet />; // Allows access to /preference
  }

  return user.role === "client" ? (
    <Navigate to="/client/dashboard" replace />
  ) : (
    <Navigate to="/agent/dashboard" replace />
  );
};

export default PreferenceProtectRoute;
