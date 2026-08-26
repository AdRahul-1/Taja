import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0].toLowerCase();

  // Redirect alias/secondary domain and www variants to canonical https://rrfoodproducts.com
  if (
    hostname === "tajachanachur.in" ||
    hostname === "www.tajachanachur.in" ||
    hostname === "www.rrfoodproducts.com"
  ) {
    const redirectUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      "https://rrfoodproducts.com"
    );
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Canonical domain (rrfoodproducts.com), localhost, and preview URLs pass through normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
