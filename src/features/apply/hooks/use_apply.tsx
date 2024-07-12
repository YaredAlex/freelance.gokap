import { useEffect, useState } from "react";
import {
  PostedProjectType,
  useProjectContext,
} from "../../../context/projects/project_context";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";
import { useGetProjectById } from "../../../hooks/use_get_project_id";

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
    if (id != null || id != undefined) {
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
  currentProject: PostedProjectType;
  applyProject: () => void;
  proposal: string;
  setproposal: React.Dispatch<React.SetStateAction<string>>;
  proposalError: string;
};
export default useApplyProject;
