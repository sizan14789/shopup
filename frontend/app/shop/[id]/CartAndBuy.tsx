"use client";

import useCartStore from "@/context/CartStore";
import { useRouter } from "next/navigation";
import { handleAddToCart, handleBuyNow } from "@/lib/cartLib";
import { useUserStore } from "@/context/UserStore";
import toast from "react-hot-toast";

export default function CartAndBuy({ id }: { id: number }) {
  const { cart, setCart } = useCartStore();
  const { user } = useUserStore();
  const router = useRouter();

  const addToCart = () => {
    if (user.username) handleAddToCart({ id, cart, setCart });
    else toast.error("Not Logged in");
  };

  const buyNow = () => {
    if (user.username) handleBuyNow({ id, cart, setCart, router });
    else toast.error("Not Logged in");
  };

  return (
    <div className="flex gap-4 my-6 ">
      <button
        className="button-secondary h-12 w-44 justify-center items-center"
        onClick={addToCart}
      >
        add to cart
      </button>
      <button
        className="button-primary justify-center items-center h-12 w-44 "
        onClick={buyNow}
      >
        Buy Now
      </button>
    </div>
  );
}
