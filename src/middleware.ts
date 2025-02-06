import { NextResponse } from "next/server";
import { env } from "./lib/env.config";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/(.*)", "/api/uploadthing"];

const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/agency/sign-in(.*)",
  "/agency/sign-up(.*)",
];

const isApiAuthRoutes = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/agency";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(isApiAuthRoutes);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  console.log("Route: ", req.nextUrl.pathname);
  console.log("Session: ", req.auth);
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl)
      );
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("auth/login", req.nextUrl));
  }

  //rewrite for domains
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers;

  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  //if subdomain exists
  const customSubDomain = hostname
    .get("host")
    ?.split(`${env.DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
  }

  if (
    url.pathname === "/" ||
    (url.pathname === "/site" && url.host === env.DOMAIN)
  ) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }

  if (
    url.pathname.startsWith("/agency") ||
    url.pathname.startsWith("/subaccount")
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
