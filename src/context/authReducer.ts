import { UserState } from "./AuthProvider";
import { IUser } from "../interfaces/users";

type MapAction = { type: "login"; payload: IUser } | { type: "logout" };

export const authReducer = (state: UserState, action: MapAction): UserState => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        logged: true,
        user: action.payload,
      };

    case "logout":
      return {
        ...state,
        logged: false,
        user: {
          id: "",
          firstName: "",
          email: "",
          lastName: "",
          userName: "",
          avatar: "",
        },
      };

    default:
      return state;
  }
};
