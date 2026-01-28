import type { IUser } from "./user";

export interface IAuthContext {
  loggedUser: IUser | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutHandler: () => void;
  loginHandler: (payload: { accessToken: string; userData: IUser }) => void;
  updateLoginInfo: (payload: { accessToken: string; userData: IUser }) => void;
  isAuthenticated: boolean;
}