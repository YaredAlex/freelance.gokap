import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProjectById } from "../../../../hooks/use_get_project_id";
import { AppliedProjectType } from "./use_agent_project";
import { useAgentContext } from "../../../../context/agent/agent_context";

const useAgentProjectStatus = () => {
  //Project Status
  const { id } = useParams();
  //   const projectContext = useProjectContext();
  //   const [loading,setLoading] = useState(false);
  const getProject = useGetProjectById();
  const agentContext = useAgentContext();
  const [propasalData, setProposalData] = useState<
    AppliedProjectType | undefined
  >();
  const navigate = useNavigate();
  //   const { currentProject, setCurrentProject } = useProjectContext();
  useEffect(() => {
    if (id) {
      //   getProject.getProject(id, (res) => {
      //     setCurrentProject(res.data.serialized_data);
      //     console.log(res.data);
      //   });
      //Get proposal from context
      const res = agentContext.agent.appliedProject.find(
        (project) => project.id == parseInt(id)
      );
      if (!res) navigate("/agent/dashboard/projects");
      setProposalData(res);
    } else navigate("/agent/dashboard/projects");
    return () => {};
  }, []);

  return {
    getProjectLoading: getProject.loading,
    propasalData,
  };
};

export default useAgentProjectStatus;

export type AgentProjectStatusType = {
  getProjectLoading: boolean;
  propasalData: AppliedProjectType | undefined;
};
