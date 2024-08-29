import { useState } from "react";
import { useAxios } from "./useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "../context/auth/auth_context";
import customToast from "../components/custom_toast/custom_toast";
import { profileApi } from "../util/api";

const useGetProfile = () => {
  const authContext = useAuthContext();
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

export const useGetProfileById = (id: number | string) => {
  const { sendRequest, loading } = useAxios({
    url: `api/user/profile/${id}`,
    method: "GET",
    headers: true,
  });

  const getProfile = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
      }
    );
  };

  return {
    loading,
    getProfile,
  };
};
