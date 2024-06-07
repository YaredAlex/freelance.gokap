import { useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";

const UseForgetPass = () => {
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const forgetApiLink = "/api/user/password-reset-link/";
  const { loading, sendRequest } = useAxios({
    url: forgetApiLink,
    method: "POST",
    headers: false,
  });

  const sendLink = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (email.length < 5)
      customToast({ message: "Invalid email", type: "error" });
    else {
      sendRequest(
        { email },
        () => {
          setLinkSent(true);
        },
        (error) => {
          customToast({ message: error.message, type: "error" });
        },
        false
      );
    }
  };

  return {
    loading,
    linkSent,
    setLinkSent,
    sendLink,
    setEmail,
    email,
  };
};

export default UseForgetPass;
