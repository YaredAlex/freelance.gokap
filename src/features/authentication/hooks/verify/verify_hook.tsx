import { useEffect, useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useAuthContext } from "../../../../context/auth/auth_context";

const useVerify = () => {
  const authContext = useAuthContext();
  const [email, setEmail] = useState(authContext.user.email);
  const [verified, setVerified] = useState(false);
  const { loading, sendRequest } = useAxios({
    url: "/api/user/verify-user/",
    method: "POST",
    headers: false,
  });

  useEffect(() => {
    console.log(authContext.user);
    if (authContext.user.email != "") {
      setEmail(authContext.user.email);
      verifyUser();
    }
  }, []);
  const verifyUser = () => {
    sendRequest(
      {
        email: email,
      },
      (res) => {
        if (res.status == 200 || res.status == 201) {
          console.log(res);
          setVerified(true);
        }
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        console.log(message.errors);
        if (message.errors?.errors?.non_field_errors) {
          customToast({
            message: "Invalid email address",
            type: "error",
          });
          return;
        }
        customToast({ message: error.message, type: "error" });
        console.log(error);
      }
    );
  };
  const sendVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (email.length < 5)
      customToast({ message: "Invail email", type: "error" });
    else {
      verifyUser();
    }
  };
  return {
    loading,
    email,
    setEmail,
    verified,
    sendVerification,
  };
};

export default useVerify;
