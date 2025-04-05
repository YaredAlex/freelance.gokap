import { Outlet, useNavigate } from "react-router-dom";
import DashBoard from "../../features/dashboard/view/dashboard";
import { useAuthContext } from "../../context/auth/auth_context";
import { useEffect } from "react";
import { useAgentContext } from "../../context/agent/agent_context";
import useAgentDetail from "../../features/profile/hooks/agent/use_agent_detail";

const AgentDashboardRoute = () => {
  const authContext = useAuthContext();
  const agentContext = useAgentContext();
  const navigator = useNavigate();
  const agentDetailController = useAgentDetail();
  useEffect(() => {
    //get freelaner information to check if user have already submited what is required
    if (!authContext.isInitialized && !authContext.loading) {
      authContext.initializeAuth(() => {
        navigator("/signin");
      });
      agentDetailController.getDetail();
    }
    if (authContext.isInitialized && agentContext.agent.detail === null) {
      agentDetailController.getDetail();
    }
    if (authContext.isInitialized && authContext.user?.role != "freelancer")
      navigator("/signin?error=no-prefrence");
  }, [authContext.isInitialized]);
  return (
    <DashBoard
      role="freelancer"
      initialized={!authContext.isInitialized || agentDetailController.loading}
    >
      <Outlet />
    </DashBoard>
  );
};

export default AgentDashboardRoute;
