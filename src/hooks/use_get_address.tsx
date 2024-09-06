import { AxiosResponse } from "axios";
import { useAxios } from "./useAxios";
import customToast from "../components/custom_toast/custom_toast";

export const useGetAddress = () => {
  const addressApi = "/api/user/address/";
  const { sendRequest, loading } = useAxios({
    method: "GET",
    url: addressApi,
    headers: true,
  });

  const getAddress = (onsuccess: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        onsuccess(res);
      },
      (error) => {
        const message = error.message;
        customToast({ message: message, type: "error" });
      }
    );
  };

  return {
    getAddress,
    loading,
  };
};
