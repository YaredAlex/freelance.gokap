import { ReactNode, useEffect } from "react";
import "./dashboard.css";
import useDashBoard from "../hooks/dashboard/dashboard_hook";
import CustomLoading from "../../../components/loading_page/custom_loading";
import DashBoardTopbar from "../components/dashboard/top_bar";
import SideBar from "../components/dashboard/side_bar";
import useGetProfile from "../../../hooks/use_getprofile";
import { useAuthContext } from "../../../context/auth/auth_context";
import CustomToastContainer from "../../../components/custom_toast/toast_container";
import useAgentDetail from "../../../hooks/use_agent_detail";

//Passdown auth to childern ** important to consider
const DashBoard = ({ children }: { children: ReactNode }) => {
  const { showNav, setShowNav } = useDashBoard();
  const profile = useGetProfile();
  const agentDetail = useAgentDetail();
  const authContext = useAuthContext();
  useEffect(() => {
    profile.getProfile();
  }, []);
  return (
    <div
      className="
  min-height-100vh
  position-relative
  bg-white-v-3
  "
    >
      <CustomToastContainer />
      {/* Right side */}
      {profile.loading || agentDetail.loading ? (
        <>
          <div
            className="d-flex align-items-center justify-content-center flex-column text-black-variant-1"
            style={{ height: "100dvh" }}
          >
            <h6>GIT</h6>
            <CustomLoading />
          </div>
        </>
      ) : (
        <>
          <div className={``} style={{ height: "70px" }}>
            {/* TopBar */}
            <DashBoardTopbar
              showNav={showNav}
              setShowNav={setShowNav}
              user={authContext.user}
            />
          </div>
          <div className="dashboard-container">
            {/* Leftside */}
            <SideBar showNav={showNav} setShowNav={setShowNav} />
            <div
              className={`
      bg-white-v-3
      dashboard-main-container
      px-md-3 px-3
      pb-3`}
            >
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
