import { IUser } from "@/types";
import { ReactNode } from "react";

export interface IAuthContext {
  state: IAuthState;
  // eslint-disable-next-line
  setUser: (user: IUser) => void;
  handleLogout: () => void;
}

export interface IAuthState {
  user: IUser | undefined;
}

export interface IAuthContextProvider {
  children: ReactNode;
}
