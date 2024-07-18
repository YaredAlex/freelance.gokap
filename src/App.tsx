import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./context/auth/auth_context";
import Signin from "./features/authentication/view/signin/signin";
import "bootstrap/dist/js/bootstrap.esm.js";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useThemeContext } from "./context/theme/theme_context";
import Signup from "./features/authentication/view/signup/signup";
import VerifyUser from "./features/authentication/view/verify/verify";
import DashBoardRoute from "./routes/dashboard/dashboard_route";
import ClientDashBoard from "./features/dashboard/view/client/client_dashboard";
import ResetPassword from "./features/authentication/view/forget_pass/forget_password";
import Projects from "./features/project/projects";
import ClientCreateProject from "./features/project/view/client/create_project";
import ProjectContextProvider from "./context/projects/project_context";
import ProjectStatus from "./features/project/view/client/project_status";
import Profile from "./features/profile/view/profile";
import Invoice from "./features/invoice/view/invoice";
import Support from "./features/support/view/support";
import ApplyProject from "./features/apply/views/agent/apply_project";
import AgentStats from "./features/stats/views/agent/agent_stats";
import AgentContextProvider from "./context/agent/agent_context";
import LetsStart from "./features/authentication/view/onboard/onboard";
import AgentProjectStatus from "./features/project/view/agent/agent_project_status";
import AdminRoute from "./routes/adminboard/adminboard_route";
import AgentDashboardPostedProject from "./features/dashboard/view/agent/agent";
import AdminDashboardPostedProject from "./features/dashboard/view/admin/admin_board";
import AssignProject from "./features/assign/view/assign_project";

function App() {
  const { setIsDark, isDark } = useThemeContext();
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    } else setIsDark(false);
    console.log(isDark);
  }, []);

  return (
    <>
      <div className={`${isDark ? "dark-theme" : ""}`}>
        <AuthContextProvider>
          <AgentContextProvider>
            <BrowserRouter>
              <ProjectContextProvider>
                <Routes>
                  <Route path="" element={<Signin />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/verify-user" element={<VerifyUser />} />
                  <Route path={`/reset-password`} element={<ResetPassword />} />
                  <Route
                    path={"/client/dashboard"}
                    element={<DashBoardRoute />}
                  >
                    <Route path={``} element={<ClientDashBoard />} />
                    <Route path={`projects`} element={<Projects />} />
                    <Route
                      path={`projects/create`}
                      element={<ClientCreateProject />}
                    />
                    <Route
                      path={`projects/status/:id`}
                      element={<ProjectStatus />}
                    />
                    <Route path={`account`} element={<Profile />} />
                    <Route path={`invoice`} element={<Invoice />} />
                    <Route path={`support`} element={<Support />} />
                  </Route>
                  {/* onboarding */}

                  <Route path={`/onboard`} element={<LetsStart />} />

                  {/* Freelancer dashboared */}
                  <Route path={`/agent/dashboard`} element={<DashBoardRoute />}>
                    <Route
                      path={``}
                      element={<AgentDashboardPostedProject />}
                    />
                    <Route path={`apply/:id`} element={<ApplyProject />} />
                    <Route path={`stats/`} element={<AgentStats />} />
                    <Route path={`account`} element={<Profile />} />
                    <Route path={`invoice`} element={<Invoice />} />
                    <Route path={`support`} element={<Support />} />
                    <Route path={`projects`} element={<Projects />} />
                    <Route
                      path={`projects/status/:id`}
                      element={<AgentProjectStatus />}
                    />
                    {/* 
                   
                   */}
                  </Route>
                  <Route path="/admin/dashboard" element={<DashBoardRoute />}>
                    <Route path="" element={<AdminRoute />}>
                      <Route
                        path=""
                        element={<AdminDashboardPostedProject />}
                      />
                      <Route path="assign/:id" element={<AssignProject />} />
                    </Route>
                  </Route>
                </Routes>
              </ProjectContextProvider>
            </BrowserRouter>
          </AgentContextProvider>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;
