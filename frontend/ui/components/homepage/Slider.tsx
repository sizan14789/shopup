"use client";

import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const sliderInfo = [
  {
    id: 1,
    offer: "Limited Time Offer 30% Off",
    headline: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    primaryButton: "Visit",
    image: "",
    link: "/shop/1" ,
    secondaryButton: "Learn more",
  },
  {
    id: 2,
    offer: "Hurry up only few lefts!",
    headline: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    primaryButton: "Browse",
    image: "",
    link: "/shop?search=" ,
    secondaryButton: "Explore Deals",
  },
  {
    id: 3,
    offer: "Exclusive Deal 40% off",
    headline: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    primaryButton: "Cart",
    image: "",
    link: "/cart" ,
    secondaryButton: "Checkout",
  },
];

export default function Slider() {
  return (
    <div className="w-full my-10">
      <div className="overflow-hidden rounded-4xl">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          speed={500}
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
        >
          {sliderInfo.map(
            ({
              id,
              offer,
              headline,
              primaryButton,
              secondaryButton,
              link,
              image,
            }) => {
              return (
                <SwiperSlide key={id}>
                  <div className="bg-[#f3f3f3] py-8 px-8 sm:px-20 flex flex-col-reverse gap-8 lg:gap-14 md:flex-row items-center h-128 lg:h-96">
                    <div className="">
                      <p className="text-orange-600">{offer}</p>
                      <h2 className="text-2xl text-gray-700 md:text-[2rem] lg:text-[2.5rem] leading-12 font-bold mb-6 ">
                        {headline}
                      </h2>
                      <div className="flex gap-4 items-center ">
                        <Link href={link}>
                          <button className="button-primary h-12 w-32 flex justify-center items-center">
                            {primaryButton}
                          </button>
                        </Link>
                        <Link href="">
                          <button className="button-secondary h-12 w-32 flex justify-center items-center">
                            <p>{secondaryButton}</p>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <figure className="">
                      <Image
                        src={image}
                        width={400}
                        height={400}
                        alt="slide-1"
                        className="w-40 sm:w-52 md:max-w-72"
                      />
                    </figure>
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </div>
    </div>
  );
}
