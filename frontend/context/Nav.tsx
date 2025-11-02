"use client";

import { create } from "zustand";

interface nav {
  navOpen: Boolean;
  setNavOpen: (state: Boolean) => void;
}

const useNavStore = create<nav>((set) => ({
  navOpen: false,
  setNavOpen: (state: Boolean) => set(() => ({ navOpen: state})),
}));

export default useNavStore;