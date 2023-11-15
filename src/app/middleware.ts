import { withAuth } from "next-auth/middleware";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      if (token === null) {
        return false;
      }
      return true;
    },
  },
});
