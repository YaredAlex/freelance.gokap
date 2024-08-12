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
  const [freelancer, setFreelancers] = useState<UserAuthType[]>([
    {
      id: 1,
      firstname: "yared",
      lastname: "yared",
      email: "yareda25@gmail.com",
      created_at: "22022000",
      type: "client",
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
  };
};

export default useGetFreelancers;

export type useGetFreelancers = {
  getClients: () => void;
  loading: boolean;
};
