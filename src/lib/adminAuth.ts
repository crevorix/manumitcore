import { headers } from "next/headers";

/**
 * Re-check the admin Basic Auth credentials inside server code.
 *
 * src/proxy.ts already gates /admin/:path*, but Server Actions are reachable
 * by direct POST and must not rely on that alone — see
 * node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md.
 * Throws rather than returning a boolean so a forgotten call site fails loudly.
 */
export async function assertAdmin(): Promise<void> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("Admin access is not configured.");
  }

  const authHeader = (await headers()).get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    throw new Error("Unauthorized.");
  }

  const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
  const password = decoded.slice(decoded.indexOf(":") + 1);

  if (password !== adminPassword) {
    throw new Error("Unauthorized.");
  }
}
