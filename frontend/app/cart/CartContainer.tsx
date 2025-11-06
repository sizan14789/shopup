"use client";

import ItemCard from "./ItemCard";
import { useUserStore } from "@/context/UserStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartContainer() {
  const { userState } = useUserStore();
  const [cartDetails, setCartDetails] = useState<CartItemType[]>([]);

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cartDetails`,
          {
            method: "get",
            credentials: "include",
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          setCartDetails(data);
          // setState('done')
        }
      } catch (error) {
        console.log(error);
        // setState('error')
      }
    };
    if(userState==='loggedIn')
      getCartDetails();
  }, [userState]);

  // delete from cart
  const handleDeleteFromCartDetails = (id: number) => {
    const updatedCartProductDetails = cartDetails.filter((each) => {
      return each.id !== id;
    });
    setCartDetails(updatedCartProductDetails);
  };

  //
  const handleQuantityChange = (id: number, amount: number) => {
    const updatedCartDetails: CartItemType[] = cartDetails.map(
      (each: CartItemType) => {
        const newItem: CartItemType = { ...each };
        if (newItem.id === id) {
          if (!(amount === -1 && newItem.quantity === 1)) {
            newItem.quantity = newItem.quantity + amount;
          }
        }
        return newItem;
      }
    );
    setCartDetails(updatedCartDetails);
  };

  // total amount
  const getTotal = () => {
    let total = 0;
    cartDetails.forEach((each) => {
      total += each.offer_price * each.quantity;
    });
    return total;
  };

  if (userState==='loggedOut'){
    return(
      <div className="w-full flex flex-col">
        <div className="grow flex justify-center my-6">
          <h2 className="text-(--subtext) text-sm">
            You are not logged in.{" "}
            <Link href="/login" className="text-(--highlight) ">
              Log in
            </Link>
          </h2>
        </div>
      </div>
    )
  }

  if (userState === "loading") {
    return (
      <div className="w-full flex flex-col">
        <div className="grow flex justify-center my-6">
          <h2 className="text-(--subtext) text-sm">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="p-2 grid grid-cols-3 lg:grid-cols-5 mb-4 font-semibold ">
        <h2 className="lg:col-span-2 flex justify-center lg:justify-start">
          Product
        </h2>
        <p className="hidden lg:block">Price</p>
        <p className="flex justify-center">Quantity</p>
        <p className="flex justify-center lg:justify-start">Subtotal</p>
      </div>

      {cartDetails.map((each: CartItemType) => {
        return (
          <ItemCard
            key={each.id}
            data={each}
            handleQuantityChange={handleQuantityChange}
            handleDeleteFromCartDetails={handleDeleteFromCartDetails}
          />
        );
      })}

      <div className="py-8 px-2 grid grid-cols-3 lg:grid-cols-5 mb-4 font-semibold ">
        <p className="flex justify-center lg:justify-start">Total</p>
        <p className="flex justify-center lg:justify-start col-start-3 lg:col-start-5">
          ${getTotal()}
        </p>
      </div>

      <button className="button-primary self-center h-12 w-40 flex justify-center items-center mt-2">
        Place Order
      </button>
    </div>
  );
}
