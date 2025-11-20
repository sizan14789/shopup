

export async function updateCart(updatedCart: Record<string, number>) {
  const res = await fetch(`/api/cart`, {
    method: "POST",
    body: JSON.stringify(updatedCart),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return Number(res.status);
}

interface ParamsTypeForAddToCart {
  id: number;
  cart: Record<string, number>;
  setCart: (state: Record<string, number>) => void;
};

interface ParamsTypeForBuyNow extends ParamsTypeForAddToCart {
  router: { push: (address: string) => void };
};

// handle add to cart
export const handleAddToCart = async (params: ParamsTypeForAddToCart) => {
  const { id, cart, setCart } = params;
  const updatedCart = { ...cart };

  if (updatedCart[id.toString()]) updatedCart[id.toString()] += 1;
  else updatedCart[id.toString()] = 1;

  setCart(updatedCart);

  try {
    const res = await updateCart(updatedCart)
    if (!(res===201)) {
      console.log("error in sync, check cartLib");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

// handle buy now
export const handleBuyNow = async (params:ParamsTypeForBuyNow) => {
  const { id, cart, setCart, router } = params;
  const res = await handleAddToCart({id, cart, setCart});
  if(res)
    router.push("/cart");
};
