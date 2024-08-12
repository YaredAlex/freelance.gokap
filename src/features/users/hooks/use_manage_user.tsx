import { useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { PostedProjectType } from "../../../context/projects/project_context";

const useManageUser = () => {
  const { id } = useParams();
  console.log("id of user is ", id);
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: `/api/user/get_projects_by_client_id/${id}/`,
  });
  const [postedProject, setPostedProject] = useState<PostedProjectType[]>([]);
  const getClientProject = () => {
    sendRequest(
      {},
      (res) => {
        console.log(res);
        const data = res.data.data;
        setPostedProject(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getClientProject();
  }, []);

  return {
    loading,
    getClientProject,
    postedProject,
  };
};

export default useManageUser;
