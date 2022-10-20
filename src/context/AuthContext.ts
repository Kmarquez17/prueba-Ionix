/* eslint import/no-webpack-loader-syntax: off */
import { createContext } from "react";

//@ts-ignore
import { IUser } from "../interfaces/users";

interface AuthContextProps {
  logged: boolean;
  user: IUser;

  //Funtions
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
