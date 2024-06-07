import { UserAuthType } from "./auth_context";

export type AuthActionType = {
    payload: UserAuthType;
    type: "signin" | "signup" | "logout"
}

export function authReducer  (state:UserAuthType,action:AuthActionType){
    switch(action.type){
        case "logout":
            return state;
        case "signin":
            return {...state,...action.payload};
        case "signup":
            return {...state,...action.payload};
    }
}