import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicRoutes = ["/login", "/register", "/verify", "/forgot-password"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isStatic = pathname.startsWith("/_next") || pathname.includes(".");

  // Redirect unauthenticated users trying to access protected routes
  if (!token && !isPublicRoute && !isStatic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from auth routes
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ❌ If user is a "client", block access to /dashboard
  // if (pathname.startsWith("/dashboard")) {
  //   if (!token || token.role === "client") {
  //     return NextResponse.redirect(new URL("/", request.url)); // Or a custom /403 page
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
