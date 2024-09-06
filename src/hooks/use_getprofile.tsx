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
    const data = res.data.serialized_data;
    authContext.dispatchUser({
      type: "signin",
      payload: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        id: data.id,
        type: data.user_type,
        created_at: data.created_at,
      },
    });
    setUserProfile({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
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
