import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)", "/api/verifyKey/(.*)"],
  publicRoutes: [
    "/api/accounts/register",
    "/api/accounts/:path*",
    "/api/licenses/:path*",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(trpc)(.*)"],
};
