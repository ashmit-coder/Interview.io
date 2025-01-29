import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { token } = request.nextauth;

    //callback return true then call this middleware
    const { pathname, origin } = request.nextUrl;
    if (token) {
      if (pathname !== "/profile") {
        if (pathname !== "/admin" && token.role === "ADMIN") {
          return NextResponse.redirect(origin + "/admin");
        } else if (pathname !== "/user" && token.role === "USER") {
          return NextResponse.redirect(origin + "/user");
        } else if (pathname !== "/manager" && token.role === "MANAGER") {
          return NextResponse.redirect(origin + "/manager");
        }
      }
    }
  },
  {
    callbacks: {
      authorized({ token, req }) {
        if (req.nextUrl.pathname === "/signin") {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/signin", "/admin", "/user", "/manager", "/profile"],
};
