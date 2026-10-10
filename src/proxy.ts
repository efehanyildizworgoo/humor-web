import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/session-token";

const SESSION_COOKIE = "humor_admin_session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifyToken(token);

  // Protected: /admin and everything below except /admin/login
  if (pathname === "/admin" || (pathname.startsWith("/admin/") && pathname !== "/admin/login")) {
    if (!valid) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
