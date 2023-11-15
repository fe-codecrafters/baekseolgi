import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async signIn({ user, account }) {
      if (!user) {
        return false;
      }

      console.log("singIn", user, account);
      const kakaoId = user.id;
      const duplicate = await prisma.user.findFirst({
        where: {
          UserAuthSocial: {
            socialId: kakaoId,
          },
        },
      });

      if (!duplicate) {
        try {
          await prisma.user.create({
            data: {
              username: user.name!,
              UserAuthSocial: {
                create: {
                  socialId: kakaoId,
                  accessToken: String(account?.access_token),
                  type: "KAKAO",
                },
              },
            },
          });
        } catch (e) {
          console.error(e);
        }
        return true;
      }

      return true;
    },

    async session({ session, token }) {
      console.log(session, token);
      session.user = token as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
