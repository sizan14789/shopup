"use client";

import { create } from "zustand";

interface nav {
  navOpen: boolean;
  setNavOpen: (state: boolean) => void;
}

const useNavStore = create<nav>((set) => ({
  navOpen: false,
  setNavOpen: (state: boolean) => set(() => ({ navOpen: state})),
}));

export default useNavStore;