import { create } from "zustand";

interface userStoreType {
  hasUser: boolean;
  user: {
    username?: string;
    email?: string;
    role?: string[];
  };
  setUser: (UserInfo: object) => void;
}

export const useUserStore = create<userStoreType>((set) => ({
  hasUser: false,
  user: {},
  setUser: (userInfo) =>
    set(() => {
      if (Object.keys(userInfo).length != 0) {
        return {
          user: userInfo,
          hasUser: true,
        };
      }
      return {
        user: {},
        hasUser: false,
      };
    }),
}));
