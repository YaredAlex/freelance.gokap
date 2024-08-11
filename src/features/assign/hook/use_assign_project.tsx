import { useEffect, useState } from "react";
import {
  ClientProjectType,
  PostedProjectType,
  useProjectContext,
} from "../../../context/projects/project_context";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";
import { useGetProjectById } from "../../../hooks/use_get_project_id";
import { AxiosResponse } from "axios";
import { AgentDetailType } from "../../../context/agent/agent_context";

export type AppliedAgentType = {
  proposal: string;
  applied_at: string;
  status: string;
  frelancer_id: AgentDetailType;
  id: number;
  project_id: number;
};
const useAssignProject = () => {
  // const [project, setProject] = useState(1);
  const { id } = useParams();
  const { currentProject, setCurrentProject } = useProjectContext();
  const [fetchProject, setFetchProject] = useState(false);
  const [agentList, setAgentList] = useState<AppliedAgentType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const getProject = useGetProjectById();
  const { sendRequest, loading } = useAxios({
    url: "/api/user/apply_project/",
    headers: true,
    method: "POST",
  });
  const getAppliedFreelancers = useGetAppliedFreelancers();
  const navigate = useNavigate();
  // const controller = new AbortController();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (id != null || id != undefined) {
      getProject.getProject(id, (res) => {
        setCurrentProject(res.data.serialized_data);
        console.log(res.data);
      });
      //call get freelancers
      getAppliedFreelancers.getFreelancers((res) => {
        console.log(res);
        setAgentList(res.data.serialized_data);
      });
    } else navigate("/admin/dashboard/");
    return () => {};
  }, [fetchProject]);

  const assignProject = () => {
    // check condition
    sendRequest(
      {
        project_id: id,
      },
      () => {
        customToast({ message: "Project applied", type: "success" });
        navigate(-1);
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        customToast({ message: JSON.stringify(message), type: "error" });
        console.log(message?.error);
      }
    );
  };

  return {
    navigate,
    getProjectLoading: getProject.loading,
    loading,
    currentProject,
    assignProject,
    setFetchProject,
    showModal,
    setShowModal,
    agentList,
    loadingFreelancers: getAppliedFreelancers.loading,
  };
};
export type useAssignProjectType = {
  getProjectLoading: boolean;
  loading: boolean;
  currentProject: ClientProjectType | PostedProjectType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  assignProject: () => void;
};
export default useAssignProject;

const useGetAppliedFreelancers = () => {
  const { id } = useParams();
  const { loading, sendRequest } = useAxios({
    headers: true,
    method: "GET",
    url: `api/user/applied/freelancers/${id}/`,
  });

  const getFreelancers = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        customToast({ message: `error ${error}`, type: "error" });
        console.log(error);
      }
    );
  };

  return {
    getFreelancers,
    loading,
  };
};
