import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token !== "admin") {
      return NextResponse.redirect(
        new URL("/accessdenied?unauthorized=true", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname.includes("/admin")) {
          if (token?.role !== "admin") {
            return NextResponse.redirect(
              new URL("/accessdenied?unauthorized=true", req.url)
            );
          }
          return token?.role === "admin";
        }
        return Boolean(token);
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
