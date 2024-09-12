import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppliedProjectType } from "./use_agent_project";
import { useAgentContext } from "../../../../context/agent/agent_context";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosResponse } from "axios";
import customToast from "../../../../components/custom_toast/custom_toast";

const useAgentProjectStatus = () => {
  //Project Status
  const { id } = useParams();
  //   const projectContext = useProjectContext();
  //   const [loading,setLoading] = useState(false);
  const agentContext = useAgentContext();
  const [propasalData, setProposalData] = useState<
    AppliedProjectType | undefined
  >();
  const navigate = useNavigate();
  const getAppliedProjectById = useGetAppliedProjectById();
  useEffect(() => {
    if (!id) {
      navigate("/agent/dashboard/projects");
      return;
    }
    //Get proposal from context
    const res = agentContext.agent.appliedProject.find(
      (project) => project.id == parseInt(id)
    );

    if (res?.id) {
      setProposalData(res);
    } else {
      getAppliedProjectById.getProject(id, (res) => {
        const data = res.data.serialized_data[0];
        setProposalData(data);
      });
      // getProject.getProject(id, (res) => {
      //   setProposalData(res.data.serialized_data);
      // });
    }
    return () => {};
  }, []);

  return {
    loading: getAppliedProjectById.loading,
    propasalData,
  };
};

export default useAgentProjectStatus;

export type AgentProjectStatusType = {
  loading: boolean;
  propasalData: AppliedProjectType | undefined;
};

const useGetAppliedProjectById = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "/api/freelancer/applied/projects/<int:applied_id>/",
  });

  const getProject = (
    id: string | number,
    cb: (res: AxiosResponse) => void
  ) => {
    sendRequest(
      {},
      (res) => cb(res),
      (error) => {
        console.log(error);
        const message = error.response?.data as { errors: string };
        customToast({ message: message.errors, type: "error" });
      },
      true,
      `/api/freelancer/applied/projects/${id}/`
    );
  };

  return {
    loading,
    getProject,
  };
};
