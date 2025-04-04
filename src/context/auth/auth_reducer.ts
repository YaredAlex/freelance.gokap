import { UserAuthType } from "./auth_context";
import {  removeTokensFromSecureStorage } from "./auth_storage";

export type AuthActionType = {
  payload?: UserAuthType;
  type: "signin" | "signup" | "logout" | "update_profile";
};

export function authReducer(state: UserAuthType, action: AuthActionType): UserAuthType {
  switch (action.type) {
    case "signin":
    case "signup":
      state = { ...state, ...action.payload }
      localStorage.setItem("info",JSON.stringify(state))
      return  state;

    case "update_profile":
      state = { ...state, ...action.payload } 
      localStorage.setItem("info",JSON.stringify(state))
      return state;

    case "logout":
      removeTokensFromSecureStorage();
      localStorage.removeItem('info')
      return {
        id: null,
        email: null,
        role: null,
        firstname: null,
        lastname: null,
        created_at:null,
        is_verified:null,
      };

    default:
      return state;
  }
}
