import { withAuth } from "next-auth/middleware";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

// This middleware uses Next-Auth to authenticate requests.
// It checks for the presence of a 'next-auth.session-token' cookie.
// If the cookie is present, the request is authorized.
// This middleware is applied only to the '/about' route.

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const sessionToken = req.cookies.get("next-auth.session-token");
      if (!sessionToken) return false;

      return true;
    },
  },
});

let defaultLocale = "en";
let locales = ["en", "fr"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }
}

export const config = { matcher: ["/", "/workspace/:path*"] };
