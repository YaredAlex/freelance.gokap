import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { GTexts } from "../../../../util/string_constants";
import { useAuthContext } from "../../../../context/auth/auth_context";
import customToast from "../../../../components/custom_toast/custom_toast";
import { saveTokensToSecureStorage } from "../../../../context/auth/auth_storage";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [showRegistrationConfirmation, setShowRegistrationConfirmation] =
    useState(false);
  // const navigator = useNavigate();
  const authContext = useAuthContext();
  const location = useLocation();
  const navigator = useNavigate();
  const { loading, sendRequest } = useAxios({
    url: signupApi,
    method: "POST",
    headers: false,
  });
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      navigator(redirect);
    }
  }, []);
  const setQuery = (key: string, value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value);
    navigator(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  //onError
  const onError = (error: AxiosError) => {
    console.log(error.message);
    if (error.message === "Network Error") {
      customToast({ message: GTexts.txt_check_connection, type: "error" });
      return;
    }
    const message = JSON.parse(error?.request?.response);
    console.log(message);
    if (message.errors) {
      customToast({ message: message.errors, type: "error" });
      return;
    } else toast.error("Internal Error");
  };

  // on success request
  const onSuccess = (res: AxiosResponse) => {
    console.log(res);
    const token = res.data.token.access;
    const refresh = res.data.token.refresh;
    const data = res.data;
    saveTokensToSecureStorage(token, refresh);
    authContext.dispatchUser({
      type: "signup",
      payload: {
        ...authContext.user,
        firstname: data.first_name,
        lastname: data.last_name,
        email: data.email,
        role: data.role,
      },
    });
    if (data.exist) return navigator(`/signin?exist=true&role=${data.role}`);
    setShowRegistrationConfirmation(true);
    authContext.getProfile(true);
    setQuery("redirect", "/signin");
  };

  //onSubmit fun
  const onSubmit = (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    cnfpassword: string;
    user_type: string | null;
  }) => {
    data.user_type = null;
    data.email = data.email.toLowerCase();
    if (!checkbox) {
      customToast({
        message: "Please agree to term and condition",
        type: "error",
      });
      return;
    } else sendRequest(data, onSuccess, onError, false);
  };

  const signUpWithGoogle = async (token: string) => {
    sendRequest(
      { token },
      onSuccess,
      onError,
      false,
      "/api/user/register/google/"
    );
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
    signUpWithGoogle,
    showRegistrationConfirmation,
    watch,
  };
};

export default useSignUp;
