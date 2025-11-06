"use client";

import useNavStore from "@/context/Nav";
import { ListIcon } from "@phosphor-icons/react";

export default function NavButton() {
  const { setNavOpen } = useNavStore();

  return (
    <button className="lg:hidden h-10 w-10 sm:h-12 sm:w-12 button-rounded" onClick={() => setNavOpen(true)}>
      <ListIcon size={28} weight="light" />
    </button>
  );
}
