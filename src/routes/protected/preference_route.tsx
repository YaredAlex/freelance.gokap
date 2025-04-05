import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth_context";
import AuthLayout from "../../features/authentication/auth_layout";
import { useEffect } from "react";

const PreferenceProtectRoute = () => {
  const authContext = useAuthContext();
  const navigator = useNavigate();
  useEffect(() => {
    if (!authContext.isInitialized && !authContext.loading)
      authContext.initializeAuth();
    if (authContext.isInitialized && authContext.user?.id === null)
      navigator("/signin?error=no-profile");
    if (authContext.user?.role === "client") navigator("/client/dashboard/");
    if (authContext.user?.role === "freelancer") navigator("/agent/dashboard/");
    return () => {
      if (authContext.isInitialized && authContext.user?.id !== null)
        authContext.getProfile(true);
    };
  }, [authContext.isInitialized]);

  return (
    <AuthLayout loading={!authContext.isInitialized} signlayout={false}>
      <Outlet></Outlet>
    </AuthLayout>
  );
};

export default PreferenceProtectRoute;
