import { createContext, useContext, useReducer, useState } from "react";
import { AuthActionType, authReducer } from "./auth_reducer";
import customToast from "../../components/custom_toast/custom_toast";
import { AxiosError, AxiosResponse } from "axios";
import { useAxios } from "../../hooks/useAxios";
import { getTokensFromSecureStorage } from "./auth_storage";
import { useNavigate } from "react-router-dom";

export type UserAuthType = {
  id?: string | number;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: "superuser" | "client" | "freelancer" | undefined;
  created_at?: string;
  phone?: string;
  is_verified?: boolean;
  user_type?: string;
  address?: {
    city: string;
    country: string;
    zip_code: string;
    state: string;
  };
};

type AuthContextType = {
  user: UserAuthType | null;
  dispatchUser: React.Dispatch<AuthActionType>;
  loading: boolean;
  logout: () => void;
  getProfile: (force: boolean) => void;
  isInitialized: boolean;
  initializeAuth: (callback?: () => void) => void;
};
const defaultState: AuthContextType = {
  user: null,
  dispatchUser: () => {},
  loading: false,
  logout: () => {},
  getProfile: () => {},
  isInitialized: false,
  initializeAuth: () => {},
};
export const AuthContext = createContext<AuthContextType>(defaultState);
export const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  name?: string;
}) => {
  const [user, dispatchUser] = useReducer(authReducer, {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    created_at: "",
  } as UserAuthType);
  const navigate = useNavigate();
  const [needProfile, setNeedProfile] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeAuth = async (callback?: () => void) => {
    const { token } = getTokensFromSecureStorage();
    if (!token) {
      if (callback) callback();
      return;
    }
    //get user information from localStorage
    // const userData = JSON.parse(localStorage.getItem("info") ?? "{}");
    // if (userData.role) {
    //   dispatchUser({
    //     type: "update_profile",
    //     payload: {
    //       ...user,
    //       ...userData,
    //     },
    //   });
    //   setIsInitialized(true);
    // } else
    getProfile();
  };

  const profileApi = "/api/user/profile/";
  const { sendRequest, loading } = useAxios({
    url: profileApi,
    method: "GET",
    headers: true,
  });
  const onSuccess = (res: AxiosResponse) => {
    const data = res.data.serialized_data;
    dispatchUser({
      type: "update_profile",
      payload: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        id: data.id,
        role: data.user_type,
        created_at: data.created_at,
        is_verified: data.is_verified,
      },
    });
    setIsInitialized(true);
    setNeedProfile(false);
  };
  const onError = (error: AxiosError) => {
    // const message = JSON.stringify(error?.request?.response);
    customToast({ message: "Error on fetching profile", type: "error" });
    console.log(error);
  };

  const getProfile = async (force: boolean = false) => {
    if (needProfile || force) {
      setIsInitialized(false);
      sendRequest({}, onSuccess, onError, true);
    }
  };
  const logout = () => {
    dispatchUser({
      type: "logout",
      payload: {},
    });
    navigate("/signin");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        dispatchUser,
        logout,
        isInitialized,
        initializeAuth,
        getProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
