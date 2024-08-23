import TimeAgo from "javascript-time-ago";
import { UserAuthType } from "../../../context/auth/auth_context";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
// models/User.ts

const useGetFreelancers = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "/api/user/get_frelancers_details/",
  });
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

  const getFreelancers = () => {
    sendRequest(
      {},
      (res) => {
        console.log(res);
        const data = res.data.data;
        setFreelancers(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getFreelancers();
  }, []);

  return {
    getFreelancers,
    loading,
    freelancer,
    timeAgo,
  };
};

export default useGetFreelancers;

export type useGetFreelancers = {
  getClients: () => void;
  loading: boolean;
};
