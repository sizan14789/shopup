"use client";

import useCartStore from "@/context/CartStore";
import { useUserStore } from "@/context/UserStore";
import { useEffect } from "react";

export default function UserSetter({ userInfo }: { userInfo: object }) {
  const { userState, setUser } = useUserStore();
  const { setCart } = useCartStore();

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  useEffect(() => {
    if (userState === "loading") return;

    const getCart = async () => {
      try {
        const res = await fetch(`/api/cart`, {
          method: "get",
          credentials: "include",
        });
        if (res.status === 200) {
          const data = await res.json();
          setCart(data);
        } else {
          const data = await res.json();
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCart();
  }, [userState]);

  return <></>;
}
