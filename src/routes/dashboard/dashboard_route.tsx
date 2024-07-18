import { Outlet } from "react-router-dom";
import DashBoard from "../../features/dashboard/view/dashboard";

const DashBoardRoute = () => {
  return (
    <DashBoard>
      <Outlet />
    </DashBoard>
  );
};

export default DashBoardRoute;
