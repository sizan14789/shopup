import { TrashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function ItemCard({ data }: { data: CartItemType }) {
  const {
    id,
    product_name,
    offer_price,
    product_image,
    seller_name,
    quantity,
  } = data;

  return (
    <div className="grid rounded-b-lg grid-cols-3 lg:grid-cols-5 py-4 border-b-(--border) border-b bg-(--bg) hover:brightness-95  duration-200">
      
      <Link href={"/shop/"+id} className=" flex lg:col-span-2 items-center lg:items-start gap-4 flex-col lg:flex-row px-2  cursor-pointer">
        <Image
          height={200}
          width={200}
          alt={product_name+ " image in cart"}
          src={product_image}
          className="object-cover rounded-lg max-w-20 lg:max-w-28 "
        />
        <div className="flex gap-1 md:gap-2 flex-col">
          <h2 className="md:text-xl">{product_name}</h2>
          <h2 className="text-xs md:text-sm">
            {seller_name}
          </h2>
        </div>
      </Link>

      <p className="text-sm items-center hidden lg:flex">${offer_price}</p>
      
      <div className="text-sm gap-2 justify-center items-center flex">
        <button className="cursor-pointer  text-2xl"> - </button>
        <p>{quantity}</p>
        <button className="cursor-pointer  text-2xl text-(--primary) ">
          +
        </button>
      </div>

      <div className="text-sm flex flex-col lg:flex-row justify-center lg:justify-start items-center ">
        <p className="self-center justify-self-center mt-12 lg:mt-0">
          ${offer_price}x{quantity}=
          <span className="font-semibold">${offer_price*quantity}</span>
        </p>
        <button className="text-(--highlight) button-rounded h-10 w-10 lg:ml-auto">
          <TrashIcon size={24} weight="thin" />
        </button>
      </div>
    </div>
  );
}
