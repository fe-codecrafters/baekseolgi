import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      // The default is to let the user continue if they have a valid JWT (basic authentication).
      // JWT verify가 1차로 진행된다.
      console.log("authorize callback token", token);
      return Boolean(token);
    },
  },
});

export const config = {
  matcher: [
    /*
     * 클라이언트 페이지는 JWT가 필요
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files) -> private 한 이미지가 있다면 다르게 저장해야 할 듯
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
