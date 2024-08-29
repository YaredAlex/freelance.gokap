import { AxiosResponse } from "axios";
import { useAxios } from "./useAxios";
import customToast from "../components/custom_toast/custom_toast";

export const useGetProjectById = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "/api/project/detail/:id",
  });
  const getProject = (id: string, cb: (res: AxiosResponse) => void) => {
    const projectRequestApi = `/api/project/detail/${id}`;
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
