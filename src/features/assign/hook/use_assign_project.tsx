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
  details: {
    proposal: string;
    applied_at: string;
    status: string;
    frelancer: AgentDetailType;
    id: number;
    project_id: number;
  };
};
const useAssignProject = () => {
  // const [project, setProject] = useState(1);
  const { id } = useParams();
  const { currentProject, setCurrentProject } = useProjectContext();
  const [fetchProject, setFetchProject] = useState(false);
  const [agentList, setAgentList] = useState<AppliedAgentType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const getProject = useGetProjectById();
  const { sendRequest, loading } = useAxios({
    url: "/api/manager/assign_project/",
    headers: true,
    method: "POST",
  });
  const getAppliedFreelancers = useGetAppliedFreelancers();
  const navigate = useNavigate();
  // const controller = new AbortController();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (id != null || id != undefined) {
      getProject.getProject(id, (res) => {
        setCurrentProject(res.data.serialized_data);
      });
      //call get freelancers
      getAppliedFreelancers.getFreelancers((res) => {
        const data = res.data.serialized_data;
        setAgentList(data);
      });
    } else navigate("/admin/dashboard/");
    return () => {};
  }, [fetchProject]);

  const assignProject = (fid: number) => {
    // check condition
    sendRequest(
      {
        project: Number(id),
        freelancer: fid,
      },
      () => {
        customToast({ message: "Project assigned", type: "success" });
        navigate(-1);
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        customToast({ message: JSON.stringify(message.errors), type: "error" });
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
    setShowInviteModal,
    showInviteModal,
    loadingFreelancers: getAppliedFreelancers.loading,
  };
};
export type useAssignProjectType = {
  getProjectLoading: boolean;
  loading: boolean;
  currentProject: ClientProjectType | PostedProjectType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  assignProject: (fid: number) => void;
  setShowInviteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showInviteModal: boolean;
  loadingFreelancers: boolean;
};
export default useAssignProject;

const useGetAppliedFreelancers = () => {
  const { id } = useParams();
  const { loading, sendRequest } = useAxios({
    headers: true,
    method: "GET",
    url: `api/manager/applied/freelancers/${id}/`,
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
