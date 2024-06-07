import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { GTexts } from "../../../../util/string_constants";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useAuthContext } from "../../../../context/auth/auth_context";
import customToast from "../../../../components/custom_toast/custom_toast";
const useSignUp = () => {
  const signupApi = "/api/user/register/";
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cnfpassword: "",
      user_type: "",
    },
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [checkbox, setCheckedbox] = useState(false);
  const navigator = useNavigate();
  const authContext = useAuthContext();

  const { loading, sendRequest } = useAxios({
    url: signupApi,
    method: "POST",
    headers: false,
  });
  //onError
  const onError = (error: AxiosError) => {
    console.log(error.message);
    if (error.message === "Network Error") {
      customToast({ message: GTexts.txt_check_connection, type: "error" });
      return;
    }
    const message = JSON.parse(error?.request?.response);
    console.log(message);
    if (message.errors?.email) {
      customToast({ message: "user email already exists", type: "error" });

      return;
    }
    if (message.errors?.user_type) {
      customToast({ message: "Please select preference!", type: "error" });
      return;
    }
    //TODO: when user email is not validated
    toast.error("Internal Error");
  };

  // on success request
  const onSuccess = (res: AxiosResponse) => {
    console.log(res);
    const token = res.data.token.access;
    const refresh = res.data.token.refresh;
    console.log("token  ", token);
    console.log("refresh  ", refresh);
    secureLocalStorage.setItem("token", token);
    secureLocalStorage.setItem("refresh", refresh);
    authContext.dispatchUser({
      type: "signup",
      payload: {
        ...authContext.user,
        firstname: watch("firstname"),
        lastname: watch("lastname"),
        email: watch("email"),
        type: watch("user_type"),
      },
    });
    navigator(`/verify-user`);
  };

  //onSubmit fun
  const onSubmit = (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    cnfpassword: string;
    user_type: string;
  }) => {
    data.user_type = userType;
    data.email = data.email.toLowerCase();
    if (!userType) {
      customToast({
        message: "Please select Preference",
        type: "error",
      });
      return;
    }
    if (!checkbox) {
      customToast({
        message: "Please agree to term and condition",
        type: "error",
      });
    } else sendRequest(data, onSuccess, onError, false);
  };

  return {
    showConfirm,
    setShowConfirm,
    checkbox,
    setCheckedbox,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    setUserType,
    loading,
    userType,
  };
};

export default useSignUp;
