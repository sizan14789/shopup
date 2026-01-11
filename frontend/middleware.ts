import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/storage/:path*"],
};

export async function middleware(req: NextRequest) {
  const sessionid = req.cookies.get("sessionid")?.value;
  const mode = req.cookies.get("mode")?.value || "buyer";

  // redirect if no sessionid or in buyer mode
  if (!sessionid || mode === "buyer")
    return NextResponse.redirect(new URL("/", req.url));

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/session`, {
      method: "get",
      headers: {
        cookie: `sessionid=${sessionid}`,
      },
      signal: AbortSignal.timeout(5000),
    });

    // redirect if sessionid is fake or expired
    if (res.status !== 200) return NextResponse.redirect(new URL("/", req.url));

    // if logged in, redirect if not seller
    const user = await res.json();
    if (!user?.role?.includes("seller"))
      return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.log("Middleware auth fetch error");
    console.log(error);
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
