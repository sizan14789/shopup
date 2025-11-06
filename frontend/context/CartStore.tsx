import { create } from "zustand";

export interface CartItemStoreType {
  cart: Record<string, number>;
  setCart: (state: Record<string, number>) => void;
}

const useCartStore = create<CartItemStoreType>((set) => ({
  cart: {},
  setCart: (state: Record<string, number>) => set(() => ({ cart: state})),
}));

export default useCartStore;