import { create } from "zustand";

interface userStoreType {
  userState: string;
  user: {
    username?: string;
    email?: string;
    role?: string[];
  };
  setUser: (UserInfo: object) => void;
}

export const useUserStore = create<userStoreType>((set) => ({
  userState: "loading",
  user: {},
  setUser: (userInfo) => set(() => ({
    user: userInfo,
    userState: Object.keys(userInfo).length===0? 'loggedOut' : 'loggedIn'
  }))
}));
