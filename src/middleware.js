import { NextResponse } from "next/server";

export function middleware(req) {
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  console.log("Requested Path:", req.nextUrl.pathname);

  const protectedRoutes = ["/dashboard", "/olimpiada", "/results"]; // Himoyalanadigan sahifalar

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!token && isProtected) {
    console.log("Unauthorized - Redirecting to login page");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/olimpiada/:path*", "/results/:path*"], // Himoyalanadigan sahifalar
};
