import { useAxios } from "../../../../hooks/useAxios";
import {
  AgentContextType,
  useAgentContext,
} from "../../../../context/agent/agent_context";
import { AxiosError, AxiosResponse } from "axios";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAgentDetail = () => {
  const agentProfileApi = "/api/user/freelancer_details";
  const agentContext = useAgentContext();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
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

  const getDetail = async () => {
    // Get profile if it is not already there
    if (agentContext.agent.detail.user === -1)
      sendRequest({}, onSuccess, onError, true);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return {
    loading,
    getDetail,
    agentContext,
    detailList,
    showEdit,
    setShowEdit,
  };
};

export default useAgentDetail;

export type UseAgentDetailType = {
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
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
