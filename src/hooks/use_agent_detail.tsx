import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AgentContextType,
  useAgentContext,
} from "../context/agent/agent_context";
import { useAxios } from "./useAxios";
import customToast from "../components/custom_toast/custom_toast";
import { useAuthContext } from "../context/auth/auth_context";

const useAgentDetail = () => {
  const agentProfileApi = "/api/user/freelancer_details";
  const agentContext = useAgentContext();
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const { sendRequest, loading } = useAxios({
    url: agentProfileApi,
    method: "GET",
    headers: true,
  });
  const detailList = [
    {
      title: "bio",
      value: agentContext.agent.detail.bio,
      onClick: () => {
        // setShowEditName(true);
      },
    },
    {
      title: "skill",
      value: agentContext.agent.detail.skill,
      onClick: () => {
        // setShowEditName(true);
      },
    },
    {
      title: "Language",
      value: agentContext.agent.detail.language,
      onClick: () => {
        // setShowEditName(true);
      },
    },
  ];
  const onSuccess = (res: AxiosResponse) => {
    const detail = res.data.serialized_data;
    agentContext.dispatchAgent({
      type: "setdetail",
      payload: {
        detail: {
          bio: detail.bio,
          language: detail.languages,
          profession: detail.profession,
          reason_to_join: detail.reason_to_join,
          resume: null,
          skill: detail.skills,
          user: detail.user,
          where_did_you_heard: detail.where_did_you_heard,
        },
        appliedProject: agentContext.agent.appliedProject,
      },
    });
  };
  const onError = (error: AxiosError) => {
    // const message = JSON.stringify(error?.request?.response);
    const message = JSON.parse(error?.request?.response);
    if (message?.error === "Freelancer not found") {
      navigate(`/onboard`);
    } else customToast({ message: JSON.stringify(message), type: "error" });
    console.log(message?.error);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    // Get profile if it is not already there
    if (
      authContext.user.type === "freelancer" &&
      agentContext.agent.detail.user === -1
    ) {
      sendRequest({}, onSuccess, onError, true);
    }
  };

  return {
    loading,
    getDetail,
    agentContext,
    detailList,
  };
};

export default useAgentDetail;

export type UseAgentDetail = {
  loading: boolean;
  getDetail: () => Promise<void>;
  agentContext: AgentContextType;
  detailList: (
    | {
        title: string;
        value: string;
        onClick: () => void;
      }
    | {
        title: string;
        value: string[];
        onClick: () => void;
      }
  )[];
};
