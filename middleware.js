import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server'
const isAdminRoute = (pathname) => pathname.includes("/admin");

const checkAdminRole = (token) => token?.role === "admin";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    if (isAdminRoute(pathname) && !checkAdminRole(token)) {
      return NextResponse.rewrite(new URL("/accessdenied?unauthorized=true", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (!token) {
          return false;
        }
        const { pathname } = req.nextUrl;
        if (isAdminRoute(pathname) && !checkAdminRole(token)) {
          return NextResponse.rewrite(new URL("/accessdenied?unauthorized=true", req.url));
        }
        return Boolean(token);
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };