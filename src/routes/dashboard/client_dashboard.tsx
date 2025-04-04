import DashBoard from "../../features/dashboard/view/dashboard";
import { Outlet } from "react-router-dom";

const ClientDashboardRoute = () => {
  return (
    <DashBoard role="client">
      <Outlet />
    </DashBoard>
  );
};

export default ClientDashboardRoute;
