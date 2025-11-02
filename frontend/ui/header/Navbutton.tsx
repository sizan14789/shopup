"use client";

import useNavStore from "@/context/Nav";
import { ListIcon } from "@phosphor-icons/react";

export default function NavButton() {
  const { navOpen, setNavOpen } = useNavStore();

  return (
    <button className="lg:hidden flex justify-center items-center cursor-pointer rounded-full h-12 w-12 hover:text-(--bg) hover:bg-(--primary) duration-200 " onClick={() => setNavOpen(true)}>
      <ListIcon size={28} weight="light" />
    </button>
  );
}
