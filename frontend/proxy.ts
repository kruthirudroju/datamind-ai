import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Declare explicit protected path structures matching dashboard configurations
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isDashboardRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internal endpoints and static resource bundles
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API integration pipelines
    '/(api|trpc)(.*)',
  ],
};