import { create } from "zustand";

interface nav {
  cart: CartItemType [];
  setCart: (state: CartItemType []) => void;
}

const useCartStore = create<nav>((set) => ({
  cart: [],
  setCart: (state: CartItemType []) => set(() => ({ cart: state})),
}));

export default useCartStore;