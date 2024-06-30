import { useEffect, useState } from "react";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../context/projects/project_context";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";
import { AxiosResponse } from "axios";

const useApplyProject = () => {
  // const [project, setProject] = useState(1);
  const { id } = useParams();
  const { currentProject, setCurrentProject } = useProjectContext();
  const [fetchProject, setFetchProject] = useState(false);
  const [proposalError, setProposalError] = useState("");
  const [proposal, setproposal] = useState("");
  const getProject = useGetProjectById();
  const { sendRequest, loading } = useAxios({
    url: "/api/user/apply_project/",
    headers: true,
    method: "POST",
  });
  const navigate = useNavigate();
  // const controller = new AbortController();

  useEffect(() => {
    if (id) {
      getProject.getProject(id, (res) => {
        setCurrentProject(res.data.serialized_data);
        console.log(res.data);
      });
    } else navigate("/agent/dashboard/");
    return () => {};
  }, [fetchProject]);

  const applyProject = () => {
    setProposalError("");
    if (proposal === "") {
      setProposalError("proposal is required");
      customToast({ message: "proposal is required", type: "error" });
      return;
    }
    sendRequest(
      {
        project_id: id,
        proposal: proposal,
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
    applyProject,
    setFetchProject,
    proposal,
    setproposal,
    proposalError,
  };
};
export type ApplyProjectType = {
  getProjectLoading: boolean;
  loading: boolean;
  currentProject: ClientProjectType;
  applyProject: () => void;
  proposal: string;
  setproposal: React.Dispatch<React.SetStateAction<string>>;
  proposalError: string;
};
export default useApplyProject;

const useGetProjectById = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "/api/user/get-client/project/0",
  });
  const getProject = (id: string, cb: (res: AxiosResponse) => void) => {
    const projectRequestApi = `/api/user/get-client/project/${id}`;
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        customToast({ message: `${error.message}`, type: "error" });
        console.log(error);
      },
      true,
      projectRequestApi
    );
  };
  return {
    loading,
    getProject,
  };
};
