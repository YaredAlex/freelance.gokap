import { Outlet } from "react-router-dom";
import DashBoard from "../../features/dashboard/view/dashboard";
import { useAuthContext } from "../../context/auth/auth_context";
import { useEffect } from "react";

const DashBoardRoute = () => {
  const authContext = useAuthContext();
  useEffect(() => {
    console.log(authContext.user.type);
  }, []);
  return (
    <DashBoard>
      <Outlet />
    </DashBoard>
  );
};

export default DashBoardRoute;
