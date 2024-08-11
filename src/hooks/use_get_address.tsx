import { AxiosResponse } from "axios";
import { useAxios } from "./useAxios";

export const useGetAddress = () => {
  const addressApi = "/api/user/get_address/";
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
        console.log(error);
      }
    );
  };

  return {
    getAddress,
    loading,
  };
};
