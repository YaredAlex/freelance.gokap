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
import AgentDashBoard from "./features/dashboard/view/agent/agent";
import ClientDashBoard from "./features/dashboard/view/client/client_dashboard";
import ResetPassword from "./features/authentication/view/forget_pass/forget_password";
import Projects from "./features/project/projects";
import ClientCreateProject from "./features/project/view/client/create_project";
import ProjectContextProvider from "./context/projects/project_context";
import ProjectStatus from "./features/project/view/client/project_status";
import Profile from "./features/profile/view/profile";

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
          <BrowserRouter>
            <ProjectContextProvider>
              <Routes>
                <Route path="" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-user" element={<VerifyUser />} />
                <Route path={`/reset-password`} element={<ResetPassword />} />
                <Route path={"/client/dashboard"} element={<DashBoardRoute />}>
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
                  {/* 
                    
                    <Route path={`invoice`} element={<Invoice />} />
                    
                    <Route path={`support`} element={<Support />} /> */}
                </Route>
                {/* Freelancer dashboared */}
                <Route path={`/agent/dashboard`} element={<DashBoardRoute />}>
                  <Route path={``} element={<AgentDashBoard />} />
                  {/* <Route path={`profile`} element={<Profile />} />
                    <Route
                      path={`projects/check/:id`}
                      element={<CheckProject />}
                    />

                    <Route path={`invoice`} element={<Invoice />} />
                    <Route path={`projects`} element={<Projects />} />
                    <Route path={`support`} element={<Support />} /> */}
                </Route>
              </Routes>
            </ProjectContextProvider>
          </BrowserRouter>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;
