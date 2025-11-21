import { ProductCardType } from "@/types/ProductsTypes";
import ProductCard from "../shop/ProductCard";
import { getSessionid } from "@/lib/initialLoadLib";
import WishlistProductCard from "./WishlistProductCard";

const getList = async (sessionid: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/wishlist`, {
      method: "get",
      headers: {
        Cookie: `sessionid=${sessionid}`,
      },
    });
    if (res.status == 200) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default async function WishlistContainer() {
  const sessionid = await getSessionid();

  let list = [];
  if (sessionid) list = await getList(sessionid);

  return (
    <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
      {list.length == 0 ? (
        <h2 className="text-(--subtext) text-sm self-center">Empty List</h2>
      ) : (
        list.map((each: ProductCardType) => {
          return <WishlistProductCard data={each} key={each.id} />;
        })
      )}
    </div>
  );
}
