// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { signInApiPoint, signInGoogleApiPoint } from "../../../../util/api";
import { GTexts } from "../../../../util/string_constants";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { saveTokensToSecureStorage } from "../../../../context/auth/auth_storage";

const useSignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const redirectPath = useRef<string | null>(null);
  const navigator = useNavigate();
  const { loading, sendRequest } = useAxios({
    url: signInApiPoint,
    method: "POST",
    headers: false,
  });
  const authContext = useAuthContext();

  useEffect(() => {
    //check if user is already logged in
    console.log("signInHook called");
    if (
      authContext.isInitialized &&
      authContext.user!.role &&
      authContext.user!.is_verified !== null
    ) {
      routeUser({
        role: authContext.user!.role,
        is_verified: authContext.user!.is_verified,
        email: authContext.user!.email ?? "",
      });
    }
    return () => {
      console.log("signinHook cleanup function call authContext.getProfile");
      authContext.getProfile(true);
    };
  }, [authContext.isInitialized]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("exist"))
      customToast({
        message: "User with email already exist",
        type: "warning",
      });
    if (params.get("error") == "unauthorized")
      customToast({
        message: "unauthorized access!",
        type: "warning",
      });
    if (params.get("redirect")) {
      console.log(params.get("redirect"));
      redirectPath.current = params.get("redirect");
    }
    extractRedirectFromUrl();
  }, []);
  const extractRedirectFromUrl = () => {
    const hash = window.location.hash; //
    const params = new URLSearchParams(hash.substring(1));
    const state = params.get("state");
    if (state) {
      try {
        const decoded = JSON.parse(decodeURIComponent(state));
        console.log(decoded.redirect.current);
        redirectPath.current = decoded.redirect.current;
      } catch (err) {
        console.error("Failed to parse state:", err);
      }
    }
  };

  //Function that handle Error
  const onError = (error: AxiosError) => {
    const message = JSON.parse(error?.request?.response);
    console.log(message);
    if (message?.errors == "User not verified") {
      authContext.dispatchUser({
        type: "signin",
        payload: {
          ...authContext.user,
          email: getValues().email,
        },
      });
      customToast({ message: "User not verified", type: "error" });
      navigator("/verify-user");
    }
    if (message.errors?.non_field_errors) {
      customToast({ message: GTexts.txt_invalid_email_pass, type: "error" });
      return;
    } else customToast({ message: message.errors, type: "error" });
    //TODO: when user email is not validated
  };

  // on success request
  const onSuccess = (res: AxiosResponse) => {
    const token = res.data.token.access;
    const refresh = res.data.token.refresh;
    saveTokensToSecureStorage(token, refresh);
    const data = res.data;
    authContext.dispatchUser({
      type: "signin",
      payload: {
        ...authContext.user,
        email: data.email,
        role: data.role ?? null,
        is_verified: data.is_verified,
        created_at: data.created_at ?? null,
      },
    });

    routeUser({
      is_verified: data.is_verified,
      role: data.role,
      email: data.email,
    });
  };

  //routing user based on information
  const routeUser = (data: {
    role: string | null;
    is_verified?: boolean;
    email: string;
  }) => {
    if (redirectPath.current) {
      console.log(
        "navigator with redicrect path called ",
        redirectPath.current
      );
      return navigator(redirectPath.current);
    } else if (!data.is_verified) {
      navigator(`/verify-user?email=${data.email}`);
    } else if (!data.role) {
      navigator("/preference");
    } else if (data.role === "client") {
      navigator("/client/dashboard");
    } else navigator("/agent/dashboard");
  };
  const onSubmit = async (data: { email: string; password: string }) => {
    data.email = data.email.toLowerCase();
    sendRequest(data, onSuccess, onError, false);
  };
  const signInWithGoogle = async (token: string) => {
    sendRequest({ token }, onSuccess, onError, false, signInGoogleApiPoint);
  };

  return {
    showPassword,
    setShowPassword,
    register,
    errors,
    onSubmit,
    handleSubmit,
    loading: loading || authContext.loading,
    signInWithGoogle,
    redirectPath,
  };
};

export default useSignIn;
