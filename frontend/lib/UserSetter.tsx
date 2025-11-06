"use client";

import useCartStore from "@/context/CartStore";
import { useUserStore } from "@/context/UserStore";
import { useEffect } from "react";

export default function UserSetter() {
  const { user, setUser } = useUserStore();
  const { setCart } = useCartStore()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`,
          {
            method: "get",
            credentials: "include",
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
          {
            method: "get",
            credentials: "include",
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          setCart(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, [user]);

  return <></>;
}
