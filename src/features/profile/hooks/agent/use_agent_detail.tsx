import { useAxios } from "../../../../hooks/useAxios";
import {
  AgentStateType,
  useAgentContext,
} from "../../../../context/agent/agent_context";
import { AxiosError, AxiosResponse } from "axios";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useAgentDetail = () => {
  const agentProfileApi = "/api/freelancer/detail/";
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
      value: agentContext.agent.detail?.bio,
      onClick: () => {
        // setShowEditName(true);
      },
    },
    {
      title: "skill",
      value: agentContext.agent.detail?.skills,
      onClick: () => {
        // setShowEditName(true);
      },
    },
    {
      title: "Language",
      value: agentContext.agent.detail?.language,
      onClick: () => {
        // setShowEditName(true);
      },
    },
  ];
  const onSuccess = (res: AxiosResponse) => {
    const detail = res.data.serialized_data;
    // console.log(res);
    agentContext.dispatchAgent({
      type: "setdetail",
      payload: {
        detail: {
          bio: detail.bio,
          language: detail.languages,
          profession: detail.profession,
          reason_to_join: detail.reason_to_join,
          resume: undefined,
          skills: detail.skills,
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
    if (message?.errors === "Freelancer not found") {
      navigate(`/onboard`);
    } else customToast({ message: JSON.stringify(message), type: "error" });
    console.log(message?.error);
  };

  const getDetail = async () => {
    // Get profile if it is not already there
    const agentInfo = JSON.parse(
      localStorage.getItem("@f.info") ?? "{}"
    ) as AgentStateType;
    if (agentInfo.detail) {
      agentContext.dispatchAgent({
        type: "setdetail",
        payload: {
          detail: {
            ...agentInfo.detail,
          },
          appliedProject: agentContext.agent.appliedProject,
        },
      });
    } else if (agentContext.agent.detail === null) {
      sendRequest({}, onSuccess, onError, true);
    }
  };

  return {
    loading,
    getDetail,
    detailList,
    showEdit,
    setShowEdit,
  };
};

export default useAgentDetail;

export type UseAgentDetailType = {
  loading: boolean;
  getDetail: () => Promise<void>;
  detailList: (
    | {
        title: string;
        value?: string;
        onClick: () => void;
      }
    | {
        title: string;
        value?: string[];
        onClick: () => void;
      }
  )[];
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
