import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Gate /admin behind HTTP Basic Auth, checked against ADMIN_PASSWORD.
 * Username can be anything — only the password is verified.
 *
 * Placeholder until real auth is built; note this file is named
 * `proxy.ts` (not `middleware.ts`) per this Next.js version's renamed
 * convention — see node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md.
 */
export function proxy(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new NextResponse("Admin access is not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const password = decoded.slice(decoded.indexOf(":") + 1);
    if (password === adminPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
