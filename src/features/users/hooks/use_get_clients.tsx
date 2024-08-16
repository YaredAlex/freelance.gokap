import customToast from "../../../components/custom_toast/custom_toast";
import { UserAuthType } from "../../../context/auth/auth_context";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
// models/User.ts
import TimeAgo from "javascript-time-ago";
const useGetClients = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "/api/user/get_client_details/",
  });
  const [users, setUsers] = useState<UserAuthType[]>([]);
  const timeAgo = new TimeAgo("en");
  const getClients = () => {
    sendRequest(
      {},
      (res) => {
        const data = res.data.data;
        setUsers(data);
      },
      (error) => {
        const message = error.response?.request.message;
        customToast({ message: message, type: "error" });
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getClients();
  }, []);

  return {
    getClients,
    loading,
    users,
    setUsers,
    timeAgo,
  };
};

export default useGetClients;

export type useGetClients = {
  getClients: () => void;
  loading: boolean;
};
