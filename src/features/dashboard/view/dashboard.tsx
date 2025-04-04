import { ReactNode, useEffect } from "react";
import "./dashboard.css";
import useDashBoard from "../hooks/dashboard/dashboard_hook";
import CustomLoading from "../../../components/loading_page/custom_loading";
import DashBoardTopbar from "../components/dashboard/top_bar";
import SideBar from "../components/dashboard/side_bar";
import CustomToastContainer from "../../../components/custom_toast/toast_container";
import { useAuthContext } from "../../../context/auth/auth_context";
import { useNavigate } from "react-router-dom";

//Passdown auth to childern ** important to consider
const DashBoard = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const { showNav, setShowNav } = useDashBoard();
  const authContext = useAuthContext();
  const navigator = useNavigate();
  useEffect(() => {
    console.log(authContext.user);
    if (!authContext.isInitialized) {
      authContext.initializeAuth();
    }
    if (authContext.isInitialized && authContext.user.role != role)
      navigator("/signin"); // or some thing about your are trying to access unauthorized page
  }, [authContext.isInitialized]);
  return (
    <div
      className="
        min-height-100vh
        position-relative
        bg-white-v-3
        "
    >
      <CustomToastContainer />
      {!authContext.isInitialized ? (
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
