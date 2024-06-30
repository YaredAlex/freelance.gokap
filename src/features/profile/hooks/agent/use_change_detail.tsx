import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useState } from "react";
import { useAgentContext } from "../../../../context/agent/agent_context";
import { Languages } from "../../../../util/constant/language_constant";

export const useChangeAgentDetail = (
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const agentContext = useAgentContext();
  const editAgentDetailApi = "/api/user/update/freelancer_details";
  const [errors, setErrors] = useState({
    bio: "",
    skills: "",
    languages: "",
  });
  const [personalSkill, setPersonalSkill] = useState(
    agentContext.agent.detail.skill
  );
  const [bio, setBio] = useState(agentContext.agent.detail.bio);
  const [lang, setLang] = useState(Languages);
  const [userLanguage, setUserLanguage] = useState(
    agentContext.agent.detail.language || []
  );

  const { sendRequest, loading } = useAxios({
    url: editAgentDetailApi,
    method: "PUT",
    headers: true,
  });
  const validate = () => {
    let valid = true;
    setErrors((prev) => {
      prev = {
        bio: "",
        languages: "",
        skills: "",
      };
      return prev;
    });
    if (bio === "") {
      setErrors((prev) => {
        return { ...prev, bio: "bio is required" };
      });
      valid = false;
    }
    if (bio.split(" ").length < 50) {
      setErrors((prev) => {
        return { ...prev, bio: "words should be atleast 50" };
      });
      valid = false;
    }
    if (userLanguage.length < 1) {
      setErrors((prev) => {
        return { ...prev, languages: "at least one language is required" };
      });
      valid = false;
    }
    if (personalSkill.length < 1) {
      setErrors((prev) => {
        return { ...prev, skills: "at least one skill is required" };
      });
      valid = false;
    }

    return valid;
  };
  const editDetail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate details
    const valid = validate();
    if (!valid) return;
    //send update requiest
    const data = {
      bio: bio,
      skills: personalSkill,
      languages: userLanguage,
    };
    sendRequest(
      data,
      (res) => {
        customToast({ message: "edit success", type: "success" });
        const detail = res.data.data;
        agentContext.dispatchAgent({
          type: "setdetail",
          payload: {
            detail: {
              ...agentContext.agent.detail,
              bio: detail.bio,
              language: detail.languages,
              skill: detail.skills,
            },
            appliedProject: agentContext.agent.appliedProject,
          },
        });
        setShowEdit(false);
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        customToast({ message: JSON.stringify(message), type: "error" });
        console.log(message?.error);
      }
    );
  };
  return {
    loading,
    editDetail,
    personalSkill,
    setPersonalSkill,
    errors,
    bio,
    setBio,
    userLanguage,
    setUserLanguage,
    lang,
    setLang,
  };
};
