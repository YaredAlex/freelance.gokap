import { useEffect, useState } from "react";
import { ClientProjectType } from "../../../context/projects/project_context";
import { useGetAllFreelancers } from "../../users/hooks/use_get_freelancer";
import { UserAuthType } from "../../../context/auth/auth_context";
import { useAxios } from "../../../hooks/useAxios";
import { AxiosResponse } from "axios";
import customToast from "../../../components/custom_toast/custom_toast";

export const useInviteFreelancer = () => {
  const [agentList, setAgentList] = useState<UserAuthType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getFreelancers = useGetAllFreelancers();
  const searchFreelancers = useSearchFreelancers();
  const sendInvitaionEmail = useSendInvitationEmail();
  useEffect(() => {
    getFreelancerFun();
  }, []);
  const searchFreelancerFun = () => {
    searchFreelancers.searchFreelancer((res) => {
      console.log(res);
    });
  };
  const getFreelancerFun = () => {
    getFreelancers.getFreelancers((res) => {
      const data = res.data.serialized_data;
      setAgentList(data);
    });
  };
  const invite = (project: ClientProjectType, freelancer: UserAuthType) => {
    sendInvitaionEmail.sendInvitationEmail(
      () => {
        customToast({ message: "Invitation sent", type: "success" });
      },
      { email: freelancer.email, project_id: project.id }
    );
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return {
    invite,
    getFreelancerFun,
    agentList,
    loading: getFreelancers.loading || sendInvitaionEmail.loading,
    searchTerm,
    searchLoading: searchFreelancers.loading,
    handleSearch,
    setSearchTerm,
    searchFreelancerFun,
  };
};

const useSearchFreelancers = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "api/freelancer/search/name",
  });
  const searchFreelancer = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        console.log(error);
        customToast({ message: error.message, type: "error" });
      }
    );
  };
  return {
    loading,
    searchFreelancer,
  };
};

const useSendInvitationEmail = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "POST",
    url: "api/manager/invite/freelancer/",
  });
  const sendInvitationEmail = (
    cb: (res: AxiosResponse) => void,
    data: { email: string; project_id: number }
  ) => {
    sendRequest(
      data,
      (res) => {
        cb(res);
      },
      (error) => {
        console.log(error);
        customToast({ message: error.message, type: "error" });
      }
    );
  };

  return {
    sendInvitationEmail,
    loading,
  };
};
