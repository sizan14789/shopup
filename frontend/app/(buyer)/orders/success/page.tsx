"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen min-w-full fixed top-0 left-0 z-9999 items-center justify-center px-4 bg-(--bg) border ">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>

        <p className="mt-4 text-gray-600">
          Your payment has been completed successfully.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Redirecting to your orders in 5 seconds...
        </p>
      </div>
    </main>
  );
}
