// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { signInApiPoint } from "../../../../util/api";
import { GTexts } from "../../../../util/string_constants";
import secureLocalStorage from "react-secure-storage";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/auth/auth_context";

const useSignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigate();
  const { loading, sendRequest } = useAxios({
    url: signInApiPoint,
    method: "POST",
    headers: false,
  });
  const authContext = useAuthContext();
  //Function that handle Error
  const onError = (error: AxiosError) => {
    const message = JSON.parse(error?.request?.response);
    console.log(message);
    if (message?.msg == "User not verified" || error.status == 401) {
      authContext.dispatchUser({
        type: "signin",
        payload: {
          ...authContext.user,
          email: watch("email"),
        },
      });
      customToast({ message: "User not verified", type: "error" });
      navigator("/verify-user");
    }
    if (message.errors?.non_field_errors) {
      customToast({ message: GTexts.txt_invalid_email_pass, type: "error" });
      return;
    } else
      customToast({ message: "email or password not valid", type: "error" });
    //TODO: when user email is not validated
  };

  // on success request
  const onSuccess = (res: AxiosResponse) => {
    const token = res.data.token.access;
    const refresh = res.data.token.refresh;
    secureLocalStorage.setItem("token", token);
    secureLocalStorage.setItem("refresh", refresh);
    //save token secure//

    authContext.dispatchUser({
      type: "signin",
      payload: {
        ...authContext.user,
        email: watch("email"),
        type: res.data.user_type,
      },
    });

    //Load project when user log's in
    // setLoadProject((prev) => !prev);
    if (res.data.user_type === "client") {
      navigator("/client/dashboard");
    } else navigator(`/agent/dashboard`);
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    data.email = data.email.toLowerCase();
    sendRequest(data, onSuccess, onError, false);
  };

  return {
    showPassword,
    setShowPassword,
    register,
    errors,
    onSubmit,
    handleSubmit,
    loading,
  };
};

export default useSignIn;
