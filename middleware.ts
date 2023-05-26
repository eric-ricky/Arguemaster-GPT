import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  console.log("------------ middleware ---------");
  console.log("visited ==>", req.nextUrl.pathname);

  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  const cookie = req.cookies.get("user")?.value;

  // ==== already authenticated, redirect from /signin
  if (req.nextUrl.pathname.startsWith("/signin") && cookie) {
    console.log("already authenticated, redirect from /signin...");
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  // ==== not authenticated, redirect to /signin
  if (!cookie && pathname.startsWith("/new")) {
    console.log("not authenticated, redirect to /signin...");
    url.pathname = `/signin`;
    return NextResponse.redirect(url);
  }

  console.log("Nothing happeded..");
  return NextResponse.next();
};

export const config = {
  matcher: ["/signin", "/new/:path*"],
};
