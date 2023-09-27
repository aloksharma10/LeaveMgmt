import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const isAdminRoute = (pathname) => pathname.includes("/admin");
const isUserRoute = (pathname) => pathname.includes("/user");

const checkUserRole = (token, roles) => roles.includes(token?.role);

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    if (isAdminRoute(pathname) && !checkUserRole(token, ["admin"])) {
      return NextResponse.rewrite(
        new URL("/accessdenied?unauthorized=true", req.url)
      );
    }

    if (isUserRoute(pathname) && !checkUserRole(token, ["faculty", "staff"])) {
      return NextResponse.rewrite(
        new URL("/accessdenied?unauthorized=true", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (!token) {
          return false;
        }

        const { pathname } = req.nextUrl;

        if (isAdminRoute(pathname) && !checkUserRole(token, ["admin"])) {
          return NextResponse.rewrite(
            new URL("/accessdenied?unauthorized=true", req.url)
          );
        }

        if (isUserRoute(pathname) && !checkUserRole(token, ["faculty", "staff"])) {
          return NextResponse.rewrite(
            new URL("/accessdenied?unauthorized=true", req.url)
          );
        }

        return Boolean(token);
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
