import { withAuth } from "next-auth/middleware";
import { rewrite } from "@vercel/edge";
const isAdminRoute = (pathname) => pathname.includes("/admin");

const checkAdminRole = (token) => token?.role === "admin";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    console.log("middleware", token, pathname);

    if (isAdminRoute(pathname) && !checkAdminRole(token)) {
      return rewrite(new URL("/accessdenied?unauthorized=true", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log("token", token);
        if (!token) {
          return false;
        }
        const { pathname } = req.nextUrl;
        console.log("pathname", pathname);
        if (isAdminRoute(pathname) && !checkAdminRole(token)) {
          return rewrite(new URL("/accessdenied?unauthorized=true", req.url));
        }
        return Boolean(token);
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
