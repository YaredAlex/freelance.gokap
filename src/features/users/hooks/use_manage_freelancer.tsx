import { useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { PostedProjectType } from "../../../context/projects/project_context";
import customToast from "../../../components/custom_toast/custom_toast";

const useManageFreelance = () => {
  const { id } = useParams();
  const [assignedProjects, setAssignedProjects] = useState<PostedProjectType[]>(
    []
  );
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: `/api/user/get_addigned_project_using_frelancer_id/${id}`,
  });
  const getAssignedProject = () => {
    sendRequest(
      {},
      (res) => {
        console.log(res);
        const data = res.data.data;
        setAssignedProjects(data);
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
      }
    );
  };

  useEffect(() => {
    getAssignedProject();
  }, []);
  return {
    loading,
    assignedProjects,
    getAssignedProject,
  };
};

export default useManageFreelance;
