import Link from "next/link";
import Navbar from "./Navbar";
import NavButton from "./Navbutton";

export default function Header({ theme }: { theme: string }) {
  return (
    <div className="shell border-b border-b-(--border)">
      <div className="flex justify-between items-center min-h-14 md:min-h-18 xl:min-h-22 core">
        <div className="flex gap-2 items-center">
          <NavButton />
          <Link href="/" className="font-mon text-xl lg:text-2xl font-light">
            SkyKart
          </Link>
        </div>

        <Navbar theme={theme.toString()} />
      </div>
    </div>
  );
}
