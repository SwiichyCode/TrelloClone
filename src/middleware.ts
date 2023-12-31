import { withAuth } from "next-auth/middleware";

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

export const config = { matcher: ["/", "/dashboard"] };
