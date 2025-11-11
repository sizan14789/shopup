"use client";

import { useState } from "react";

export default function FIlterBox({ search }: { search: string }) {
  const [filterPanel, setFilterPanel] = useState<Boolean>();

  return (
    <button
      className="button-secondary h-12 w-32 flex justify-center items-center"
      onClick={() => setFilterPanel(true)}
    >
      Filter
    </button>
  );
}
