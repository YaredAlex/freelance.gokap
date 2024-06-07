import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import { useState } from "react";
import { AxiosResponse } from "axios";

const useGetClientProject = () => {
  const projectContext = useProjectContext();
  const [projectData, setProjectData] = useState<ClientProjectType[]>();
  const { sendRequest, loading } = useAxios({
    url: "/api/user/get-client-project/",
    method: "GET",
    headers: true,
  });
  const getClientProject = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        projectContext.projectDispatch({
          type: "saveproject",
          payload: res.data,
        });
        setProjectData(res.data);
        if (cb) {
          cb(res);
        }
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log("Fetching project", error);
      }
    );
  };
  return {
    loading,
    getClientProject,
    projectData,
  };
};

export default useGetClientProject;
