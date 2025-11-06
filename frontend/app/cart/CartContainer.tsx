"use client";

import Link from "next/link";
import ItemCard from "./ItemCard";
import { useState } from "react";

export default function CartContainer({
  cartItemDetailsInfo,
}: {
  cartItemDetailsInfo: CartItemType[];
}) {
  const [cartDetails, setCartDetails] = useState<CartItemType[]>(cartItemDetailsInfo);
  const [ placeOrderModal, setPlaceOrderModal ] = useState<boolean>(false)

  // useEffect(() => {
  //   if (userState !== "loggedIn") return;
  //   const getCartDetails = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cartDetails`,
  //         {
  //           method: "get",
  //           credentials: "include",
  //         }
  //       );
  //       if (res.status === 200) {
  //         const data = await res.json();
  //         setCartDetails(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCartDetails();
  // }, [userState]);

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

  if (cartDetails.length === 0) {
    return (
      <div className="grow flex justify-center my-6">
        <h2 className="text-(--subtext) text-sm">
          Empty Cart. Visit the shop{" "}
          <Link href="/shop" className="text-(--highlight) ">
            shop
          </Link>{" "}
          to add items
        </h2>
      </div>
    );
  }

  return (
    <>
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

      <button className="button-primary self-center h-12 w-40 flex justify-center items-center mt-2"
      onClick={()=> setPlaceOrderModal(true)}
      >
        Place Order
      </button>
      
      {/* modal for order placing */}
      <div className={`${placeOrderModal? "flex" : 'hidden' } h-full w-svw fixed top-0 left-0 justify-center items-center bg-gray-300/90 z-100 `} >
        <div className="">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, a perspiciatis consequuntur non quis sapiente blanditiis eos aliquam totam earum expedita, itaque, deleniti voluptatibus ad. Deleniti animi nisi quae dolor?
        </div>
      </div>
    </>
  );
}
