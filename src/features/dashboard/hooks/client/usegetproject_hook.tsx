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
    url: "/api/client/projects/",
    method: "GET",
    headers: true,
  });
  const getClientProject = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        const data = res.data.serialized_data;
        projectContext.projectDispatch({
          type: "saveproject",
          payload: data,
        });
        setProjectData(data);
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
