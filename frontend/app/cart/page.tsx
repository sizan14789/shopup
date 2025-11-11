import { cookies } from "next/headers";
import CartContainer from "./CartContainer";
import { getUser } from "@/lib/initialLoadLib";
import Link from "next/link";

const getCartItemDetails = async (sessionid: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cartDetails`,
      {
        method: "get",
        headers: {
          Cookie: "sessionid=" + sessionid,
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Cart() {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get("sessionid")?.value;

  const user = await getUser();

  let cartItemDetails = [];
  if (typeof sessionid === "string")
    cartItemDetails = await getCartItemDetails(sessionid);

  return (
    <div className="shell flex grow my-10">
      <div className="core grow flex flex-col">
        <h2 className="text-2xl mb-4">Cart</h2>
        <div className="w-full flex flex-col">
          {user ? (
            <CartContainer cartItemDetailsInfo={cartItemDetails} />
          ) : (
            <div className="grow flex justify-center my-6">
              <h2 className="text-(--subtext) text-sm">
                You are not logged in.{" "}
                <Link href="/login" className="text-(--highlight) ">
                  Log in
                </Link>
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
