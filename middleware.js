// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     if (req.nextauth.token.role !== "admin" && req.url.includes("/admin")) {
//       return NextResponse.rewrite(
//         new URL("/accessdenied?unauthorized=true", req.url)
//       );
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         if (!token) {
//           return false;
//         }
//         if (req.nextUrl.pathname.startsWith("/admin")) {
//           if (token?.role !== "admin") {
//             return NextResponse.rewrite(
//               new URL("/accessdenied?unauthorized=true", req.url)
//             );
//           }
//         }
//         return Boolean(token);
//       },
//     },
//   }
// );

// export const config = { matcher: ["/admin/:path*", "/dashboard/:path*"] };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const isAdminRoute = (pathname) => pathname.startsWith("/admin");

const checkAdminRole = (token) => token?.role === "admin";

const middleware = (req) => {
  const { token } = req.nextauth;
  const { pathname } = req.nextUrl;

  if (isAdminRoute(pathname) && !checkAdminRole(token)) {
    return NextResponse.rewrite(
      new URL("/accessdenied?unauthorized=true", req.url)
    );
  }
  if (token && (pathname === "/" || pathname === "/signup")) {
    console.log("token", token);
    if (token?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }
};

const authorized = ({ req, token }) => {
  if (!token) {
    return false;
  }
  const { pathname } = req.nextUrl;
  if (isAdminRoute(pathname) && !checkAdminRole(token)) {
    return NextResponse.rewrite(
      new URL("/accessdenied?unauthorized=true", req.url)
    );
  }

  return Boolean(token);
};

export default withAuth(middleware, { callbacks: { authorized } });

export const config = { matcher: [ "/admin/:path*", "/dashboard/:path*"] };
