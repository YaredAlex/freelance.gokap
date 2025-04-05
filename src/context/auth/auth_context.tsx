import { createContext, useContext, useReducer, useState } from "react";
import { AuthActionType, authReducer } from "./auth_reducer";
import { useNavigate } from "react-router-dom";
import { getTokensFromSecureStorage } from "./auth_storage";
import customToast from "../../components/custom_toast/custom_toast";
import { useAxios } from "../../hooks/useAxios";
import { AxiosError, AxiosResponse } from "axios";

export type UserAuthType = {
  id: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  role: string | null;
  created_at: string | null;
  is_verified: boolean | null;
  phone?: string;
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
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatchUser] = useReducer(authReducer, {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    role: null,
    created_at: null,
    is_verified: null,
  });
  const navigate = useNavigate();
  const [needProfile, setNeedProfile] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeAuth = async (callback?: () => void) => {
    const { token } = getTokensFromSecureStorage();
    if (!token) {
      //do something is there is no-token
      if (callback) callback();
      return;
    }
    //get user information from localStorage
    const userData = JSON.parse(localStorage.getItem("info") ?? "{}");
    if (userData.role) {
      dispatchUser({
        type: "update_profile",
        payload: {
          ...user,
          ...userData,
        },
      });
      setIsInitialized(true);
    }
    //or else fetchProfile
    else getProfile();
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
    });
    navigate("/signin");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        dispatchUser,
        loading,
        logout,
        getProfile,
        isInitialized,
        initializeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
