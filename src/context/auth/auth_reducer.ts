import { UserAuthType } from "./auth_context";
import { removeTokensFromSecureStorage } from "./auth_storage";

export type AuthActionType = {
    payload: UserAuthType;
    type: "signin" | "signup" | "logout"|"update_profile"
}

export function authReducer  (state:UserAuthType,action:AuthActionType){
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
          localStorage.removeItem('info'); 
          return {
            id: undefined,
            email: undefined,
            role: undefined,
            firstname: undefined,
            lastname: undefined,
            created_at:undefined,
            is_verified:undefined,
          };
    
        default:
          return state;
      }
}