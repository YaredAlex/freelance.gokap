import { useState } from "react";
import { useAxios } from "./useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "../context/auth/auth_context";
import customToast from "../components/custom_toast/custom_toast";

const useGetProfile = () => {
  const authContext = useAuthContext();
  const profileApi = "/api/user/profile/";
  const { sendRequest, loading } = useAxios({
    url: profileApi,
    method: "GET",
    headers: true,
  });
  const [userProfile, setUserProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const onSuccess = (res: AxiosResponse) => {
    authContext.dispatchUser({
      type: "signin",
      payload: {
        email: res.data.msg.email,
        firstname: res.data.msg.firstname,
        lastname: res.data.msg.lastname,
        id: res.data.msg.id,
        type: res.data.msg.user_type,
        created_at: res.data.msg.created_at,
      },
    });
    setUserProfile({
      email: res.data.msg.email,
      firstname: res.data.msg.firstname,
      lastname: res.data.msg.lastname,
    });
  };
  const onError = (error: AxiosError) => {
    // const message = JSON.stringify(error?.request?.response);
    customToast({ message: "Error on Profile", type: "error" });
    console.log(error);
  };

  const getProfile = async () => {
    sendRequest({}, onSuccess, onError, true);
  };

  return {
    loading,
    getProfile,
    userProfile,
  };
};

export default useGetProfile;
