import axios, { AxiosError, AxiosResponse } from "axios";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import { useAuthContext } from "../context/auth/auth_context";
import { useNavigate } from "react-router-dom";
import customToast from "../components/custom_toast/custom_toast";
import { GTexts } from "../util/string_constants";

const useRefreshToken = () => {
  const refreshApi = "/api/user/token/refresh/";
  const navigator = useNavigate();
  const [refreshed, setRefreshed] = useState(false);
  const authContext = useAuthContext();
  const [loading, setLoading] = useState(false);
  const onSuccess = (res: AxiosResponse) => {
    if (res.data.access) {
      const token = res.data.access;
      secureLocalStorage.setItem("token", token);
    }
    setRefreshed(true);
    res;
  };
  const onError = (error: AxiosError) => {
    console.log("refresh error ", error);
    authContext.dispatchUser({
      type: "logout",
      payload: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        type: "",
        created_at: "",
      },
    });
    navigator(`/signin`);
    return;
    //Earse user move to login in
  };
  //Sending refresh token
  const getToken = async (cb: () => void) => {
    const refreshToken = secureLocalStorage.getItem("refresh");
    setLoading(true);
    await axios({
      method: "POST",
      url: refreshApi,
      headers: {
        "Content-Type": "application/json",
      },
      data: { refresh: refreshToken },
    })
      .then((res) => {
        console.log(res.status);
        onSuccess(res);
        cb();
      })
      .catch((e: AxiosError) => {
        if (e.message === "Network Error") {
          customToast({ message: GTexts.txt_check_connection, type: "error" });
          return;
        } else onError(e);
        //refreshRef.current = true;
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    refreshed,
    getToken,
  };
};

export default useRefreshToken;
