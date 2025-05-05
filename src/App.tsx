import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./context/auth/auth_context";
import Signin from "./features/authentication/view/signin/signin";
import "bootstrap/dist/js/bootstrap.esm.js";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useThemeContext } from "./context/theme/theme_context";
import VerifyUser from "./features/authentication/view/verify/verify";
import ResetPassword from "./features/authentication/view/forget_pass/forget_password";
import ProjectContextProvider from "./context/projects/project_context";
import Profile from "./features/profile/view/profile";
import Invoice from "./features/invoice/view/invoice";
import AgentContextProvider from "./context/agent/agent_context";
import AdminDashboardPostedProject from "./features/dashboard/view/admin/admin_board";
import AssignProject from "./features/assign/view/assign_project";
import PrivacyPage from "./features/privacy/privacy";
import ClientList from "./features/users/view/users/users";
import FreelancersList from "./features/users/view/freelancers/freelancers";
import ManageFreelancer from "./features/users/view/freelancers/manage_freelancer";
import ManageUser from "./features/users/view/users/manage_user";
import ProjectAssignedStatus from "./features/project_status/view/status";
import AdminDashboardRoute from "./routes/dashboard/dashboard_route";
import NotFound from "./util/404_page";

function App() {
  const { setIsDark, isDark } = useThemeContext();
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(false);
    } else setIsDark(false);
  }, []);

  return (
    <>
      <div className={`${isDark ? "dark-theme" : ""}`}>
        <BrowserRouter>
          <AuthContextProvider>
            <AgentContextProvider>
              <ProjectContextProvider>
                <Routes>
                  <Route path="" element={<Signin />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/verify-user" element={<VerifyUser />} />
                  <Route path={`/reset-password`} element={<ResetPassword />} />
                  {/* Admin dashboared */}
                  <Route
                    path="/admin/dashboard"
                    element={<AdminDashboardRoute />}
                  >
                    <Route path="" element={<AdminDashboardPostedProject />} />
                    <Route path="clients/" element={<ClientList />} />
                    <Route path="freelancers/" element={<FreelancersList />} />
                    <Route
                      path="freelancers/:id"
                      element={<ManageFreelancer />}
                    />
                    <Route
                      path="project/status/:id"
                      element={<ProjectAssignedStatus />}
                    />
                    <Route path="clients/:id" element={<ManageUser />} />
                    <Route path="assign/:id" element={<AssignProject />} />
                    <Route path={`account`} element={<Profile />} />
                    <Route path={`invoice`} element={<Invoice />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ProjectContextProvider>
            </AgentContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
