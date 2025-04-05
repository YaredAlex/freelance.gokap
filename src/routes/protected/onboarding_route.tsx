import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth/auth_context";
import { useEffect } from "react";
import AuthLayout from "../../features/authentication/auth_layout";

const OnBoardingRoute = () => {
  const authContext = useAuthContext();
  const navigator = useNavigate();
  useEffect(() => {
    if (!authContext.isInitialized && !authContext.loading)
      authContext.initializeAuth(() => navigator("/signin?error=token"));
    if (authContext.isInitialized && authContext.user?.role !== "freelancer")
      navigator("/signin?error=unauthorized");
  }, [authContext.isInitialized]);

  return (
    <AuthLayout loading={!authContext.isInitialized} signlayout={false}>
      <Outlet></Outlet>
    </AuthLayout>
  );
};

export default OnBoardingRoute;
