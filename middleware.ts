import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/inbox", "/orders", "/payments", "/products", "/settings", "/automation", "/sla", "/exports", "/stock", "/customers", "/ai"];
const adminPaths = ["/users", "/settings/whatsapp"];
const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "dev-secret-change-me");

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const needsAuth = protectedPaths.some((path) => pathname.startsWith(path)) || adminPaths.some((path) => pathname.startsWith(path));
  if (!needsAuth) return NextResponse.next();

  const token = request.cookies.get("session")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(token, secret);
    if (adminPaths.some((path) => pathname.startsWith(path)) && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/inbox/:path*", "/orders/:path*", "/payments/:path*", "/products/:path*", "/settings/:path*", "/automation/:path*", "/sla/:path*", "/exports/:path*", "/stock/:path*", "/customers/:path*", "/ai/:path*", "/users/:path*"],
};
