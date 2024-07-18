import { useEffect } from "react";
import { useAuthContext } from "../../context/auth/auth_context";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const authContext = useAuthContext();
  useEffect(() => {
    console.log(authContext.user.type);
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminRoute;
