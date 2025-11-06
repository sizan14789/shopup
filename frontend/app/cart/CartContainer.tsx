"use client";

import useCartStore from "@/context/CartStore";
import ItemCard from "./ItemCard";
import { useUserStore } from "@/context/UserStore";
import Link from "next/link";

export default function CartContainer() {
  const { hasUser } = useUserStore();
  const { cart } = useCartStore();

  const getTotal = ()=> {
    let total=0;
    cart.forEach((each)=>{
      total+=each.offer_price * each.quantity;
    })
    return total;
  }

  return (
    <div className="w-full flex flex-col">
      {!hasUser ? (
        <div className="grow flex justify-center my-6">
          <h2 className="text-(--subtext) text-sm">
            You are not logged in.{" "}
            <Link href="/login" className="text-(--highlight) ">
              Log in
            </Link>
          </h2>
        </div>
      ) : cart.length === 0 ? (
        <div className="grow flex justify-center my-6">
          <h2 className="text-(--subtext) text-sm">
            Your cart is empty. Go to {" "}
            <Link href="/shop" className="text-(--highlight) ">
              Shop
            </Link>
            {" "} to add items to cart
          </h2>
        </div>
      ) : (
        <>
          <div className="p-2 grid grid-cols-3 lg:grid-cols-5 mb-4 font-semibold ">
            <h2 className="lg:col-span-2 flex justify-center lg:justify-start">
              Product
            </h2>
            <p className="hidden lg:block">Price</p>
            <p className="flex justify-center">Quantity</p>
            <p className="flex justify-center lg:justify-start">Subtotal</p>
          </div>

          {cart.map((each:CartItemType)=>{
            return <ItemCard key={each.id} data={each} />
          })}

          <div className="py-8 px-2 grid grid-cols-3 lg:grid-cols-5 mb-4 font-semibold ">
            <p className="flex justify-center lg:justify-start">Total</p>
            <p className="flex justify-center lg:justify-start col-start-3 lg:col-start-5">${getTotal()}</p>
          </div>

          <button className="button-primary self-center h-12 w-40 flex justify-center items-center mt-2">
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
