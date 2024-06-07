import { Outlet } from "react-router-dom";
import DashBoard from "../../features/dashboard/view/dashboard";

const DashBoardRoute = () => {
  return (
    <div className="">
      <DashBoard>
        <Outlet />
      </DashBoard>
    </div>
  );
};

export default DashBoardRoute;
