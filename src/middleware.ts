import { withAuth } from "next-auth/middleware";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";

// Todo:
// - ADD chained middleware logic

const defaultLocale = "en";
const locales = ["en", "fr"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

// Chain NextAuth and Internationalization Middlewares
const middleware = withAuth(
  function middleware(request: NextRequest) {
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
  },
  {
    callbacks: {
      authorized: ({ req }) => {
        const sessionToken = req.cookies.get("next-auth.session-token");
        if (!sessionToken) return false;

        return true;
      },
    },
  },
);

export default middleware;

export const config = { matcher: ["/", "/workspace/:path*"] };
