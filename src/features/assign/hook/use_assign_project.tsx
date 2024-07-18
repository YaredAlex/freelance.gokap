import { useEffect, useState } from "react";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../context/projects/project_context";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";
import { useGetProjectById } from "../../../hooks/use_get_project_id";
import { AxiosResponse } from "axios";

const useAssignProject = () => {
  // const [project, setProject] = useState(1);
  const { id } = useParams();
  const { currentProject, setCurrentProject } = useProjectContext();
  const [fetchProject, setFetchProject] = useState(false);
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
    if (id != null || id != undefined) {
      getProject.getProject(id, (res) => {
        setCurrentProject(res.data.serialized_data);
        console.log(res.data);
      });
      //call get freelancers
      // getAppliedFreelancers.getFreelancers( (res)=>{
      //   console.log(res);
      // })
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
    loadingFreelancers: getAppliedFreelancers.loading,
  };
};
export type useAssignProjectType = {
  getProjectLoading: boolean;
  loading: boolean;
  currentProject: ClientProjectType;
  assignProject: () => void;
};
export default useAssignProject;

const useGetAppliedFreelancers = () => {
  const { loading, sendRequest } = useAxios({
    headers: true,
    method: "GET",
    url: "",
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
