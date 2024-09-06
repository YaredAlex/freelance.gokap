import TimeAgo from "javascript-time-ago";
import { UserAuthType } from "../../../context/auth/auth_context";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import customToast from "../../../components/custom_toast/custom_toast";
// models/User.ts

const useGetFreelancers = () => {
  const timeAgo = new TimeAgo("en");
  const [freelancer, setFreelancers] = useState<UserAuthType[]>([
    {
      id: 0,
      firstname: "",
      lastname: "",
      email: "",
      created_at: "",
      type: "",
    },
  ]);
  const getFreelancers = useGetAllFreelancers();

  useEffect(() => {
    getFreelancers.getFreelancers((res) => {
      const data = res.data.serialized_data;
      setFreelancers(data);
    });
  }, []);

  return {
    getFreelancers,
    loading: getFreelancers.loading,
    freelancer,
    timeAgo,
  };
};

export default useGetFreelancers;

export type useGetFreelancers = {
  getClients: () => void;
  loading: boolean;
};

export const useGetAllFreelancers = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "/api/freelancer/all/details",
  });
  const getFreelancers = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log(error);
      }
    );
  };

  return {
    loading,
    getFreelancers,
  };
};
