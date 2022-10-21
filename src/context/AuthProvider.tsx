import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { IUser } from '../interfaces/users';

export interface UserState {
  logged: boolean;
  user: IUser;
}

const INITIAL_STATE: UserState = {
  logged: false,
  user: {
    id: 0,
    firstName: "",
    email: "",
    lastName: "",
    userName: "",
    avatar: "",
  },
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  return {
    logged: !!user,
    user,
  };
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE, init);

  const login = (param: IUser) => {
    localStorage.setItem("user", JSON.stringify(param));
    dispatch({ type: "login", payload: param });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,

        //Funtions
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
