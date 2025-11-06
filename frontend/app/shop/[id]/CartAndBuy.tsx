"use client";

import useCartStore from "@/context/CartStore";
import { useRouter } from "next/navigation";
import { handleAddToCart, handleBuyNow } from "@/lib/cartLib";

export default function CartAndBuy({ id }: { id: number }) {
  const { cart, setCart } = useCartStore();
  const router = useRouter();

  return (
    <div className="flex gap-4 my-6 ">
      <button
        className="button-secondary h-12 w-44 justify-center items-center"
        onClick={()=>handleAddToCart({id, cart, setCart})}
      >
        add to cart
      </button>
      <button className="button-primary justify-center items-center h-12 w-44 "
        onClick={()=>handleBuyNow({id, cart, setCart, router})}
      >
        Buy Now
      </button>
    </div>
  );
}
