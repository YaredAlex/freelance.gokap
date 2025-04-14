import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashBoard from "../../features/dashboard/view/dashboard";
import { useAuthContext } from "../../context/auth/auth_context";
import { useEffect } from "react";
import { useAgentContext } from "../../context/agent/agent_context";
import useAgentDetail from "../../features/profile/hooks/agent/use_agent_detail";

const AgentDashboardRoute = () => {
  const authContext = useAuthContext();
  const agentContext = useAgentContext();
  const navigator = useNavigate();
  const location = useLocation();
  const agentDetail = useAgentDetail();
  useEffect(() => {
    //get freelaner information to check if user have already submited what is required
    const currentPath = location.pathname + location.search;
    if (!authContext.isInitialized && !authContext.loading) {
      authContext.initializeAuth(() => {
        navigator(`/signin?redirect=${encodeURIComponent(currentPath)}`);
      });
      agentDetail.getDetail();
    }
    if (authContext.isInitialized && agentContext.agent.detail === null) {
      agentDetail.getDetail();
    }
    if (authContext.isInitialized && authContext.user?.role != "freelancer")
      navigator(
        `/signin?error=no-preference&redirect=${encodeURIComponent(
          currentPath
        )}`
      );
  }, [authContext.isInitialized]);
  return (
    <DashBoard
      role="freelancer"
      initialized={!authContext.isInitialized || agentDetail.loading}
    >
      <Outlet />
    </DashBoard>
  );
};

export default AgentDashboardRoute;
