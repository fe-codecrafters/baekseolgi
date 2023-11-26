import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // HTTP Req Logger
    const { ip, geo, method, nextUrl } = req;
    console.log(new Date().toISOString(), method, nextUrl.href);
    console.log("ip: ", ip, "geo: ", geo);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const isStatic = ["/_next/static", "/_next/image", "favicon.ico"].some(
          (s) => req.nextUrl.pathname.startsWith(s),
        );
        if (isStatic) return true;

        // The default is to let the user continue if they have a valid JWT (basic authentication).
        // JWT verify가 1차로 진행된다.
        console.log("authorize callback token", token);
        return Boolean(token);
      },
    },
  },
);