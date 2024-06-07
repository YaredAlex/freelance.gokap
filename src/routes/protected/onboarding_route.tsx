import { Navigate, Outlet } from "react-router-dom";
import CustomLoading from "../../components/loading_page/custom_loading";
import useGetProfile from "../../hooks/use_getprofile";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const profile = useGetProfile();
  useEffect(() => {
    profile.getProfile();
  }, []);

  return profile.loading ? (
    <div className="text-black-variant-2 position-absolute w-100 h-100 d-flex justify-content-center align-items-center bg-dark-blue">
      <CustomLoading />
    </div>
  ) : profile.userProfile.email != "" ? (
    <Outlet />
  ) : (
    <Navigate to={`/signin`} />
  );
};

export default ProtectedRoutes;
