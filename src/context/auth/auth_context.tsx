import { createContext, useContext, useReducer } from "react";
import { AuthActionType, authReducer } from "./auth_reducer";

export type UserAuthType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  type: string;
  created_at: string;
};

type AuthContextType = {
  user: UserAuthType;
  dispatchUser: React.Dispatch<AuthActionType>;
};
const defaultState: AuthContextType = {
  user: {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    type: "",
    created_at: "",
  },
  dispatchUser: () => {},
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
    type: "",
    created_at: "",
  });
  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
